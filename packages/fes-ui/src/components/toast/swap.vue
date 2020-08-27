<template>
    <div :class="getClass" class="ui-toast-swap" />
</template>
<script>
export default {
    name: 'ToastSwap',
    props: {
        align: {
            type: String,
            default: 'center'
        }
    },
    computed: {
        getClass() {
            return `ui-toast-swap-${this.align}`;
        }
    }
};
</script>
