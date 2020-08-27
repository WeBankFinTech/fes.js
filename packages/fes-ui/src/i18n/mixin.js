import { t } from '.';
import { subscribeDataChanging, unsubscribeDataChanging } from './watch';

export default {
    beforeCreate() {
        // 如果存在vue-i18n就不自己搞watch了
        const $t = this.$t;
        const $i18n = this.$i18n;
        if (typeof $t !== 'function' || typeof $i18n !== 'object') {
            subscribeDataChanging(this);
        }
    },
    methods: {
        t(...args) {
            return t.apply(this, args);
        }
    },
    beforeDestory() {
        unsubscribeDataChanging(this);
    }
};
