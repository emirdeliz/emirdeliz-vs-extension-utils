"use strict";
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS: function() {
        return EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS;
    },
    EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH: function() {
        return EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH;
    },
    EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME: function() {
        return EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME;
    },
    EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX: function() {
        return EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX;
    },
    EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG: function() {
        return EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG;
    },
    EMIRDELIZ_TEST_WORKSPACE_PATH: function() {
        return EMIRDELIZ_TEST_WORKSPACE_PATH;
    },
    EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS: function() {
        return EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS;
    }
});
var _path = require("path");
var EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH = 20;
var EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME = "Ext utils";
var EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX = "emirdeliz-";
var EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG = ".git";
var EMIRDELIZ_TEST_WORKSPACE_PATH = _path.resolve("src", "test/__mocks__/folders");
var EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS = _path.resolve("src", "utils");
var EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS;
(function(EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS) {
    EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS["Pull"] = "pull";
    EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS["Merge"] = "merge";
})(EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS || (EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS = {}));
