"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var css_modules_loader_core_1 = __importDefault(require("css-modules-loader-core"));
var core = new css_modules_loader_core_1.default();
exports.sourceToClassNames = function (source) {
    return core.load(source);
};
