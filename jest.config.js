
module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json'
    ],
    transform: {
        '\\.[jt]sx?$': 'babel-jest'
    },
    moduleDirectories: [
        'node_modules'
    ],
    transformIgnorePatterns: [
        'node_modules/(?!lodash-es)'
    ]
};
