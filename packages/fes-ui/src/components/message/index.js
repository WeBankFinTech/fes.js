import Vue from 'vue';
import messageComponent from './message.vue';
import * as util from '../../utils/util.js';
import i18n from '../../i18n/mixin';

let showingMessage = null;

const init = function () {
    const opt = {};
    const arg0 = arguments[0];
    const arg1 = arguments[1];
    if (typeof arg0 === 'string') {
        if (arg1) {
            opt.title = arg0;
            opt.template = arg1;
        } else {
            opt.template = arg0;
        }
    } else if (typeof arg0 === 'object') {
        const config = arg0;
        if (config.buttons && !util.isArray(config.buttons)) {
            delete config.buttons;
        }
        config.buttons && config.buttons.forEach((button) => {
            if (button.show === undefined) {
                button.show = true;
            }
        });
        util.merge(opt, config);
    }
    return opt;
};

const create = function (parent, option, type) {
    if (!(parent instanceof Vue)) {
        // 使用mixin事先收集了root
        parent = message.root;
    }
    if (showingMessage) {
        showingMessage.$destroy(true);
        showingMessage = null;
    }
    const promise = new Promise(((resolve) => {
        const message = showingMessage = new Vue({
            name: 'MessageSwap',
            parent,
            components: {
                message: messageComponent
            },
            mixins: [i18n],
            computed: {
                confirmText() {
                    return this.t('el.message.confirm');
                },
                cancelText() {
                    return this.t('el.message.cancel');
                },
                option() {
                    if (type === 'alert') {
                        option.buttons = [{
                            text: this.confirmText,
                            show: true
                        }];
                    }
                    if (type === 'confirm') {
                        option.buttons = [{
                            text: this.confirmText,
                            show: true
                        }, {
                            text: this.cancelText,
                            show: true
                        }];
                    }
                    if (!option.buttons) {
                        option.buttons = [{
                            text: this.confirmText,
                            show: true
                        }, {
                            text: this.cancelText,
                            show: true
                        }];
                    }
                    return option;
                }
            },
            mounted() {
                this.$on('on-close', function (index) {
                    this.$destroy(true);
                    resolve(index);
                });
            },
            destroyed() {
                this.$el.remove();
            },
            render(h) {
                return h('message', {
                    props: {
                        title: this.option.title,
                        template: this.option.template,
                        buttons: this.option.buttons
                    }
                });
            }
        });
        message.$mount();
        document.body.appendChild(message.$el);
    }));
    return promise;
};

var message = function () {
    const parent = this;
    return create(parent, init.apply(this, arguments));
};

message.alert = function () {
    const opt = init.apply(this, arguments);
    return create(undefined, opt, 'alert');
};

message.confirm = function () {
    const opt = init.apply(this, arguments);
    return create(undefined, opt, 'confirm');
};

export default message;
