"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = require("../../lib/typescript");
describe("getTypeDefinitionPath", function () {
    it("returns the type definition path", function () {
        var path = typescript_1.getTypeDefinitionPath("/some/path/style.scss");
        expect(path).toEqual("/some/path/style.scss.d.ts");
    });
});
