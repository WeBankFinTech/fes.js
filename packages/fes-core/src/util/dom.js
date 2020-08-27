const inBrowser = typeof window !== 'undefined'
    && Object.prototype.toString.call(window) !== '[object Object]';
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && UA.indexOf('trident') > 0;
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;

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
    if (!el) return null;
    const className = getClass(el);
    const classes = className.split(' ');
    return classes.indexOf(name) !== -1;
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
