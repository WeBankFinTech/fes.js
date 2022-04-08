// canvas 实现 watermark
export function createWatermark({
    container = document.body,
    width = '300px',
    height = '200px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '18px Microsoft Yahei',
    fillStyle = 'rgba(184, 184, 184, 0.15)',
    content = '请勿外传',
    rotate = '30',
    zIndex = 99999
} = {}) {
    const param = {
        container,
        width,
        height,
        textAlign,
        textBaseline,
        font,
        fillStyle,
        content,
        rotate,
        zIndex
    };
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    const ctx = canvas.getContext('2d');
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.translate(parseFloat(width) / 2, parseFloat(height) / 2);
    ctx.rotate((Math.PI / 180) * rotate);
    ctx.fillText(content, 0, 0);

    let __wm = document.querySelector('.__wm');
    const watermarkDiv = __wm || document.createElement('div');
    const styleStr = `
    position: absolute;
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
        container.style.position = 'relative';
        container.insertBefore(watermarkDiv, container.firstChild);
    }

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
        let mo = new MutationObserver(() => {
            __wm = document.querySelector('.__wm');
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                // 避免一直触发
                mo.disconnect();
                mo = null;
                createWatermark(param);
            }
        });

        mo.observe(container, {
            attributes: true,
            subtree: true,
            childList: true
        });
    }
}
