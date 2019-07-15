#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var sass_1 = require("./sass");
var typescript_1 = require("./typescript");
var main_1 = require("./main");
var nameFormatDefault = "camel";
var exportTypeDefault = "named";
var _a = yargs_1.default
    .usage("Generate .scss.d.ts from CSS module .scss files.\nUsage: $0 <glob pattern> [options]")
    .example("$0 src", "All .scss files at any level in the src directoy")
    .example("$0 src/**/*.scss", "All .scss files at any level in the src directoy")
    .example("$0 src/**/*.scss --watch", "Watch all .scss files at any level in the src directoy that are added or changed")
    .example("$0 src/**/*.scss --includePaths src/core src/variables", 'Search the "core" and "variables" directory when resolving imports')
    .example("$0 src/**/*.scss --aliases.~name variables", 'Replace all imports for "~name" with "variables"')
    .example("$0 src/**/*.scss --aliasPrefixes.~ ./node_modules/", 'Replace the "~" prefix with "./node_modules/" for all imports beginning with "~"')
    .demandCommand(1)
    .option("aliases", {
    coerce: function (obj) { return obj; },
    alias: "a",
    describe: "Alias any import to any other value."
})
    .option("aliasPrefixes", {
    coerce: function (obj) { return obj; },
    alias: "p",
    describe: "A prefix for any import to rewrite to another value."
})
    .option("nameFormat", {
    choices: sass_1.NAME_FORMATS,
    default: nameFormatDefault,
    alias: "n",
    describe: "The name format that should be used to transform class names."
})
    .option("exportType", {
    choices: typescript_1.EXPORT_TYPES,
    default: exportTypeDefault,
    alias: "e",
    describe: "The type of export used for defining the type defintions."
})
    .option("watch", {
    boolean: true,
    default: false,
    alias: "w",
    describe: "Watch for added or changed files and (re-)generate the type definitions."
})
    .option("listDifferent", {
    boolean: true,
    default: false,
    alias: "l",
    describe: "List any type definitions that are different than those that would be generated."
})
    .option("includePaths", {
    array: true,
    string: true,
    alias: "i",
    describe: "Additional paths to include when trying to resolve imports."
}).argv, patterns = _a._, rest = __rest(_a, ["_"]);
main_1.main(patterns[0], __assign({}, rest));
