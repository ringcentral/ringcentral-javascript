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
    "prettier": "prettier --write --ignore-path=.eslintignore",
    "lint:all": "yarn prettier . && yarn eslint .",
    "lint:staged": "lint-staged --debug",
    "prepare": "husky install",     // yarn 1 and npm
    "postinstall": "husky install", // yarn 2 private packages
  }
}
```

Notes:

- You can add `--quiet` to suppress warnings, but that's not recommended.
- You can add `DEBUG=eslint:cli-engine` to output files that were linted.
- See Husky documentation for detailed instructions for [Yarn 2 and public package](https://typicode.github.io/husky/#/?id=yarn-2).

## Ignore files

Add `.eslintignore` file, usually look like this:

```gitignore
.husky
.pnp.js
.yarn
coverage
node_modules
storybook-static
dist
```

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
module.exports = {
    ...require('eslint-config-ringcentral-typescript/src/prettier'),
    // overrides if needed
}
```

## Editorconfig

Create a `.editorconfig`, it's optional but useful for `Makefile`, if you have any:

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
  "*.{js,jsx,ts,tsx,css,sass,scss,less,yml,yaml,graphql,graphqls,json,md,mdx}": [
    "yarn prettier",
    "git add"
  ],
  "*.{js,jsx,ts,tsx}": [
    "yarn eslint",
    "git add"
  ]
}
```

## Integration with JetBrains products (Idea, WebStorm, PhpStorm)

Due to a bug you need to manually add extensions to registry: click `Help -> Find Action -> Registry`, search for
`eslint.additional.file.extensions` and add `ts,tsx`, see https://youtrack.jetbrains.com/issue/WEB-29829#focus=streamItem-27-3182764-0-0.
