# 🎁 typed-scss-modules

[![Build Status](https://travis-ci.com/xsanda/typed-scss-modules.svg?branch=master)](https://travis-ci.com/xsanda/typed-scss-modules)

Generate TypeScript definitions (`.d.ts`) files for CSS Modules that are written in SCSS (`.scss`). Check out [this post to learn more](https://medium.com/rubber-ducking/generating-typescript-definitions-for-css-modules-using-sass-461e33623ec2?source=friends_link&sk=5de22cc877744ebd8ad55d8dcc1a0894) about the rationale and inspiration behind this package.

**This fork is for React Native, and so it marks the types as style props rather than strings.**

The original package was made by was [Spencer Miskoviak](https://github.com/skovy/typed-scss-modules).

For example, given the following SCSS:

```scss
@import "variables";

.text {
  color: $blue;

  &-highlighted {
    color: $yellow;
  }
}
```

The following type definitions will be generated:

```typescript
import { StyleProp } from "react-native";
export const text: StyleProp<any>;
export const textHighlighted: StyleProp<any>;
```

## Basic Usage

```bash
yarn add -D typed-scss-modules@xsanda/typed-scss-modules
yarn tsm src
```

## Advanced Usage

For all possible commands, run `tsm --help`.

The only required argument is the directory where all SCSS files are located. Running `tsm src` will search for all files matching `src/**/*.scss`. This can be overridden by providing a [glob](https://github.com/isaacs/node-glob#glob-primer) pattern instead of a directory. For example, `tsm src/*.scss`

### `--watch` (`-w`)

- **Type**: `boolean`
- **Default**: `false`
- **Example**: `tsm src --watch`

Watch for files that get added or are changed and generate the corresponding type definitions.

### `--includePaths` (`-i`)

- **Type**: `string[]`
- **Default**: `[]`
- **Example**: `tsm src --includePaths src/core`

An array of paths to look in to attempt to resolve your `@import` declarations. This example will search the `src/core` directory when resolving imports.

### `--aliases` (`-a`)

- **Type**: `object`
- **Default**: `{}`
- **Example**: `tsm src --aliases.~some-alias src/core/variables`

An object of aliases to map to their corresponding paths. This example will replace any `@import '~alias'` with `@import 'src/core/variables'`.

### `--aliasPrefixes` (`-p`)

- **Type**: `object`
- **Default**: `{}`
- **Example**: `tsm src --aliasPrefixes.~ node_modules/`

An object of prefix strings to replace with their corresponding paths. This example will replace any `@import '~bootstrap/lib/bootstrap'` with `@import 'node_modules/bootstrap/lib/bootstrap'`.
This matches the common use-case for importing scss files from node_modules when `sass-loader` will be used with `webpack` to compile the project.

### `--nameFormat` (`-n`)

- **Type**: `"camel" | "kebab" | "param" | "dashes" | "none"`
- **Default**: `"camel"`
- **Example**: `tsm src --nameFormat camel`

The class naming format to use when converting the classes to type definitions.

- **camel**: convert all class names to camel-case, e.g. `App-Logo` => `appLogo`.
- **kebab**/**param**: convert all class names to kebab/param case, e.g. `App-Logo` => `app-logo` (all lower case with '-' separators).
- **dashes**: only convert class names containing dashes to camel-case, leave others alone, e.g. `App` => `App`, `App-Logo` => `appLogo`. Matches the webpack [css-loader camelCase 'dashesOnly'](https://github.com/webpack-contrib/css-loader#camelcase) option.
- **none**: do not modify the given class names (you should use `--exportType default` when using `--nameFormat none` as any classes with a `-` in them are invalid as normal variable names).
  Note: If you are using create-react-app v2.x and have NOT ejected, `--nameFormat none --exportType default` matches the class names that are generated in CRA's webpack's config.

### `--listDifferent` (`-l`)

- **Type**: `boolean`
- **Default**: `false`
- **Example**: `tsm src --listDifferent`

List any type definition files that are different than those that would be generated. If any are different, exit with a status code `1`.

### `--exportType` (`-e`)

- **Type**: `"named" | "default"`
- **Default**: `"named"`
- **Example**: `tsm src --exportType default`

The export type to use when generating type definitions.

#### `named`

Given the following SCSS:

```scss
.text {
  color: blue;

  &-highlighted {
    color: yellow;
  }
}
```

The following type definitions will be generated:

```typescript
import { StyleProp } from "react-native";

export const text: StyleProp<any>;
export const textHighlighted: StyleProp<any>;
```

#### `default`

Given the following SCSS:

```scss
.text {
  color: blue;

  &-highlighted {
    color: yellow;
  }
}
```

The following type definitions will be generated:

```typescript
import { StyleProp } from "react-native";

export interface Styles {
  text: StyleProp<any>;
  textHighlighted: StyleProp<any>;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
```

This export type is useful when using kebab (param) cased class names since variables with a `-` are not valid variables and will produce invalid types or when a class name is a TypeScript keyword (eg: `while` or `delete`). Additionally, the `Styles` and `ClassNames` types are exported which can be useful for properly typing variables, functions, etc. when working with dynamic class names.

## Examples

For examples, see the `examples` directory:

- [Basic Example](/examples/basic)
- [Default Export Example](/examples/default-export)

## Alternatives

This package was heavily influenced on [typed-css-modules](https://github.com/Quramy/typed-css-modules) which generates TypeScript definitions (`.d.ts`) files for CSS Modules that are written in CSS (`.css`).

This package is currently used as a CLI. There are also [packages that generate types as a webpack loader](https://github.com/Jimdo/typings-for-css-modules-loader).
