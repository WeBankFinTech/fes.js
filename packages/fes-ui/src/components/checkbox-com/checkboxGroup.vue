<template>
    <div :class="getClass" @keydown="keydown" @focus="focus" @blur="blur" class="ui-checkbox-group" tabindex="0">
        <slot />
    </div>
</template>
<script>
import Emitter from '../../mixins/emitter';
import keyCode from '../../utils/keyCode.js';

export default {
    name: 'CheckboxGroup',
    mixins: [Emitter],
    props: {
        value: {
            type: Array,
            default() {
                return [];
            }
        },
        vertical: {
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
        }
    },
    data() {
        return {
            currentValue: this.value,
            name: `checkbox_${new Date().getTime()}`,
            options: [],
            focusIndex: null
        };
    },
    computed: {
        getClass() {
            const arr = [];
            if (this.vertical) {
                arr.push('ui-checkbox-group-vertical');
            }
            return arr;
        }
    },
    watch: {
        value() {
            this.currentValue = this.value;
            this.updateChild();
        },
        focusIndex(val, old) {
            if (this.$children[old]) this.$children[old].isFoucs = false;
            if (this.$children[val]) this.$children[val].isFoucs = true;
        }
    },
    methods: {
        updateChild() {
            this.options.forEach((child) => {
                if (this.currentValue.indexOf(child.value) != -1) {
                    child.checked = true;
                } else {
                    child.checked = false;
                }
            });
        },
        addItem(checkbox) {
            checkbox.name = this.name;
            checkbox.group = true;
            this.options.push(checkbox);
        },
        change(value, checked) {
            if (checked) {
                this.currentValue.push(value);
            } else {
                const index = this.currentValue.indexOf(value);
                if (index != -1) {
                    this.currentValue.splice(index, 1);
                } else {
                    console.warn('checkbox组件出现异常');
                }
            }
            this.changeValue();
        },
        changeValue() {
            this.$emit('input', this.currentValue);
            this.$emit('change', this.currentValue);
            this.$emit('on-change', this.currentValue);
            this.dispatch('FormItem', 'on-form-change', [this.currentValue]);
        },
        keydown(e) {
            if (this.disabled || this.readonly) return;
            if (e.keyCode == keyCode.DOWN || e.keyCode == keyCode.RIGHT) {
                e.preventDefault();
                this.focusIndex += 1;
                if (this.focusIndex > this.$children.length - 1) {
                    this.focusIndex = 0;
                }
                const option = this.$children[this.focusIndex];
                if (option.disabled || option.readonly) {
                    this.keydown(e);
                }
            }
            if (e.keyCode == keyCode.UP || e.keyCode == keyCode.LEFT) {
                e.preventDefault();
                this.focusIndex -= 1;
                if (this.focusIndex < 0) {
                    this.focusIndex = this.$children.length - 1;
                }
                const option = this.$children[this.focusIndex];
                if (option.disabled || option.readonly) {
                    this.keydown(e);
                }
            }
            if (e.keyCode == keyCode.SPACE || e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER) {
                e.preventDefault();
                const option = this.$children[this.focusIndex];
                option.click();
            }
        },
        focus() {
            if (this.disabled || this.readonly) return;
            const len = this.$children.length;
            if (len > 0) {
                this.focusIndex = 0;
            }
        },
        blur() {
            this.focusIndex = null;
        }
    }
};
</script>
