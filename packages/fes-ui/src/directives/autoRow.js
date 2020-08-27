import * as util from '../utils/util.js';

const cache = {};
let key = 1;
export default {
    inserted(el, binding) {
        el.autoRowKey = key++;
        const self = (cache[el.autoRowKey] = {});
        // 例如，添加事件处理器或只需要运行一次的高耗任务
        self.handler = () => {
            let config;
            if (
                util.isObject(binding.value)
                && binding.value.min
                && binding.value.max
            ) {
                config = binding.value;
            } else if (binding.value === true) {
                config = { min: 2, max: 1000000 };
            } else {
                return;
            }
            const style = window.getComputedStyle(el, null);
            const paddingTop = parseInt(style.paddingTop);
            const paddingBottom = parseInt(style.paddingBottom);
            let baseLineHeight = parseInt(style.lineHeight);
            const borderWidth = parseInt(style.borderBottomWidth)
                + parseInt(style.borderTopWidth);
            const po = paddingTop + paddingBottom;
            const baseHeight = baseLineHeight * config.min;
            el.style.height = `${baseHeight + po + borderWidth}px`;
            let scrollVal = el.scrollHeight;
            if (scrollVal - po >= baseLineHeight * config.max) {
                scrollVal = baseLineHeight * config.max + po;
            }
            if (util.isIEVersion(9)) { // ie9读取不到baseLine值
                baseLineHeight = baseHeight < 12 ? 12 : baseHeight;
                el.style.height = `${baseLineHeight * config.max + po + borderWidth}px`;
                return;
            } if (util.isIEVersion(10)) { // ie10读取不到scrollHieght值
                return;
            }
            el.style.height = `${scrollVal + borderWidth}px`;
        };
        self.handler();
    },
    update(el) {
        // 值更新时的工作
        // 也会以初始值为参数调用一次
        if (el._value === null && typeof el._value === 'object') return;
        const self = cache[el.autoRowKey];
        if (self) {
            el.style.overflow = 'hidden';
            self.handler();
            el.style.overflow = 'auto';
        }
    },
    unbind(el) {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        const self = cache[el.autoRowKey];
        if (self) {
            el.removeEventListener('input', self.handler);
            el.removeEventListener('keydown', self.keydown);
            el.removeEventListener('keyup', self.keyup);
        }
    }
};
