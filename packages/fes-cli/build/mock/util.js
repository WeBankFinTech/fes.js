const fs = require('fs');

const toString = Object.prototype.toString;
module.exports = {

    isArray(value) {
        return toString.call(value) === '[object Array]';
    },

    isObject(value) {
        return toString.call(value) === '[object Object]';
    },

    isFunction(value) {
        return toString.call(value) === '[object Function]';
    },

    each(val, callback) {
        if (this.isArray(val)) {
            val.forEach(callback);
        }
        if (this.isObject(val)) {
            Object.keys(val).forEach((key) => {
                callback(val[key], key);
            });
        }
    },

    watchFile(filename, callback) {
        const isWin = (process.platform === 'win32');
        if (isWin) {
            return fs.watch(filename, (event) => {
                if (event === 'change') {
                    return callback(filename);
                }
                return null;
            });
        }
        return fs.watchFile(filename, {
            interval: 200
        }, (curr, prev) => {
            if (curr.mtime > prev.mtime) {
                return callback(filename);
            }
            return null;
        });
    },

    unwatchFile(watcher, filename) {
        if (watcher) {
            watcher.close && watcher.close();
        } else {
            fs.unwatchFile(filename);
        }
    },

    cleanCache(modulePath) {
        if (require.cache[modulePath]) {
            delete require.cache[modulePath];
        }
    }
};
