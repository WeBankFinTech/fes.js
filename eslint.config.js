// eslint.config.js
import antfu from '@antfu/eslint-config';

export default await antfu({
    stylistic: {
        indent: 4, // 4, or 'tab'
        quotes: 'single', // or 'double'
        semi: 'always',
    },
    typescript: true,
    vue: true,
    rules: {
        'vue/block-order': [
            'error',
            {
                order: ['template', 'script', 'style'],
            },
        ],
    },
});
