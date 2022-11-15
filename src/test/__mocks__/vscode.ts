import * as constants from '../../constants';

export const window = {
	createTerminal: jest.fn(() => ({
		name: `${constants.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME} #0000`,
	})),
	showErrorMessage: jest.fn(),
	showWarningMessage: jest.fn(),
	withProgress: jest.fn(),
};

export const workspace = {
	getConfiguration: function () {
		return {
			get: jest.fn(function (settingKey: string) {
				switch (settingKey) {
					case settingKey:
						return 'src/other-dir/code';
					case 'ignoreFolders':
						return [];
					default:
						break;
				}
			}),
		};
	},
	workspaceFolders: [
		{
			uri: {
				fsPath: constants.EMIRDELIZ_TEST_WORKSPACE_PATH,
			},
		},
	],
};

export const env = {
	clipboard: {
		readText: jest.fn(function () {
			return constants.EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS;
		}),
	},
};

const executeCommand = jest.fn(function (command: string) {
	switch (command) {
		case 'copyFilePath':
			return env.clipboard.readText();
		default:
			break;
	}
});

export const commands = {
	executeCommand,
};

export const ProgressLocation = function () {
	return {
		Notification: {},
	};
};
