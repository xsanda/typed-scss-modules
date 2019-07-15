import reserved from "reserved-words";

import { ClassNames, ClassName } from "lib/sass/file-to-class-names";
import { alerts } from "../core";

export type ExportType = "named" | "default";
export const EXPORT_TYPES: ExportType[] = ["named", "default"];
export const REACT_NATIVE_IMPORT = `import { StyleProp } from "react-native";`;
export const REACT_NATIVE_TYPE = `StyleProp<any>`;

const classNameToNamedTypeDefinition = (className: ClassName) =>
  `export const ${className}: ${REACT_NATIVE_TYPE};`;

const classNameToInterfaceKey = (className: ClassName) =>
  `  '${className}': ${REACT_NATIVE_TYPE};`;

const isReservedKeyword = (className: ClassName) =>
  reserved.check(className, "es5", true) ||
  reserved.check(className, "es6", true);

const isValidName = (className: ClassName) => {
  if (isReservedKeyword(className)) {
    alerts.warn(
      `[SKIPPING] '${className}' is a reserved keyword (consider renaming or using --exportType default).`
    );
    return false;
  } else if (/-/.test(className)) {
    alerts.warn(
      `[SKIPPING] '${className}' contains dashes (consider using 'camelCase' or 'dashes' for --nameFormat or using --exportType default).`
    );
    return false;
  }

  return true;
};

export const classNamesToTypeDefinitions = (
  classNames: ClassNames,
  exportType: ExportType
): string | null => {
  if (classNames.length) {
    switch (exportType) {
      case "default": {
        let typeDefinitions = `${REACT_NATIVE_IMPORT}\n\n`;
        typeDefinitions += "export interface Styles {\n";
        typeDefinitions += classNames.map(classNameToInterfaceKey).join("\n");
        typeDefinitions += "\n}\n\n";
        typeDefinitions += "export type ClassNames = keyof Styles;\n\n";
        typeDefinitions += "declare const styles: Styles;\n\n";
        typeDefinitions += "export default styles;\n";
        return typeDefinitions;
      }
      case "named": {
        const typeDefinitions = classNames
          .filter(isValidName)
          .map(classNameToNamedTypeDefinition);

        // Separate all type definitions be a newline with a trailing newline.
        return `${REACT_NATIVE_IMPORT}\n\n${typeDefinitions.join("\n")}\n`;
      }
      default:
        return null;
    }
  } else {
    return null;
  }
};
