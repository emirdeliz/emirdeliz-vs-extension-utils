"use strict";
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    existsSync: function() {
        return existsSync;
    },
    readdirSync: function() {
        return readdirSync;
    },
    statSync: function() {
        return statSync;
    }
});
function existsSync(filePath) {
    return (filePath.includes("repoOne") || filePath.includes("repoTwo")) && !filePath.includes("core");
}
function readdirSync() {
    return [
        "data",
        "extension",
        "repoOne",
        "repoTwo",
        "swc"
    ];
}
function statSync() {
    return {
        isDirectory: function isDirectory() {
            return true;
        }
    };
}
