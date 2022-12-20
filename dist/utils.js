"use strict";
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    runCommandWithProgressNotification: function() {
        return runCommandWithProgressNotification;
    },
    buildProgressTitle: function() {
        return buildProgressTitle;
    },
    createVscodeTerminal: function() {
        return createVscodeTerminal;
    },
    checkFolderHasFolder: function() {
        return checkFolderHasFolder;
    },
    checkFolderHasGitConfig: function() {
        return checkFolderHasGitConfig;
    },
    runCommandOnVsTerminal: function() {
        return runCommandOnVsTerminal;
    },
    runGitCommand: function() {
        return runGitCommand;
    },
    runGitPullOnFolders: function() {
        return runGitPullOnFolders;
    },
    runGitMergeOnFolders: function() {
        return runGitMergeOnFolders;
    },
    getVscodeTerminal: function() {
        return getVscodeTerminal;
    },
    getAllFoldersWithGitConfig: function() {
        return getAllFoldersWithGitConfig;
    },
    getPathFolderFocus: function() {
        return getPathFolderFocus;
    },
    getSettingsByKey: function() {
        return getSettingsByKey;
    },
    showVscodeProgress: function() {
        return showVscodeProgress;
    },
    isJestEnvironment: function() {
        return isJestEnvironment;
    }
});
var _vscode = require("vscode");
var _constants = require("./constants");
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (Array.isArray(o) || (it = unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function() {
            if (i >= o.length) return {
                done: true
            };
            return {
                done: false,
                value: o[i++]
            };
        };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var __generator = (void 0) && (void 0).__generator || function(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var nextTermId = 25041988;
var terminalInstance = {};
function createVscodeTerminal() {
    terminalInstance = _vscode.window.createTerminal({
        name: _constants.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME + " #" + nextTermId++,
        hideFromUser: true
    });
    return terminalInstance;
}
function getVscodeTerminal() {
    if (!terminalInstance.name) {
        return createVscodeTerminal();
    }
    return terminalInstance;
}
function runCommandOnVsTerminal(command) {
    return _runCommandOnVsTerminal.apply(this, arguments);
}
function _runCommandOnVsTerminal() {
    _runCommandOnVsTerminal = _asyncToGenerator(function(command) {
        var terminal;
        return __generator(this, function(_state) {
            try {
                terminal = getVscodeTerminal();
                terminal.sendText(command);
            } catch (e) {
                _vscode.window.showErrorMessage("\uD83E\uDD75 An error occurred when executing the dart command: " + e);
            }
            return [
                2
            ];
        });
    });
    return _runCommandOnVsTerminal.apply(this, arguments);
}
function runGitCommand(command, workDir) {
    var commandWithMaybeWorkDir = "git " + (workDir ? "-C " + workDir.name + " " + command : "");
    return runCommandOnVsTerminal(commandWithMaybeWorkDir);
}
function getAllFoldersWithGitConfig(settingsKeyBase, settingsKeyGitIgnoreFolder) {
    return _getAllFoldersWithGitConfig.apply(this, arguments);
}
function _getAllFoldersWithGitConfig() {
    _getAllFoldersWithGitConfig = _asyncToGenerator(function(settingsKeyBase, settingsKeyGitIgnoreFolder) {
        var workspaceFolders, ignoreFolders, workspaceFoldersWithoutIgnoreFolders, workspaceFoldersResult, _iterator, _step, folder, hasGitConfig;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    workspaceFolders = _vscode.workspace.workspaceFolders || [];
                    ignoreFolders = getSettingsByKey(settingsKeyBase, settingsKeyGitIgnoreFolder);
                    workspaceFoldersWithoutIgnoreFolders = workspaceFolders.reduce(function(result, folder) {
                        var isFolderToIgnore = ignoreFolders && ignoreFolders.includes(folder.name);
                        return isFolderToIgnore ? result : _toConsumableArray(result).concat([
                            folder
                        ]);
                    }, []);
                    workspaceFoldersResult = [];
                    _iterator = _createForOfIteratorHelperLoose(workspaceFoldersWithoutIgnoreFolders);
                    _state.label = 1;
                case 1:
                    if (!!(_step = _iterator()).done) return [
                        3,
                        4
                    ];
                    folder = _step.value;
                    return [
                        4,
                        checkFolderHasGitConfig(folder.uri.fsPath)
                    ];
                case 2:
                    hasGitConfig = _state.sent();
                    if (hasGitConfig) {
                        workspaceFoldersResult.push(folder);
                    }
                    _state.label = 3;
                case 3:
                    return [
                        3,
                        1
                    ];
                case 4:
                    return [
                        2,
                        workspaceFoldersResult
                    ];
            }
        });
    });
    return _getAllFoldersWithGitConfig.apply(this, arguments);
}
function getPathFolderFocus() {
    return _getPathFolderFocus.apply(this, arguments);
}
function _getPathFolderFocus() {
    _getPathFolderFocus = _asyncToGenerator(function() {
        var folderPath;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        _vscode.commands.executeCommand("copyFilePath")
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        _vscode.env.clipboard.readText()
                    ];
                case 2:
                    folderPath = _state.sent();
                    return [
                        2,
                        folderPath
                    ];
            }
        });
    });
    return _getPathFolderFocus.apply(this, arguments);
}
function checkFolderHasFolder(folderToBeFoundPath, folderToBeFoundPattern) {
    return _checkFolderHasFolder.apply(this, arguments);
}
function _checkFolderHasFolder() {
    _checkFolderHasFolder = _asyncToGenerator(function(folderToBeFoundPath, folderToBeFoundPattern) {
        var folders;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        _vscode.workspace.findFiles(folderToBeFoundPath + "/" + folderToBeFoundPattern)
                    ];
                case 1:
                    folders = _state.sent();
                    return [
                        2,
                        !!folders.entries().next()
                    ];
            }
        });
    });
    return _checkFolderHasFolder.apply(this, arguments);
}
function checkFolderHasGitConfig(folderPath) {
    return _checkFolderHasGitConfig.apply(this, arguments);
}
function _checkFolderHasGitConfig() {
    _checkFolderHasGitConfig = _asyncToGenerator(function(folderPath) {
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        checkFolderHasFolder(folderPath, _constants.EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG)
                    ];
                case 1:
                    return [
                        2,
                        _state.sent()
                    ];
            }
        });
    });
    return _checkFolderHasGitConfig.apply(this, arguments);
}
function runCommandWithProgressNotification(_) {
    return _runCommandWithProgressNotification.apply(this, arguments);
}
function _runCommandWithProgressNotification() {
    _runCommandWithProgressNotification = _asyncToGenerator(function(param) {
        var commandType, processCommand, foldersToCommandRun;
        return __generator(this, function(_state) {
            commandType = param.commandType, processCommand = param.processCommand, foldersToCommandRun = param.foldersToCommandRun;
            return [
                2,
                new Promise(function(resolve) {
                    _vscode.window.withProgress({
                        location: _vscode.ProgressLocation.Notification,
                        title: "Making " + commandType + "... \uD83E\uDD18"
                    }, /*#__PURE__*/ _asyncToGenerator(function(vscodeProgressInstance) {
                        var _iterator, _step, currentFolder, progressTitle, commandFoldersPathStackSize;
                        return __generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    _iterator = _createForOfIteratorHelperLoose(foldersToCommandRun);
                                    _state.label = 1;
                                case 1:
                                    if (!!(_step = _iterator()).done) return [
                                        3,
                                        4
                                    ];
                                    currentFolder = _step.value;
                                    progressTitle = buildProgressTitle(currentFolder, foldersToCommandRun);
                                    processCommand(currentFolder);
                                    commandFoldersPathStackSize = foldersToCommandRun.length;
                                    return [
                                        4,
                                        showVscodeProgress(commandFoldersPathStackSize, progressTitle, vscodeProgressInstance)
                                    ];
                                case 2:
                                    _state.sent();
                                    _state.label = 3;
                                case 3:
                                    return [
                                        3,
                                        1
                                    ];
                                case 4:
                                    resolve();
                                    return [
                                        2
                                    ];
                            }
                        });
                    }));
                })
            ];
        });
    });
    return _runCommandWithProgressNotification.apply(this, arguments);
}
function runGitPullOnFolders(foldersPathWithGitConfig) {
    return _runGitPullOnFolders.apply(this, arguments);
}
function _runGitPullOnFolders() {
    _runGitPullOnFolders = _asyncToGenerator(function(foldersPathWithGitConfig) {
        var commandType;
        return __generator(this, function(_state) {
            commandType = _constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull;
            return [
                2,
                runCommandWithProgressNotification({
                    commandType: commandType,
                    foldersToCommandRun: foldersPathWithGitConfig,
                    processCommand: function processCommand(currentFolder) {
                        runGitCommand(commandType, currentFolder);
                    }
                })
            ];
        });
    });
    return _runGitPullOnFolders.apply(this, arguments);
}
function runGitMergeOnFolders(foldersPathWithGitConfig) {
    return _runGitMergeOnFolders.apply(this, arguments);
}
function _runGitMergeOnFolders() {
    _runGitMergeOnFolders = _asyncToGenerator(function(foldersPathWithGitConfig) {
        var commandType;
        return __generator(this, function(_state) {
            commandType = _constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge;
            return [
                2,
                runCommandWithProgressNotification({
                    commandType: commandType,
                    foldersToCommandRun: foldersPathWithGitConfig,
                    processCommand: function processCommand(currentFolder) {
                        runGitCommand(commandType, currentFolder);
                    }
                })
            ];
        });
    });
    return _runGitMergeOnFolders.apply(this, arguments);
}
function getSettingsByKey(settingsExtensionKey, settingsKey) {
    var settings = _vscode.workspace.getConfiguration(settingsExtensionKey);
    var settingValue = settings == null ? void 0 : settings.get(settingsKey);
    return settingValue;
}
function buildProgressTitle(currentFolderName, workspaceFolders) {
    var _currentFolderName_name, _currentFolderName_name1;
    var folderNameReachedLimit = ((_currentFolderName_name = currentFolderName.name) == null ? void 0 : _currentFolderName_name.length) > _constants.EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH;
    var currentFolderIndex = workspaceFolders.indexOf(currentFolderName) + 1;
    return "Running on " + ((_currentFolderName_name1 = currentFolderName.name) == null ? void 0 : _currentFolderName_name1.substring(0, 20)) + (folderNameReachedLimit ? "..." : "") + " (" + currentFolderIndex + " of " + workspaceFolders.length + ")";
}
function showVscodeProgress(progressStepsSize, progressTitle, progress) {
    try {
        var incrementPercentage = 100 / progressStepsSize;
        var incrementPercentageRounded = Math.min(Math.round(incrementPercentage), 100);
        return new Promise(function(resolve) {
            setTimeout(function() {
                progress.report({
                    increment: incrementPercentageRounded,
                    message: progressTitle
                });
                resolve({
                    message: progressTitle,
                    incrementPercentageRounded: incrementPercentageRounded
                });
            }, 1000);
        });
    } catch (e) {
        console.warn("Error on process promises: " + e.message);
    }
}
function isJestEnvironment() {
    return process.env.JEST_WORKER_ID !== undefined;
}
