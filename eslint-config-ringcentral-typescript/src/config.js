require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        require.resolve('eslint-config-react-app'),
        require.resolve('eslint-config-ringcentral'),
        'plugin:@typescript-eslint/recommended', // must be below react-app & ringcentral to enable proper parser
        require.resolve('eslint-config-prettier'), // must be below ringcentral to override react prefs
    ],
    rules: {
        curly: 'error',
        'no-shadow': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/indent': 'off', // prettier takes care of it
        '@typescript-eslint/no-shadow': 'error',
        'react/jsx-closing-bracket-location': 'off' // prettier takes care of it
    },
    env: {
        browser: true,
        node: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
