const chalk = require('chalk');

module.exports = {
    error(msg) {
        return console.log(chalk.red(msg));
    },
    warn(msg) {
        return console.log(chalk.yellow(msg));
    },
    message(msg) {
        return console.log(chalk.cyan(msg));
    }
};
