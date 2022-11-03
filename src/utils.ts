import vscode from "https://cdn.jsdelivr.net/npm/@types/vscode@1.71.0/index.d.ts";

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

export async function getAllFoldersInDir(folderPathBase: string) {
  const folders = [] as Array<Deno.DirEntry>;
  for await (const dirEntry of Deno.readDir(folderPathBase)) {
    if (dirEntry.isDirectory) {
      folders.push(dirEntry);
    }
  }
  return folders;
}

export async function getAllFoldersWithGitConfig(
  folderPathBase: string,
  settingsKeyBase: string,
  settingsKeyGitIgnoreFolder: string,
) {
  const foldersFromDir = await getAllFoldersInDir(folderPathBase);
  const ignoreFolders = getSettingsByKey(
    settingsKeyBase,
    settingsKeyGitIgnoreFolder,
  );
  const workspaceFoldersWithoutIgnoreFolders = [] as Array<Deno.DirEntry>;
  for (const dirEntry of foldersFromDir) {
    const isIgnoredFolder = !ignoreFolders ||
      !ignoreFolders.includes(dirEntry.name);
    if (!isIgnoredFolder) {
      workspaceFoldersWithoutIgnoreFolders.push(dirEntry);
    }
  }
  const foldersResult = workspaceFoldersWithoutIgnoreFolders.filter((f) => {
    return checkFolderHasGitConfig(f.name);
  });
  return foldersResult;
}

export async function getPathFolderFocus() {
  await vscode.commands.executeCommand("copyFilePath");
  const folderPath = await vscode.env.clipboard.readText();
  return folderPath;
}

export async function checkFolderHasFolder(folderPath: string, folder: string) {
  const workspacePath = getWorkspacePath();
  const workspaceDirBase = workspacePath?.uri?.fsPath;
  try {
    await Deno.stat([workspaceDirBase, folderPath, folder].join("/"));
    // successful, file or directory must exist
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
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
    async function (progress: vscode.window.ProgressOptions) {
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
