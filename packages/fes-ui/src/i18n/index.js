import Vue from 'vue';
import messages from './messages';
import getFormat from './format';
import { trigger } from './watch';

const format = getFormat(Vue);
let locale = 'zh-cn';
let merged = false;

let i18nHandler = function () {
    if (this instanceof Vue) {
        const $t = this.$t;
        const $i18n = this.$i18n;
        if (typeof $t === 'function' && typeof $i18n === 'object') {
            if (!merged) {
                merged = true;
                for (const p in messages) {
                    $i18n.mergeLocaleMessage(p, messages[p]);
                }
            }
            return $t.apply(this, arguments);
        }
    }
};

export const t = function (path, options) {
    let value = i18nHandler.apply(this, arguments);
    if (value !== null && value !== undefined) return value;

    const array = path.split('.');
    let current = messages[locale];

    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (i === j - 1) return format(value, options);
        if (!value) return '';
        current = value;
    }
    return '';
};

export const setLocale = function (l) {
    const oldLocale = locale;
    locale = l && l.toLowerCase() || locale;
    if (oldLocale !== locale) {
        trigger();
    }
};

export const setHandler = function (fn) {
    const oldHander = i18nHandler;
    i18nHandler = fn || i18nHandler;
    if (oldHander !== i18nHandler) {
        trigger();
    }
};

export const mergeLocaleMessage = function (local, message) {
    messages[local] = message;
    // 后续添加的字符匹配也要添加到vue-i18n
    if (this instanceof Vue) {
        const $t = this.$t;
        const $i18n = this.$i18n;
        if (typeof $t === 'function' && typeof $i18n === 'object') {
            $i18n.mergeLocaleMessage(local, message);
        }
    }
};

export default {
    t, setLocale, setHandler, mergeLocaleMessage
};
