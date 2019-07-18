import fs from "fs";

import { main } from "../lib/main";

describe("main", () => {
  beforeEach(() => {
    // Only mock the write, so the example files can still be read.
    fs.writeFileSync = jest.fn();
    console.log = jest.fn(); // avoid console logs showing up
  });

  test("generates types for all .scss files when the pattern is a directory", async () => {
    const pattern = `${__dirname}`;

    await main(pattern, {
      watch: false,
      exportType: "named",
      listDifferent: false
    });

    expect(fs.writeFileSync).toBeCalledTimes(5);

    expect(fs.writeFileSync).toBeCalledWith(
      `${__dirname}/complex.scss.d.ts`,
      "import { StyleProp } from 'react-native';\n\nexport const someStyles: StyleProp<any>;\nexport const nestedClass: StyleProp<any>;\nexport const nestedAnother: StyleProp<any>;\n"
    );
    expect(fs.writeFileSync).toBeCalledWith(
      `${__dirname}/style.scss.d.ts`,
      "import { StyleProp } from 'react-native';\n\nexport const someClass: StyleProp<any>;\n"
    );
  });
});
