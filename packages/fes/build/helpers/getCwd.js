const { join, isAbsolute } = require('path');

module.exports = () => {
    const cwd = process.cwd();
    if (process.env.APP_ROOT) {
    // avoid repeat cwd path
        if (!isAbsolute(process.env.APP_ROOT)) {
            return join(cwd, process.env.APP_ROOT);
        }
        return process.env.APP_ROOT;
    }
    return cwd;
};
