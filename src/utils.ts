import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';
import {
	EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME,
	EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG,
	EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS,
	EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH,
} from './constants';

export interface ProgressData {
	message?: string | undefined;
	increment?: number | undefined;
	incrementPercentageRounded?: number;
}

export interface CommandWithProgressNotification {
	commandType: string;
	processCommand: (currentFolder: vscode.WorkspaceFolder) => void;
	foldersToCommandRun: Array<vscode.WorkspaceFolder>;
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

async function runCommandOnVsTerminal(command: string) {
	try {
		const terminal = getVscodeTerminal();
		terminal.sendText(command);
	} catch (e) {
		vscode.window.showErrorMessage(
			`🥵 An error occurred when executing the dart command: ${e}`
		);
	}
}

function runGitCommand(command: string, workDir?: vscode.WorkspaceFolder) {
	const commandWithMaybeWorkDir = `git ${
		workDir ? `-C ${workDir.name} ${command}` : ''
	}`;
	return runCommandOnVsTerminal(commandWithMaybeWorkDir);
}

function getAllFoldersInDir(workspaceFolderBasePath: string) {
	return fs.readdirSync(workspaceFolderBasePath).filter(function (file) {
		return fs.statSync(`${workspaceFolderBasePath}/${file}`).isDirectory();
	});
}

function getWorkspaceFolders() {
	const hasWorkspaceFile = checkIfHasWorkspaceFile();
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (hasWorkspaceFile || !workspaceFolders?.length) {
		return workspaceFolders || [];
	}

	const workspaceFolderBasePath = workspaceFolders[0].uri.fsPath;
	const workspaceFoldersPath = workspaceFolderBasePath
		? getAllFoldersInDir(workspaceFolderBasePath)
		: [];

	const workspaceFoldersAsObject = workspaceFoldersPath.map(function (
		folderPath
	) {
		return {
			name: path.basename(folderPath),
			uri: {
				fsPath: folderPath,
			},
		};
	});
	return workspaceFoldersAsObject as Array<vscode.WorkspaceFolder>;
}

async function getAllFoldersWithGitConfig(
	settingsKeyBase: string,
	settingsKeyGitIgnoreFolder: string
) {
	const workspaceFolders = getWorkspaceFolders();
	const ignoreFolders = getSettingsByKey(
		settingsKeyBase,
		settingsKeyGitIgnoreFolder
	);

	const workspaceFoldersWithoutIgnoreFolders = workspaceFolders.reduce(
		function (result, folder) {
			const isFolderToIgnore =
				ignoreFolders && ignoreFolders.includes(folder.name);
			return isFolderToIgnore ? result : [...result, folder];
		},
		[] as ReadonlyArray<vscode.WorkspaceFolder>
	);

	const workspaceFoldersResult = [] as Array<vscode.WorkspaceFolder>;
	for (const folder of workspaceFoldersWithoutIgnoreFolders) {
		const hasGitConfig = await checkFolderHasGitConfig(folder.uri.fsPath);
		if (hasGitConfig) {
			workspaceFoldersResult.push(folder);
		}
	}
	return workspaceFoldersResult;
}

async function getPathFolderFocus() {
	await vscode.commands.executeCommand('copyFilePath');
	const folderPath = await vscode.env.clipboard.readText();
	return folderPath;
}

async function checkFolderHasFolder(
	folderToBeFoundPath: string,
	folderToBeFoundPattern: string
) {
	const folders = await vscode.workspace.findFiles(
		`${folderToBeFoundPath}/${folderToBeFoundPattern}`
	);
	return !!folders.entries().next();
}

async function checkFolderHasGitConfig(folderPath: string) {
	return await checkFolderHasFolder(
		folderPath,
		EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG
	);
}

function checkIfHasWorkspaceFile() {
	const hasWorkspaceFile = !!vscode.workspace.workspaceFile;
	return hasWorkspaceFile;
}

export async function runCommandWithProgressNotification({
	commandType,
	processCommand,
	foldersToCommandRun,
}: CommandWithProgressNotification) {
	return new Promise<void>(function (resolve) {
		vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: `Making ${commandType}... 🤘`,
			},
			async function (vscodeProgressInstance) {
				for (const currentFolder of foldersToCommandRun) {
					const progressTitle = buildProgressTitle(
						currentFolder,
						foldersToCommandRun
					);
					processCommand(currentFolder);
					const commandFoldersPathStackSize = foldersToCommandRun.length;
					await showVscodeProgress(
						commandFoldersPathStackSize,
						progressTitle,
						vscodeProgressInstance
					);
				}
				resolve();
			}
		);
	});
}

async function runGitPullOnFolders(
	foldersPathWithGitConfig: Array<vscode.WorkspaceFolder>
) {
	const commandType = EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull;
	return runCommandWithProgressNotification({
		commandType,
		foldersToCommandRun: foldersPathWithGitConfig,
		processCommand: function (currentFolder: vscode.WorkspaceFolder) {
			runGitCommand(commandType, currentFolder);
		},
	});
}

async function runGitMergeOnFolders(
	foldersPathWithGitConfig: Array<vscode.WorkspaceFolder>
) {
	const commandType = EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge;
	return runCommandWithProgressNotification({
		commandType,
		foldersToCommandRun: foldersPathWithGitConfig,
		processCommand: function (currentFolder: vscode.WorkspaceFolder) {
			runGitCommand(commandType, currentFolder);
		},
	});
}

function getSettingsByKey(settingsExtensionKey: string, settingsKey: string) {
	const settings = vscode.workspace.getConfiguration(settingsExtensionKey);
	const settingValue = settings?.get(settingsKey);
	return settingValue as Array<string>;
}

export function buildProgressTitle(
	currentFolderName: vscode.WorkspaceFolder,
	workspaceFolders: Array<vscode.WorkspaceFolder>
) {
	const folderNameReachedLimit =
		currentFolderName.name?.length >
		EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH;
	const currentFolderIndex = workspaceFolders.indexOf(currentFolderName) + 1;
	return `Running on ${currentFolderName.name?.substring(0, 20)}${
		folderNameReachedLimit ? '...' : ''
	} (${currentFolderIndex} of ${workspaceFolders.length})`;
}

function showVscodeProgress(
	progressStepsSize: number,
	progressTitle: string,
	progress: vscode.Progress<ProgressData>
) {
	try {
		const incrementPercentage = 100 / progressStepsSize;
		const incrementPercentageRounded = Math.min(
			Math.round(incrementPercentage),
			100
		);

		return new Promise(function (resolve) {
			setTimeout(function () {
				progress.report({
					increment: incrementPercentageRounded,
					message: progressTitle,
				});
				resolve({ message: progressTitle, incrementPercentageRounded });
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
	checkFolderHasFolder,
	checkFolderHasGitConfig,
	checkIfHasWorkspaceFile,
	runCommandOnVsTerminal,
	runGitCommand,
	runGitPullOnFolders,
	runGitMergeOnFolders,
	getVscodeTerminal,
	getAllFoldersInDir,
	getAllFoldersWithGitConfig,
	getWorkspaceFolders,
	getPathFolderFocus,
	getSettingsByKey,
	showVscodeProgress,
	isJestEnvironment,
};
