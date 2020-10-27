const chalk = require('chalk');

const getTime = function () {
    const now = new Date();
    return now.toLocaleString();
};

const log = function (type, message) {
    // const rn = /\n/.test(message) || /\r/.test(message);
    // if (rn) {
    //     console.log(chalk[type](`${getTime()}[fes] `));
    //     return console.log(chalk[type](message));
    // }
    return console.log(`${getTime()} [fes] ${chalk[type](message)}`);
};

module.exports = {
    error(msg) {
        return log('red', msg);
    },
    warn(msg) {
        return log('yellow', msg);
    },
    message(msg) {
        return log('cyan', msg);
    }
};
