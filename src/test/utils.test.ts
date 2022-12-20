import * as utils from '../utils';
import * as constants from '../constants';
import * as vscode from './__mocks__/vscode';

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

describe('getAllFoldersWithGitConfig', function () {
	it('should expose a function', function () {
		expect(utils.getAllFoldersWithGitConfig).toBeDefined();
	});

	it('getAllFoldersWithGitConfig should return expected output', async function () {
		const folders = await utils.getAllFoldersWithGitConfig(
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

	it('checkFolderHasFolder should return expected output', async function () {
		let hasFolder = await utils.checkFolderHasFolder(
			`${constants.EMIRDELIZ_TEST_WORKSPACE_PATH}/repoOne`,
			constants.EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG
		);
		expect(hasFolder).toBeTruthy();

		hasFolder = await utils.checkFolderHasFolder(
			`${constants.EMIRDELIZ_TEST_WORKSPACE_PATH}/repoTwo`,
			'core'
		);
		expect(hasFolder).toBeFalsy();
	});
});

describe('checkFolderHasGitConfig', function () {
	it('should expose a function', function () {
		expect(utils.checkFolderHasGitConfig).toBeDefined();
	});

	it('checkFolderHasGitConfig should return expected output', async function () {
		let hasConfig = await utils.checkFolderHasGitConfig(
			`${constants.EMIRDELIZ_TEST_WORKSPACE_PATH}/repoTwo`
		);
		expect(hasConfig).toBeTruthy();

		hasConfig = await utils.checkFolderHasGitConfig(
			`${constants.EMIRDELIZ_TEST_WORKSPACE_PATH}/swc`
		);
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
			const foldersPathWithGitConfig = [
				{ name: 'repoOne' },
				{ name: 'repoTwo' },
			] as Array<vscode.WorkspaceFolder>;
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
			const foldersPathWithGitConfig = [
				{ name: 'repoOne' },
				{ name: 'repoTwo' },
			] as Array<vscode.WorkspaceFolder>;
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

describe('buildProgressTitle', function () {
	it('should expose a function', function () {
		expect(utils.buildProgressTitle).toBeDefined();
	});

	it.each([
		[
			{ name: 'repoOne' } as vscode.WorkspaceFolder,
			[{ name: 'repoOne' }] as Array<vscode.WorkspaceFolder>,
			'repoOne',
		],
		[
			{ name: 'multiple-repository-frontend' } as vscode.WorkspaceFolder,
			[
				{ name: 'repoOne' },
				{ name: 'multiple-repository-frontend' },
				{ name: `teahupo'o-project` },
			] as Array<vscode.WorkspaceFolder>,
			'multiple-repository-...',
		],
		[
			{ name: 'flut_base_web_blue_bank_core' } as vscode.WorkspaceFolder,
			[
				{ name: 'repoOne' },
				{ name: 'simple-demo' },
				{ name: 'flut_base_web_blue_bank_core' },
			] as Array<vscode.WorkspaceFolder>,
			'flut_base_web_blue_b...',
		],
	])(
		'buildProgressTitle should return expected output when currentFolderName=%i and folderNameList=%i',
		async function (
			currentFolder: vscode.WorkspaceFolder,
			folderNameList: Array<vscode.WorkspaceFolder>,
			currentFolderNameExpected: string
		) {
			const currentFolderIndex = folderNameList.indexOf(currentFolder) + 1;
			const progressTitle = utils.buildProgressTitle(
				currentFolder,
				folderNameList
			);
			expect(progressTitle).toEqual(
				`Running on ${currentFolderNameExpected} (${currentFolderIndex} of ${folderNameList.length})`
			);
		}
	);
});

describe('runCommandWithProgressNotification', function () {
	it('should expose a function', function () {
		expect(utils.runCommandWithProgressNotification).toBeDefined();
	});

	const foldersToCommandRun = [
		{ name: 'project-cooperative' },
		{ name: 'peter-project' },
		{ name: 'flut_base_web_blue_bank_core' },
	] as Array<vscode.WorkspaceFolder>;

	it('should return expected output when running git pull', async function () {
		const command = constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull;
		const reportSpy = jest.spyOn(vscode.window, 'report');
		const callbackObj = { callback: jest.fn() };
		const callbackObjSpy = jest.spyOn(callbackObj, 'callback');

		await utils.runCommandWithProgressNotification({
			foldersToCommandRun,
			commandType: command,
			processCommand: callbackObj.callback,
		});

		expect(reportSpy).toBeCalledTimes(3);
		expect(reportSpy).toHaveBeenNthCalledWith(1, {
			increment: expect.closeTo(33),
			message: `Running on ${foldersToCommandRun[0].name} (1 of 3)`,
		});

		expect(reportSpy).toHaveBeenNthCalledWith(2, {
			increment: expect.closeTo(33),
			message: `Running on ${foldersToCommandRun[1].name} (2 of 3)`,
		});

		expect(reportSpy).toHaveBeenNthCalledWith(3, {
			increment: expect.closeTo(33),
			message: `Running on ${foldersToCommandRun[2].name?.substring(
				0,
				constants.EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH
			)}... (3 of 3)`,
		});

		expect(callbackObjSpy).toBeCalledTimes(3);
		expect(callbackObjSpy).toHaveBeenNthCalledWith(1, foldersToCommandRun[0]);
		expect(callbackObjSpy).toHaveBeenNthCalledWith(2, foldersToCommandRun[1]);
		expect(callbackObjSpy).toHaveBeenNthCalledWith(3, foldersToCommandRun[2]);
	});
});

describe('showVscodeProgress', function () {
	it('should expose a function', function () {
		expect(utils.showVscodeProgress).toBeDefined();
	});

	it.each([
		[22, 5],
		[17, 6],
		[5, 20],
	])(
		'showVscodeProgress should return expected output when progressStepsSize=%s and  progressDone=%s',
		async function (progressStepsSize: number, progressExpected: number) {
			const progressTitle = utils.buildProgressTitle(
				{ name: 'repoOne' } as vscode.WorkspaceFolder,
				[{ name: 'repoOne' }] as Array<vscode.WorkspaceFolder>
			);
			const reportSpy = jest.spyOn(vscode.window, 'report');
			jest.useFakeTimers();

			vscode.window.withProgress(
				{
					title: 'Making merge... 🤘',
					location: vscode.ProgressLocation.Notification,
				},
				async function (
					vscodeProgressInstance: vscode.Progress<utils.ProgressData>
				) {
					await utils.showVscodeProgress(
						progressStepsSize,
						progressTitle,
						vscodeProgressInstance
					);

					jest.runAllTimers();
					expect(reportSpy).toBeCalledTimes(3);
					expect(reportSpy).toHaveBeenNthCalledWith(1, {
						increment: expect.closeTo(progressExpected),
						message: expect.any(expect.anything()),
					});
				}
			);
		}
	);
});
