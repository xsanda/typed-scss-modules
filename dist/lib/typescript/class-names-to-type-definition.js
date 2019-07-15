"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var reserved_words_1 = __importDefault(require("reserved-words"));
var core_1 = require("../core");
exports.EXPORT_TYPES = ["named", "default"];
exports.REACT_NATIVE_IMPORT = "import { StyleProp } from \"react-native\";";
exports.REACT_NATIVE_TYPE = "StyleProp<any>";
var classNameToNamedTypeDefinition = function (className) {
    return "export const " + className + ": " + exports.REACT_NATIVE_TYPE + ";";
};
var classNameToInterfaceKey = function (className) {
    return "  '" + className + "': " + exports.REACT_NATIVE_TYPE + ";";
};
var isReservedKeyword = function (className) {
    return reserved_words_1.default.check(className, "es5", true) ||
        reserved_words_1.default.check(className, "es6", true);
};
var isValidName = function (className) {
    if (isReservedKeyword(className)) {
        core_1.alerts.warn("[SKIPPING] '" + className + "' is a reserved keyword (consider renaming or using --exportType default).");
        return false;
    }
    else if (/-/.test(className)) {
        core_1.alerts.warn("[SKIPPING] '" + className + "' contains dashes (consider using 'camelCase' or 'dashes' for --nameFormat or using --exportType default).");
        return false;
    }
    return true;
};
exports.classNamesToTypeDefinitions = function (classNames, exportType) {
    if (classNames.length) {
        switch (exportType) {
            case "default": {
                var typeDefinitions = exports.REACT_NATIVE_IMPORT + "\n\n";
                typeDefinitions += "export interface Styles {\n";
                typeDefinitions += classNames.map(classNameToInterfaceKey).join("\n");
                typeDefinitions += "\n}\n\n";
                typeDefinitions += "export type ClassNames = keyof Styles;\n\n";
                typeDefinitions += "declare const styles: Styles;\n\n";
                typeDefinitions += "export default styles;\n";
                return typeDefinitions;
            }
            case "named": {
                var typeDefinitions = classNames
                    .filter(isValidName)
                    .map(classNameToNamedTypeDefinition);
                // Separate all type definitions be a newline with a trailing newline.
                return exports.REACT_NATIVE_IMPORT + "\n\n" + typeDefinitions.join("\n") + "\n";
            }
            default:
                return null;
        }
    }
    else {
        return null;
    }
};
