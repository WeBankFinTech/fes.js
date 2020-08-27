<template>
    <div class="ui-calendar">
        <div class="ui-calendar-head">
            <div class="ui-calendar-head-left">
                <span
                    v-show="showYears && showLeftArrow"
                    @click="current.year -= 10"
                    class="icon"
                >
                    <Icon type="ios-arrow-back" size="10" />
                    <Icon class="next-icon" type="ios-arrow-back" size="10" />
                </span>
                <span
                    v-show="!showYears && showLeftArrow"
                    @click="current.year--"
                    class="icon"
                >
                    <Icon type="ios-arrow-back" size="10" />
                    <Icon class="next-icon" type="ios-arrow-back" size="10" />
                </span>
                <Icon
                    v-show="!showYears && !showMonths && showLeftArrow"
                    @click="monthToPre"
                    class="icon"
                    type="ios-arrow-back"
                    size="10"
                />
            </div>
            <div class="ui-calendar-head-middle">
                <a v-show="showYears">{{yearStart + "-" + yearEnd}}</a>
                <template v-if="t('el.datepicker.yearSuffix')">
                    <a v-show="!showYears" @click="showYears = !showYears">{{current.year}}
                        {{t("el.datepicker.yearSuffix")}}</a>
                    <a
                        v-show="!showYears && !showMonths"
                        @click="showMonths = !showMonths"
                    >{{t("el.datepicker.month" + (current.month + 1))}}</a>
                </template>
                <template v-else>
                    <a
                        v-show="!showYears && !showMonths"
                        @click="showMonths = !showMonths"
                    >{{t("el.datepicker.month" + (current.month + 1))}}</a>
                    <a v-show="!showYears" @click="showYears = !showYears">{{current.year}}</a>
                </template>
            </div>
            <div class="ui-calendar-head-right">
                <Icon
                    v-show="!showYears && !showMonths && showRightArrow"
                    @click="monthToNext"
                    class="icon"
                    type="ios-arrow-forward"
                    size="10"
                />
                <span
                    v-show="!showYears && showRightArrow"
                    @click="current.year++"
                    class="icon"
                >
                    <Icon type="ios-arrow-forward" size="10" />
                    <Icon
                        class="next-icon"
                        type="ios-arrow-forward"
                        size="10"
                    />
                </span>
                <span
                    v-show="showYears && showRightArrow"
                    @click="current.year += 10"
                    class="icon"
                >
                    <Icon type="ios-arrow-forward" size="10" />
                    <Icon
                        class="next-icon"
                        type="ios-arrow-forward"
                        size="10"
                    />
                </span>
            </div>
        </div>
        <div class="ui-calendar-body">
            <div v-if="hasDay" class="ui-calendar-days">
                <span
                    v-for="week in WEEKS"
                    :key="week"
                    class="ui-calendar-week"
                >{{t("el.datepicker.weeks." + week)}}</span>
                <span
                    v-for="(item, i) in days"
                    :key="i"
                    :class="dayCls(item)"
                    @click="is($event) && selectedDay(item)"
                >{{item.day}}</span>
            </div>
            <div v-if="hasMonth" v-show="showMonths" class="ui-calendar-months">
                <span
                    v-for="(month, i) in months"
                    :key="i"
                    :class="monthCls(i)"
                    @click="is($event) && selectedMonth(i)"
                >{{t("el.datepicker.months." + month)}}</span>
            </div>
            <div v-show="showYears" class="ui-calendar-years">
                <span
                    v-for="(i, j) in years"
                    :key="j"
                    :class="yearCls(i, j)"
                    @click="is($event) && selectedYear(i)"
                >{{i}}</span>
            </div>
            <div v-if="vShowTime" class="ui-calendar-times-wrapper">
                <div class="ui-calendar-title">
                    {{timeTitle}}
                </div>
                <div class="ui-calendar-times">
                    <time-select
                        v-model="times"
                        :format="tFormat"
                        :disabled-hours="disabledHours"
                        :disabled-minutes="disabledMinutes"
                        :disabled-seconds="disabledSeconds"
                        @change="changeTimes"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../icon';
import TimeSelect from '../time-picker/pickerContent.vue';
import propsMixin from './propsMixin';
import locale from '../../i18n/mixin';

const YEAR_NUM = 1;
const MONTH_NUM = 2;
const DAY_NUM = 4;
const HOUR_NUM = 8;
const MINUTE_NUM = 16;
const SECOND_NUM = 32;
const YEAR_MONTH = YEAR_NUM + MONTH_NUM;
const YEAR_MONTH_DAY = YEAR_MONTH + DAY_NUM;
const YEAR_MONTH_DAY_HOUR = YEAR_MONTH_DAY + HOUR_NUM;
const YEAR_MONTH_DAY_HOUR_MINUTE = YEAR_MONTH_DAY_HOUR + MINUTE_NUM;
const YEAR_MONTH_DAY_HOUR_MINUTE_SECOND = YEAR_MONTH_DAY_HOUR_MINUTE + SECOND_NUM;

const WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default {
    name: 'Calendar',
    components: {
        Icon,
        TimeSelect
    },
    mixins: [propsMixin, locale],
    props: {
        value: {
            type: [Date, Array],
            default() {
                return new Date();
            }
        },
        model: {
            default: 'single',
            validator(value) {
                return ['single', 'range', 'multiple'].indexOf(value) !== -1;
            }
        },
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        position: {
            default: undefined,
            validator(value) {
                return ['left', 'right'].includes(value);
            }
        },
        disabledDate: {
            type: Function,
            default() {
                return false;
            }
        },
        showLeftArrow: {
            type: Boolean,
            default: true
        },
        showRightArrow: {
            type: Boolean,
            default: true
        },
        showTime: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            months: [
                'jan',
                'feb',
                'mar',
                'apr',
                'may',
                'jun',
                'jul',
                'aug',
                'sep',
                'oct',
                'nov',
                'dec'
            ],
            pattern: 0,
            showYears: false,
            showMonths: false,
            showHours: false,
            showMinutes: false,
            showSeconds: false,
            times: '',
            current: {}
        };
    },
    computed: {
        weekFirstDay() {
            return Number.parseInt(this.t('el.datepicker.weekFirstDay'));
        },
        WEEKS() {
            const week = this.weekFirstDay;
            return WEEKS.concat(WEEKS).slice(week, week + 7);
        },
        yearStart() {
            return parseInt(this.current.year / 10) * 10;
        },
        yearEnd() {
            return this.yearStart + 9;
        },
        years() {
            const arr = [];
            let start = this.yearStart;
            while (arr.length < 10) {
                arr.push(start++);
            }
            return arr;
        },
        days() {
            const days = [];
            const { year, month } = this.current;
            const time = new Date(year, month, 1);
            const weekFirstDay = this.weekFirstDay;
            time.setDate(0); // switch to the last day of last month
            let lastDay = time.getDate();
            const week = time.getDay() || 7;
            let count = weekFirstDay <= week
                ? week - weekFirstDay + 1
                : week + (7 - weekFirstDay + 1);
            while (count > 0) {
                days.push({
                    day: lastDay - count + 1,
                    year: month > 0 ? year : year - 1,
                    month: month > 0 ? month - 1 : 11,
                    pre: true
                });
                count--;
            }
            time.setMonth(time.getMonth() + 2, 0); // switch to the last day of the current month
            lastDay = time.getDate();
            let i = 1;
            for (i = 1; i <= lastDay; i++) {
                days.push({
                    day: i,
                    year,
                    month
                });
            }
            for (i = 1; days.length < 42; i++) {
                days.push({
                    day: i,
                    year: month < 11 ? year : year + 1,
                    month: month < 11 ? month + 1 : 0,
                    next: true
                });
            }
            return days;
        },
        hasMonth() {
            return this.pattern >= YEAR_MONTH;
        },
        hasDay() {
            return this.pattern >= YEAR_MONTH_DAY;
        },
        hasHour() {
            return this.pattern >= YEAR_MONTH_DAY_HOUR;
        },
        hasMinute() {
            return this.pattern >= YEAR_MONTH_DAY_HOUR_MINUTE;
        },
        hasSecond() {
            return this.pattern >= YEAR_MONTH_DAY_HOUR_MINUTE_SECOND;
        },
        tFormat() {
            const tf = [];
            if (this.hasHour) {
                tf.push('HH');
            }
            if (this.hasMinute) {
                tf.push('mm');
            }
            if (this.hasSecond) {
                tf.push('ss');
            }
            return tf.join(':');
        },
        vShowTime() {
            return this.showTime && this.pattern >= YEAR_MONTH_DAY_HOUR;
        },
        getSeletedTime() {
            const dates = this.value;
            if (this.model === 'single') return [dates];
            return dates.filter(date => date);
        },
        timeTitle() {
            const timeTitleFormat = this.t('el.datepicker.timeTitle');
            if (this.model === 'single') {
                return this.timeFormat(this.value, timeTitleFormat);
            }
            if (this.model === 'multiple') {
                return this.timeFormat(
                    this.value[this.value.length - 1],
                    timeTitleFormat
                );
            }
            if (this.position === 'left') {
                return this.timeFormat(this.value[0], timeTitleFormat);
            }
            return this.timeFormat(this.value[1], timeTitleFormat);
        }
    },
    watch: {
        value(val) {
            this.initTime(val);
        },
        current: {
            handler() {
                this.$emit('onCurrentChange', this.current);
            },
            deep: true
        }
    },
    created() {
        const is = c => this.format.indexOf(c) !== -1;
        if (is('Y')) {
            this.pattern += YEAR_NUM;
        }
        if (is('M')) {
            this.pattern += MONTH_NUM;
        }
        if (is('D')) {
            this.pattern += DAY_NUM;
        }
        if (is('H')) {
            this.pattern += HOUR_NUM;
        }
        if (is('m')) {
            this.pattern += MINUTE_NUM;
        }
        if (is('s')) {
            this.pattern += SECOND_NUM;
        }

        if (this.pattern === YEAR_NUM) {
            this.showYears = true;
        } else if (this.pattern === YEAR_MONTH) {
            this.showMonths = true;
        }
        this.initTime(this.value);
    },
    methods: {
        parseDate(date) {
            const vDate = new Date(date);
            return {
                year: vDate.getFullYear(),
                month: vDate.getMonth(),
                day: vDate.getDate(),
                hour: vDate.getHours(),
                minute: vDate.getMinutes(),
                second: vDate.getSeconds(),
                raw: vDate
            };
        },
        defaultDate() {
            const date = new Date();
            if (this.model === 'range' && this.position === 'right') {
                if (this.hasDay) {
                    date.setMonth(date.getMonth() + 1);
                } else if (this.pattern === YEAR_MONTH) {
                    date.setFullYear(date.getFullYear() + 1);
                } else if (this.pattern === YEAR_NUM) {
                    date.setFullYear(date.getFullYear() + 10);
                }
            }

            return date;
        },
        initTime(value) {
            this.times = this.getTime(value);
            // 如果为 range 并且在一个 calendar, current 不能跟着变动
            this.current = this.getCurrentDate(value);
        },
        padStartZero(target, len = 2) {
            return `${target}`.padStart(len, '0');
        },
        getTime(date) {
            const { hour, minute, second } = this.get(date, true);
            const tf = [];
            if (this.hasHour) {
                tf.push(this.padStartZero(hour));
            }
            if (this.hasMinute) {
                tf.push(this.padStartZero(minute));
            }
            if (this.hasSecond) {
                tf.push(this.padStartZero(second));
            }
            return tf.join(':');
        },
        getRangeDate(date, activeDate) {
            if (this.inOnePanel(date, this.format)) {
                if (date[0].getFullYear() === activeDate.getFullYear()) {
                    if (
                        (this.position === 'left'
                        && date[0].getMonth() <= activeDate.getMonth())
                        || (this.position === 'right'
                        && date[0].getMonth() >= activeDate.getMonth())
                    ) {
                        return date[0];
                    }
                }
                return activeDate;
            }
            if (this.position === 'left') {
                return date[0] || activeDate;
            }
            return date[1] || activeDate;
        },
        getCurrentDate(date) {
            const { year, month, day } = this.get(date);
            return { year, month, day };
        },
        get(date, isTime) {
            let activeDate = this.defaultDate();
            if (!this.isEmpty(date)) {
                const model = this.model;
                if (model === 'multiple') {
                    activeDate = date[date.length - 1];
                } else if (model === 'range') {
                    if (!isTime) {
                        activeDate = this.getRangeDate(date, activeDate);
                    } else {
                        activeDate = (this.position === 'left' ? date[0] : date[1])
                            || activeDate;
                    }
                } else if (model === 'single') {
                    activeDate = date;
                }
            }

            return this.parseDate(activeDate);
        },
        isSelected(time, format) {
            if (this.isEmpty(this.value)) return false;

            const selectedTimes = this.getSeletedTime;
            return selectedTimes.some((item) => {
                const flag = this.timeFormat(item, format)
                    === this.timeFormat(time, format);
                if (this.model === 'range') {
                    if (this.pattern >= YEAR_MONTH_DAY) {
                        return flag && this.current.month === time.getMonth();
                    }
                    if (this.pattern === YEAR_NUM) {
                        return (
                            flag
                            && ((this.current.year / 10) | 0)
                                === ((time.getFullYear() / 10) | 0)
                        );
                    }
                }
                return flag;
            });
        },
        isSelectedYear(time, format) {
            if (this.pattern !== YEAR_NUM) {
                return time.getFullYear() === this.current.year;
            }
            return this.isSelected(time, format);
        },
        isSelectedMonth(time, format) {
            if (this.pattern !== YEAR_MONTH) {
                return time.getMonth() === this.current.month;
            }
            return this.isSelected(time, format);
        },
        inRangeDate(time, format) {
            if (this.model === 'range' && !this.isEmpty(this.value)) {
                const [start, end] = this.value;
                const isIn = start
                    && end
                    && this.contrastDate(time, start, format) === 1
                    && this.contrastDate(time, end, format) === -1;
                if (this.pattern >= YEAR_MONTH_DAY) {
                    return isIn && time.getMonth() === this.current.month;
                }
                return isIn;
            }
            return false;
        },
        yearCls(year) {
            const time = new Date(year, 0);
            const format = 'YYYY';
            const cls = {
                'ui-calendar-date': true,
                'ui-calendar-date-disabled': this.disabledDate(time, format),
                'ui-calendar-date-selected': this.isSelectedYear(time, format)
            };
            if (this.pattern === YEAR_NUM) {
                cls['ui-calendar-date-on'] = this.inRangeDate(time, format);
            }
            return cls;
        },
        monthCls(month) {
            const format = 'YYYY-MM';
            const year = this.current.year;
            const time = new Date(year, month);
            const cls = {
                'ui-calendar-date': true,
                'ui-calendar-date-disabled': this.disabledDate(time, format),
                'ui-calendar-date-selected': this.isSelectedMonth(time, format)
            };
            if (this.pattern === YEAR_MONTH) {
                cls['ui-calendar-date-on'] = this.inRangeDate(time, format);
            }
            return cls;
        },
        dayCls(item) {
            const format = 'YYYY-MM-DD';
            const { year, month } = item;
            const maxDay = new Date(year, month + 1, 0).getDate();
            const day = item.day > maxDay ? maxDay : item.day;
            const time = new Date(year, month, day);
            return {
                'ui-calendar-date-out': item.pre || item.next,
                'ui-calendar-date': true,
                'ui-calendar-date-disabled': this.disabledDate(time, format),
                'ui-calendar-date-on': this.inRangeDate(time, format),
                'ui-calendar-date-selected': this.isSelected(time, format),
                'ui-calendar-date-today':
                    this.timeFormat(time, format)
                    === this.timeFormat(new Date(), format)
            };
        },
        getTimesDate() {
            if (
                this.model === 'range'
                && this.inOnePanel(this.value, 'YYYY-MM-DD')
            ) {
                if (this.position === 'left') {
                    return this.parseDate(this.value[0]);
                }
                return this.parseDate(this.value[1]);
            }
            return this.current;
        },
        disabledHours() {
            const { year, month, day } = this.getTimesDate();
            const format = 'YYYY-MM-DD HH';
            const disableds = [];
            const time = new Date(year, month, day, 0);
            const dayEqual = this.position === 'right'
                && this.isSameDay(this.value[0], time);
            const leftRangeHour = this.position === 'right' ? this.value[0].getHours() : 0;
            for (let i = 0; i < 24; i++) {
                time.setHours(i);
                if (
                    this.disabledDate(time, format)
                    || (dayEqual && leftRangeHour > i)
                ) {
                    disableds.push(i);
                }
            }
            return disableds;
        },
        disabledMinutes() {
            const { year, month, day } = this.getTimesDate();
            const format = 'YYYY-MM-DD HH:mm';
            const disableds = [];
            const hour = this.times
                ? Number.parseInt(this.times.split(':')[0])
                : 0;
            const time = new Date(year, month, day, hour);
            const dayEqual = this.position === 'right'
                && this.isSameDay(this.value[0], time);
            for (let i = 0; i < 60; i++) {
                time.setMinutes(i);
                if (
                    this.disabledDate(time, format)
                    || (dayEqual
                    && this.contrastDate(this.value[0], time, format) === 1)
                ) {
                    disableds.push(i);
                }
            }
            return disableds;
        },
        disabledSeconds() {
            const { year, month, day } = this.getTimesDate();
            const format = 'YYYY-MM-DD HH:mm:ss';
            const disableds = [];
            const [hour, minute] = this.times
                ? this.times.split(':').map(item => parseInt(item))
                : [0, 0];
            const time = new Date(year, month, day, hour, minute);
            const dayEqual = this.position === 'right'
                && this.isSameDay(this.value[0], time);
            for (let i = 0; i < 60; i++) {
                time.setSeconds(i);
                if (
                    this.disabledDate(time, format)
                    || (dayEqual
                    && this.contrastDate(this.value[0], time, format) === 1)
                ) {
                    disableds.push(i);
                }
            }
            return disableds;
        },
        monthToNext() {
            if (this.current.month < 11) {
                this.current.month++;
            } else {
                this.current.month = 0;
                this.current.year++;
            }
        },
        monthToPre() {
            if (this.current.month > 0) {
                this.current.month--;
            } else {
                this.current.month = 11;
                this.current.year--;
            }
        },
        is(e) {
            return (
                e.target.className.indexOf('ui-calendar-date-disabled') === -1
            );
        },
        selectedYear(year) {
            const pattern = this.pattern;
            this.showYears = pattern === YEAR_NUM;

            if (pattern === YEAR_NUM) {
                let isOut = false;
                if (this.model === 'range') {
                    if (
                        (!this.showLeftArrow
                        && ((year / 10) | 0)
                            < ((this.current.year / 10) | 0))
                        || (!this.showRightArrow
                        && ((year / 10) | 0) > ((this.current.year / 10) | 0))
                    ) {
                        isOut = true;
                    }
                }
                if (!isOut) {
                    this.current.year = year;
                }
                const date = new Date(year, 0);
                this.onChange(date, false, isOut);
            } else {
                this.current.year = year;
            }
        },
        selectedMonth(month) {
            const pattern = this.pattern;
            this.current.month = month;
            this.showMonths = pattern === YEAR_MONTH;
            if (pattern === YEAR_MONTH) {
                const date = new Date(this.current.year, month);
                this.onChange(date);
            }
        },
        timesToNum() {
            const timesArr = this.times.split(':');
            let hour = 0;
            let minute = 0;
            let second = 0;
            if (this.hasHour) {
                hour = Number.parseInt(timesArr.shift());
            }
            if (this.hasMinute) {
                minute = Number.parseInt(timesArr.shift());
            }
            if (this.hasSecond) {
                second = Number.parseInt(timesArr.shift());
            }
            return { hour, minute, second };
        },
        selectedDay(info) {
            let isOut = false;
            if (this.model === 'range') {
                if (
                    (!this.showLeftArrow && info.pre)
                    || (!this.showRightArrow && info.next)
                ) {
                    isOut = true;
                }
            }

            if (!isOut) {
                info.next && this.monthToNext();
                info.pre && this.monthToPre();
                this.current.day = info.day;
            }

            const { year, month, day } = info;
            const { hour, minute, second } = this.timesToNum();
            const date = new Date(year, month, day, hour, minute, second);
            this.onChange(date, false, isOut);
        },
        changeTimes() {
            let date;
            if (this.model === 'single') {
                date = this.parseDate(this.value);
            } else if (this.model === 'range') {
                if (this.position === 'left') {
                    date = this.parseDate(this.value[0]);
                } else {
                    date = this.parseDate(this.value[1]);
                }
            } else {
                date = this.parseDate(this.value[this.value.length - 1]);
            }
            const { hour, minute, second } = this.timesToNum();
            this.onChange(
                new Date(date.year, date.month, date.day, hour, minute, second),
                true
            );
        },
        onChange(date, isTime, isOut) {
            this.$emit('on-change', date, isTime, isOut);
        }
    }
};
</script>
