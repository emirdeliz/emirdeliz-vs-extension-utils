import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';
import {
	EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME,
	EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG,
	EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS,
} from './constants';

let nextTermId = 25041988;
let terminalInstance = {} as vscode.Terminal;

export function createVscodeTerminal() {
	terminalInstance = vscode.window.createTerminal({
		name: `${
			EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME
		} #${nextTermId++}`,
		hideFromUser: true,
	});
	return terminalInstance;
}

export function getVscodeTerminal() {
	if (!terminalInstance) {
		return createVscodeTerminal();
	}
	return terminalInstance;
}

export function runCommandOnVsTerminal(command: string) {
	try {
		const terminal = getVscodeTerminal();
		terminal.sendText(command);
	} catch (e) {
		vscode.window.showErrorMessage(
			`🥵 An error occurred when executing the dart command: ${e}`
		);
	}
}

export function runGitCommand(command: string, workDir?: string) {
	const commandWithMaybeWorkDir = `git ${
		workDir ? `-C ${workDir} ${command}` : ''
	}`;
	return runCommandOnVsTerminal(commandWithMaybeWorkDir);
}

export function getAllFoldersInDir(folderPathBase: string) {
	return fs.readdirSync(folderPathBase).filter(function (file) {
		return fs.statSync(`${folderPathBase}/${file}`).isDirectory();
	});
}

export function getAllFoldersWithGitConfig(
	folderPathBase: string,
	settingsKeyBase: string,
	settingsKeyGitIgnoreFolder: string
) {
	const foldersFromDir = getAllFoldersInDir(folderPathBase);
	const ignoreFolders = getSettingsByKey(
		settingsKeyBase,
		settingsKeyGitIgnoreFolder
	);
	const workspaceFoldersWithoutIgnoreFolders = foldersFromDir.filter(function (
		folder
	) {
		return !ignoreFolders || !ignoreFolders.includes(folder);
	});
	const foldersResult = workspaceFoldersWithoutIgnoreFolders.filter(function (
		f
	) {
		return checkFolderHasGitConfig(f);
	});
	return foldersResult;
}

export async function getPathFolderFocus() {
	await vscode.commands.executeCommand('copyFilePath');
	const folderPath = await vscode.env.clipboard.readText();
	return folderPath;
}

export function checkFolderHasFolder(
	folderBasePath: string,
	folderToBeFoundPath: string
) {
	const workspacePath = getWorkspacePath();
	const workspaceDirBase = workspacePath?.uri?.fsPath;

	return fs.existsSync(
		path.join(workspaceDirBase, folderBasePath, folderToBeFoundPath)
	);
}

export function getWorkspacePath() {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	const workspacePath = workspaceFolders
		? workspaceFolders[0]
		: ({} as vscode.WorkspaceFolder);
	return workspacePath;
}

export function checkFolderHasGitConfig(folderPath: string) {
	return checkFolderHasFolder(
		folderPath,
		EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG
	);
}

export function runGitPullOnFolders(foldersPathWithGitConfig: Array<string>) {
	const foldersPromise = [] as Array<Promise<void>>;
	for (const folder in foldersPathWithGitConfig) {
		foldersPromise.push(
			Promise.resolve(
				runGitCommand(
					EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.pull,
					folder
				)
			)
		);
	}

	processStackPromise<void>(foldersPromise, 'Making pull... 🤘');
}

export function runGitMergeOnFolders(foldersPathWithGitConfig: Array<string>) {
	const foldersPromise = [] as Array<Promise<void>>;
	for (const folder in foldersPathWithGitConfig) {
		foldersPromise.push(
			Promise.resolve(
				runGitCommand(
					EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.merge,
					folder
				)
			)
		);
	}
	processStackPromise<void>(foldersPromise, 'Making merge... 🤘');
}

export function getSettingsByKey(
	settingsExtensionKey: string,
	settingsKey: string
) {
	const settings = vscode.workspace.getConfiguration(settingsExtensionKey);
	const settingValue = settings?.get(settingsKey);
	return settingValue as Array<string>;
}

export function processStackPromise<T>(
	promiseArray: Array<Promise<T | undefined>>,
	title: string
) {
	try {
		vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: title,
			},
			async function (progress) {
				progress.report({ increment: 0 });

				const promiseAllLength = promiseArray.length;
				let promise = Promise.resolve({} as T) as Promise<T | undefined>;
				while (promise) {
					await new Promise<void>(function (resolve) {
						setTimeout(async function () {
							await promise;
							resolve();
						}, 1000);
					});

					const incrementPercentage = 100 / promiseAllLength || 1;
					const promiseDoneLength = promiseAllLength - promiseArray.length;
					const message = `Running ${promiseDoneLength} of ${promiseAllLength}`;
					progress.report({
						increment: incrementPercentage,
						message,
					});
					promise = promiseArray.pop() as Promise<T | undefined>;
				}
			}
		);
	} catch (e) {
		console.warn(`Error on process promises: ${e.message}`);
	}
}

export function isJestEnvironment() {
	return process.env.JEST_WORKER_ID !== undefined;
}