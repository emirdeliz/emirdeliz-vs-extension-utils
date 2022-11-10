import * as vscode from 'vscode';
import * as utils from '../utils';

import {
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
	processStackPromise,
} from '../utils';

jest.mock('fs');
jest.mock('vscode');
jest.mock('path');

describe('createVscodeTerminal', () => {
	it('should expose a function', () => {
		expect(createVscodeTerminal).toBeDefined();
	});

	it('createVscodeTerminal should return expected output', () => {
		const terminal = utils.createVscodeTerminal();
		expect(terminal.name).not.toBeNull();
		expect(terminal.name).toMatch(
			new RegExp(utils.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME, 'g')
		);
	});
});

describe('runCommandOnVsTerminal', () => {
	it('should expose a function', () => {
		expect(runCommandOnVsTerminal).toBeDefined();
	});

	it('runCommandOnVsTerminal should return expected output', () => {
		// const retValue = runCommandOnVsTerminal(command);
		expect(false).toBeTruthy();
	});
});

describe('runGitCommand', () => {
	it('should expose a function', () => {
		expect(runGitCommand).toBeDefined();
	});

	it('runGitCommand should return expected output', () => {
		// const retValue = runGitCommand(command,workDir);
		expect(false).toBeTruthy();
	});
});

describe('getAllFoldersInDir', () => {
	it('should expose a function', () => {
		expect(getAllFoldersInDir).toBeDefined();
	});

	it('getAllFoldersInDir should return expected output', () => {
		// const retValue = getAllFoldersInDir(folderPathBase);
		expect(false).toBeTruthy();
	});
});
describe('getAllFoldersWithGitConfig', () => {
	it('should expose a function', () => {
		expect(getAllFoldersWithGitConfig).toBeDefined();
	});

	it('getAllFoldersWithGitConfig should return expected output', () => {
		// const retValue = getAllFoldersWithGitConfig(folderPathBase,settingsKeyBase,settingsKeyGitIgnoreFolder);
		expect(false).toBeTruthy();
	});
});

describe('getPathFolderFocus', () => {
	it('should expose a function', () => {
		expect(getPathFolderFocus).toBeDefined();
	});

	it('getPathFolderFocus should return expected output', async () => {
		// const retValue = await getPathFolderFocus();
		expect(false).toBeTruthy();
	});
});

describe('checkFolderHasFolder', () => {
	it('should expose a function', () => {
		expect(checkFolderHasFolder).toBeDefined();
	});

	it('checkFolderHasFolder should return expected output', () => {
		// const retValue = checkFolderHasFolder(folderPath,folder);
		expect(false).toBeTruthy();
	});
});

describe('getWorkspacePath', () => {
	it('should expose a function', () => {
		expect(getWorkspacePath).toBeDefined();
	});

	it('getWorkspacePath should return expected output', () => {
		// const retValue = getWorkspacePath();
		expect(false).toBeTruthy();
	});
});

describe('checkFolderHasGitConfig', () => {
	it('should expose a function', () => {
		expect(checkFolderHasGitConfig).toBeDefined();
	});

	it('checkFolderHasGitConfig should return expected output', () => {
		// const retValue = checkFolderHasGitConfig(folderPath);
		expect(false).toBeTruthy();
	});
});

describe('runGitPullOnFolders', () => {
	it('should expose a function', () => {
		expect(runGitPullOnFolders).toBeDefined();
	});

	it('runGitPullOnFolders should return expected output', () => {
		// const retValue = runGitPullOnFolders(foldersPathWithGitConfig);
		expect(false).toBeTruthy();
	});
});

describe('runGitMergeOnFolders', () => {
	it('should expose a function', () => {
		expect(runGitMergeOnFolders).toBeDefined();
	});

	it('runGitMergeOnFolders should return expected output', () => {
		// const retValue = runGitMergeOnFolders(foldersPathWithGitConfig);
		expect(false).toBeTruthy();
	});
});

describe('getSettingsByKey', () => {
	it('should expose a function', () => {
		expect(getSettingsByKey).toBeDefined();
	});

	it('getSettingsByKey should return expected output', () => {
		// const retValue = getSettingsByKey(settingsExtensionKey,settingsKey);
		expect(false).toBeTruthy();
	});
});

describe('processStackPromise', () => {
	it('should expose a function', () => {
		expect(processStackPromise).toBeDefined();
	});

	it('processStackPromise should return expected output', () => {
		// const retValue = processStackPromise(promiseArray,title);
		expect(false).toBeTruthy();
	});
});
