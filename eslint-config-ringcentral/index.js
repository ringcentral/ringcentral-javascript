'use strict';

module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true
    },
    extends: 'eslint:recommended',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: 'module'
    },
    plugins: ['react'],
    globals: {
        chai: true,
        expect: true,
        sinon: true
    },
    rules: {
        'react/jsx-uses-react': ['error'],
        'react/jsx-uses-vars': ['error'],
        'no-undef': ['error'],
        'no-case-declarations': ['off'],
        'no-extra-boolean-cast': ['off'],
        'no-control-regex': ['warn'],
        'no-unused-vars': [
            'error',
            {
                args: 'none',
                ignoreRestSiblings: true,
                caughtErrors: 'none'
            }
        ],
        'no-unused-expressions': [
            'warn',
            {
                allowShortCircuit: true,
                allowTernary: true
            }
        ],
        'no-empty': ['warn'],
        'no-cond-assign': ['warn'],
        'no-console': ['warn'],
        'semi': ['warn'],
        'max-len': ['warn', {code: 120}]
    }
};