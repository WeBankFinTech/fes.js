
module.exports = {
    extends: [
        '@webank/eslint-config-webank/vue',
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // Vue: false
    },
    rules: {
        'no-plusplus': 'off',
        'no-bitwise': 'off',
        'vue/comment-directive': 'off',
        'no-param-reassign': 'off',
        'func-names': 'off',
        'global-require': 'off',
        'class-methods-use-this': 'off'
    }
};
