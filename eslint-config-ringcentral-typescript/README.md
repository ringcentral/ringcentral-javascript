RingCentral TypeScript
======================

A stricter and TypeScript-enabled version of https://github.com/ringcentral/ringcentral-javascript.

## Installation

```bash
$ npm install eslint eslint-config-ringcentral-typescript --save-dev
```

Add this to `scripts` section of `package.json`:

```json
{
  "scripts": {
      "lint": "eslint --cache --cache-location node_modules/.cache/eslint --fix ",
      "lint:all": "npm run lint 'src/**/*.ts' 'src/**/*.tsx'"
  }
}
```

You can add `--quiet` to suppress warnings, but that's not recommended.
You can add `DEBUG=eslint:cli-engine` to output files that were linted.

:warning: Please note commas around globs: `'src/**/*.ts'`, this will prevent your OS to expand those globs.

Create `.eslintrc`:

```json
{
  "extends": [
    "ringcentral-typescript"
  ]
}
```

Create `.prettierrc` (optional):

```bash
{
  "printWidth": 120
}
```

:warning: Keep in mind that anything you set in `.prettierrc` may be overridden by config specified in this repo.

You may use following trick in `.eslintrc` if you need to take control:

```js
const prettierOptions = JSON.parse(require('fs').readFileSync('./.prettierrc').toString());

module.exports = {
  ...
  rules: {
    'prettier/prettier': ['warn', Object.assign({}, prettierOptions)]
  }
};
```

Create a `.editorconfig` (optional):

```ini
root = true

[*]
indent_style = space
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = false

[*.{js,jsx,ts,tsx}]
indent_size = 4

[*.{css,sass,scss,yml,json}]
indent_size = 2

[Makefile]
indent_style = tab
```

## Suggested use

Works best when used together with [Husky](https://github.com/typicode/husky) and [Lint Staged](https://github.com/okonet/lint-staged):

```bash
$ npm install husky lint-staged --save-dev
```

Add this to `scripts` section of `package.json`:

```json
{
  "scripts": {
      "lint:staged": "lint-staged"
  }
}
```

Create `.huskyrc`: 

```json
{
  "hooks": {
    "pre-commit": "npm run lint:staged"
  }
}
```

Create `.lintstagedrc`:

```json
{
  "*.{js,jsx,ts,tsx}": [
    "npm run lint --",
    "git add"
  ]
}
```

## Integration with JetBrains products (Idea, WebStorm, PhpStorm)

Due to a bug you need to manually add extensions to registry: click `Help -> Find Action -> Registry`, search for 
`eslint.additional.file.extensions` and add `ts,tsx`, see https://youtrack.jetbrains.com/issue/WEB-29829#focus=streamItem-27-3182764-0-0.
