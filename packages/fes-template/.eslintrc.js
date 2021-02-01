module.exports = {
    extends: [require.resolve('@webank/eslint-config-webank')],
    files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    env: {
        jest: true
    }
};
