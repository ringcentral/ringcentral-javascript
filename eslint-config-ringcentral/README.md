# eslint-config-ringcentral

The eslint sharable config for the [RingCentral JavaScript Style Guide](https://github.com/ringcentral/ringcentral-javascript) and [RingCentral React Style Guide](https://github.com/ringcentral/ringcentral-javascript/react-style-guide)

## Usage

Install packages

```bash
npm install eslint eslint-plugin-import eslint-plugin-react eslinc-config-ringcentral --save-dev
```

Create linter config or edit your own at the root directory of your project

**.eslintrc.yml**

```yaml
extends: 'ringcentral'
```

That's all. Run linter via command line

```bash
$ ./node_modules/.bin/eslint src
```

Or specify command in **package.json** for npm/yarn

```$ cat package.json```
```json
  "scripts": {
    "lint": "eslint src"
  }
```

then run linter
 
```bash
npm run lint
```
