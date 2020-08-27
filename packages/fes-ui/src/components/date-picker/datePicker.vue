<template>
    <div v-clickoutside="hidePopup" class="ui-date-picker">
        <readonly-input
            :class="model"
            :value="text"
            :placeholder="placeholder || t('el.datepicker.selectDate')"
            :icon="icon"
            :disabled="disabled"
            :readonly="readonly"
            :clearable="clearable"
            @on-focus="$emit('on-focus', $event)"
            @on-blur="onBlur"
            @clear="clear"
            @click="showPopup"
            @keydown="keydown"
        >
            <span v-if="model === 'range' && text.length > 0">
                <span>{{text[0]}}</span><span class="range-separator">{{rangeSeparator}}</span><span>{{text[1]}}</span>
            </span>
        </readonly-input>
        <picker-popup :show="show" :position="position">
            <calendars
                v-model="dates"
                :model="model"
                :format="format"
                :disabled-date="disabledDate"
                :enable-time="enableTime"
                :enable-seconds="enableSeconds"
                :only-month="onlyMonth"
                :show-confirm="showConfirm"
                :show-inline="false"
                :min-date="minDate"
                :max-date="maxDate"
                :max-range="maxRange"
                :disable="disable"
                :enable="enable"
                @on-change="change"
                @on-finish="finish"
            >
                <template v-slot:addon>
                    <slot name="addon" />
                </template>
            </calendars>
        </picker-popup>
    </div>
</template>

<script>
import Calendars from './calendars.vue';
import ReadonlyInput from '../v-readonly-input';
import PickerPopup from '../v-picker-popup';
import keyCode from '../../utils/keyCode';
import propsMixin from './propsMixin';
import clickoutside from '../../directives/clickoutside';
import locale from '../../i18n/mixin';
import emitter from '../../mixins/emitter';

export default {
    name: 'InputDatePicker',
    directives: {
        clickoutside
    },
    components: {
        Calendars,
        ReadonlyInput,
        PickerPopup
    },
    mixins: [propsMixin, locale, emitter],
    props: {
        icon: {
            type: String,
            default: 'md-calendar'
        },
        value: {
            type: [Date, Array, Number],
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            default: null
        },
        model: {
            default: 'single',
            validator(value) {
                // 这个值必须匹配下列字符串中的一个
                return ['single', 'multiple', 'range'].indexOf(value) !== -1;
            }
        },
        showConfirm: {
            type: Boolean,
            default: false
        },
        rangeSeparator: {
            type: String,
            default: '~'
        },
        clearable: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择日期'
        },
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        enableTime: {
            type: Boolean,
            default: false
        },
        enableSeconds: {
            type: Boolean,
            default: false
        },
        onlyMonth: {
            type: Boolean,
            default: false
        },
        minDate: {
            type: Date,
            default: undefined
        },
        maxDate: {
            type: Date,
            default: undefined
        },
        maxRange: {
            // 7D七天， 1M一个月， 2Y两年
            type: String,
            default: undefined
        },
        disable: {
            // 禁用的时间
            type: Array,
            default() {
                return [];
            }
        },
        enable: {
            // 允许的时间
            type: Array,
            default() {
                return [];
            }
        },
        disabledDate: {
            type: Function,
            default: () => false
        }
    },
    data() {
        return {
            show: false,
            dates: this.value
        };
    },
    computed: {
        text() {
            const dates = this.dates;
            if (this.isEmpty(dates)) return '';
            if (this.model === 'single') {
                return this.timeFormat(new Date(dates));
            } if (this.model === 'range') {
                return dates.map(date => this.timeFormat(new Date(date)));
            }
            return dates.map(date => this.timeFormat(new Date(date))).join(', ');
        }
    },
    watch: {
        value() {
            if (!this.isEqual(this.value, this.dates)) {
                this.dates = this.value;
            }
        }
    },
    methods: {
        hidePopup() {
            if (this.show) {
                this.show = false;
                this.dispatch('FormItem', 'on-form-blur', [this.dates]);
            }
        },
        showPopup() {
            if (!(this.readonly || this.disabled)) {
                this.show = true;
            }
        },
        keydown(e) {
            if (e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER) {
                this.$emit('on-enter', e);
            } else if (!this.show) {
                if (e.keyCode == keyCode.SPACE || e.keyCode == keyCode.TAB) {
                    e.preventDefault();
                    this.showPopup();
                }
            }
        },
        clear() {
            this.$emit('clear');
            this.$emit('input', this.model === 'single' ? null : []);
        },
        change(dates, time) {
            this.$emit('input', dates, time);
            this.$emit('on-input', dates, time);
            this.$emit('on-change', dates, time);
            this.$emit('on-input-change', dates, time);
            this.dispatch('FormItem', 'on-form-change', [dates]);
        },
        onBlur(event) {
            this.$emit('on-blur', event);
            // this.hidePopup();
        },
        finish() {
            this.hidePopup();
        }
    }
};
</script>
