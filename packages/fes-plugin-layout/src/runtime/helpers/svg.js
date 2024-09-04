const isStr = function (str) {
    return typeof str === 'string';
};

export function isValid(elm) {
    if (elm.nodeType === 1) {
        if (elm.nodeName.toLowerCase() === 'script') {
            return false;
        }

        for (let i = 0; i < elm.attributes.length; i++) {
            const val = elm.attributes[i].value;
            if (isStr(val) && val.toLowerCase().indexOf('on') === 0) {
                return false;
            }
        }

        for (let i = 0; i < elm.childNodes.length; i++) {
            if (!isValid(elm.childNodes[i])) {
                return false;
            }
        }
    }
    return true;
}

export function validateContent(svgContent) {
    const div = document.createElement('div');
    div.innerHTML = svgContent;

    // setup this way to ensure it works on our buddy IE
    for (let i = div.childNodes.length - 1; i >= 0; i--) {
        if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
            div.removeChild(div.childNodes[i]);
        }
    }

    // must only have 1 root element
    const svgElm = div.firstElementChild;
    if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
        // root element must be an svg
        // lets double check we've got valid elements
        // do not allow scripts
        if (isValid(svgElm)) {
            return div.innerHTML;
        }
    }
    return '';
}
