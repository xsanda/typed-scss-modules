import { classNamesToTypeDefinitions, ExportType } from "../../lib/typescript";

describe("classNamesToTypeDefinitions", () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  describe("named", () => {
    it("converts an array of class name strings to type definitions", () => {
      const definition = classNamesToTypeDefinitions(
        ["myClass", "yourClass"],
        "named"
      );

      expect(definition).toEqual(
        "import { StyleProp } from 'react-native';\n\nexport const myClass: StyleProp<any>;\nexport const yourClass: StyleProp<any>;\n"
      );
    });

    it("returns null if there are no class names", () => {
      const definition = classNamesToTypeDefinitions([], "named");

      expect(definition).toBeNull;
    });

    it("prints a warning if a classname is a reserved keyword and does not include it in the type definitions", () => {
      const definition = classNamesToTypeDefinitions(
        ["myClass", "if"],
        "named"
      );

      expect(definition).toEqual(
        "import { StyleProp } from 'react-native';\n\nexport const myClass: StyleProp<any>;\n"
      );
      expect(console.log).toBeCalledWith(
        expect.stringContaining(`[SKIPPING] 'if' is a reserved keyword`)
      );
    });

    it("prints a warning if a classname is invalid and does not include it in the type definitions", () => {
      const definition = classNamesToTypeDefinitions(
        ["myClass", "invalid-variable"],
        "named"
      );

      expect(definition).toEqual(
        "import { StyleProp } from 'react-native';\n\nexport const myClass: StyleProp<any>;\n"
      );
      expect(console.log).toBeCalledWith(
        expect.stringContaining(`[SKIPPING] 'invalid-variable' contains dashes`)
      );
    });
  });

  describe("default", () => {
    it("converts an array of class name strings to type definitions", () => {
      const definition = classNamesToTypeDefinitions(
        ["myClass", "yourClass"],
        "default"
      );

      expect(definition).toEqual(
        "import { StyleProp } from \"react-native\";\n\nexport interface Styles {\n  'myClass': StyleProp<any>;\n  'yourClass': StyleProp<any>;\n}\n\nexport type ClassNames = keyof Styles;\n\ndeclare const styles: Styles;\n\nexport default styles;\n"
      );
    });

    it("returns null if there are no class names", () => {
      const definition = classNamesToTypeDefinitions([], "default");

      expect(definition).toBeNull;
    });
  });

  describe("invalid export type", () => {
    it("returns null", () => {
      const definition = classNamesToTypeDefinitions(
        ["myClass"],
        "invalid" as ExportType
      );

      expect(definition).toBeNull;
    });
  });
});
