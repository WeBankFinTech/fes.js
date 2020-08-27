var fs = require('fs');
var toString = Object.prototype.toString;
module.exports = {

    isArray: function (value) {
        return toString.call(value) === '[object Array]';
    },

    isObject: function (value) {
        return toString.call(value) === '[object Object]';
    },

    isFunction: function (value) {
        return toString.call(value) === '[object Function]';
    },

    each: function (val, callback) {
        if (this.isArray(val)) {
            val.forEach(callback);
        }
        if (this.isObject(val)) {
            for (var key in val) {
                callback(val[key], key);
            }
        }
    },

    watchFile: function (filename, callback) {
        var isWin = (process.platform === 'win32');
        if (isWin) {
            return fs.watch(filename, function(event) {
                if (event === 'change') {
                    return callback(filename);
                }
            });
        } else {
            return fs.watchFile(filename, {
                interval: 200
            }, function(curr, prev) {
                if (curr.mtime > prev.mtime) {
                    return callback(filename);
                }
            });
        }
    },

    unwatchFile: function (watcher, filename) {
        if (watcher) {
            watcher.close && watcher.close();
        } else {
            fs.unwatchFile(filename);
        }
    },

    cleanCache: function (modulePath) {
        var module = require.cache[modulePath] || {};
        // remove reference in module.parent
        if (module.parent) {
            module.parent.children.splice(module.parent.children.indexOf(module), 1);
        }
        require.cache[modulePath] = null;
    }
}