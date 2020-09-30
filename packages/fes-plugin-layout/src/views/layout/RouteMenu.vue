<template>
    <route-menu
        :menu="props.menu"
        :width="props.width"
        :type="props.type"
        :mode="props.mode"
        :auto-close="props.autoClose"
    />
</template>

<script>
export default {
    props: {
        mode: {
            type: String,
            default: 'vertical' // 垂直模式
        },
        width: {
            type: [String, Number],
            default: undefined
        },
        menu: {
            type: Array,
            default() {
                return [];
            }
        },
        type: {
            type: String,
            default: 'light'
        },
        autoClose: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        return {
            props
        };
    }
};
</script>
