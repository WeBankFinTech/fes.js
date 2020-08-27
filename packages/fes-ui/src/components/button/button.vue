<template>
    <button :type="buttonType" :class="getClass" @click="handleClick" class="ui-button">
        <Icon v-if="icon" :type="icon" />
        <span class="content"><slot /></span>
    </button>
</template>
<script>
import Icon from '../icon';

export default {
    name: 'Button',
    components: {
        Icon
    },
    props: {
        type: {
            type: String,
            default: ''
        },
        long: {
            type: Boolean,
            default: false
        },
        circle: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        control: {
            type: Number,
            default: 300
        },
        disabled: {
            type: Boolean,
            default: false
        },
        buttonType: {
            type: String,
            default: 'button'
        }
    },
    data() {
        return {
            currentDisabled: this.disabled,
            iconOnly: false
        };
    },
    computed: {
        getClass() {
            const arr = [];
            if (this.type) {
                arr.push(`ui-button-type-${this.type}`);
            }
            if (this.circle) {
                arr.push('ui-button-circle');
            }
            if (this.long) {
                arr.push('ui-button-long');
            }
            if (this.iconOnly) {
                arr.push('ui-button-icon-only');
            }
            if (this.currentDisabled) {
                arr.push('ui-button-disabled');
            }
            return arr;
        }
    },
    watch: {
        disabled() {
            this.currentDisabled = this.disabled;
        }
    },
    created() {
        this.iconOnly = (this.$slots.default === undefined && this.icon);
    },
    methods: {
        handleClick(event) {
            if (this.currentDisabled) return;
            if (this.notAllowed) return;

            // 点击完多少秒不能继续点
            this.notAllowed = true;
            setTimeout(() => {
                this.notAllowed = false;
            }, this.control);
            this.$emit('click', event, this);
        }
    }
};
</script>
