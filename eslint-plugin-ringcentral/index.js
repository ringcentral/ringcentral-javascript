module.exports = {
    rules: {
        'specified-comment-with-task-id': require('./lib/rules/specified-comment-with-task-id')
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