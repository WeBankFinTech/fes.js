/**
 * 全局状态管理
 */
import Vue from 'vue';
import storage from '../storage';
import util from '../util';

class Fesx {
    constructor(name) {
        Object.defineProperty(this, 'name', {
            value: name,
            enumerable: false
        });
        Object.defineProperty(this, 'pre', {
            value: `FesFesx_${this.name}_`,
            enumerable: false
        });
        const keys = Object.keys(sessionStorage);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
            const key = keys[i];
            if (key.indexOf(this.pre) === 0) {
                Vue.set(this, key.slice(this.pre.length), storage.get(key));
            }
        }
    }

    get(prop) {
        if (!this[prop]) {
            this.set(prop, storage.get(this.pre + prop));
        }
        return this[prop];
    }

    set(prop, value) {
        Vue.set(this, prop, value);
        if (!util.isFunction(value)) {
            storage.set(this.pre + prop, value);
        }
        return this;
    }

    clear() {
        const keys = Object.keys(sessionStorage);
        const len = keys.length;
        for (let i = 0; i < len; i++) {
            const key = keys[i];
            if (key.indexOf(this.pre) === 0) {
                storage.remove(key);
                Vue.set(this, key.slice(this.pre.length), undefined);
            }
        }
    }
}

export default Fesx;
