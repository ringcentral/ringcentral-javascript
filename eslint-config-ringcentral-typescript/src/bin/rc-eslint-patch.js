#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');

const patchPaths = [
    // require.resolve('eslint/lib/cli-engine/cascading-config-array-factory'),
    require.resolve('eslint/lib/cli-engine/config-array-factory')
];

const pkg = require('../../package.json');

const token = 'internalSlotsMap.set(this, {';
const addon = `resolvePluginsRelativeTo = require.resolve('${pkg.name}');\n        ${token}`;

patchPaths.forEach(path => fs.writeFileSync(path, fs.readFileSync(path).toString().replace(token, addon)));
