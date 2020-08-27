---
pageClass: comp-page-class
---
# TimePicker 时间选择

## 概述
基础组件，用于选择小时、分钟、秒。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/timePicker/1.html">
            <template v-slot:demo>
                <time-picker
                    v-model="primaryTime"
                    clearable
                />
            </template>
            <template v-slot:description>
                <p>基础用法</p>
            </template>
        </componetTemplate>
        <componetTemplate title="时间间隔" template="ui/templates/timePicker/2.html">
            <template v-slot:demo>
                <time-picker
                    :hour-step="2"
                    :minute-step="2"
                    :second-step="2"
                />
            </template>
            <template v-slot:description>
                <p>设置小时选项间隔、分钟选项间隔、秒选项间隔</p>
            </template>
        </componetTemplate>
        <componetTemplate title="附加内容" template="ui/templates/timePicker/3.html">
            <template v-slot:demo>
                <time-picker>
                    <template slot="addon">
                        <p>hello world</p>
                    </template>
                </time-picker>
            </template>
            <template v-slot:description>
                <p>在 TimePicker 选择框底部显示自定义的内容。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="时间类型" template="ui/templates/timePicker/4.html">
            <template v-slot:demo>
                <time-picker format="HH:mm:ss"  />
                <time-picker format="HH:mm"  />
                <time-picker format="mm:ss" />
            </template>
            <template v-slot:description>
                <p>通过 format 控制时间类型： </p>
                <p>默认为 HH:mm:ss，可配置为其他格式，HH:mm、mm:ss 等等</p>
            </template>
        </componetTemplate>
        <componetTemplate title="禁用部分时间" template="ui/templates/timePicker/5.html">
            <template v-slot:demo>
                <time-picker
                    :disabled-hours="disabledHours"
                    :disabled-minutes="disabledMinutes"
                    :disabled-seconds="disabledSeconds">
                </time-picker>
            </template>
            <template v-slot:description>
                <p>通过disabledHours，disabledMinutes，disabledSeconds设置禁止的部分时间</p>
            </template>
        </componetTemplate>
        <componetTemplate title="禁用" template="ui/templates/timePicker/6.html">
            <template v-slot:demo>
                <time-picker disabled />
            </template>
            <template v-slot:description>
                <p>设置disabled 禁用</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<style lang="scss">
.code-box-demo{
    .ui-time-picker{
        display: block;
        margin-top: 20px;
        width: 50%;
        .picker-item{
            padding: 0;
        }
    }
    .ui-time-picker:first-child{
        margin-top: 0px;
    }
}
</style>

<script>
export default {
    data() {
        return {
            primaryTime: ''
        }
    },
    methods: {
        disabledHours() {
            return [2];
        },
        disabledMinutes(hour) {
            if (hour === '03') {
                return [3, 4, 5];
            }
        },
        disabledSeconds(hour, minute) {
            if (hour === '04' && minute === '05') {
                return [3, 4];
            }
        }
    }
}
</script>

## API

### TimePicker Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  日期的值，可以使用v-model实现数据的双向绑定  | String  |        null         |
| placeholder          |  未选择时间时的提示语  | String  |       `请选择时间`          |
| disabled       | 是否禁用 | Boolean   |     false      |
| readonly       | 是否只读 | Boolean   |     false      |
| icon          |  输入框左边的 icon  | String  |       `clock-circle-o`          |
| format       | 时间格式：HH:mm:ss | String   |          `HH:mm:ss`         |
| clearable          |  是否显示清除 icon  | Boolean  |      false         |
| hourStep       | 小时选项间隔 |  Number   |       1       |
| minuteStep       | 分钟选项间隔 |  Number   |       1       |
| secondStep       | 秒选项间隔 |  Number   |       1       |
| disabledHours       | 禁止选择部分小时选项, function() |  Function   |       null      |
| disabledMinutes       | 禁止选择部分分钟选项, function(selectedHour) |  Function   |       null      |
| disabledMinutes       | 禁止选择部分秒选项, function(selectedHour, selectedMinute) |  Function   |       null      |


### TimePicker Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| change          | 选择后触发  | (value) => void  |  
