const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

module.exports = function (mode, configs, webpack) {
    if (mode === 'build') {
        return {
            plugins: [new CspHtmlWebpackPlugin({
                'base-uri': "'self'",
                'object-src': "'none'",
                'script-src': [
                    "'self'"
                ],
                'style-src': [
                    "'self'"
                ],
                'connect-src': [
                    "'self'",
                    'http://example.com'
                ],
                'img-src': [
                    'data:',
                    "'self'"
                ]
            })]
        };
    }
    return {};
};