<template>
    <label :class="getClass" :tabindex="tabindex" @click="click" @keydown="keydown" class="ui-radio-wrapper">
        <span :class="{ 'ui-radio-checked': checked }" class="ui-radio">
            <span class="ui-radio-inner" />
        </span>
        <span class="ui-radio-content">
            <slot>{{label}}</slot>
        </span>
    </label>
</template>
<script>
import { findComponentUpward } from '../../utils/util.js';
import keyCode from '../../utils/keyCode.js';

export default {
    name: 'Radio',
    props: {
        value: {
            type: [String, Number, Boolean],
            default: false
        },
        label: {
            type: [String, Number],
            default: undefined
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
            name: '',
            group: false,
            checked: this.value,
            tabindex: 0,
            parent: findComponentUpward(this, 'RadioGroup'),
            isFoucs: false
        };
    },
    computed: {
        getClass() {
            const arr = [];
            if (this.checked) {
                arr.push('ui-radio-wrapper-checked');
            }
            if (this.readonly || (this.parent && this.parent.readonly)) {
                arr.push('ui-radio-wrapper-readonly');
            }
            if (this.disabled || (this.parent && this.parent.disabled)) {
                arr.push('ui-radio-wrapper-disabled');
            }
            if (this.isFoucs) {
                arr.push('ui-radio-wrapper-focus');
            }
            return arr;
        }
    },
    watch: {
        value(value) {
            if (!this.group) {
                this.checked = value;
                this.$emit('change', this.checked);
                this.$emit('on-change', this.checked);
            }
        }
    },
    mounted() {
        if (this.parent) {
            this.checked = false;
            this.tabindex = -1;
            this.parent.addItem(this);
        }
    },
    methods: {
        click() {
            if (this.disabled || this.readonly || (this.parent && this.parent.disabled) || (this.parent && this.parent.readonly)) {
                return false;
            }
            if (this.group) {
                if (this.checked) {
                    return false;
                }
                this.parent.change(this.value);
            } else {
                this.checked = !this.checked;
                this.$emit('click', this.checked);
                this.$emit('input', this.checked);
                this.$emit('change', this.checked);
                this.$emit('on-change', this.checked);
            }
        },
        keydown(e) {
            if (this.disabled || this.readonly || (this.parent && this.parent.disabled) || (this.parent && this.parent.readonly)) {
                return false;
            }
            if (this.group) {
                return;
            }
            if (e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER || e.keyCode == keyCode.SPACE) {
                e.preventDefault();
                this.click();
            }
        }
    }
};
</script>
