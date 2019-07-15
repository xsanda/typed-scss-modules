"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar_1 = __importDefault(require("chokidar"));
var alerts_1 = require("./alerts");
var write_file_1 = require("./write-file");
/**
 * Watch a file glob and generate the corresponding types.
 *
 * @param pattern the file pattern to watch for file changes or additions
 * @param options the CLI options
 */
exports.watch = function (pattern, options) {
    alerts_1.alerts.success("Watching files...");
    chokidar_1.default
        .watch(pattern)
        .on("change", function (path) {
        alerts_1.alerts.info("[CHANGED] " + path);
        write_file_1.writeFile(path, options);
    })
        .on("add", function (path) {
        alerts_1.alerts.info("[ADDED] " + path);
        write_file_1.writeFile(path, options);
    });
};
