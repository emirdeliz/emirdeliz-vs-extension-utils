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
describe("getAllFoldersInDir", function() {
    it("should expose a function", function() {
        expect(_utils.getAllFoldersInDir).toBeDefined();
    });
    it("getAllFoldersInDir should return expected output", function() {
        var folders = _utils.getAllFoldersInDir(_constants.EMIRDELIZ_TEST_WORKSPACE_PATH);
        expect(folders).toHaveLength(5);
        expect(folders[0]).toEqual("data");
        expect(folders[1]).toEqual("extension");
        expect(folders[2]).toEqual("repoOne");
    });
});
describe("getAllFoldersWithGitConfig", function() {
    it("should expose a function", function() {
        expect(_utils.getAllFoldersWithGitConfig).toBeDefined();
    });
    it("getAllFoldersWithGitConfig should return expected output", function() {
        var folders = _utils.getAllFoldersWithGitConfig(_constants.EMIRDELIZ_TEST_WORKSPACE_PATH, _constants.EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX, _constants.EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG);
        expect(folders).toHaveLength(2);
    });
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
    it("checkFolderHasFolder should return expected output", function() {
        var hasFolder = _utils.checkFolderHasFolder("repoOne", _constants.EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG);
        expect(hasFolder).toBeTruthy();
        hasFolder = _utils.checkFolderHasFolder("repoTwo", "core");
        expect(hasFolder).toBeFalsy();
    });
});
describe("getWorkspacePath", function() {
    it("should expose a function", function() {
        expect(_utils.getWorkspacePath).toBeDefined();
    });
    it("getWorkspacePath should return expected output", function() {
        var path = _utils.getWorkspacePath();
        expect(path).not.toBeUndefined();
        expect(path.uri).not.toBeUndefined();
        expect(path.uri.fsPath).toEqual(_constants.EMIRDELIZ_TEST_WORKSPACE_PATH);
    });
});
describe("checkFolderHasGitConfig", function() {
    it("should expose a function", function() {
        expect(_utils.checkFolderHasGitConfig).toBeDefined();
    });
    it("checkFolderHasGitConfig should return expected output", function() {
        var hasConfig = _utils.checkFolderHasGitConfig("repoTwo");
        expect(hasConfig).toBeTruthy();
        hasConfig = _utils.checkFolderHasGitConfig("swc");
        expect(hasConfig).toBeFalsy();
    });
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
describe("buildGitProgressTitle", function() {
    it("should expose a function", function() {
        expect(_utils.buildGitProgressTitle).toBeDefined();
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
    ])("buildGitProgressTitle should return expected output when currentFolderName=%i and folderNameList=%i", /*#__PURE__*/ _asyncToGenerator(function(currentFolderName, folderNameList, currentFolderNameExpected) {
        var currentFolderIndex, progressTitle;
        return __generator(this, function(_state) {
            currentFolderIndex = folderNameList.indexOf(currentFolderName) + 1;
            progressTitle = _utils.buildGitProgressTitle(currentFolderName, folderNameList);
            expect(progressTitle).toEqual("Running on " + currentFolderNameExpected + " (" + currentFolderIndex + " of " + folderNameList.length + ")");
            return [
                2
            ];
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
            32
        ],
        [
            22,
            50
        ],
        [
            22,
            82
        ]
    ])("showVscodeProgress should return expected output when progressStepsSize=%i and  progressDone=%i", /*#__PURE__*/ _asyncToGenerator(function(progressStepsSize, progressExpected) {
        var progressTitle, progressMessageExpected, utilsSpy, showVscodeProgressSpy;
        return __generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    progressTitle = _utils.buildGitProgressTitle("repoOne", [
                        "repoOne"
                    ]);
                    progressMessageExpected = progressTitle;
                    utilsSpy = {
                        showVscodeProgress: _utils.showVscodeProgress
                    };
                    showVscodeProgressSpy = jest.spyOn(utilsSpy, "showVscodeProgress");
                    return [
                        4,
                        _vscode.window.withProgress({
                            title: "Making merge... \uD83E\uDD18"
                        }, /*#__PURE__*/ _asyncToGenerator(function(progress) {
                            var result;
                            return __generator(this, function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            utilsSpy.showVscodeProgress(progressStepsSize, progressTitle, progress)
                                        ];
                                    case 1:
                                        result = _state.sent();
                                        expect(showVscodeProgressSpy).toHaveBeenCalled();
                                        expect(result == null ? void 0 : result.message).toEqual(progressMessageExpected);
                                        expect(result == null ? void 0 : result.incrementPercentageRounded).toEqual(progressExpected);
                                        return [
                                            2
                                        ];
                                }
                            });
                        }))
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    }));
});
