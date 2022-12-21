import * as vscode from 'vscode';
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
declare function createVscodeTerminal(): vscode.Terminal;
declare function getVscodeTerminal(): vscode.Terminal;
declare function runCommandOnVsTerminal(command: string): Promise<void>;
declare function runGitCommand(command: string, workDir?: vscode.WorkspaceFolder): Promise<void>;
declare function getAllFoldersInDir(workspaceFolderBasePath: string): string[];
declare function getWorkspaceFolders(): readonly vscode.WorkspaceFolder[];
declare function getAllFoldersWithGitConfig(settingsKeyBase: string, settingsKeyGitIgnoreFolder: string): Promise<vscode.WorkspaceFolder[]>;
declare function getPathFolderFocus(): Promise<string>;
declare function checkFolderHasFolder(folderToBeFoundPath: string, folderToBeFoundPattern: string): Promise<boolean>;
declare function checkFolderHasGitConfig(folderPath: string): Promise<boolean>;
declare function checkIfHasWorkspaceFile(): boolean;
export declare function runCommandWithProgressNotification({ commandType, processCommand, foldersToCommandRun, }: CommandWithProgressNotification): Promise<void>;
declare function runGitPullOnFolders(foldersPathWithGitConfig: Array<vscode.WorkspaceFolder>): Promise<void>;
declare function runGitMergeOnFolders(foldersPathWithGitConfig: Array<vscode.WorkspaceFolder>): Promise<void>;
declare function getSettingsByKey(settingsExtensionKey: string, settingsKey: string): string[];
export declare function buildProgressTitle(currentFolderName: vscode.WorkspaceFolder, workspaceFolders: Array<vscode.WorkspaceFolder>): string;
declare function showVscodeProgress(progressStepsSize: number, progressTitle: string, progress: vscode.Progress<ProgressData>): Promise<unknown>;
declare function isJestEnvironment(): boolean;
export { createVscodeTerminal, checkFolderHasFolder, checkFolderHasGitConfig, checkIfHasWorkspaceFile, runCommandOnVsTerminal, runGitCommand, runGitPullOnFolders, runGitMergeOnFolders, getVscodeTerminal, getAllFoldersInDir, getAllFoldersWithGitConfig, getWorkspaceFolders, getPathFolderFocus, getSettingsByKey, showVscodeProgress, isJestEnvironment, };
