const babelJest = require('babel-jest').default;

module.exports = babelJest.createTransformer({
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }]
    ],
    plugins: ['@vue/babel-plugin-jsx'],
    babelrc: false,
    configFile: false
});
