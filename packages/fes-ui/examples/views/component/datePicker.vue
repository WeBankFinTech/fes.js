<template>
    <div class="datePicker-page article">
        <h1>datePicker 日期选择器</h1>
        <h2>概述</h2>
        <p>日期选择和配合输入框的日期选择</p>

        <h2>代码示例</h2>
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-input-date-picker v-model="single1" clearable position="bottomLeft" />
                    <br>
                    <Wb-input-date-picker v-model="single2" format="YYYY" placeholder="请选择年份" />
                    <br>
                    <Wb-input-date-picker v-model="single3" format="YYYY-MM" placeholder="请选择月份" />
                    <br>
                    <Wb-input-date-picker v-model="single4" format="YYYY-MM-DD HH:mm" placeholder="请选择日期" />
                    <br>
                    <Wb-input-date-picker v-model="single5" format="YYYY-MM-DD HH:mm:ss" placeholder="请选择日期" />
                </div>
                <div class="panel-header">
                    <span>选择单个日期</span>
                </div>
                <div class="panel-desc">
                    <p>选个单个日期，可以选择年、月份、日期、日期 + 时间, 通过 format 控制： </p>
                    <p>YYYY、YYYY-MM、YYYY-MM-DD、 YYYY-MM-DD HH:mm、YYYY-MM-DD HH:mm:ss </p>
                    <p>默认为 YYYY-MM-DD </p>
                </div>
            </div>
            <markdown1 slot="code" />
        </panel>
        
        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-input-date-picker v-model="model1" />
                    <br>
                    <Wb-input-date-picker v-model="model2" format="YYYY-MM-DD HH:mm:ss" model="multiple" />
                    <br>
                    <Wb-input-date-picker v-model="model3" model="range" format="YYYY-MM-DD HH:mm:ss" />
                    <Wb-input-date-picker v-model="model4" format="YYYY-MM" model="range" />
                    <Wb-input-date-picker v-model="model5" format="YYYY" model="range" />
                </div>
                <div class="panel-header">
                    <span>选择模式</span>
                </div>
                <div class="panel-desc">
                    <p>可以选择单选、多选、范围，可以和 format 进行组合: </p>
                    <p>single、multiple、range</p>
                    <p>默认为 range </p>
                </div>
            </div>
            <markdown2 slot="code" />
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-input-date-picker :value="new Date()" disabled />
                    <br>
                    <Wb-input-date-picker :value="new Date()" readonly />
                    <br>
                    <Wb-input-date-picker :value="[new Date('2018-08-09'), new Date()]" model="range" disabled />
                </div>
                <div class="panel-header">
                    <span>禁用和只读模式</span>
                </div>
                <div class="panel-desc">
                    <p>禁用 | 只读</p>
                </div>
            </div>
            <markdown3 slot="code" />
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <date-picker :value="new Date()" />
                    <br>
                    <date-picker v-model="multipledp" format="YYYY-MM-DD HH:mm" model="multiple" />
                    <p>{{ multipledp.join(',') }}</p>
                    <br>
                    <date-picker :value="[new Date('2018-08-09'), new Date()]" model="range" />
                </div>
                <div class="panel-header">
                    <span>行内模式</span>
                </div>
                <div class="panel-desc">
                    <p>禁用 | 只读</p>
                </div>
            </div>
            <markdown4 slot="code" />
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-input-date-picker :min-date="new Date(2019, 7, 1)" :max-date="new Date(2019, 8, 31)" />
                    <br>
                    <Wb-input-date-picker max-range="2D" model="range" />
                    <br>
                    <Wb-input-date-picker :disable="[new Date()]" />
                    <br>
                    <Wb-input-date-picker :enable="[new Date()]" />
                    <br>
                    <Wb-input-date-picker :disabled-date="disabledDate" />禁止每个月 3 号
                    <br>
                </div>
                <div class="panel-header">
                    <span>时间禁用</span>
                </div>
                <div class="panel-desc">
                    <p>可以通过多种方式实现时间禁用</p>
                    <p>minDate, maxDate: 禁用的最大最小时间</p>
                    <p>maxRange: 禁用的最大可选时间范围，格式为 2D、2M、2Y. 数字 + 单位</p>
                    <p>disable、enable: 数组，可以为函数、时间、{from, to} 对象(from，to值为 Date, 可已实现minDate, maxDate功能)</p>
                    <p>disabledDate: 函数，参数为对应的时间</p>
                </div>
            </div>
            <markdown5 slot="code" />
        </panel>

        <h2>API</h2>
        <h3>DatePicker 和 InputDatePicker 共有的 API</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            属性
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            类型
                        </th>
                        <th style="text-align:left">
                            默认值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            value
                        </td>
                        <td style="text-align:left">
                            日期的值
                        </td>
                        <td style="text-align:left">
                            Date|Array|Number
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            model
                        </td>
                        <td style="text-align:left">
                            模式，可选值有“single”，“range”, “multiple”
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            single
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            format
                        </td>
                        <td style="text-align:left">
                            时间格式：YYYY-MM-DD HH:mm:ss
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            YYYY-MM-DD
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            maxDate
                        </td>
                        <td style="text-align:left">
                            最大可选时间
                        </td>
                        <td style="text-align:left">
                            Date
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            minDate
                        </td>
                        <td style="text-align:left">
                            最小可选时间
                        </td>
                        <td style="text-align:left">
                            Date
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            maxRange
                        </td>
                        <td style="text-align:left">
                            最大可选区间，格式为 /\d+[DMY]/
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disable
                        </td>
                        <td style="text-align:left">
                            禁止的时间，格式可以为：[Date, Function, {from: Date, to: Date}]
                        </td>
                        <td style="text-align:left">
                            Array
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            enable
                        </td>
                        <td style="text-align:left">
                            可用的时间，格式可以为：[Date, Function, {from: Date, to: Date}]
                        </td>
                        <td style="text-align:left">
                            Array
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disabledDate
                        </td>
                        <td style="text-align:left">
                            禁止时间函数，参数为对应的时间 Date
                        </td>
                        <td style="text-align:left">
                            Function
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            rangeSeparator
                        </td>
                        <td style="text-align:left">
                            选择时间区间是中间的分割符号,只在 model 为 range 时生效
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            ～
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            showConfirm
                        </td>
                        <td style="text-align:left">
                            是否显示确认按钮。在多选强制为： true，其他情况默认为 false
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            -
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            onlyMonth
                        </td>
                        <td style="text-align:left">
                            是否只选择月份(兼容老的API，尽量使用 format代替)
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            enableTime
                        </td>
                        <td style="text-align:left">
                            是否显示时间(兼容老的API，尽量使用 format代替)
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            enableSeconds
                        </td>
                        <td style="text-align:left">
                            是否显示秒(兼容老的API，尽量使用 format代替)
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>


        <h3>DatePicker props</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            属性
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            类型
                        </th>
                        <th style="text-align:left">
                            默认值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            inline
                        </td>
                        <td style="text-align:left">
                            是否脱离文档流，ture则用relative定位，false则用absolute定位
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            true
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>DatePicker events</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            事件名
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            返回值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            on-change
                        </td>
                        <td style="text-align:left">
                            值改变时触发
                        </td>
                        <td style="text-align:left">
                            最新的值
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            on-finish
                        </td>
                        <td style="text-align:left">
                            选择结束触发
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>InputDatePicker props</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            属性
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            类型
                        </th>
                        <th style="text-align:left">
                            默认值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            placeholder
                        </td>
                        <td style="text-align:left">
                            未选择时间时的提示语
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            请选择日期
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            icon
                        </td>
                        <td style="text-align:left">
                            输入框左边的 icon
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            calendar
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            clearable
                        </td>
                        <td style="text-align:left">
                            是否显示清除 icon
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            position
                        </td>
                        <td style="text-align:left">
                            弹窗的位置，会根据窗口大小自适应，可选值 'bottomLeft', 'bottomRight', 'topLeft', 'topRight'
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disabled
                        </td>
                        <td style="text-align:left">
                            是否禁止
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            readonly
                        </td>
                        <td style="text-align:left">
                            是否只读
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>InputDatePicker events</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            事件名
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            返回值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            on-enter
                        </td>
                        <td style="text-align:left">
                            焦点在input, 按下enter键触发
                        </td>
                        <td style="text-align:left">
                            event
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            on-focus
                        </td>
                        <td style="text-align:left">
                            获取焦点时触发
                        </td>
                        <td style="text-align:left">
                            event
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            on-blur
                        </td>
                        <td style="text-align:left">
                            失去焦点时触发
                        </td>
                        <td style="text-align:left">
                            event
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            on-input
                        </td>
                        <td style="text-align:left">
                            输入时触发
                        </td>
                        <td style="text-align:left">
                            value, event
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            on-change
                        </td>
                        <td style="text-align:left">
                            值改变时触发
                        </td>
                        <td style="text-align:left">
                            value, event
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/datepicker1.md'
import markdown2 from './md/datepicker2.md'
import markdown3 from './md/datepicker3.md'
import markdown4 from './md/datepicker4.md'
import markdown5 from './md/datepicker5.md'
import markdown6 from './md/datepicker6.md'
import markdown7 from './md/datepicker7.md'
import markdown8 from './md/datepicker8.md'
export default {
    components: {
        markdown1, markdown2, markdown3, markdown4, markdown5, markdown6, markdown7, markdown8
    },
    data: function () {
        let today = new Date().getTime();
        let minDate = new Date(new Date().getTime() - 1000 * 3600 * 24 * 5);
        let maxDate = new Date(new Date().getTime() + 1000 * 3600 * 24 * 5);
        return {
            single1: new Date(),
            single2: null,
            single3: null,
            single4: null,
            single5: null,
            model1: null,
            model2: null,
            model3: null,
            model4: null,
            model5: null,
            multipledp: [today],
            today,
            minDate: minDate,
            maxDate: maxDate,
            disableDate: [new Date(today), function (date) {
                if (date.day == 6) {
                    return true
                }
            }, {
                from: minDate,
                to: maxDate
            }],
            enableDate: [new Date(today), function (date) {
                if (date.day == 6) {
                    return true
                }
            }, {
                from: minDate,
                to: maxDate
            }]
        }
    },
    watch: {
        single1() {
            console.log(this.timeFormat(new Date(this.single1), 'YYYY-MM-DD'));
        },
        single2() {
            console.log(this.timeFormat(new Date(this.single2), 'YYYY'));
        },
        single3() {
            console.log(this.timeFormat(new Date(this.single3), 'YYYY-MM'));
        },
        single4() {
            console.log(this.timeFormat(new Date(this.single4), 'YYYY-MM-DD HH:mm'));
        },
        single5() {
            console.log(this.timeFormat(new Date(this.single5), 'YYYY-MM-DD HH:mm:ss'));
        },
        model1() {
            console.log(this.timeFormat(new Date(this.model1), 'YYYY-MM-DD'));
        },
        model2() {
            console.log(this.model2.map(item => this.timeFormat(new Date(item), 'YYYY-MM-DD')));
        },
        model3() {
            console.log(this.model3.map(item => this.timeFormat(new Date(item), 'YYYY-MM-DD')));
        },
        model4() {
            console.log(this.model4.map(item => this.timeFormat(new Date(item), 'YYYY-MM-DD')));
        }
    },
    methods: {
        disabledDate(time) {
            if (time.getDate() === 3) {
                return true;
            }
            false;
        },
        timeFormat(time, format) {
            const year = time.getFullYear()
            const month = time.getMonth()
            const day = time.getDate()
            const hours24 = time.getHours()
            const hours = hours24 % 12 === 0 ? 12 : hours24 % 12
            const minutes = time.getMinutes()
            const seconds = time.getSeconds()
            const milliseconds = time.getMilliseconds()
            const dd = t => ('0' + t).slice(-2)
            const map = {
                YYYY: year,
                MM: dd(month + 1),
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
            }
            return (format || this.format).replace(/Y+|M+|D+|H+|h+|m+|s+|S+/g, str => map[str])
        }
    }
}
</script>
