"use strict";
var _utils = require("../utils");
var _constants = require("../constants");
var _vscode = require("./__mocks__/vscode");
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
describe("createVscodeTerminal", function() {
    it("should expose a function", function() {
        expect(_utils.createVscodeTerminal).toBeDefined();
    });
    it("createVscodeTerminal should return expected output", function() {
        var terminal = _utils.createVscodeTerminal();
        expect(terminal.name).not.toBeNull();
        expect(terminal.name).toMatch(new RegExp(_constants.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME, "g"));
    });
});
describe("runCommandOnVsTerminal", function() {
    it("should expose a function", function() {
        expect(_utils.runCommandOnVsTerminal).toBeDefined();
    });
    it("runCommandOnVsTerminal should return expected output", function() {
        var successfully = false;
        var utilsSpy = {
            runCommandOnVsTerminal: _utils.runCommandOnVsTerminal
        };
        var runCommandOnVsTerminalSpy = jest.spyOn(utilsSpy, "runCommandOnVsTerminal");
        try {
            var command = 'echo "Hello World"';
            utilsSpy.runCommandOnVsTerminal(command);
            successfully = true;
        } catch (e) {
            successfully = false;
        }
        expect(runCommandOnVsTerminalSpy).toHaveBeenCalled();
        expect(successfully).toBeTruthy();
    });
});
describe("getAllFoldersWithGitConfig", function() {
    it("should expose a function", function() {
        expect(_utils.getAllFoldersWithGitConfig).toBeDefined();
    });
    it("getAllFoldersWithGitConfig should return expected output", /*#__PURE__*/ _asyncToGenerator(function() {
        var folders;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        _utils.getAllFoldersWithGitConfig(_constants.EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX, _constants.EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG)
                    ];
                case 1:
                    folders = _state.sent();
                    expect(folders).toHaveLength(2);
                    return [
                        2
                    ];
            }
        });
    }));
});
describe("getPathFolderFocus", function() {
    it("should expose a function", function() {
        expect(_utils.getPathFolderFocus).toBeDefined();
    });
    it("getPathFolderFocus should return expected output", /*#__PURE__*/ _asyncToGenerator(function() {
        var folder;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        _utils.getPathFolderFocus()
                    ];
                case 1:
                    folder = _state.sent();
                    expect(folder).toEqual(_constants.EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS);
                    return [
                        2
                    ];
            }
        });
    }));
});
describe("checkFolderHasFolder", function() {
    it("should expose a function", function() {
        expect(_utils.checkFolderHasFolder).toBeDefined();
    });
    it("checkFolderHasFolder should return expected output", /*#__PURE__*/ _asyncToGenerator(function() {
        var hasFolder;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        _utils.checkFolderHasFolder("" + _constants.EMIRDELIZ_TEST_WORKSPACE_PATH + "/repoOne", _constants.EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG)
                    ];
                case 1:
                    hasFolder = _state.sent();
                    expect(hasFolder).toBeTruthy();
                    return [
                        4,
                        _utils.checkFolderHasFolder("" + _constants.EMIRDELIZ_TEST_WORKSPACE_PATH + "/repoTwo", "core")
                    ];
                case 2:
                    hasFolder = _state.sent();
                    expect(hasFolder).toBeFalsy();
                    return [
                        2
                    ];
            }
        });
    }));
});
describe("checkFolderHasGitConfig", function() {
    it("should expose a function", function() {
        expect(_utils.checkFolderHasGitConfig).toBeDefined();
    });
    it("checkFolderHasGitConfig should return expected output", /*#__PURE__*/ _asyncToGenerator(function() {
        var hasConfig;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        _utils.checkFolderHasGitConfig("" + _constants.EMIRDELIZ_TEST_WORKSPACE_PATH + "/repoTwo")
                    ];
                case 1:
                    hasConfig = _state.sent();
                    expect(hasConfig).toBeTruthy();
                    return [
                        4,
                        _utils.checkFolderHasGitConfig("" + _constants.EMIRDELIZ_TEST_WORKSPACE_PATH + "/swc")
                    ];
                case 2:
                    hasConfig = _state.sent();
                    expect(hasConfig).toBeFalsy();
                    return [
                        2
                    ];
            }
        });
    }));
});
describe("runGitPullOnFolders", function() {
    it("should expose a function", function() {
        expect(_utils.runGitPullOnFolders).toBeDefined();
    });
    it("runGitPullOnFolders should return expected output", function() {
        var successfully = false;
        var utilsSpy = {
            runGitPullOnFolders: _utils.runGitPullOnFolders
        };
        var runGitPullOnFoldersSpy = jest.spyOn(utilsSpy, "runGitPullOnFolders");
        try {
            var foldersPathWithGitConfig = [
                "repoOne",
                "repoTwo"
            ];
            utilsSpy.runGitPullOnFolders(foldersPathWithGitConfig);
            successfully = true;
        } catch (e) {
            successfully = false;
        }
        expect(runGitPullOnFoldersSpy).toHaveBeenCalled();
        expect(successfully).toBeTruthy();
    });
});
describe("runGitMergeOnFolders", function() {
    it("should expose a function", function() {
        expect(_utils.runGitMergeOnFolders).toBeDefined();
    });
    it("runGitMergeOnFolders should return expected output", function() {
        var successfully = false;
        var utilsSpy = {
            runGitMergeOnFolders: _utils.runGitMergeOnFolders
        };
        var runGitMergeOnFoldersSpy = jest.spyOn(utilsSpy, "runGitMergeOnFolders");
        try {
            var foldersPathWithGitConfig = [
                "repoOne",
                "repoTwo"
            ];
            utilsSpy.runGitMergeOnFolders(foldersPathWithGitConfig);
            successfully = true;
        } catch (e) {
            successfully = false;
        }
        expect(runGitMergeOnFoldersSpy).toHaveBeenCalled();
        expect(successfully).toBeTruthy();
    });
});
describe("getSettingsByKey", function() {
    it("should expose a function", function() {
        expect(_utils.getSettingsByKey).toBeDefined();
    });
    it("getSettingsByKey should return expected output", function() {
        var settingValue = _utils.getSettingsByKey(_constants.EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX, "other-dir");
        expect(settingValue).toEqual("src/other-dir/code");
    });
});
describe("buildProgressTitle", function() {
    it("should expose a function", function() {
        expect(_utils.buildProgressTitle).toBeDefined();
    });
    it.each([
        [
            "repoOne",
            [
                "repoOne"
            ],
            "repoOne"
        ],
        [
            "multiple-repository-frontend",
            [
                "repoOne",
                "multiple-repository-frontend",
                "teahupo'o-project"
            ],
            "multiple-repository-..."
        ],
        [
            "flut_base_web_blue_bank_core",
            [
                "repoOne",
                "simple-demo",
                "flut_base_web_blue_bank_core"
            ],
            "flut_base_web_blue_b..."
        ]
    ])("buildProgressTitle should return expected output when currentFolderName=%i and folderNameList=%i", /*#__PURE__*/ _asyncToGenerator(function(currentFolderName, folderNameList, currentFolderNameExpected) {
        var currentFolderIndex, progressTitle;
        return __generator(this, function(_state) {
            currentFolderIndex = folderNameList.indexOf(currentFolderName) + 1;
            progressTitle = _utils.buildProgressTitle(currentFolderName, folderNameList);
            expect(progressTitle).toEqual("Running on " + currentFolderNameExpected + " (" + currentFolderIndex + " of " + folderNameList.length + ")");
            return [
                2
            ];
        });
    }));
});
describe("runCommandWithProgressNotification", function() {
    it("should expose a function", function() {
        expect(_utils.runCommandWithProgressNotification).toBeDefined();
    });
    var foldersToCommandRun = [
        "project-cooperative",
        "peter-project",
        "flut_base_web_blue_bank_core"
    ];
    it("should return expected output when running git pull", /*#__PURE__*/ _asyncToGenerator(function() {
        var command, reportSpy, callbackObj, callbackObjSpy;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    command = _constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull;
                    reportSpy = jest.spyOn(_vscode.window, "report");
                    callbackObj = {
                        callback: jest.fn()
                    };
                    callbackObjSpy = jest.spyOn(callbackObj, "callback");
                    return [
                        4,
                        _utils.runCommandWithProgressNotification({
                            foldersToCommandRun: foldersToCommandRun,
                            commandType: command,
                            processCommand: callbackObj.callback
                        })
                    ];
                case 1:
                    _state.sent();
                    expect(reportSpy).toBeCalledTimes(3);
                    expect(reportSpy).toHaveBeenNthCalledWith(1, {
                        increment: expect.closeTo(33),
                        message: "Running on " + foldersToCommandRun[0] + " (1 of 3)"
                    });
                    expect(reportSpy).toHaveBeenNthCalledWith(2, {
                        increment: expect.closeTo(33),
                        message: "Running on " + foldersToCommandRun[1] + " (2 of 3)"
                    });
                    expect(reportSpy).toHaveBeenNthCalledWith(3, {
                        increment: expect.closeTo(33),
                        message: "Running on " + foldersToCommandRun[2].substring(0, _constants.EMIRDELIZ_EXTENSION_UTILS_NOTIFICATION_FOLDER_NAME_MAX_LENGTH) + "... (3 of 3)"
                    });
                    expect(callbackObjSpy).toBeCalledTimes(3);
                    expect(callbackObjSpy).toHaveBeenNthCalledWith(1, foldersToCommandRun[0]);
                    expect(callbackObjSpy).toHaveBeenNthCalledWith(2, foldersToCommandRun[1]);
                    expect(callbackObjSpy).toHaveBeenNthCalledWith(3, foldersToCommandRun[2]);
                    return [
                        2
                    ];
            }
        });
    }));
});
describe("showVscodeProgress", function() {
    it("should expose a function", function() {
        expect(_utils.showVscodeProgress).toBeDefined();
    });
    it.each([
        [
            22,
            5
        ],
        [
            17,
            6
        ],
        [
            5,
            20
        ]
    ])("showVscodeProgress should return expected output when progressStepsSize=%s and  progressDone=%s", /*#__PURE__*/ _asyncToGenerator(function(progressStepsSize, progressExpected) {
        var progressTitle, reportSpy;
        return __generator(this, function(_state) {
            progressTitle = _utils.buildProgressTitle("repoOne", [
                "repoOne"
            ]);
            reportSpy = jest.spyOn(_vscode.window, "report");
            jest.useFakeTimers();
            _vscode.window.withProgress({
                title: "Making merge... \uD83E\uDD18",
                location: _vscode.ProgressLocation.Notification
            }, /*#__PURE__*/ _asyncToGenerator(function(vscodeProgressInstance) {
                return __generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            return [
                                4,
                                _utils.showVscodeProgress(progressStepsSize, progressTitle, vscodeProgressInstance)
                            ];
                        case 1:
                            _state.sent();
                            jest.runAllTimers();
                            expect(reportSpy).toBeCalledTimes(3);
                            expect(reportSpy).toHaveBeenNthCalledWith(1, {
                                increment: expect.closeTo(progressExpected),
                                message: expect.any(expect.anything())
                            });
                            return [
                                2
                            ];
                    }
                });
            }));
            return [
                2
            ];
        });
    }));
});
