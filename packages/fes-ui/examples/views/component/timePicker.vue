<template>
    <div class="button-page article">
        <h1>TimePicker 时间选择</h1>
        <h2>概述</h2>
        <p>基础组件，用于选择小时、分钟、秒</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <time-picker
                        v-model="primaryTime"
                        clearable
                        @change="change"
                    />
                </div>
                <div class="panel-header">
                    <span>时间格式</span>
                </div>
                <div class="panel-desc">
                    <p>时间格式可以通过: format 配置</p>
                    <p>默认为:HH:mm:ss，可配置为其他格式，HH:mm、mm:ss 等等</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1 />
                </div>
            </Cell>
        </Row>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <time-picker
                        v-model="addonTime"
                        format="HH:mm"
                    >
                        <template slot="addon">
                            <p>hello world</p>
                        </template>
                    </time-picker>
                </div>
                <div class="panel-header">
                    <span>附加内容</span>
                </div>
                <div class="panel-desc">
                    <p>在 TimePicker 选择框底部显示自定义的内容。</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2 />
                </div>
            </Cell>
        </Row>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <time-picker
                        disabled
                    />
                </div>
                <div class="panel-header">
                    <span>禁用</span>
                </div>
                <div class="panel-desc">
                    <p>禁用时间选择</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown3 />
                </div>
            </Cell>
        </Row>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <time-picker
                        v-model="step"
                        :hour-step="2"
                        :minute-step="2"
                        :second-step="2"
                    />
                </div>
                <div class="panel-header">
                    <span>显示间隔</span>
                </div>
                <div class="panel-desc">
                    <p>设置小时选项间隔、分钟选项间隔、秒选项间隔</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown4 />
                </div>
            </Cell>
        </Row>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <time-picker
                        v-model="pickeredTime"
                        :disabled-hours="disabledHours"
                        :disabled-minutes="disabledMinutes"
                        :disabled-seconds="disabledSeconds"
                    >
                        <template slot="addon">
                            <p>hello world</p>
                        </template>
                    </time-picker>
                </div>
                <div class="panel-header">
                    <span>禁止部分时间</span>
                </div>
                <div class="panel-desc">
                    <p>通过disabledHours，disabledMinutes，disabledSeconds设置禁止的部分时间</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown5 />
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>TimePicker props</h3>
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
                            选择的值，可以使用v-model实现数据的双向绑定
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
                            placeholder
                        </td>
                        <td style="text-align:left">
                            内容为空时的提示语
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            "请选择时间"
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disabled
                        </td>
                        <td style="text-align:left">
                            是否禁止选择
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
                            icon
                        </td>
                        <td style="text-align:left">
                            自定义的选择框后缀图标
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            clock-circle-o
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            format
                        </td>
                        <td style="text-align:left">
                            展示的时间格式
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            HH:mm:ss
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            hourStep
                        </td>
                        <td style="text-align:left">
                            小时选项间隔
                        </td>
                        <td style="text-align:left">
                            Number
                        </td>
                        <td style="text-align:left">
                            1
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            minuteStep
                        </td>
                        <td style="text-align:left">
                            分钟选项间隔
                        </td>
                        <td style="text-align:left">
                            Number
                        </td>
                        <td style="text-align:left">
                            1
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            secondStep
                        </td>
                        <td style="text-align:left">
                            秒选项间隔
                        </td>
                        <td style="text-align:left">
                            Number
                        </td>
                        <td style="text-align:left">
                            1
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disabledHours
                        </td>
                        <td style="text-align:left">
                            禁止选择部分小时选项
                        </td>
                        <td style="text-align:left">
                            function()
                        </td>
                        <td style="text-align:left">
                            无
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disabledMinutes
                        </td>
                        <td style="text-align:left">
                            禁止选择部分分钟选项
                        </td>
                        <td style="text-align:left">
                            function(selectedHour)
                        </td>
                        <td style="text-align:left">
                            无
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disabledSeconds
                        </td>
                        <td style="text-align:left">
                            禁止选择部分秒选项
                        </td>
                        <td style="text-align:left">
                            function(selectedHour, selectedMinute)
                        </td>
                        <td style="text-align:left">
                            无
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>TimePicker events</h3>
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
                            change
                        </td>
                        <td style="text-align:left">
                            选择时间时触发
                        </td>
                        <td style="text-align:left">
                            最新的值
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<script type="text/ecmascript-6">
import markdown1 from './md/timePicker1.md'
import markdown2 from './md/timePicker2.md'
import markdown3 from './md/timePicker3.md'
import markdown4 from './md/timePicker4.md'
import markdown5 from './md/timePicker5.md'
export default {
    components: {
        markdown1,
        markdown2,
        markdown3,
        markdown4,
        markdown5
    },
    data: function () {
        return {
            primaryTime: '01:09:09',
            pickeredTime: '01:09:09',
            addonTime: '',
            step: ''
        }
    },
    watch: {
        pickeredTime() {
            console.log('example', this.pickeredTime);
        }
    },
    methods: {
        console() {
            console.log(1)
        },
        change(time) {
            console.log('change', time);
        },
        disabledHours() {
            return [2];
        },
        disabledMinutes(hour) {
            console.log(hour);
            if (hour === '03') {
                return [3, 4, 5];
            }
        },
        disabledSeconds(hour, minute) {
            console.log(hour, minute);
            if (hour === '04' && minute === '05') {
                return [3, 4];
            }
        }
    }
}
</script>
