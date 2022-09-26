import * as fs from 'fs';
import * as vscode from 'vscode';

const FLUTTER_NAME_FILE_CONFIG = 'pubspec.yaml';
const GIT_NAME_FOLDER_CONFIG = '.git';
const GIT_COMMANDS = {
	pull: 'pull'
};

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
	const dartFileConfigPath = `${folderPath}/${folder}`;
	return fs.existsSync(dartFileConfigPath);
}

export function checkFolderHasGitConfig(folderPath: string) {
	return checkFolderHasFolder(folderPath, GIT_NAME_FOLDER_CONFIG);
}

export async function runCommand(command: string) {
	try {
		await vscode.commands.executeCommand(command);
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
	await runCommand(command);
}

export async function runGitCommand(command: string, workDir?: string) {
	const commandWithMaybeWorkDir = `git ${command} ${workDir ? `-C ${workDir}` : ''}`;
	await runCommand(commandWithMaybeWorkDir);
}

export async function runGitPullOnFolders(foldersPathWithGitConfig: Array<string>) {
	for (const folder of foldersPathWithGitConfig) {
		await runGitCommand(GIT_COMMANDS.pull, folder);
	}
}

export function getSettingsByKey(settingsExtensionKey: string, settingsKey: string) {
	const allConfigurations = vscode.workspace.getConfiguration();
  const allConfigurationsAsJSON = JSON.parse(JSON.stringify(allConfigurations));
  const editorSettings = allConfigurationsAsJSON.editor;
	const settingsExtension = editorSettings[settingsExtensionKey] || {};
	return settingsExtension[settingsKey] as Array<string> || [];
}