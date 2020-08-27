<template>
    <div ref="swap" />
</template>
<script>
import * as util from '../../utils/util.js';

export default {
    props: {
        col: {
            type: Object,
            default: undefined
        }
    },
    mounted() {
        let parent = null;
        let component;
        if (this.$parent && this.$parent.$vnode) {
            parent = this.$parent.$vnode.context;
        }
        if (this.col.name && util.isFunction(this.col.name)) {
            component = this.col.name.call(parent || this.col);
        }
        if (this.col.name && util.isObject(this.col.name)) {
            component = this.col.name;
        }
        component && component.$mount(this.$refs.swap);
    }
};
</script>
