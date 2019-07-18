"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = require("../../lib/typescript");
describe("classNamesToTypeDefinitions", function () {
    beforeEach(function () {
        console.log = jest.fn();
    });
    describe("named", function () {
        it("converts an array of class name strings to type definitions", function () {
            var definition = typescript_1.classNamesToTypeDefinitions(["myClass", "yourClass"], "named");
            expect(definition).toEqual("import { StyleProp } from 'react-native';\n\nexport const myClass: StyleProp<any>;\nexport const yourClass: StyleProp<any>;\n");
        });
        it("returns null if there are no class names", function () {
            var definition = typescript_1.classNamesToTypeDefinitions([], "named");
            expect(definition).toBeNull;
        });
        it("prints a warning if a classname is a reserved keyword and does not include it in the type definitions", function () {
            var definition = typescript_1.classNamesToTypeDefinitions(["myClass", "if"], "named");
            expect(definition).toEqual("import { StyleProp } from 'react-native';\n\nexport const myClass: StyleProp<any>;\n");
            expect(console.log).toBeCalledWith(expect.stringContaining("[SKIPPING] 'if' is a reserved keyword"));
        });
        it("prints a warning if a classname is invalid and does not include it in the type definitions", function () {
            var definition = typescript_1.classNamesToTypeDefinitions(["myClass", "invalid-variable"], "named");
            expect(definition).toEqual("import { StyleProp } from 'react-native';\n\nexport const myClass: StyleProp<any>;\n");
            expect(console.log).toBeCalledWith(expect.stringContaining("[SKIPPING] 'invalid-variable' contains dashes"));
        });
    });
    describe("default", function () {
        it("converts an array of class name strings to type definitions", function () {
            var definition = typescript_1.classNamesToTypeDefinitions(["myClass", "yourClass"], "default");
            expect(definition).toEqual("import { StyleProp } from \"react-native\";\n\nexport interface Styles {\n  'myClass': StyleProp<any>;\n  'yourClass': StyleProp<any>;\n}\n\nexport type ClassNames = keyof Styles;\n\ndeclare const styles: Styles;\n\nexport default styles;\n");
        });
        it("returns null if there are no class names", function () {
            var definition = typescript_1.classNamesToTypeDefinitions([], "default");
            expect(definition).toBeNull;
        });
    });
    describe("invalid export type", function () {
        it("returns null", function () {
            var definition = typescript_1.classNamesToTypeDefinitions(["myClass"], "invalid");
            expect(definition).toBeNull;
        });
    });
});
