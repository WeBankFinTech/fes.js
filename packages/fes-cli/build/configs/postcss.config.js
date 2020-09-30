const autoprefixer = require('autoprefixer');
const browsers = require('../helpers/browser');

module.ex = {
    plugins: [
        autoprefixer({ browsers })
    ]
};
