import * as vscode from 'vscode';
export interface ProgressData {
    message?: string | undefined;
    increment?: number | undefined;
    incrementPercentageRounded?: number;
}
export interface CommandWithProgressNotification {
    commandType: string;
    processCommand: (currentFolder: string) => void;
    foldersToCommandRun: Array<string>;
}
declare function createVscodeTerminal(): vscode.Terminal;
declare function getVscodeTerminal(): vscode.Terminal;
declare function runCommandOnVsTerminal(command: string): Promise<void>;
declare function runGitCommand(command: string, workDir?: string): Promise<void>;
declare function getAllFoldersInDir(folderPathBase: string): string[];
declare function getAllFoldersWithGitConfig(folderPathBase: string, settingsKeyBase: string, settingsKeyGitIgnoreFolder: string): string[];
declare function getPathFolderFocus(): Promise<string>;
declare function checkFolderHasFolder(folderBasePath: string, folderToBeFoundPath: string): boolean;
declare function getWorkspacePath(): vscode.WorkspaceFolder;
declare function checkFolderHasGitConfig(folderPath: string): boolean;
export declare function runCommandWithProgressNotification({ commandType, processCommand, foldersToCommandRun, }: CommandWithProgressNotification): Promise<void>;
declare function runGitPullOnFolders(foldersPathWithGitConfig: Array<string>): Promise<void>;
declare function runGitMergeOnFolders(foldersPathWithGitConfig: Array<string>): Promise<void>;
declare function getSettingsByKey(settingsExtensionKey: string, settingsKey: string): string[];
export declare function buildProgressTitle(currentFolderName: string, foldersName: Array<string>): string;
declare function showVscodeProgress(progressStepsSize: number, progressTitle: string, progress: vscode.Progress<ProgressData>): Promise<unknown>;
declare function isJestEnvironment(): boolean;
export { createVscodeTerminal, checkFolderHasFolder, checkFolderHasGitConfig, runCommandOnVsTerminal, runGitCommand, runGitPullOnFolders, runGitMergeOnFolders, getVscodeTerminal, getAllFoldersInDir, getAllFoldersWithGitConfig, getPathFolderFocus, getWorkspacePath, getSettingsByKey, showVscodeProgress, isJestEnvironment, };
