"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Given a file path to a SCSS file, generate the corresponding type defintion
 * file path.
 *
 * @param file the SCSS file path
 */
exports.getTypeDefinitionPath = function (file) { return file + ".d.ts"; };
