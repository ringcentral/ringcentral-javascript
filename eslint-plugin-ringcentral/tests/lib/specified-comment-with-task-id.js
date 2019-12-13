const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/specified-comment-with-task-id');

const ruleTester = new RuleTester();
const error = {
    messageId: 'specifyComment'
};

ruleTester.run('specified-comment-with-task-id', rule, {
    valid: [
        '// TODO [RLZ-12345]',
        '// todo [RLZ-12345]',
        '// fixme [RLZ-12345]',
        '// FIXME [RLZ-12345]',
        '// TODO [RLZ-12345] summary',
        '// FIXME [RLZ-12345] summary',
        '/* TODO \n some comment \n [UIA-98765] */',
        '// TODO (username) summary',
        '// FIXME (username) summary'
    ],
    invalid: [
        {
            code: '// TODO summary',
            errors: [error]
        },
        {
            code: '// FIXME summary',
            errors: [error]
        },
        {
            code: '// todo summary',
            errors: [error]
        },
        {
            code: '// fixme summary',
            errors: [error]
        },
        {
            code: '/* TODO \n summary */',
            errors: [error]
        },
        {
            code: '// TODO () summary',
            errors: [error]
        },
    ]
});

