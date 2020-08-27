import fesConfig from '../config';

const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = function (obj, key) {
    return hasOwnProperty.call(obj, key);
};
const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

const template = function (string, ...args) {
    if (args.length === 1 && typeof args[0] === 'object') {
        args = args[0];
    }

    if (!args || !args.hasOwnProperty) {
        args = {};
    }

    return string.replace(RE_NARGS, (match, prefix, i, index) => {
        if (string[index - 1] === '{' && string[index + match.length] === '}') {
            return i;
        }
        const result = hasOwn(args, i) ? args[i] : null;
        if (result === null || result === undefined) {
            return '';
        }

        return result;
    });
};

export default function (path, options) {
    const array = path.split('.');
    let current = fesConfig.i18n.messages[fesConfig.i18n.locale];
    if (!current) {
        current = fesConfig.i18n.messages['zh-cn'];
    }
    let value;
    for (let i = 0, j = array.length; i < j; i++) {
        const property = array[i];
        value = current[property];
        if (i === j - 1) return template(value, options);
        if (!value) return '';
        current = value;
    }
    return '';
}
