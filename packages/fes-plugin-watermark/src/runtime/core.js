function timeFormat(date, format = 'YYYY-MM-DD') {
    if (!date) return null;
    if (typeof date === 'number') {
        date = new Date(date);
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours24 = date.getHours();
    const hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const dd = t => `0${t}`.slice(-2);
    const map = {
        YYYY: year,
        MM: dd(month + 1),
        MMMM: `${month + 1}月`,
        M: month + 1,
        DD: dd(day),
        D: day,
        HH: dd(hours24),
        H: hours24,
        hh: dd(hours),
        h: hours,
        mm: dd(minutes),
        m: minutes,
        ss: dd(seconds),
        s: seconds
    };
    return format.replace(/Y+|M+|D+|H+|h+|m+|s+|S+|Q/g, str => String(map[str]));
}

const defaultOption = {
    content: '请勿外传',
    container: document.body,
    width: 300,
    height: 300,
    textAlign: 'center',
    textBaseline: 'middle',
    fontSize: '14px',
    fontFamily: 'Microsoft Yahei',
    fillStyle: 'rgba(184, 184, 184, 0.3)',
    rotate: 25,
    zIndex: 99999,
    timestamp: 'YYYY-MM-DD HH:mm'
};

let _wmMo = null; // MutationObserver
let _wmTimer = null; // timestamp

function _createWatermark(param) {
    const {
        content,
        container,
        width,
        height,
        textAlign,
        textBaseline,
        fontSize,
        fontFamily,
        fillStyle,
        rotate,
        zIndex,
        timestamp
    } = param;

    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', `${width}px`);
    canvas.setAttribute('height', `${height}px`);

    const ctx = canvas.getContext('2d');
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.fillStyle = fillStyle;
    ctx.translate(width / 2, height / 2);
    ctx.rotate(-(Math.PI / 180) * rotate);
    ctx.fillText(
        `${content}`,
        0,
        0
    );
    timestamp && ctx.fillText(
        `${timeFormat(new Date(), timestamp)}`,
        0,
        parseInt(fontSize) + 5
    );

    let __wm = document.querySelector('.__wm');
    const watermarkDiv = __wm || document.createElement('div');
    const styleStr = `
    position: ${container === document.body ? 'fixed' : 'absolute'};
    user-select: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: ${zIndex};
    pointer-events: none !important;
    background-repeat: repeat;
    background-image: url('${canvas.toDataURL()}')`;

    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add('__wm');

    if (!__wm) {
        container.insertBefore(watermarkDiv, container.firstChild);
    }

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
        _wmMo = new MutationObserver(() => {
            __wm = document.querySelector('.__wm');
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                // 避免一直触发
                _wmMo.disconnect();
                _wmMo = null;
                _createWatermark(param);
            }
        });

        _wmMo.observe(container, {
            attributes: true,
            subtree: true,
            childList: true
        });
    }

    if (timestamp) {
        let timeout = 1000 * 60 * 60 * 24;
        if (timestamp.includes('s')) {
            timeout = 1000;
        } else if (timestamp.includes('m')) {
            timeout = 1000 * 60;
        } else if (timestamp.includes('h') || timestamp.includes('H')) {
            timeout = 1000 * 60 * 60;
        }

        _wmTimer = window.setTimeout(() => {
            // 触发 MutationObserver
            watermarkDiv.style.bottom = '0';
        }, timeout);
    }
}

// 销毁水印
export function destroyWatermark() {
    // 监听器关闭
    _wmMo && _wmMo.disconnect();
    _wmMo = null;
    _wmTimer && window.clearTimeout(_wmTimer);
    _wmTimer = null;

    // 删除水印元素
    const __wm = document.querySelector('.__wm');
    __wm && __wm.parentNode.removeChild(__wm);
}

// canvas 实现 watermark
export function createWatermark(option) {
    // eslint-disable-next-line no-undef
    if (WATERMARK_DISABLED) {
        return;
    }

    // 为避免多次调用 createWatermark 触发重复监听，这里先执行销毁水印操作
    destroyWatermark();

    _createWatermark({
        ...defaultOption,
        ...option
    });
}
