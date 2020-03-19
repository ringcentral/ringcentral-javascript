module.exports = {
    root: true,
    plugins: ['prettier'], //FIXME [UIA-10000] Remove
    extends: [
        require.resolve('eslint/conf/eslint-recommended'),
        'plugin:import/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react/recommended',
        require.resolve('eslint-config-react-app'),
        require.resolve('eslint-config-ringcentral'),
        // 'plugin:prettier/recommended', // must be below ringcentral to override react prefs
        require.resolve('eslint-config-prettier'), // must be below ringcentral to override react prefs
        require.resolve('eslint-config-prettier/react'), // must be below ringcentral to override react prefs
        'plugin:@typescript-eslint/recommended', // must be below react-app & ringcentral to enable proper parser
        'plugin:import/typescript',
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {
                bracketSpacing: false,
                parser: 'typescript',
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'all',
            },
        ],
        '@typescript-eslint/indent': 'off', // prettier takes care of it
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
