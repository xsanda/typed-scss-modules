"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var style_scss_1 = __importDefault(require("./style.scss"));
console.log(style_scss_1.default.i);
console.log(style_scss_1.default["i-am-kebab-cased"]);
// Using the ClassNames union type to assign class names.
var className = "i-am-kebab-cased";
// Using the Styles type for reconstructing a subset.
exports.classNames = (_a = {},
    _a[className] = "something",
    _a.i = "a-string",
    _a);
