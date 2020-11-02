const { join } = require('path');
const getCwd = require('./getCwd');

module.exports = (dir) => {
    try {
        // eslint-disable-next-line
        return require(join(getCwd(), 'package.json'));
    } catch (error) {
        try {
            // eslint-disable-next-line
            return require(join(dir, 'package.json'));
        } catch (err) {
            return null;
        }
    }
};
