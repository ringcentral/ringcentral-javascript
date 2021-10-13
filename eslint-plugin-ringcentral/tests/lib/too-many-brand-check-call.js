const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/too-many-brand-check-call');

const ruleTester = new RuleTester();

const ruleSetting = {
    brandCheckMethods: [
        'isA',
        'isB',
        'isC',
        'isD',
        'isE',
        'isF',
    ]
};

const genError = (methods) => `Call brand check method too many times [${methods}], please add a new field (isXXXX) in 'brandFeaturesConfig', and use "getBrandFeatures().isXXXX" here.`

ruleTester.run('too-many-brand-check-call', rule, {
    valid: [
        {code: 'function oneBrandCheck() { return isA(); }', settings: ruleSetting},
        {code: 'function twoBrandCheck() { return isA() && isB(); }', settings: ruleSetting},
        {code: 'function threeBrandCheck() { return isA() && isB() && isC(); }', settings: ruleSetting},
        {code: 'function fourBrandCheckWithLimitTo4() { return isA() && isB() && isC() && isD(); }', settings: ruleSetting, options: [{maxAllowBrandCheckCall: 4}]},
    ],
    invalid: [
        {code: 'function threeBrandCheckWithLimitTo2() { return isA() && isB() && isC(); }', settings: ruleSetting, errors: [genError('isA(), isB(), isC()')], options: [{maxAllowBrandCheckCall: 2}]},
        {code: 'function fourBrandCheck() { return isA() && isB() && isC() && isD(); }', settings: ruleSetting, errors: [genError('isA(), isB(), isC(), isD()')]},
    ]
});

