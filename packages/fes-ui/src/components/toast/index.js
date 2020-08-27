import Vue from 'vue';
import toastComponent from './toast.vue';
import swapComponent from './swap.vue';
import * as util from '../../utils/util.js';

let swapTop = null;
let swapCenter = null;

const init = function (align, parent) {
    if (!(parent instanceof Vue)) {
        // 使用mixin事先收集了root
        parent = toast.root;
    }
    if (align === 'top') {
        if (!swapTop) {
            swapTop = new Vue({
                parent,
                components: {
                    swap: swapComponent
                },
                render(h) {
                    return h('swap', {
                        props: {
                            align: 'top'
                        }
                    });
                }
            });
            const vm = swapTop.$mount();
            document.body.appendChild(vm.$el);
            return swapTop;
        }
        return swapTop;
    }
    if (align == 'center') {
        if (!swapCenter) {
            swapCenter = new Vue({
                parent,
                components: {
                    swap: swapComponent
                },
                render(h) {
                    return h('swap', {
                        props: {
                            align: 'center'
                        }
                    });
                }
            });
            const vm = swapCenter.$mount();
            document.body.appendChild(vm.$el);
            return swapCenter;
        }
        return swapCenter;
    }
};

const create = function (option, parent) {
    // 初始化
    const $swap = init(option.align, parent);

    let toast = new Vue({
        parent: $swap,
        components: {
            toast: toastComponent
        },
        data() {
            return option;
        },
        mounted() {
            setTimeout(() => {
                this.$destroy();
            }, this.duration);
        },
        destroyed() {
            this.onClose && this.onClose();
            this.$el.remove();
        },
        render(h) {
            return h('toast', {
                props: {
                    message: this.message,
                    type: this.type
                }
            });
        }
    });

    toast.$mount();
    $swap.$el.appendChild(toast.$el);

    return function () {
        toast.$destroy();
        toast = null;
    };
};

const param = function (option) {
    option = option || {};
    option.duration = option.duration || 3000;
    option.align = option.align || 'center';
    option.onClose = option.onClose || util.noop;
    return option;
};

var toast = function (message, option) {
    if (!message) {
        return;
    }
    const vm = this;
    return create(util.merge(param(option), {
        message,
        type: 'info'
    }), vm);
};

toast.error = (message, option) => {
    if (!message) {
        return;
    }
    return create(util.merge(param(option), {
        message,
        type: 'error'
    }));
};

toast.warn = function (message, option) {
    if (!message) {
        return;
    }
    return create(util.merge(param(option), {
        message,
        type: 'warn'
    }));
};

toast.success = function (message, option) {
    if (!message) {
        return;
    }
    return create(util.merge(param(option), {
        message,
        type: 'success'
    }));
};

export default toast;
