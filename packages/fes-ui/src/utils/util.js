const inBrowser = typeof window !== 'undefined'
    && Object.prototype.toString.call(window) !== '[object Object]';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();
const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
const objectToString = Object.prototype.toString;

function isIELowVersion(v) {
    const b = document.createElement('b');
    b.innerHTML = `<!--[if IE ${v}]><i></i><![endif]-->`;
    return b.getElementsByTagName('i').length === 1;
}
function isIEHightVersion(v) {
    return RegExp(`msie${!isNaN(v) ? (`\\s${v}`) : ''}`, 'i').test(navigator.userAgent);
}

/**
 * For IE detect
 *
 * @param {Number} ver ie version
 * @return {Boolean}
 */
export function isIEVersion(v) {
    return v > 9 ? isIEHightVersion(v) : isIELowVersion(v);
}

/**
 * For IE9 compat: when both class and :class are present
 * getAttribute('class') returns wrong value...
 *
 * @param {Element} el
 * @return {String}
 */
export function getClass(el) {
    let classname = el.className;
    if (typeof classname === 'object') {
        classname = classname.baseVal || '';
    }
    return classname;
}

/**
 * 判断dom节点是否有某样式
 *
 * @param {Element} el
 * @return {String}
 * @returns {boolean}
 */
export function hasClass(el, name) {
    if (!el) return;
    const className = getClass(el);
    const classes = className.split(' ');
    return classes.indexOf(name) != -1;
}

/**
 * In IE9, setAttribute('class') will result in empty class
 * if the element also has the :class attribute; However in
 * PhantomJS, setting `className` does not work on SVG elements...
 * So we have to do a conditional check here.
 *
 * @param {Element} el
 * @param {String} cls
 */
export function setClass(el, cls) {
    /* istanbul ignore if */
    if (isIE9 && !/svg$/.test(el.namespaceURI)) {
        el.className = cls;
    } else {
        el.setAttribute('class', cls);
    }
}

/**
 * Add class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

export function addClass(el, cls) {
    if (el.classList) {
        el.classList.add(cls);
    } else {
        const cur = ` ${getClass(el)} `;
        if (cur.indexOf(` ${cls} `) < 0) {
            setClass(el, (cur + cls).trim());
        }
    }
}

/**
 * Remove class with compatibility for IE & SVG
 *
 * @param {Element} el
 * @param {String} cls
 */

export function removeClass(el, cls) {
    if (el.classList) {
        el.classList.remove(cls);
    } else {
        let cur = ` ${getClass(el)} `;
        const tar = ` ${cls} `;
        while (cur.indexOf(tar) >= 0) {
            cur = cur.replace(tar, ' ');
        }
        setClass(el, cur.trim());
    }
    if (!el.className) {
        el.removeAttribute('class');
    }
}

/**
 * 从jquery扣过来的，递归去算
 *
 * @param {Element} a
 * @param {Element} b
 * @returns {boolean}
 */
export function contains(a, b) {
    const adown = a.nodeType === 9 ? a.documentElement : a;
    const bup = b && b.parentNode;
    return a === bup || !!(bup && bup.nodeType === 1 && adown.contains(bup));
}

export function merge() {
    const base = arguments[0];
    if (!base) return;
    [].forEach.call(arguments, (item, index) => {
        if (index > 0) {
            for (const attrname in item) {
                base[attrname] = item[attrname];
            }
        }
    });
    return base;
}

export function extend() {
    const base = arguments[0];
    if (!base) return;
    [].forEach.call(arguments, (item, index) => {
        if (index > 0) {
            for (const attrname in item) {
                if (base[attrname] !== undefined) {
                    base[attrname] = item[attrname];
                }
            }
        }
    });
    return base;
}

export function isNumber(value) {
    return typeof value === 'number';
}

export function isDate(value) {
    return toString.call(value) === '[object Date]';
}

export function isFunction(value) {
    return typeof value === 'function';
}

export function isObject(value) {
    const type = typeof value;
    return !!value && (type == 'object' || type == 'function');
}

export function isArray(value) {
    return Array.isArray(value);
}

export function isObjectLike(value) {
    return !!value && typeof value === 'object';
}

export function isString(value) {
    return (
        typeof value === 'string'
        || (!isArray(value)
            && isObjectLike(value)
            && objectToString.call(value) == '[object String]')
    );
}

/**
 * 通过direction和align计算元素的位置
 *
 * @param brotherEle
 * @param direction
 * @param align
 * @param displacementX
 * @param displacementY
 * @returns {{left: number, top: number, position: null}}
 */
export function getPositionWhenAfterBorther(
    brotherEle,
    direction,
    align,
    displacementX,
    displacementY
) {
    const offset = {
        left: 0,
        top: 0,
        position: null
    };
    displacementX = displacementX || 0;
    displacementY = displacementY || 0;
    direction = direction || 'bottom';
    align = align || 'left';

    const style = window.getComputedStyle(brotherEle, null);
    const rect = brotherEle.getBoundingClientRect();
    const height = rect.height || rect.bottom - rect.top;
    const width = rect.width || rect.right - rect.left;
    if (style.position === 'fixed' || style.position === 'absolute') {
        offset.position = style.position;
        offset.left = Number(/^([0-9]*)/.exec(style.left)[0]) + displacementX;
        offset.top = Number(/^([0-9]*)/.exec(style.top)[0]) + displacementY;
    } else {
        offset.position = 'absolute';
        // 如果target元素不在任何相对定位下，则直接计算离屏幕的高度
        if (!brotherEle.offsetParent) {
            offset.left = rect.left + document.documentElement.scrollLeft + displacementX;
            offset.top = rect.top + document.documentElement.scrollTop + displacementY;
        } else {
            // offsetTop和offsetLeft表示该元素的左上角（边框外边缘）与已定位的父容器（offsetParent对象）左上角的距离
            offset.left = brotherEle.offsetLeft + displacementX;
            offset.top = brotherEle.offsetTop + displacementY;
        }
    }

    switch (direction) {
        case 'top':
            // offset.top = offset.top;
            if (align === 'left') {
                // offset.left = offset.left;
            } else if (align === 'center') {
                offset.left += width / 2;
            } else if (align === 'right') {
                offset.left += width;
            }
            break;
        case 'bottom':
            offset.top += height;
            if (align === 'left') {
                // offset.left = offset.left;
            } else if (align === 'center') {
                offset.left += width / 2;
            } else if (align === 'right') {
                offset.left += width;
            }
            break;
        case 'left':
            // offset.left = offset.left;
            if (align === 'top') {
                // offset.top = offset.top;
            } else if (align === 'center') {
                offset.top += height / 2;
            } else if (align === 'bottom') {
                offset.top += height;
            }
            break;
        case 'right':
            offset.left += width;
            if (align === 'top') {
                // offset.top = offset.top;
            } else if (align === 'center') {
                offset.top += height / 2;
            } else if (align === 'bottom') {
                offset.top += height;
            }
            break;
        default:
            break;
    }

    offset.left += 'px';
    offset.top += 'px';

    return offset;
}

/**
 *判断类型
 * @param {*} obj 需要判断的对象
 */
export function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}

/**
 * 深度copy对象
 * @param {* 原始数据} data
 */
export function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (const i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

// Find components upward
export function findComponentUpward(context, componentName) {
    let componentNames;
    if (typeOf(componentName) === 'string') {
        componentNames = [componentName];
    } else if (typeOf(componentName) === 'array') {
        componentNames = componentName;
    } else {
        return null;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
}

// Find component downward
export function findComponentDownward(context, componentName) {
    let componentNames;
    if (typeOf(componentName) === 'string') {
        componentNames = [componentName];
    } else if (typeOf(componentName) === 'array') {
        componentNames = componentName;
    } else {
        return null;
    }

    const childrens = context.$children;
    let children = null;

    if (childrens.length) {
        childrens.forEach((child) => {
            const name = child.$options.name;
            if (componentNames.indexOf(name) != -1) {
                children = child;
            }
        });

        for (let i = 0; i < childrens.length; i++) {
            const child = childrens[i];
            const name = child.$options.name;
            if (componentNames.indexOf(name) != -1) {
                children = child;
                break;
            } else {
                children = findComponentDownward(child, componentNames);
                if (children) break;
            }
        }
    }
    return children;
}

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
export var debounce = function (func, wait, immediate) {
    let timeout; let args; let context; let timestamp; let
        result;

    var later = function () {
        // 据上一次触发时间间隔
        const last = new Date().getTime() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        const callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
};

export function getScroll(target, top) {
    if (typeof window === 'undefined') return 0;

    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;
    let ret = isWindow ? target[prop] : target[method];
    if (isWindow && typeof ret !== 'number') {
        const d = window.document;
        // ie6,7,8 standard mode
        if (document.compatMode === 'CSS1Compat') {
            ret = d.documentElement[method];
        } else {
            // quirks mode
            ret = d.body[method];
        }
    }
    return ret;
}

// 获取元素top,left,bottom的绝对位置
export function getOffset(element, target) {
    const el_rect = element.getBoundingClientRect();
    const target_rect = target === window
        ? {
            top: 0,
            left: 0,
            bottom: window.innerHeight
        }
        : target.getBoundingClientRect();
    const clientTop = element.clientTop || 0;
    const clientLeft = element.clientLeft || 0;

    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);
    const topOffset = scrollTop - target_rect.top;
    const leftOffset = scrollLeft - target_rect.left;
    return {
        top: el_rect.top + topOffset - clientTop,
        left: el_rect.left + leftOffset - clientLeft,
        bottom: el_rect.bottom + topOffset - clientTop
    };
}

export function getViewport() {
    if (document.compatMode == 'BackCompat') {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    }
    return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    };
}

// 判断参数是否是其中之一
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true;
        }
    }
    return false;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

// 将元素滚动到指定位置
export function scrollTo(element, to, duration) {
    const requestAnimationFrame = window.requestAnimationFrame || function (func) {
        return setTimeout(() => {
            func && func();
        }, 10);
    };
    if (duration <= 0) {
        element.scrollTop = to;
        return;
    }
    const difference = to - element.scrollTop;
    const perTick = (difference / duration) * 10;
    requestAnimationFrame(() => {
        element.scrollTop += perTick;
        if (element.scrollTop === to) {
            return;
        }
        scrollTo(element, to, duration - 10);
    });
}

export const noop = function () {
    // 空函数
};
