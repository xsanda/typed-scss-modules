"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var error = function (message) { return console.log(chalk_1.default.red(message)); };
var warn = function (message) { return console.log(chalk_1.default.yellowBright(message)); };
var notice = function (message) { return console.log(chalk_1.default.gray(message)); };
var info = function (message) { return console.log(chalk_1.default.blueBright(message)); };
var success = function (message) { return console.log(chalk_1.default.green(message)); };
exports.alerts = { error: error, warn: warn, notice: notice, info: info, success: success };
