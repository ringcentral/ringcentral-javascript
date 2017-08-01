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

        // http://eslint.org/docs/rules/block-scoped-var
        'block-scoped-var': 'warn',

        // http://eslint.org/docs/rules/curly
        'curly': ['warn', 'all'],

        // http://eslint.org/docs/rules/dot-location
        'dot-location': ['warn', 'property'],

        // http://eslint.org/docs/rules/max-len
        'max-len': ['warn', {code: 120}],

        // http://eslint.org/docs/rules/no-case-declarations
        'no-case-declarations': 'off',

        // http://eslint.org/docs/rules/no-cond-assign
        'no-cond-assign': 'warn',

        // http://eslint.org/docs/rules/no-console
        'no-console': 'warn',

        // http://eslint.org/docs/rules/no-control-regex
        'no-control-regex': 'warn',

        // http://eslint.org/docs/rules/no-empty
        'no-empty': 'warn',

        // http://eslint.org/docs/rules/no-eq-null
        'no-eq-null': 'warn',

        // http://eslint.org/docs/rules/no-extra-boolean-cast
        'no-extra-boolean-cast': 'off',

        // http://eslint.org/docs/rules/no-nested-ternary
        'no-nested-ternary': 'warn',

        // http://eslint.org/docs/rules/no-undef
        'no-undef': 'error',

        // http://eslint.org/docs/rules/no-unused-expressions
        'no-unused-expressions': [
            'warn',
            {
                allowShortCircuit: true,
                allowTernary: true
            }
        ],

        // http://eslint.org/docs/rules/no-unused-vars
        'no-unused-vars': [
            'error',
            {
                args: 'none',
                ignoreRestSiblings: true,
                caughtErrors: 'none'
            }
        ],

        // http://eslint.org/docs/rules/no-with
        'no-with': 'warn',

        // http://eslint.org/docs/rules/one-var
        'one-var': ['warn', 'never'],

        // http://eslint.org/docs/rules/semi
        'semi': 'warn',


        // react specifics

        'react/jsx-align-first-prop': ['warn', 'multiline'],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
        'react/jsx-equals-spacing': ['warn', 'never'],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-first-prop-new-line.md
        'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md
        'react/jsx-indent': 'warn',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md
        'react/jsx-indent-props': 'warn',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
        'react/jsx-key': 'warn',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-max-props-per-line.md
        'react/jsx-max-props-per-line': [
            'warn',
            {
                maximum: 1,
                when: 'multiline'
            }
        ],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
        'react/jsx-no-duplicate-props': 'warn',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
        'react/jsx-no-undef': 'error',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
        'react/jsx-uses-react': 'error',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
        'react/jsx-uses-vars': 'error',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-wrap-multilines.md
        'react/jsx-wrap-multilines': [
            'warn',
            {
                declaration: false,
                assignment: true,
                return: true,
                arrow: true
            }
        ],

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
        'react/no-direct-mutation-state': 'warn',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-typos.md
        'react/no-typos': 'warn',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prop-types.md
        'react/prop-types': 'warn',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
        'react/require-default-props': 'warn',

        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
        'react/void-dom-elements-no-children': 'warn'

    }
};
