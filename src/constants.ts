import path from 'path';

export const EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME = 'Ext utils';
export const EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX = 'emirdeliz-';
export const EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG = '.git';
export const EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS = {
	pull: 'pull',
	merge: 'merge,',
};

const currentDir = path.resolve(__dirname);
export const EMIRDELIZ_TEST_WORKSPACE_PATH = `${currentDir}/test/__mocks__/folders`;
export const EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS = `${currentDir}/utils`;
