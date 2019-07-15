"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var alerts_1 = require("./alerts");
var typescript_1 = require("../typescript");
var sass_1 = require("../sass");
/**
 * Given a single file generate the proper types.
 *
 * @param file the SCSS file to generate types for
 * @param options the CLI options
 */
exports.writeFile = function (file, options) {
    return sass_1.fileToClassNames(file, options)
        .then(function (classNames) {
        var typeDefinition = typescript_1.classNamesToTypeDefinitions(classNames, options.exportType);
        if (!typeDefinition) {
            alerts_1.alerts.notice("[NO GENERATED TYPES] " + file);
            return;
        }
        var path = typescript_1.getTypeDefinitionPath(file);
        fs_1.default.writeFileSync(path, typeDefinition);
        alerts_1.alerts.success("[GENERATED TYPES] " + path);
    })
        .catch(function (_a) {
        var message = _a.message, file = _a.file, line = _a.line, column = _a.column;
        var location = file ? "(" + file + "[" + line + ":" + column + "])" : "";
        alerts_1.alerts.error(message + " " + location);
    });
};
