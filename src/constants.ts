import * as path from 'path';
import * as utils from './utils';

export const EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH = 20;
export const EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME = 'Ext utils';
export const EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX = 'emirdeliz-';
export const EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG =
	utils.isJestEnvironment() ? 'git' : '.git';

export const EMIRDELIZ_TEST_WORKSPACE_PATH = path.resolve(
	'src',
	'test/__mocks__/folders'
);
export const EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS = path.resolve(
	'src',
	'utils'
);
export enum EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS {
	Pull = 'pull',
	Merge = 'merge',
}
