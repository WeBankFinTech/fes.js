<template>
    <div ref="swap" />
</template>
<script>
export default {
    props: {
        component: {
            type: [Object, null],
            default: undefined
        }
    },
    data() {
        return {};
    },
    mounted() {
        if (this.component) {
            this.component.$mount(this.$refs.swap);
        }
    }
};
</script>
