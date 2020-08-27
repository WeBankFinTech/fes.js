
export default {
    computed: {
        vFormat() {
            if (this.onlyMonth) {
                return 'YYYY-MM';
            }
            if (this.enableTime) {
                if (this.enableSeconds) {
                    return 'YYYY-MM-DD HH:mm:ss';
                }
                return 'YYYY-MM-DD HH:mm';
            }
            return this.format;
        }
    },
    methods: {
        // 对比时间，相等 0, 小于 -1 大于 1
        timeFormat(time, format) {
            const year = time.getFullYear();
            const month = time.getMonth();
            const day = time.getDate();
            const hours24 = time.getHours();
            const hours = hours24 % 12 === 0 ? 12 : hours24 % 12;
            const minutes = time.getMinutes();
            const seconds = time.getSeconds();
            const milliseconds = time.getMilliseconds();
            const dd = t => (`0${t}`).slice(-2);
            const map = {
                YYYY: year,
                MM: dd(month + 1),
                MMMM: this.t(`el.datepicker.month${month + 1}`),
                M: month + 1,
                DD: dd(day),
                D: day,
                HH: dd(hours24),
                H: hours24,
                hh: dd(hours),
                h: hours,
                mm: dd(minutes),
                m: minutes,
                ss: dd(seconds),
                s: seconds,
                S: milliseconds
            };
            return (format || this.vFormat || this.format).replace(/Y+|M+|D+|H+|h+|m+|s+|S+/g, str => map[str]);
        },
        // 判断是否同一天
        isSameDay(date1, date2) {
            return this.timeFormat(date1, 'YYYY-MM-DD') === this.timeFormat(date2, 'YYYY-MM-DD');
        },
        contrastDate(date1, date2, format = 'YYYY-MM-DD HH:mm:ss') {
            const t1 = this.timeFormat(date1, format);
            const t2 = this.timeFormat(date2, format);
            if (t1 > t2) return 1;
            if (t1 === t2) return 0;
            return -1;
        },
        isEmpty(val) {
            if (!val) return true;
            if (Array.isArray(val)) {
                return val.length === 0 || !val.some((item => item));
            }
            return false;
        },
        isEqual(val, dates) {
            const emptyVal = this.isEmpty(val);
            const emptyDates = this.isEmpty(dates);
            if (emptyVal && emptyDates) return true;
            if (emptyVal && !emptyDates || !emptyVal && emptyDates) return false;
            if (this.model === 'single') {
                return this.contrastDate(new Date(dates), new Date(val)) === 0;
            }
            if (val.length !== dates.length) return false;
            return val.every((timestamp, i) => this.contrastDate(new Date(dates[i]), new Date(timestamp)) === 0);
        },
        inOnePanel(dates, format) {
            const [start, end] = dates;
            if (start && end) {
                if (format.indexOf('D') !== -1) {
                    if (this.timeFormat(start, 'YYYYMM') === this.timeFormat(end, 'YYYYMM')) {
                        return true;
                    }
                } else if (format.indexOf('M') !== -1) {
                    if (start.getFullYear() === end.getFullYear()) {
                        return true;
                    }
                } else if (Number.parseInt(start.getFullYear() / 10) === Number.parseInt(end.getFullYear() / 10)) {
                    return true;
                }
            }
            return false;
        }
    }
};
