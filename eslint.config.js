// eslint.config.js
import antfu from '@antfu/eslint-config';

export default await antfu({
    stylistic: {
        indent: 4,
        quotes: 'single',
        semi: 'always',
    },
    typescript: true,
    vue: true,
    rules: {
        'curly': ['error', 'multi-line'],
        'vue/block-order': [
            'error',
            {
                order: ['template', 'script', 'style'],
            },
        ],
        'style/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
                multilineDetection: 'brackets',
            },
        ],
    },
});
