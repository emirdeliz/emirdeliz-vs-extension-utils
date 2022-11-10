import * as fs from 'fs';
import * as vscode from 'vscode';
import * as path from 'path';

export const EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME = "Ext utils";
export const EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG = ".git";
export const EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS = {
  pull: "pull",
  merge: "merge,",
};

let nextTermId = 25041988;
let terminalInstance = null as vscode.Terminal;

export function createVscodeTerminal() {
  terminalInstance = vscode.window.createTerminal({
    name: `${EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME} #${nextTermId++}`,
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
      `🥵 An error occurred when executing the dart command: ${e}`,
    );
  }
}

// export async function runDartCommand(command: string) {
//   const folderPath = await getPathFolderFocus();
//   if (!checkFolderHasFolder(folderPath, FLUTTER_NAME_FILE_CONFIG)) {
//     return;
//   }
//   return runCommandOnVsTerminal(command);
// }

export function runGitCommand(command: string, workDir?: string) {
  const commandWithMaybeWorkDir = `git ${
    workDir ? `-C ${workDir} ${command}` : ""
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
	const workspaceFoldersWithoutIgnoreFolders = foldersFromDir.filter(
		(folder) => !ignoreFolders || !ignoreFolders.includes(folder)
	);
	const foldersResult = workspaceFoldersWithoutIgnoreFolders.filter((f) => {
		return checkFolderHasGitConfig(f);
	});
	return foldersResult;
}

export async function getPathFolderFocus() {
  await vscode.commands.executeCommand("copyFilePath");
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
  return checkFolderHasFolder(
    folderPath,
    EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG,
  );
}

export function runGitPullOnFolders(
  foldersPathWithGitConfig: Array<string>,
) {
  const foldersPromise = [];
  for (const folder in foldersPathWithGitConfig) {
    foldersPromise.push(
      Promise.resolve(
        runGitCommand(EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.pull, folder),
      ),
    );
  }

  processStackPromise<void>(foldersPromise, "Making pull... 🤘");
}

export function runGitMergeOnFolders(
  foldersPathWithGitConfig: Array<string>,
) {
  const foldersPromise = [];
  for (const folder in foldersPathWithGitConfig) {
    foldersPromise.push(
      Promise.resolve(
        runGitCommand(EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.merge, folder),
      ),
    );
  }
  processStackPromise<void>(foldersPromise, "Making merge... 🤘");
}

export function getSettingsByKey(
  settingsExtensionKey: string,
  settingsKey: string,
) {
  const setting = vscode.workspace
    .getConfiguration(settingsExtensionKey)
    .get(settingsKey);
  return setting as Array<string>;
}

export function processStackPromise<T>(
  promiseArray: Array<Promise<T | undefined>>,
  title: string,
) {
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
        promise = promiseArray.pop() as Promise<T | undefined>;
      }
    },
  );
}
