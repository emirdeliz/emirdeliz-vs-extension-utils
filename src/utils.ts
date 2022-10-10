import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';

const FLUTTER_NAME_FILE_CONFIG = 'pubspec.yaml';
const GIT_NAME_FOLDER_CONFIG = '.git';
const GIT_COMMANDS = {
	pull: 'pull',
	merge: 'merge,',
};

let nextTermId = 25041988;
let terminalInstance = null as vscode.Terminal;

export function createVscodeTerminal() {
	terminalInstance = vscode.window.createTerminal({
		name: `Ext Terminal #${nextTermId++}`,
		hideFromUser: true,
	});
	return terminalInstance;
}

export function getVscodeTerminalInstanceAndMaybeCreateOne() {
	if (!terminalInstance) {
		return createVscodeTerminal();
	}
	return terminalInstance;
}

export function runCommandOnVsTerminal(command: string) {
	try {
		const terminal = getVscodeTerminalInstanceAndMaybeCreateOne();
		terminal.sendText(command);
	} catch (e) {
		vscode.window.showErrorMessage(
			`🥵 An error occurred when executing the dart command: ${e}`
		);
	}
}

export async function runDartCommand(command: string) {
	const folderPath = await getPathFolderFocus();
	if (!checkFolderHasFolder(folderPath, FLUTTER_NAME_FILE_CONFIG)) {
		return;
	}
	runCommandOnVsTerminal(command);
}

export async function runGitCommand(command: string, workDir?: string) {
	const commandWithMaybeWorkDir = `git ${
		workDir ? `-C ${workDir} ${command}` : ''
	}`;
	runCommandOnVsTerminal(commandWithMaybeWorkDir);
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
	const workspaceFoldersWithoutIgnoreFolders = foldersFromDir.filter(
		(folder) => !ignoreFolders || !ignoreFolders.includes(folder)
	);
	const foldersResult = workspaceFoldersWithoutIgnoreFolders.filter((f) => {
		return checkFolderHasGitConfig(f);
	});
	return foldersResult;
}

export async function getPathFolderFocus() {
	await vscode.commands.executeCommand('copyFilePath');
	const folderPath = await vscode.env.clipboard.readText();
	return folderPath;
}

export function checkFolderHasFolder(folderPath: string, folder: string) {
	const workspacePath = getWorkspacePath();
	const workspaceDirBase = workspacePath?.uri?.fsPath;
	return fs.existsSync(path.join(workspaceDirBase, folderPath, folder));
}

export function getWorkspacePath() {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	const workspacePath = workspaceFolders
		? workspaceFolders[0]
		: ({} as vscode.WorkspaceFolder);
	return workspacePath;
}

export function checkFolderHasGitConfig(folderPath: string) {
	return checkFolderHasFolder(folderPath, GIT_NAME_FOLDER_CONFIG);
}

export async function runGitPullOnFolders(
	foldersPathWithGitConfig: Array<string>
) {
	const foldersPromise = [];
	for (const folder in foldersPathWithGitConfig) {
		foldersPromise.push(runGitCommand(GIT_COMMANDS.pull, folder));
	}

	await processStackPromise(foldersPromise, 'Making pull... 🤘');
}

export async function runGitMergeOnFolders(
	foldersPathWithGitConfig: Array<string>
) {
	const foldersPromise = [];
	for (const folder in foldersPathWithGitConfig) {
		foldersPromise.push(runGitCommand(GIT_COMMANDS.merge, folder));
	}
	await processStackPromise(foldersPromise, 'Making merge... 🤘');
}

export function getSettingsByKey(
	settingsExtensionKey: string,
	settingsKey: string
) {
	const setting = vscode.workspace
		.getConfiguration(settingsExtensionKey)
		.get(settingsKey);
	return setting as Array<String>;
}

export async function processStackPromise<T>(
	promiseArray: Array<Promise<T | undefined>>,
	title: string
) {
	vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: title
		},
		async (progress) => {
			progress.report({ increment: 0 });

			let promise = null;
			const promiseAllLength = promiseArray.length;

			while ((promise = promiseArray.pop())) {
				await new Promise<void>((resolve) => {
					setTimeout(async () => {
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
			}
		}
	);
}