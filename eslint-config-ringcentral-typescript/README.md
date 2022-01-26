RingCentral TypeScript
======================

A stricter and TypeScript-enabled version of https://github.com/ringcentral/ringcentral-javascript.

Starting with version `6.x` we obey the [recommended prettier approach](https://prettier.io/docs/en/integrating-with-linters.html): disable ESLint's style-related rules + separate prettier executable (previously prettier tasks were also executed by ESLint).

Works best when used together with [Husky](https://github.com/typicode/husky) and [Lint Staged](https://github.com/okonet/lint-staged).

## Installation

```bash
$ yarn add eslint prettier husky lint-staged eslint-config-ringcentral-typescript -D
```

## Scripts

Add this to `scripts` section of `package.json`:

```json5
{
  "scripts": {
    "eslint": "eslint --cache --cache-location node_modules/.cache/eslint --fix",
    "prettier": "prettier --write --ignore-path=.eslintignore --loglevel=warn",
    "lint:all": "yarn eslint . && yarn prettier . ",
    "lint:staged": "lint-staged --debug",
    "prepare": "husky install",     // yarn 1 and npm
    "postinstall": "husky install", // yarn 2 or private packages
  }
}
```

Notes:

- You can add `--quiet` to suppress warnings, but that's not recommended
- You can add `DEBUG=eslint:cli-engine` to output files that were linted
- See Husky documentation for detailed instructions for [Yarn 2 and public package](https://typicode.github.io/husky/#/?id=yarn-2).
- `lint:all` calls ESLint and then Prettier to make sure style is taken from Prettier, other way around also possible, [read more here](https://github.com/prettier/prettier-eslint#prettierlast-boolean)
- Remove `--loglevel=warn` from `prettier` command to see the list of files, keep in mind that this list can shift valuable information from ESLint out of sight

## Ignore files

Add `.eslintignore` file, usually look like this:

```gitignore
.idea
.husky
.pnp.js
.pnp.cjs
.yarn
node_modules
```

P.S. You can also create `.prettierignore` file with same content to make sure IDE Prettier plugin ignores same files, or point plugin to same `.eslintignore': https://youtrack.jetbrains.com/issue/WEB-43597

## Eslintrc

Create `.eslintrc`:

```json
{
  "extends": [
    "ringcentral-typescript"
  ]
}
```

## Prettierrc

Create `.prettierrc.js` (optional):

```js
module.exports = require('eslint-config-ringcentral-typescript/src/prettier');
```

Or with overrides:

```js
module.exports = {
    ...require('eslint-config-ringcentral-typescript/src/prettier'),
    printWidth: 140,
    jsxBracketSameLine: false,
}
```

## Editorconfig

Optional, but useful for `Makefile`, if you have any.

Create a `.editorconfig`:

```ini
root = true

[*]
indent_style = space
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = false
max_line_length = 120

[*.{js,jsx,ts,tsx}]
indent_size = 4

[*.{css,sass,scss,less,yml,yaml,graphql,graphqls,json,md,mdx}]
indent_size = 2

[Makefile]
indent_style = tab
```

[Don't forget to add](https://prettier.io/docs/en/api.html#prettierresolveconfigfilepath--options) `editorconfig: true` to your `.prettierrc.js`.

### Husky

Create `.husky/pre-commit`:

```bash
yarn lint:staged
```

### Lintstaged

Create `.lintstagedrc`:

```json
{
  "*.{js,jsx,ts,tsx}": [
    "yarn eslint",
    "git add"
  ],
  "*.{js,jsx,ts,tsx,css,sass,scss,less,yml,yaml,graphql,graphqls,json,md,mdx}": [
    "yarn prettier",
    "git add"
  ]
}
```

## Integration with JetBrains products (Idea, WebStorm, PhpStorm)

Due to a bug you need to manually add extensions to registry: click `Help -> Find Action -> Registry`, search for
`eslint.additional.file.extensions` and add `ts,tsx`, see https://youtrack.jetbrains.com/issue/WEB-29829#focus=streamItem-27-3182764-0-0.

## Development

Keep versions of dependencies from `eslint-config-react-app` in sync.

```json
{
  "@rushstack/eslint-patch": "^1.1.0",
  "@typescript-eslint/eslint-plugin": "^5.5.0",
  "@typescript-eslint/parser": "^5.5.0",
  "eslint-plugin-flowtype": "^8.0.3",
  "eslint-plugin-import": "^2.25.3",
  "eslint-plugin-jest": "^25.3.0",
  "eslint-plugin-jsx-a11y": "^6.5.1",
  "eslint-plugin-react": "^7.27.1",
  "eslint-plugin-react-hooks": "^4.3.0",
  "eslint-plugin-testing-library": "^5.0.1"
}
```

So we have a `preinstall` script which will pull from proper versions from NPM and put them in place before install.