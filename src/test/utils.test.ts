import * as utils from '../utils';
import * as constants from '../constants';
import * as promises from './__mocks__/promise';

describe('createVscodeTerminal', function () {
	it('should expose a function', function () {
		expect(utils.createVscodeTerminal).toBeDefined();
	});

	it('createVscodeTerminal should return expected output', function () {
		const terminal = utils.createVscodeTerminal();
		expect(terminal.name).not.toBeNull();
		expect(terminal.name).toMatch(
			new RegExp(constants.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME, 'g')
		);
	});
});

describe('runCommandOnVsTerminal', function () {
	it('should expose a function', function () {
		expect(utils.runCommandOnVsTerminal).toBeDefined();
	});

	it('runCommandOnVsTerminal should return expected output', function () {
		let successfully = false;
		const utilsSpy = { runCommandOnVsTerminal: utils.runCommandOnVsTerminal };
		const runCommandOnVsTerminalSpy = jest.spyOn(
			utilsSpy,
			'runCommandOnVsTerminal'
		);

		try {
			const command = 'echo "Hello World"';
			utilsSpy.runCommandOnVsTerminal(command);
			successfully = true;
		} catch (e) {
			successfully = false;
		}
		expect(runCommandOnVsTerminalSpy).toHaveBeenCalled();
		expect(successfully).toBeTruthy();
	});
});

describe('getAllFoldersInDir', function () {
	it('should expose a function', function () {
		expect(utils.getAllFoldersInDir).toBeDefined();
	});

	it('getAllFoldersInDir should return expected output', function () {
		const folders = utils.getAllFoldersInDir(
			constants.EMIRDELIZ_TEST_WORKSPACE_PATH
		);
		expect(folders).toHaveLength(5);
		expect(folders[0]).toEqual('extension');
		expect(folders[1]).toEqual('repoOne');
		expect(folders[2]).toEqual('repoTwo');
	});
});

describe('getAllFoldersWithGitConfig', function () {
	it('should expose a function', function () {
		expect(utils.getAllFoldersWithGitConfig).toBeDefined();
	});

	it('getAllFoldersWithGitConfig should return expected output', function () {
		const folders = utils.getAllFoldersWithGitConfig(
			constants.EMIRDELIZ_TEST_WORKSPACE_PATH,
			constants.EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX,
			constants.EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG
		);
		expect(folders).toHaveLength(2);
	});
});

describe('getPathFolderFocus', function () {
	it('should expose a function', function () {
		expect(utils.getPathFolderFocus).toBeDefined();
	});

	it('getPathFolderFocus should return expected output', async function () {
		const folder = await utils.getPathFolderFocus();
		expect(folder).toEqual(constants.EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS);
	});
});

describe('checkFolderHasFolder', function () {
	it('should expose a function', function () {
		expect(utils.checkFolderHasFolder).toBeDefined();
	});

	it('checkFolderHasFolder should return expected output', function () {
		let hasFolder = utils.checkFolderHasFolder('repoOne', '.git');
		expect(hasFolder).toBeTruthy();

		hasFolder = utils.checkFolderHasFolder('repoTwo', 'core');
		expect(hasFolder).toBeFalsy();
	});
});

describe('getWorkspacePath', function () {
	it('should expose a function', function () {
		expect(utils.getWorkspacePath).toBeDefined();
	});

	it('getWorkspacePath should return expected output', function () {
		const path = utils.getWorkspacePath();
		expect(path).not.toBeUndefined();
		expect(path.uri).not.toBeUndefined();
		expect(path.uri.fsPath).toEqual(constants.EMIRDELIZ_TEST_WORKSPACE_PATH);
	});
});

describe('checkFolderHasGitConfig', function () {
	it('should expose a function', function () {
		expect(utils.checkFolderHasGitConfig).toBeDefined();
	});

	it('checkFolderHasGitConfig should return expected output', function () {
		let hasConfig = utils.checkFolderHasGitConfig('repoTwo');
		expect(hasConfig).toBeTruthy();

		hasConfig = utils.checkFolderHasGitConfig('swc');
		expect(hasConfig).toBeFalsy();
	});
});

describe('runGitPullOnFolders', function () {
	it('should expose a function', function () {
		expect(utils.runGitPullOnFolders).toBeDefined();
	});

	it('runGitPullOnFolders should return expected output', function () {
		let successfully = false;
		const utilsSpy = { runGitPullOnFolders: utils.runGitPullOnFolders };
		const runGitPullOnFoldersSpy = jest.spyOn(utilsSpy, 'runGitPullOnFolders');

		try {
			const foldersPathWithGitConfig = ['repoOne', 'repoTwo'];
			utilsSpy.runGitPullOnFolders(foldersPathWithGitConfig);
			successfully = true;
		} catch (e) {
			successfully = false;
		}
		expect(runGitPullOnFoldersSpy).toHaveBeenCalled();
		expect(successfully).toBeTruthy();
	});
});

describe('runGitMergeOnFolders', function () {
	it('should expose a function', function () {
		expect(utils.runGitMergeOnFolders).toBeDefined();
	});

	it('runGitMergeOnFolders should return expected output', function () {
		let successfully = false;
		const utilsSpy = { runGitMergeOnFolders: utils.runGitMergeOnFolders };
		const runGitMergeOnFoldersSpy = jest.spyOn(
			utilsSpy,
			'runGitMergeOnFolders'
		);

		try {
			const foldersPathWithGitConfig = ['repoOne', 'repoTwo'];
			utilsSpy.runGitMergeOnFolders(foldersPathWithGitConfig);
			successfully = true;
		} catch (e) {
			successfully = false;
		}
		expect(runGitMergeOnFoldersSpy).toHaveBeenCalled();
		expect(successfully).toBeTruthy();
	});
});

describe('getSettingsByKey', function () {
	it('should expose a function', function () {
		expect(utils.getSettingsByKey).toBeDefined();
	});

	it('getSettingsByKey should return expected output', function () {
		const settingValue = utils.getSettingsByKey(
			constants.EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX,
			'other-dir'
		);
		expect(settingValue).toEqual('src/other-dir/code');
	});
});

describe('processStackPromise', function () {
	it('should expose a function', function () {
		expect(utils.processStackPromise).toBeDefined();
	});

	it('processStackPromise should return expected output', async function () {
		let successfully = false;
		const utilsSpy = { processStackPromise: utils.processStackPromise };
		const processStackPromiseSpy = jest.spyOn(utilsSpy, 'processStackPromise');

		let values = promises.getPromiseTest();
		try {
			utilsSpy.processStackPromise(values, 'Processing promises');
			await Promise.all(values);
			successfully = true;
		} catch (e) {
			successfully = false;
		}

		expect(processStackPromiseSpy).toHaveBeenCalled();
		expect(successfully).toBeFalsy();

		successfully = false;
		values = promises.getPromiseSuccessfullyTest();

		try {
			utilsSpy.processStackPromise(
				promises.getPromiseSuccessfullyTest(),
				'Processing promises'
			);
			await Promise.all(values);
			successfully = true;
		} catch (e) {
			successfully = false;
		}

		expect(processStackPromiseSpy).toHaveBeenCalledTimes(2);
		expect(successfully).toBeTruthy();
	});
});
