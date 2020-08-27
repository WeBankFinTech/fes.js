<template>
    <div :style="clipStyle" class="ui-loading" />
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: '#2db7f5'
        },
        size: {
            type: String,
            default: '32px'
        },
        borderWidth: {
            type: String,
            default: '2px'
        }
    },
    computed: {
        clipStyle() {
            const style = {
                height: this.size,
                width: this.size,
                borderWidth: this.borderWidth,
                borderStyle: 'solid'
            };
            if (this.color) {
                style.borderColor = `${this.color} ${this.color} transparent`;
            }
            return style;
        }
    }
};
</script>
