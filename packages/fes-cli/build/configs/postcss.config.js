const autoprefixer = require('autoprefixer');
const browsers = require('../helpers/browser');

module.exports = {
    plugins: [
        autoprefixer({ browsers })
    ]
};
