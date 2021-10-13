const NodeTypeCallExpression = 'CallExpression';
const NodeTypeUnaryExpression = 'UnaryExpression';

const MaxAllowBrandCheckCall = 3;

const isUnaryExpression = ({type}) => type === NodeTypeUnaryExpression;

const isCallExpression = ({type}) => type === NodeTypeCallExpression;

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Use brand check method more than 3 times in same LogicalExpression',
            recommended: true,
        },
        schema: [
            {
                type: 'object',
                properties: {
                    maxAllowBrandCheckCall: {type: 'number'},
                    brandCheckMethods: {type: 'array', items: {type: 'string'}},
                },
            },
        ], // no options
    },
    create(context) {
        const [ruleOptions] = context.options;
        const {maxAllowBrandCheckCall = MaxAllowBrandCheckCall, brandCheckMethods = []} = ruleOptions || {};
        const {brandCheckMethods: brandCheckMethodsSettings} = context.settings;
        const checkMethods = [
            ...brandCheckMethods,
            ...brandCheckMethodsSettings,
        ];

        const nodeCache = new Map();

        const getBrandCheckCalleeName = (node) => {
            if (!node || nodeCache.get(node)) {
                return null;
            }

            nodeCache.set(node, true);

            const {type, callee, argument} = node;
            if (isCallExpression({type}) && checkMethods.includes(callee.name)) {
                return callee.name;
            }

            if (isUnaryExpression({type})) {
                return getBrandCheckCalleeName(argument);
            }
        };

        const getBrandCheckCalleeNameFromNode = (node) => {
            const {right} = node;
            return right ? getBrandCheckCalleeName(right) : getBrandCheckCalleeName(node);
        };

        return {
            LogicalExpression(node) {
                const firstBrandCheckCallee = getBrandCheckCalleeNameFromNode(node);
                if (firstBrandCheckCallee) {
                    const brandCheckCallees = [firstBrandCheckCallee];

                    const {left} = node;
                    let currentNode = left;
                    let checkTimes = 1;

                    do {
                        const nextBrandCheckCalleeName = getBrandCheckCalleeNameFromNode(currentNode);
                        if (nextBrandCheckCalleeName) {
                            brandCheckCallees.push(nextBrandCheckCalleeName);
                        } else {
                            break;
                        }
                        currentNode = currentNode.left;
                        checkTimes++;
                    } while (currentNode);

                    if (checkTimes > maxAllowBrandCheckCall) {
                        const calleeNames = brandCheckCallees
                            .reverse()
                            .map((n) => `${n}()`)
                            .join(', ');
                        context.report(
                            node,
                            `Call brand check method too many times [${calleeNames}], please add a new field (isXXXX) in 'brandFeaturesConfig', and use "getBrandFeatures().isXXXX" here.`,
                        );
                    }
                }
            },
        };
    },
};
