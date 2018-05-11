module.exports = {
    'env': {
        'browser': true,
        'es6': true,
    },
    'extends': [
        // 'eslint:recommended',
        'plugin:vue/strongly-recommended',
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'sourceType': 'module',
    },
    'rules': {
        'indent': [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        'quotes': [
            'error',
            'single',
            {
                'allowTemplateLiterals': true,
            },
        ],
        'semi': [
            'error',
            'always'
        ],
        'comma-dangle': [
            'error',
            'always'
        ],
        'object-shorthand' : [
            'error',
        ],
        'prefer-arrow-callback': [
            'error',
            {
                'allowUnboundThis': true,
            },
        ],
    },
};
