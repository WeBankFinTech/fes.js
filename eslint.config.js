// eslint.config.js
import antfu from '@antfu/eslint-config';

export default await antfu({
    files: ['**/*.js', '**/*.jsx', '**/*.vue', '**/*.ts'],
    // TODO: 使用 ignore 代替 cli 命令中的配置
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
