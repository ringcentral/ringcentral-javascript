#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('../../package.json');
process.stdout.write(require.resolve(pkg.name));
