<template>
    <i :class="getClass" :style="getStyle" @click="click" class="ui-icon" />
</template>
<script>
export default {
    name: 'Icon',
    props: {
        type: {
            required: true,
            type: String
        },
        size: {
            type: String,
            default: undefined
        },
        color: {
            type: String,
            default: undefined
        }
    },
    data() {
        return {
        };
    },
    computed: {
        getClass() {
            return `ui-icon-${this.type}`;
        },
        getStyle() {
            const style = {
            };
            if (this.size) {
                style['font-size'] = `${this.size}px`;
            }
            if (this.color) {
                style.color = this.color;
            }
            return style;
        }

    },
    methods: {
        click(event) {
            this.$emit('click', event);
        }
    }
};
</script>
