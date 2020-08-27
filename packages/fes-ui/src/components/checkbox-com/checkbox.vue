<template>
    <label :class="getClass" :tabindex="tabindex" @click="click" @keydown="keydown" class="ui-checkbox-wrapper">
        <span :class="{ 'ui-checkbox-checked': checked }" class="ui-checkbox">
            <span class="ui-checkbox-inner" />
            <!-- <input :name="name" :value="value" :checked="checked" :disabled="disabled" class="ui-checkbox-input" type="checkbox" @click="click"> -->
        </span>
        <span class="ui-checkbox-content">
            <slot>{{label}}</slot>
        </span>
    </label>
</template>
<script>
import { findComponentUpward } from '../../utils/util.js';
import keyCode from '../../utils/keyCode.js';

export default {
    name: 'CheckBox',
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
        const parent = findComponentUpward(this, 'CheckboxGroup');
        return {
            name: '',
            checked: parent ? false : this.value,
            group: false,
            parent,
            tabindex: 0,
            isFoucs: false
        };
    },
    computed: {
        getClass() {
            const arr = [];
            if (this.checked) {
                arr.push('ui-checkbox-wrapper-checked');
            }
            if (this.readonly || (this.parent && this.parent.readonly)) {
                arr.push('ui-checkbox-wrapper-readonly');
            }
            if (this.disabled || (this.parent && this.parent.disabled)) {
                arr.push('ui-checkbox-wrapper-disabled');
            }
            if (this.isFoucs) {
                arr.push('ui-checkbox-wrapper-focus');
            }
            return arr;
        }
    },
    watch: {
        value(value) {
            if (!this.group && this.checked != value) {
                this.checked = value;
                this.$emit('change', this.checked);
                this.$emit('on-change', this.checked);
            }
        }
    },
    mounted() {
        if (this.parent) {
            if (this.parent.currentValue.indexOf(this.value) != -1) {
                this.checked = true;
            } else {
                this.checked = false;
            }
            this.parent.addItem(this);
            this.tabindex = -1;
        }
    },
    methods: {
        click() {
            if (this.disabled || this.readonly || (this.parent && this.parent.disabled) || (this.parent && this.parent.readonly)) {
                return false;
            }
            this.checked = !this.checked;
            if (this.group) {
                this.parent.change(this.value, this.checked);
            } else {
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
