
const eventProxy = {
    onObj: {},
    oneObj: {},
    on(key, fn) {
        if (fn && typeof (fn) === 'function') {
            if (this.onObj[key] === undefined) {
                this.onObj[key] = [];
            }
            this.onObj[key].push(fn);
        } else {
            throw new Error('请传入正确的回调函数');
        }
    },
    one(key, fn) {
        if (this.oneObj[key] === undefined) {
            this.oneObj[key] = [];
        }

        this.oneObj[key].push(fn);
    },
    off(key) {
        this.onObj[key] = [];
        this.oneObj[key] = [];
    },
    trigger(...args) {
        if (args.length === 0) {
            return false;
        }
        const key = args[0];
        args = [].concat(Array.prototype.slice.call(args, 1));

        if (this.onObj[key] !== undefined
            && this.onObj[key].length > 0) {
            Object.keys(this.onObj[key]).forEach((i) => {
                this.onObj[key][i].apply(null, args);
            });
        }
        if (this.oneObj[key] !== undefined
            && this.oneObj[key].length > 0) {
            Object.keys(this.oneObj[key]).forEach((i) => {
                this.oneObj[key][i].apply(null, args);
                this.oneObj[key][i] = undefined;
            });
            this.oneObj[key] = [];
        }
        return null;
    }
};

export default eventProxy;
