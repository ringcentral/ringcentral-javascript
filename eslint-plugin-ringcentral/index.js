module.exports = {
    rules: {
        'specified-comment-with-task-id': require('./lib/rules/specified-comment-with-task-id'),
        'too-many-brand-check-call': require('./lib/rules/too-many-brand-check-call')
    },
    configs: {
        all: {
            rules: {
                'ringcentral/specified-comment-with-task-id': 2,
            },
        },
        'all-warn': {
            rules: {
                'ringcentral/specified-comment-with-task-id': 1,
            },
        },
        recommended: {
            rules: {
                'ringcentral/specified-comment-with-task-id': 1,
            },
        },
    }
};