import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';
import {
	EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME,
	EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG,
	EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS,
} from './constants';

export interface ProgressData {
	message?: string | undefined;
	increment?: number | undefined;
	incrementPercentageRounded?: number;
}

let nextTermId = 25041988;
let terminalInstance = {} as vscode.Terminal;

function createVscodeTerminal() {
	terminalInstance = vscode.window.createTerminal({
		name: `${EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME} #${nextTermId++}`,
		hideFromUser: true,
	});
	return terminalInstance;
}

function getVscodeTerminal() {
	if (!terminalInstance.name) {
		return createVscodeTerminal();
	}
	return terminalInstance;
}

function runCommandOnVsTerminal(command: string) {
	try {
		const terminal = getVscodeTerminal();
		terminal.sendText(command);
	} catch (e) {
		vscode.window.showErrorMessage(
			`🥵 An error occurred when executing the dart command: ${e}`
		);
	}
}

function runGitCommand(command: string, workDir?: string) {
	const commandWithMaybeWorkDir = `git ${
		workDir ? `-C ${workDir} ${command}` : ''
	}`;
	return runCommandOnVsTerminal(commandWithMaybeWorkDir);
}

function getAllFoldersInDir(folderPathBase: string) {
	return fs.readdirSync(folderPathBase).filter(function (file) {
		return fs.statSync(`${folderPathBase}/${file}`).isDirectory();
	});
}

function getAllFoldersWithGitConfig(
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

async function getPathFolderFocus() {
	await vscode.commands.executeCommand('copyFilePath');
	const folderPath = await vscode.env.clipboard.readText();
	return folderPath;
}

function checkFolderHasFolder(
	folderBasePath: string,
	folderToBeFoundPath: string
) {
	const workspacePath = getWorkspacePath();
	const workspaceDirBase = workspacePath?.uri?.fsPath;

	return fs.existsSync(
		path.join(workspaceDirBase, folderBasePath, folderToBeFoundPath)
	);
}

function getWorkspacePath() {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	const workspacePath = workspaceFolders
		? workspaceFolders[0]
		: ({} as vscode.WorkspaceFolder);
	return workspacePath;
}

function checkFolderHasGitConfig(folderPath: string) {
	return checkFolderHasFolder(
		folderPath,
		EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG
	);
}

async function runGitPullOnFolders(foldersPathWithGitConfig: Array<string>) {
	await vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: 'Making pull... 🤘',
		},
		async function (progress) {
			for (const folder of foldersPathWithGitConfig) {
				const folderIndex = foldersPathWithGitConfig.indexOf(folder);
				runGitCommand(EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull, folder);
				await showVscodeProgress(
					foldersPathWithGitConfig.length,
					folderIndex,
					progress
				);
			}
		}
	);
}

async function runGitMergeOnFolders(foldersPathWithGitConfig: Array<string>) {
	await vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: 'Making merge... 🤘',
		},
		async function (progress) {
			for (const folder of foldersPathWithGitConfig) {
				const folderIndex = foldersPathWithGitConfig.indexOf(folder);
				runGitCommand(EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge, folder);
				await showVscodeProgress(
					foldersPathWithGitConfig.length,
					folderIndex,
					progress
				);
			}
		}
	);
}

function getSettingsByKey(settingsExtensionKey: string, settingsKey: string) {
	const settings = vscode.workspace.getConfiguration(settingsExtensionKey);
	const settingValue = settings?.get(settingsKey);
	return settingValue as Array<string>;
}

function showVscodeProgress(
	progressStepsSize: number,
	progressDone: number,
	progress: vscode.Progress<ProgressData>
) {
	try {
		const incrementPercentage = 100 / progressStepsSize;
		const incrementPercentageRounded = Math.min(
			Math.round(incrementPercentage),
			100
		);

		const message = `Running ${progressDone + 1} of ${progressStepsSize}`;
		return new Promise(function (resolve) {
			setTimeout(function () {
				progress.report({
					increment: incrementPercentageRounded,
					message,
				});
				resolve({ message, incrementPercentageRounded });
			}, 1000);
		});
	} catch (e) {
		console.warn(`Error on process promises: ${e.message}`);
	}
}

function isJestEnvironment() {
	return process.env.JEST_WORKER_ID !== undefined;
}

export {
	createVscodeTerminal,
	getVscodeTerminal,
	runCommandOnVsTerminal,
	runGitCommand,
	getAllFoldersInDir,
	getAllFoldersWithGitConfig,
	getPathFolderFocus,
	checkFolderHasFolder,
	getWorkspacePath,
	checkFolderHasGitConfig,
	runGitPullOnFolders,
	runGitMergeOnFolders,
	getSettingsByKey,
	showVscodeProgress,
	isJestEnvironment,
};
