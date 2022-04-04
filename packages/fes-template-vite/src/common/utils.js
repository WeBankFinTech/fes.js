// 时间格式化
// js 数字精度计算
// 手机号、身份证号 等的校验
// 数字分割

export function resetContainerHeight(dom) {
    const originalHeight = document.body.clientHeight || document.documentElement.clientHeight;

    window.onresize = function () {
        const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (resizeHeight < originalHeight) {
            // 恢复内容区域高度
            const container = document.querySelector(dom);
            container.style.height = originalHeight;
        }
    };
}

export function resetInputBlur() {
    const isWechat = window.navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i);
    if (!isWechat) return;
    const wechatVersion = isWechat[1];
    const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);

    // 如果设备类型为iOS 12+ 和wechat 6.7.4+，恢复成原来的视口
    if (+wechatVersion.replace(/\./g, '') >= 674 && +version[1] >= 12) {
        window.scrollTo(0, Math.max(document.body.clientHeight, document.documentElement.clientHeight));
    }
}

export function getQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

export function simpleRequest(options) {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 3000;
    if (options.type === 'GET') {
        xhr.open(options.type, options.url, options.async || true);
        xhr.send(null);
    } else if (options.type === 'POST') {
        xhr.open(options.type, options.url, options.async || true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(options.data || {}));
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                options.successed(xhr.responseText);
            } else {
                options.failed && options.failed(xhr);
            }
        }
    };
    xhr.ontimeout = function () {
        options.failed && options.failed(xhr);
    };
}
