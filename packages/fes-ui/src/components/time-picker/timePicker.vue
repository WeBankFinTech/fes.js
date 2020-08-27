<template>
    <div v-clickoutside="outside" class="ui-time-picker">
        <readonly-input
            :value="times"
            :placeholder="placeholder || t('el.timepicker.placeholder')"
            :icon="icon"
            :disabled="disabled"
            :readonly="readonly"
            :clearable="clearable"
            @clear="clear"
            @click="showPopup"
            @keydown="keydown"
        />
        <picker-popup :show="show">
            <time-select
                v-model="times"
                :format="format"
                :hour-step="hourStep"
                :minute-step="minuteStep"
                :second-step="secondStep"
                :disabled-hours="disabledHours"
                :disabled-minutes="disabledMinutes"
                :disabled-seconds="disabledSeconds"
                @blur="selectBlur"
            />
            <slot name="addon" />
        </picker-popup>
    </div>
</template>

<script>
import TimeSelect from './pickerContent.vue';
import ReadonlyInput from '../v-readonly-input';
import PickerPopup from '../v-picker-popup';
import clickoutside from '../../directives/clickoutside.js';
import keyCode from '../../utils/keyCode.js';
import emitter from '../../mixins/emitter';
import locale from '../../i18n/mixin.js';

export default {
    name: 'TimePicker',
    directives: {
        clickoutside
    },
    components: {
        TimeSelect,
        ReadonlyInput,
        PickerPopup
    },
    mixins: [emitter, locale],
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: 'md-time'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: 'HH:mm:ss'
        },
        hourStep: {
            type: Number,
            default: 1
        },
        minuteStep: {
            type: Number,
            default: 1
        },
        secondStep: {
            type: Number,
            default: 1
        },
        disabledHours: {
            type: Function,
            default: undefined
        },
        disabledMinutes: {
            type: Function,
            default: undefined
        },
        disabledSeconds: {
            type: Function,
            default: undefined
        }
    },
    data() {
        return {
            show: false,
            times: this.value || ''
        };
    },
    watch: {
        value() {
            if (this.times !== this.value) {
                this.times = this.value;
            }
        },
        times() {
            this.$emit('input', this.times);
            this.$emit('change', this.times);
            // 适配表单
            this.dispatch('FormItem', 'on-form-change', [this.times]);
        }
    },
    methods: {
        outside() {
            if (this.show) {
                this.show = false;
                this.dispatch('FormItem', 'on-form-blur', [this.times]);
            }
        },
        showPopup() {
            if (this.readonly || this.disabled) return;
            this.show = true;
        },
        keydown(e) {
            if (!this.show) {
                if (e.keyCode == keyCode.SPACE || e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER || e.keyCode == keyCode.TAB) {
                    // e.preventDefault();
                    this.showPopup();
                }
            }
        },
        selectBlur() {
            this.outside();
        },
        clear() {
            this.times = '';
        }
    }
};
</script>
