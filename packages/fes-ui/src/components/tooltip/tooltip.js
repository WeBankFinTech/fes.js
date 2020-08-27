import Vue from 'vue';
import Tooltip from './tooltip.vue';
import * as util from '../../utils/util.js';

const cache = {};

const triggerMap = {
    mouseenter: ['mouseenter', 'mouseleave'],
    click: ['click', 'click'],
    focus: ['focus', 'blur'],
    outsideClick: ['click', 'outsideClick']
};

const create = function (parent, option) {
    const tooltipComponent = new Vue({
        name: 'TooltipDirective',
        components: {
            Tooltip
        },
        data() {
            const defaultOption = {
                show: false,
                direction: 'bottom',
                align: 'center',
                styleObject: {},
                text: '',
                html: '',
                confirm: false,
                component: null
            };
            return util.extend(defaultOption, option || {});
        },
        created() {
            this.$on('tooltip.ok', this.ok);
            this.$on('tooltip.cancel', this.cancel);
            this.$on('tooltip.mouseenter', this.mouseenter);
            this.$on('tooltip.mouseleave', this.mouseleave);
        },
        beforeDestroy() {
            this.$off('tooltip.ok');
            this.$off('tooltip.cancel');
            this.$off('tooltip.mouseenter');
            this.$off('tooltip.mouseleave');
        },
        methods: {
            mouseenter() {
                this.show = true;
            },
            mouseleave() {
                this.show = false;
            },
            ok() {
                option.onOk && option.onOk.call(parent.vm);
            },
            cancel() {
                option.onCancel && option.onCancel.call(parent.vm);
            }
        },
        render(h) {
            return h('tooltip', {
                props: {
                    direction: this.direction,
                    align: this.align,
                    text: this.text,
                    html: this.html,
                    component: this.component,
                    confirm: this.confirm,
                    styleObject: this.styleObject,
                    transition: 'fade'
                },
                style: {
                    display: this.show ? 'block' : 'none'
                }
            });
        }
        // template: '<tooltip v-show="show" :direction="direction" :align="align" :text="text" :html="html" :component="component"
        // :confirm="confirm" :style-object="styleObject" transition="fade"></tooltip>'
    });
    const component = tooltipComponent.$mount();
    if (parent.el.parentNode) {
        parent.el.parentNode.appendChild(component.$el);
    } else {
        parent.el.appendChild(component.$el);
    }
    return tooltipComponent;
};

export default {
    inserted(el, binding) {
        // 指令插入节点后执行
        // 准备工作
        const self = {
            el
        };
        cache[el] = self;
        if (util.typeOf(binding.value) == 'string') {
            self.tooltipOption = {
                text: binding.value
            };
        } else if (util.typeOf(binding.value) == 'object') {
            self.tooltipOption = binding.value;
        } else {
            return console.warn('请正确使用tooltip组件！');
        }

        // 默认是bottom
        if (!self.tooltipOption.direction) {
            self.tooltipOption.direction = 'bottom';
        }
        if (!self.tooltipOption.align) {
            self.tooltipOption.align = 'center';
        }
        self.tooltipOption.trigger = self.tooltipOption.trigger || 'mouseenter';

        self.triggerBind = () => {
            if (!self.tooltipComponent) return;
            self.tooltipComponent.show = !self.tooltipComponent.show;
        };

        self.showTooltipBind = () => {
            if (!self.tooltipComponent) return;
            self.tooltipComponent.show = true;
        };

        self.hideTooltipBind = () => {
            if (!self.tooltipComponent) return;
            self.tooltipComponent.show = false;
        };

        self.bodyHideTooltipBind = (e) => {
            if (!self.tooltipComponent) return;
            if (self.el != e.target && self.tooltipComponent.$el != e.target
                && !util.contains(self.el, e.target) && !util.contains(self.tooltipComponent.$el, e.target)) {
                self.tooltipComponent.show = false;
            }
        };

        const show = triggerMap[self.tooltipOption.trigger][0];
        const hide = triggerMap[self.tooltipOption.trigger][1];
        if (hide === 'outsideClick') {
            el.addEventListener('click', self.triggerBind, false);
            document.addEventListener('click', self.bodyHideTooltipBind, false);
        } else if (show === hide) {
            el.addEventListener(show, self.triggerBind, false);
        } else {
            el.addEventListener(show, self.showTooltipBind, false);
            el.addEventListener(hide, self.hideTooltipBind, false);
        }

        // 根据父节点计算指令的位置
        self.tooltipOption.styleObject = util.getPositionWhenAfterBorther(el, self.tooltipOption.direction, self.tooltipOption.align);
        self.tooltipComponent = create(self, self.tooltipOption);
    },
    unbind(el) {
        // 清理工作
        // 例如，删除 bind() 添加的事件监听器
        const self = cache[el];
        const show = triggerMap[self.tooltipOption.trigger][0];
        const hide = triggerMap[self.tooltipOption.trigger][1];
        if (hide === 'outsideClick') {
            el.removeEventListener('click', self.triggerBind);
            document.removeEventListener('click', self.bodyHideTooltipBind);
        } else if (show === hide) {
            el.removeEventListener(show, self.triggerBind);
        } else {
            el.removeEventListener(show, self.showTooltipBind);
            el.removeEventListener(hide, self.hideTooltipBind);
        }
    }
};
