<template>
    <li v-show="show" :data-key="value"
        :class="{
            'ui-select-item-selected': selected,
            'ui-select-item-disabled': disabled || (wbSelect.disableLimit && !selected),
            'focus': isFocus
        }"
        @mouseover="focus"
        @mouseenter="mouseenter"
        class="ui-select-item"
    >
        <slot>{{currentLabel}}</slot>
    </li>
</template>
<script>
import * as util from '../../utils/util';
import { findComponentUpward } from '../../utils/util';
import emitter from '../../mixins/emitter';

export default {
    name: 'SelectOption',
    mixins: [emitter],
    props: {
        value: {
            type: [String, Number],
            required: true
        },
        label: {
            type: [String, Number],
            default: undefined
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentLabel: this.label,
            wbSelect: findComponentUpward(this, 'WbSelect'),
            isFocus: false
        };
    },
    computed: {
        selected() {
            if (this.wbSelect.multiple) {
                return util.isArray(this.wbSelect.currentValue) && this.wbSelect.currentValue.indexOf(this.value) != -1;
            }
            return this.wbSelect.currentValue == this.value;
        },
        show() {
            if (this.wbSelect.searchValue && this.currentLabel) {
                return this.currentLabel.indexOf(this.wbSelect.searchValue) != -1;
            }
            return true;
        }
    },
    created() {
        if (this.wbSelect) {
            this.wbSelect.addOption(this);
        } else {
            findComponentUpward(this, 'WbSelect').addOption(this);
        }
    },
    mounted() {
        this.currentLabel = this.label || this.$el.innerText || this.value;
    },
    updated() {
        this.currentLabel = this.label || this.$el.innerText || this.value;
    },
    beforeDestroy() {
        if (this.wbSelect) {
            this.wbSelect.removeOption(this);
        } else {
            findComponentUpward(this, 'WbSelect').removeOption(this);
        }
    },
    methods: {
        mouseenter(e) {
            if (e.target.clientWidth < e.target.scrollWidth) {
                // 因为 currentLabel 可能不是文本，需要加一层判断
                if (typeof this.currentLabel === 'string') {
                    e.target.setAttribute('title', this.currentLabel.trim());
                }
            } else {
                e.target.setAttribute('title', '');
            }
        },
        focus() {
            if (this.wbSelect.focusOption) {
                this.wbSelect.focusOption.isFocus = false;
            }
            this.isFocus = true;
            this.wbSelect.focusOption = this;
        }
    }
};
</script>
