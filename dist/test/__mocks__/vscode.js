"use strict";
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ProgressLocation: function() {
        return ProgressLocation;
    },
    window: function() {
        return window;
    },
    workspace: function() {
        return workspace;
    },
    env: function() {
        return env;
    },
    commands: function() {
        return commands;
    }
});
var _constants = require("../../constants");
var window = {
    createTerminal: jest.fn(function() {
        return {
            name: "" + _constants.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME + " #0000"
        };
    }),
    showErrorMessage: jest.fn(),
    showWarningMessage: jest.fn(),
    withProgress: jest.fn()
};
var workspace = {
    getConfiguration: function getConfiguration() {
        return {
            get: jest.fn(function(settingKey) {
                switch(settingKey){
                    case settingKey:
                        return "src/other-dir/code";
                    case "ignoreFolders":
                        return [];
                    default:
                        break;
                }
            })
        };
    },
    workspaceFolders: [
        {
            uri: {
                fsPath: _constants.EMIRDELIZ_TEST_WORKSPACE_PATH
            }
        }
    ]
};
var env = {
    clipboard: {
        readText: jest.fn(function() {
            return _constants.EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS;
        })
    }
};
var executeCommand = jest.fn(function(command) {
    switch(command){
        case "copyFilePath":
            return env.clipboard.readText();
        default:
            return command;
    }
});
var commands = {
    executeCommand: executeCommand
};
var ProgressLocation;
(function(ProgressLocation) {
    ProgressLocation[ProgressLocation["SourceControl"] = 1] = "SourceControl";
    ProgressLocation[ProgressLocation["Window"] = 10] = "Window";
    ProgressLocation[ProgressLocation["Notification"] = 15] = "Notification";
})(ProgressLocation || (ProgressLocation = {}));
