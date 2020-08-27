<template>
    <div @keydown="keydown" class="ui-time-picker-content" tabindex="0">
        <picker-item
            v-if="hours"
            :times="hours"
            :value="selectedHour"
            :focus="focus['1']"
            @change="changeSelectedHour"
        />
        <picker-item
            v-if="minutes"
            :times="minutes"
            :value="selectedMinute"
            :focus="focus['2']"
            @change="changeSelectedMinute"
        />
        <picker-item
            v-if="seconds"
            :times="seconds"
            :value="selectedSeconds"
            :focus="focus['4']"
            @change="changeSelectedSeconds"
        />
    </div>
</template>

<script>
import keyCode from '../../utils/keyCode.js';
import PickerItem from './PickerItem';

export default {
    components: {
        PickerItem
    },
    props: {
        value: {
            type: String,
            default: ''
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
        const { hour = '', minute = '', seconds = '' } = this.parseTime();
        return {
            show: false,
            hasFocus: false,
            selectedHour: hour,
            selectedMinute: minute,
            selectedSeconds: seconds,
            focus: {
                1: -1,
                2: -1,
                4: -1
            },
            historyFocus: {
                1: -1,
                2: -1,
                4: -1
            },
            focusType: '' // 当前获取焦点的时间类型
        };
    },
    computed: {
        bit() {
            let num = 0;
            if (/H/.test(this.format)) {
                num += 1;
            }
            if (/m/.test(this.format)) {
                num += 2;
            }
            if (/s/.test(this.format)) {
                num += 4;
            }
            return num;
        },
        tabindex() {
            if (this.disabled || this.readonly) {
                return -1;
            }
            return 0;
        },
        hours() {
            const disabledHours = this.disabledHours ? this.disabledHours() : [];
            if (this.format.indexOf('H') !== -1) {
                return this.formatTime(24, this.hourStep, disabledHours, /HH/.test(this.format));
            }
            return null;
        },
        minutes() {
            const disabledMinutes = this.disabledMinutes ? this.disabledMinutes(this.selectedHour) : [];
            if (this.format.indexOf('m') !== -1) {
                return this.formatTime(60, this.minuteStep, disabledMinutes, /mm/.test(this.format));
            }
            return null;
        },
        seconds() {
            const disabledSeconds = this.disabledSeconds ? this.disabledSeconds(this.selectedHour, this.selectedMinute) : [];
            if (this.format.indexOf('s') !== -1) {
                return this.formatTime(60, this.secondStep, disabledSeconds, /ss/.test(this.format));
            }
            return null;
        },
        times() {
            let times = '';
            const {
                selectedHour,
                selectedMinute,
                selectedSeconds
            } = this;
            if (!(selectedHour || selectedMinute || selectedSeconds)) {
                return times;
            }
            if (/H/.test(this.format)) {
                times += selectedHour;
            }
            if (/m/.test(this.format)) {
                times += (times.length > 0 ? `:${selectedMinute}` : selectedMinute);
            }
            if (/s/.test(this.format)) {
                times += (times.length > 0 ? `:${selectedSeconds}` : selectedSeconds);
            }
            return times;
        }
    },
    watch: {
        value() {
            if (this.times !== this.value) {
                const { hour, minute, seconds } = this.parseTime();
                this.selectedHour = hour;
                this.selectedMinute = minute;
                this.selectedSeconds = seconds;
            }
        },
        times() {
            this.$emit('input', this.times);
            this.$emit('change', this.times);
        }
    },
    methods: {
        parseTime() {
            if (!this.value) return {};
            const splitTime = this.value.split(':');
            let hour;
            let minute;
            let seconds;
            if (/H/.test(this.format)) {
                hour = splitTime.shift() || this.formatSingleTime('HH');
            }
            if (/m/.test(this.format)) {
                minute = splitTime.shift() || this.formatSingleTime('mm');
            }
            if (/s/.test(this.format)) {
                seconds = splitTime.shift() || this.formatSingleTime('ss');
            }
            return {
                hour,
                minute,
                seconds
            };
        },
        formatTime(total, step, disableds = [], format = true) {
            const formatData = [];
            for (let i = 0; i < total; i += step) {
                let value;
                if (format) {
                    value = (`${i}`).padStart(2, '0');
                } else {
                    value = `${i}`;
                }
                formatData.push({
                    disabled: disableds.includes(i),
                    value
                });
            }
            return formatData;
        },
        formatSingleTime(timeFormat) {
            return this.format.indexOf(timeFormat) !== -1 ? '00' : '0';
        },
        changeSelectedHour(option) {
            this.selectedHour = option.value;
            if (/m/.test(this.format) && !this.selectedMinute) {
                this.selectedMinute = this.formatSingleTime('mm');
            }
            if (/s/.test(this.format) && !this.selectedSeconds) {
                this.selectedSeconds = this.formatSingleTime('ss');
            }
        },
        changeSelectedMinute(option) {
            this.selectedMinute = option.value;
            if (/H/.test(this.format) && !this.selectedHour) {
                this.selectedHour = this.formatSingleTime('HH');
            }
            if (/s/.test(this.format) && !this.selectedSeconds) {
                this.selectedSeconds = this.formatSingleTime('ss');
            }
        },
        changeSelectedSeconds(option) {
            this.selectedSeconds = option.value;
            if (/H/.test(this.format) && !this.selectedHour) {
                this.selectedHour = this.formatSingleTime('HH');
            }
            if (/m/.test(this.format) && !this.selectedMinute) {
                this.selectedMinute = this.formatSingleTime('mm');
            }
        },
        findCanFocus(target, anchor, direction) {
            // 处理禁止选的情况
            if (direction > 0) {
                for (let i = anchor; i < target.length; ++i) {
                    if (!target[i].disabled) return i;
                }
            } else {
                for (let i = anchor; i >= 0; --i) {
                    if (!target[i].disabled) return i;
                }
            }
            return null;
        },
        resetFindFocus(target, anchor, direction) {
            const canFocusIndex = this.findCanFocus(target, anchor, direction);
            return canFocusIndex !== null ? canFocusIndex : -1;
        },
        findFocus() {
            let focus;
            if (this.bit & 1) {
                focus = this.resetFindFocus(this.hours, 0, 1);
                this.focusType = 1;
            } else if (this.bit & 2) {
                focus = this.resetFindFocus(this.minutes, 0, 1);
                this.focusType = 2;
            } else if (this.bit & 4) {
                focus = this.resetFindFocus(this.seconds, 0, 1);
                this.focusType = 4;
            }
            this.focus[this.focusType] = focus;
        },
        preventCalculateOverflow(cur, step, target) {
            const overflow = target.length;
            let next = cur + step;
            if (next < 0) return 0;
            if (next === overflow) return cur;
            next = this.findCanFocus(target, next, step);
            return next !== null ? next : cur;
        },
        updateFocusElem(isUp) {
            const step = isUp ? -1 : 1;
            let target;
            if (this.focusType & 1) {
                target = this.hours;
            } else if (this.focusType & 2) {
                target = this.minutes;
            } else if (this.focusType & 4) {
                target = this.seconds;
            }
            this.focus[this.focusType] = this.preventCalculateOverflow(this.focus[this.focusType], step, target);
        },
        resetFromHistory(target) {
            return this.historyFocus[this.focusType] !== -1 ? this.historyFocus[this.focusType] : this.resetFindFocus(target, 0, 1);
        },
        changeCurrentFocus() {
            if (this.focusType & 1) {
                this.focus = {
                    1: this.resetFromHistory(this.hours),
                    2: -1,
                    4: -1
                };
            } else if (this.focusType & 2) {
                this.focus = {
                    1: -1,
                    2: this.resetFromHistory(this.minutes),
                    4: -1
                };
            } else if (this.focusType & 4) {
                this.focus = {
                    1: -1,
                    2: -1,
                    4: this.resetFromHistory(this.seconds)
                };
            }
        },
        moveFocus(isRight) {
            if (this.bit === 7) {
                if (isRight && this.focusType & 3) {
                    this.historyFocus[this.focusType] = this.focus[this.focusType];
                    this.focusType <<= 1;
                    this.changeCurrentFocus();
                }
                if (!isRight && this.focusType & 6) {
                    this.historyFocus[this.focusType] = this.focus[this.focusType];
                    this.focusType >>>= 1;
                    this.changeCurrentFocus();
                }
            } else if (this.bit === 3) {
                if (isRight && this.focusType & 1) {
                    this.historyFocus[this.focusType] = this.focus[this.focusType];
                    this.focusType <<= 1;
                    this.changeCurrentFocus();
                }
                if (!isRight && this.focusType & 2) {
                    this.historyFocus[this.focusType] = this.focus[this.focusType];
                    this.focusType >>>= 1;
                    this.changeCurrentFocus();
                }
            } else if (this.bit === 6) {
                if (isRight && this.focusType & 2) {
                    this.historyFocus[this.focusType] = this.focus[this.focusType];
                    this.focusType <<= 1;
                    this.changeCurrentFocus();
                }
                if (!isRight && this.focusType & 4) {
                    this.historyFocus[this.focusType] = this.focus[this.focusType];
                    this.focusType >>>= 1;
                    this.changeCurrentFocus();
                }
            }
        },
        selectFocusElem() {
            if (this.focusType & 1) {
                this.changeSelectedHour(this.hours[this.focus[this.focusType]]);
            } else if (this.focusType & 2) {
                this.changeSelectedMinute(this.minutes[this.focus[this.focusType]]);
            } else if (this.focusType & 4) {
                this.changeSelectedSeconds(this.seconds[this.focus[this.focusType]]);
            }
        },
        keydown(e) {
            if (e.keyCode == keyCode.TAB) {
                e.preventDefault();
                if (!this.hasFocus) {
                    this.findFocus();
                } else {
                    this.$emit('blur');
                }
                this.hasFocus = !this.hasFocus;
            } else if (e.keyCode == keyCode.DOWN || e.keyCode == keyCode.UP) {
                e.preventDefault();
                this.updateFocusElem(e.keyCode == keyCode.UP);
            } else if (e.keyCode == keyCode.LEFT || e.keyCode == keyCode.RIGHT) {
                e.preventDefault();
                this.moveFocus(e.keyCode == keyCode.RIGHT);
            } else if (e.keyCode == keyCode.ENTER || e.keyCode == keyCode.MAC_ENTER || e.keyCode == keyCode.SPACE) {
                e.preventDefault();
                this.selectFocusElem();
            }
        }
    }
};
</script>
