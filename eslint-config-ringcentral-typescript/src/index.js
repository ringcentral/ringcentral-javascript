/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */

const CLIEngine = require('eslint').CLIEngine;

const cli = new CLIEngine({
    useEslintrc: false,
    baseConfig: require('./config'),
    resolvePluginsRelativeTo: __dirname,
});

module.exports = cli.getConfigForFile('dummy.ts');

const replaceInObject = (obj, key, newKey) => {
    obj[newKey] = obj[key];
    delete obj[key];
};

replaceInObject(
    module.exports.settings['import/resolver'],
    'node',
    require.resolve('eslint-import-resolver-node'),
);

replaceInObject(
    module.exports.settings['import/parsers'],
    '@typescript-eslint/parser',
    require.resolve('@typescript-eslint/parser'),
);

// console.log(module.exports);
