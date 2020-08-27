<template>
    <div :class="getClass" @click.stop="toggle" @keydown="keydown" class="ui-switch" tabindex="0">
        <div class="ui-switch-circle" />
        <slot v-if="currentValue" name="open" />
        <slot v-else name="close" />
    </div>
</template>
<script>
import emitter from '../../mixins/emitter';
import keyCode from '../../utils/keyCode.js';

export default {
    name: 'WbSwitch',
    mixins: [emitter],
    props: {
        value: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        confirm: {
            type: Function,
            default: undefined
        }
    },
    data() {
        return {
            currentValue: this.value
        };
    },
    computed: {
        getClass() {
            const classes = {
                'ui-switch-on': this.currentValue,
                'ui-switch-off': !this.currentValue,
                'ui-switch-readonly': this.readonly,
                'ui-switch-disabled': this.disabled
            };
            return classes;
        }
    },
    watch: {
        value(val) {
            this.currentValue = val;
        }
    },
    methods: {
        toggle() {
            if (this.disabled || this.readonly) return;
            if (this.confirm) {
                this.confirm(this.currentValue).then(() => {
                    this.currentValue = !this.currentValue;
                    this.$emit('input', this.currentValue);
                    this.$emit('on-change', this.currentValue);
                    this.dispatch('FormItem', 'on-form-change', [this.currentValue]);
                });
            } else {
                this.currentValue = !this.currentValue;
                this.$emit('input', this.currentValue);
                this.$emit('on-change', this.currentValue);
                this.dispatch('FormItem', 'on-form-change', [this.currentValue]);
            }
        },
        keydown(e) {
            if (this.disabled || this.readonly) return;
            if (e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER || e.keyCode == keyCode.SPACE) {
                e.preventDefault();
                this.toggle();
            }
        }
    }
};
</script>
