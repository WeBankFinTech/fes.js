<template>
    <div v-clickoutside="formatRange" :class="{ position: inline, inline: showInline }" class="ui-calendars">
        <template v-if="range">
            <div class="ui-calendars-range">
                <calendar
                    :value="dates"
                    :format="vFormat"
                    :model="model"
                    :disabled-date="disabled"
                    :show-right-arrow="showArrow"
                    :show-time="showTime"
                    @on-change="leftRangeChange"
                    @onCurrentChange="leftCurrentChange"
                    position="left"
                />
                <calendar
                    :value="dates"
                    :format="vFormat"
                    :model="model"
                    :show-left-arrow="showArrow"
                    :disabled-date="disabled"
                    :show-time="showTime"
                    @on-change="rightRangeChange"
                    @onCurrentChange="rightCurrentChange"
                    position="right"
                />
            </div>
        </template>
        <template v-else>
            <calendar
                :value="dates"
                :format="vFormat"
                :model="model"
                :disabled-date="disabled"
                :show-time="showTime"
                @on-change="change"
            />
        </template>
        <div v-if="$slots.addon || confirm" class="ui-calendars-footer">
            <slot name="addon" />
            <div v-if="confirm || showTimeBth" class="inner-footer">
                <span v-if="showTimeBth" :class="{ disabled: confirmDisabled }" @click="onSelectTime" class="select-time">
                    {{showTime ? t('el.datepicker.footSelectDate') : t('el.datepicker.footSelectTime')}}
                </span>
                <wb-button :disabled="confirmDisabled" @click="finished" type="primary">
                    {{t('el.datepicker.confirmBtn')}}
                </wb-button>
            </div>
        </div>
    </div>
</template>

<script>
import Calendar from './calendar.vue';
import clickoutside from '../../directives/clickoutside.js';
import WbButton from '../button';
import propsMixin from './propsMixin.js';
import locale from '../../i18n/mixin.js';
import * as util from '../../utils/util.js';

export default {
    name: 'Calendars',
    components: {
        Calendar,
        WbButton
    },
    directives: {
        clickoutside
    },
    mixins: [propsMixin, locale],
    props: {
        value: {
            type: [Date, Array, Number],
            default: null
        },
        model: {
            default: 'single',
            validator(value) {
                return ['single', 'multiple', 'range'].indexOf(value) !== -1;
            }
        },
        showConfirm: {
            type: Boolean,
            default: false
        },
        showInline: {
            type: Boolean,
            default: true
        },
        // 兼容老的 API
        inline: {
            type: Boolean,
            default: true
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
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        maxDate: {
            type: Date,
            default: null
        },
        minDate: {
            type: Date,
            default: null
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
    leftTime: null,
    rightTime: null,
    data() {
        return {
            dates: null,
            showArrow: false,
            showTime: false
        };
    },
    computed: {
        range() {
            return this.model === 'range';
        },
        showTimeBth() {
            return this.vFormat.indexOf('H') !== -1;
        },
        confirm() {
            return this.showConfirm || this.vFormat.indexOf('H') !== -1 || this.model === 'multiple';
        },
        confirmDisabled() {
            if (!this.range) {
                return !this.dates || this.dates.length === 0;
            }
            return !(this.dates[0] && this.dates[1]);
        }
    },
    watch: {
        value() {
            const dates = this.get();
            if (!this.isEqual(this.value, dates)) {
                this.valueToDate(this.value);
            }
        }
    },
    created() {
        this.valueToDate(this.value);
    },
    methods: {
        get() {
            if (Array.isArray(this.dates)) {
                return this.dates[0] ? this.dates.map(item => item.getTime()) : null;
            }
            return this.dates ? this.dates.getTime() : null;
        },
        valueToDate(val) {
            if (this.model === 'single') {
                this.dates = val ? new Date(val) : null;
            } else if (!this.isEmpty(val)) {
                this.dates = val.map(item => new Date(item));
            } else {
                // 使用 [null, null] 的原因是：
                // 1. 为了统一数据结构为数组，好操作（可能换用链表或Map结构好些）。
                // 2. 用 null 填充数组是为了后续的 splice 操作，确保大的时间在右边
                this.dates = this.model === 'range' ? [null, null] : [];
            }
        },
        formatRangeStartTime(time, format) {
            const is = c => (format || this.vFormat).indexOf(c) !== -1;
            const year = time.getFullYear();
            const month = time.getMonth();
            const day = time.getDate();
            const hour = time.getHours();
            const minute = time.getMinutes();

            if (is('s')) {
                return new Date(time);
            } if (is('m') && (is('h') || is('H'))) {
                return new Date(year, month, day, hour, minute, 0);
            } if (is('D')) {
                return new Date(year, month, day, 0, 0, 0);
            } if (is('M')) {
                return new Date(year, month, 1, 0, 0, 0);
            } if (is('Y')) {
                return new Date(year, 0, 1, 0, 0, 0);
            }
            return new Date(time);
        },
        formatRangeEndTime(time, format) {
            const is = c => (format || this.vFormat).indexOf(c) !== -1;

            const newTime = new Date(time);
            if (is('s')) {
                return newTime;
            } if (is('m') && (is('h') || is('H'))) {
                return new Date(newTime.getTime() + 59 * 1000);
            } if (is('D')) {
                return new Date(newTime.getTime() + 60 * 60 * 24 * 1000 - 1000);
            } if (is('M')) {
                newTime.setMonth(newTime.getMonth() + 1);
                return new Date(newTime.getTime() - 1000);
            } if (is('Y')) {
                newTime.setFullYear(newTime.getFullYear() + 1);
                return new Date(newTime.getTime() - 1000);
            }
            throw new Error(`Error time format: ${this.vFormat}`);
        },
        resetRangeDates() {
            if (this.rangeIsComplete()) {
                this.dates = [null, null];
            }
        },
        rangeIsComplete() {
            return this.dates && this.dates[0] && this.dates[1];
        },
        leftRangeChange(date, isTime, isOut) {
            if (isOut) {
                this.rightRangeChange(date, isTime);
                return;
            }
            if (isTime) {
                this.dates.splice(0, 1, date);
            } else {
                this.resetRangeDates();
                const dates = this.dates;
                if (this.isEmpty(dates) || !this.dates[0]) {
                    dates.splice(0, 1, date);
                } else if (dates[0] > date) {
                    dates.splice(1, 1, this.formatRangeEndTime(dates[0]));
                    dates.splice(0, 1, date);
                } else {
                    dates.splice(1, 1, this.formatRangeEndTime(date));
                }
            }

            this.rangeChange(date, isTime);
        },
        rightRangeChange(date, isTime, isOut) {
            if (isOut) {
                this.leftRangeChange(date, isTime);
                return;
            }
            if (isTime) {
                this.dates.splice(1, 1, this.formatRangeEndTime(date));
            } else {
                this.resetRangeDates();
                const dates = this.dates;
                if (this.isEmpty(dates) || !this.dates[1]) {
                    dates.splice(1, 1, this.formatRangeEndTime(date));
                } else if (dates[1] > date) {
                    dates.splice(0, 1, date);
                } else {
                    dates.splice(0, 1, this.formatRangeStartTime(dates[1]));
                    dates.splice(1, 1, this.formatRangeEndTime(date));
                }
            }

            this.rangeChange(date, isTime);
        },
        rangeChange(date, isTime) {
            if (this.rangeIsComplete()) {
                if (this.contrastDate(this.dates[0], this.dates[1], this.vFormat) === 1) {
                    if (isTime && this.isSameDay(this.dates[0], this.dates[1])) {
                        // 同年同月同日 只是时间不同
                        this.dates.splice(1, 1, this.formatRangeEndTime(this.dates[0]));
                    } else {
                        const [start, end] = this.dates;
                        this.dates = [this.formatRangeStartTime(end), this.formatRangeEndTime(start)];
                    }
                }
                this.noticeParent(date, isTime);
            }
        },
        change(date, isTime) {
            if (this.model === 'single') {
                if (!this.dates || this.contrastDate(date, this.dates, this.vFormat) !== 0) {
                    this.dates = date;
                    this.noticeParent(date, isTime);
                }
            } else if (this.model === 'multiple') {
                if (isTime) {
                    this.dates.pop();
                    this.dates.push(date);
                } else {
                    const has = this.dates.findIndex(item => this.contrastDate(item, date, this.vFormat) === 0);
                    // 删除
                    if (has !== -1) {
                        this.dates.splice(has, 1);
                    } else {
                        this.dates.push(date);
                    }
                }
                this.noticeParent(date, isTime);
            }
        },
        noticeParent(date, isTime) {
            this.$emit('input', this.get());
            this.$emit('on-change', this.get(), date);
            if (!isTime && !this.confirm) {
                this.finished();
            }
        },
        beyondTimeScope(min, max, time, format) {
            return this.contrastDate(time, min, format) === -1 || this.contrastDate(time, max, format) === 1;
        },
        isTagTime(data, time, format) {
            const len = data.length;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    const item = data[i];
                    if (util.isDate(item)) {
                        return this.contrastDate(item, time, format) === 0;
                    } if (util.isFunction(item)) {
                        return item(time, format);
                    } if (
                        util.isObject(item)
                        && item.from
                        && item.to
                        && util.isDate(item.from)
                        && util.isDate(item.to)
                    ) {
                        if (!this.beyondTimeScope(item.from, item.to, time, format)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        maxRangeDisabled(time, format) {
            if (this.model === 'range' && this.maxRange && this.dates) {
                const [start, end] = this.dates;
                if (start && end) return false;
                let flagDate = start || end;
                const arr = this.maxRange.match(/(\d*)([MDY])/);
                if (flagDate && arr) {
                    const length = Number(arr[1]) - 1;
                    const type = arr[2];
                    flagDate = new Date(flagDate.getFullYear(), flagDate.getMonth(), flagDate.getDate());
                    let minDate = new Date(flagDate);
                    let maxDate = new Date(flagDate);
                    if (type === 'D') {
                        minDate.setDate(minDate.getDate() - length);
                        maxDate.setDate(maxDate.getDate() + length);
                        maxDate = this.formatRangeEndTime(maxDate, 'YYYY-MM-DD');
                    } else if (type === 'M') {
                        minDate.setMonth(minDate.getMonth() - length);
                        maxDate.setMonth(maxDate.getMonth() + length);
                        minDate = new Date(minDate.getFullYear(), minDate.getMonth());
                        maxDate = this.formatRangeEndTime(new Date(maxDate.getFullYear(), maxDate.getMonth()), 'YYYY-MM');
                    } else if (type === 'Y') {
                        minDate = new Date(minDate.getFullYear() - length, 0);
                        maxDate = this.formatRangeEndTime(new Date(maxDate.getFullYear() + length, 0), 'YYYY');
                    }
                    return this.beyondTimeScope(minDate, maxDate, time, format);
                }
            }
            return false;
        },
        disabled(time, format) {
            const min = this.minDate && this.contrastDate(time, this.minDate, format) === -1;
            const max = this.maxDate && this.contrastDate(time, this.maxDate, format) === 1;
            let enable = false;
            if (this.enable.length > 0) {
                enable = !this.isTagTime(this.enable, time, format);
            }

            return min
                || max
                || this.isTagTime(this.disable, time, format)
                || enable
                || this.maxRangeDisabled(time, format)
                || this.disabledDate(time, format);
        },
        finished() {
            this.showTime = false;
            this.$emit('on-finish');
        },
        is(c) {
            return this.vFormat.indexOf(c) !== -1;
        },
        currentChange() {
            const { leftTime, rightTime } = this.$options;
            if (leftTime && rightTime) {
                if (this.is('D')) {
                    const monthDiff = Math.abs(rightTime.month - leftTime.month);
                    if ((rightTime.year === leftTime.year && (monthDiff === 1 || monthDiff === 11))
                        || (rightTime.year - leftTime.year === 1 && monthDiff === 11)) {
                        this.showArrow = false;
                    } else {
                        this.showArrow = true;
                    }
                } else if (this.is('M')) {
                    if (Math.abs(rightTime.year - leftTime.year) <= 1) {
                        this.showArrow = false;
                    } else {
                        this.showArrow = true;
                    }
                } else if (Math.abs((rightTime.year / 10 | 0) - (leftTime.year / 10 | 0)) <= 1) {
                    this.showArrow = false;
                } else {
                    this.showArrow = true;
                }
            }
        },
        leftCurrentChange(leftTime) {
            this.$options.leftTime = leftTime;
            this.currentChange();
        },
        rightCurrentChange(rightTime) {
            this.$options.rightTime = rightTime;
            this.currentChange();
        },
        onSelectTime() {
            if (this.confirmDisabled) return;
            this.showTime = !this.showTime;
        },
        // 当用户只选择一个日期，就关闭弹窗的时候，默认将时间补充为一个范围
        formatRange() {
            if (this.range) {
                if (this.dates[1] && !this.dates[0]) {
                    const startTime = this.formatRangeStartTime(this.dates[1]);
                    this.dates.splice(0, 1, startTime);
                    this.noticeParent(startTime, false);
                } else if (this.dates[0] && !this.dates[1]) {
                    const changeDate = this.formatRangeEndTime(this.dates[0]);
                    this.dates.splice(1, 1, changeDate);
                    this.noticeParent(changeDate, false);
                }
            }
        }
    }
};
</script>
