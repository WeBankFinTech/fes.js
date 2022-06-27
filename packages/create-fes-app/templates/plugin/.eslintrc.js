module.exports = {
    extends: ['@webank/eslint-config-webank/vue.js'],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // Vue: false
        __DEV__: false,
    },
    rules: {
        'vue/comment-directive': 'off',
        'global-require': 'off',
        'import/no-unresolved': 'off',
        'no-restricted-syntax': 'off',
        'no-undefined': 'off',
        'vue/valid-template-root': 'off',
    },
    env: {
        jest: true,
    },
};
