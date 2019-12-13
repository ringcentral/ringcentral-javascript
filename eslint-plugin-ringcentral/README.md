# eslint-plugin-ringcentral

plugin for ringcentral products

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ringcentral`:

```
$ npm i eslint-plugin-ringcentral --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ringcentral` globally.

## Usage

Add `ringcentral` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": ["ringcentral"],
    "extends": ["plugin:ringcentral/all"],
    // or
    "extends": ["plugin:ringcentral/all-warn"]
}
```





