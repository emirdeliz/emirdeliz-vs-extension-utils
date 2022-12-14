import * as vscode from 'vscode';
export interface ProgressData {
    message?: string | undefined;
    increment?: number | undefined;
    incrementPercentageRounded?: number;
}
declare function createVscodeTerminal(): vscode.Terminal;
declare function getVscodeTerminal(): vscode.Terminal;
declare function runCommandOnVsTerminal(command: string): void;
declare function runGitCommand(command: string, workDir?: string): void;
declare function getAllFoldersInDir(folderPathBase: string): string[];
declare function getAllFoldersWithGitConfig(folderPathBase: string, settingsKeyBase: string, settingsKeyGitIgnoreFolder: string): string[];
declare function getPathFolderFocus(): Promise<string>;
declare function checkFolderHasFolder(folderBasePath: string, folderToBeFoundPath: string): boolean;
declare function getWorkspacePath(): vscode.WorkspaceFolder;
declare function checkFolderHasGitConfig(folderPath: string): boolean;
declare function runGitPullOnFolders(foldersPathWithGitConfig: Array<string>): Promise<void>;
declare function runGitMergeOnFolders(foldersPathWithGitConfig: Array<string>): Promise<void>;
declare function getSettingsByKey(settingsExtensionKey: string, settingsKey: string): string[];
export declare function buildGitProgressTitle(currentFolderName: string, foldersName: Array<string>): string;
declare function showVscodeProgress(progressStepsSize: number, progressTitle: string, progress: vscode.Progress<ProgressData>): Promise<unknown>;
declare function isJestEnvironment(): boolean;
export { createVscodeTerminal, getVscodeTerminal, runCommandOnVsTerminal, runGitCommand, getAllFoldersInDir, getAllFoldersWithGitConfig, getPathFolderFocus, checkFolderHasFolder, getWorkspacePath, checkFolderHasGitConfig, runGitPullOnFolders, runGitMergeOnFolders, getSettingsByKey, showVscodeProgress, isJestEnvironment, };
