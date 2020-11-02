---
pageClass: comp-page-class
---
# DatePicker 日期选择器

## 概述
当用户需要输入一个日期，可以点击标准输入框，弹出日期面板进行选择。

## 代码示例

<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/datePicker/1.html">
            <template v-slot:demo>
                <Wb-input-date-picker v-model="value" />
            </template>
            <template v-slot:description>
                <p>选个单个日期</p>
            </template>
        </componetTemplate>
        <componetTemplate title="单选+多选+区间选择" template="ui/templates/datePicker/2.html">
            <template v-slot:demo>
                <Wb-input-date-picker />
                <Wb-input-date-picker model="multiple" />
                <Wb-input-date-picker model="range" />
            </template>
            <template v-slot:description>
                <p>可以选择单选single、多选multiple、区间选择range，默认为 single。 </p>
            </template>
        </componetTemplate>
        <componetTemplate title="日期面板弹出的朝向" template="ui/templates/datePicker/3.html">
            <template v-slot:demo>
                <Wb-input-date-picker position="bottomLeft"  />
                <Wb-input-date-picker position="bottomRight" />
                <Wb-input-date-picker position="topLeft" />
                <Wb-input-date-picker position="topRight" />
            </template>
            <template v-slot:description>
                <p>设置position，可以选择单选bottomLeft、bottomRight、topLeft、topRight，默认为 bottomLeft。 </p>
            </template>
        </componetTemplate>
        <componetTemplate title="行内模式" template="ui/templates/datePicker/4.html">
            <template v-slot:demo>
                <div class="flex">
                    <date-picker />
                    <date-picker format="YYYY-MM-DD HH:mm" model="multiple" />
                    <date-picker model="range" />
                </div>
            </template>
            <template v-slot:description>
                <p>同样支持v-model、range、format等配置</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="日期类型" template="ui/templates/datePicker/5.html">
            <template v-slot:demo>
                <Wb-input-date-picker format="YYYY" placeholder="请选择年份" />
                <Wb-input-date-picker format="YYYY-MM" placeholder="请选择月份" />
                <Wb-input-date-picker placeholder="请选择日期"/>
                <Wb-input-date-picker format="YYYY-MM-DD HH:mm" placeholder="请选择时间" />
                <Wb-input-date-picker format="YYYY-MM-DD HH:mm:ss" placeholder="请选择时间" />
            </template>
            <template v-slot:description>
                <p>通过 format 控制日期类型： </p>
                <p>YYYY 年份、YYYY-MM 月份、YYYY-MM-DD 日期、 YYYY-MM-DD HH:mm 时间精确到分钟、YYYY-MM-DD HH:mm:ss 时间精确到秒。</p>
                <p>默认为 YYYY-MM-DD。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="禁用部分时间" template="ui/templates/datePicker/6.html">
            <template v-slot:demo>
                <div class="mt-20 first">可选择的时间范围为：2020-7-1 到 2020-8-31</div>
                <Wb-input-date-picker :min-date="new Date(2020, 7, 1)" :max-date="new Date(2020, 8, 31)" />
                <div class="mt-20">选择的时间范围不超过3天：</div>
                <Wb-input-date-picker max-range="3D" model="range" />
                <div class="mt-20">今天不能被选择：</div>
                <Wb-input-date-picker :disable="[new Date()]" />
                <div class="mt-20">只能选择今天：</div>
                <Wb-input-date-picker :enable="[new Date()]" />
                <div class="mt-20">禁止每个月 3 号：</div>
                <Wb-input-date-picker :disabled-date="disabledDate" />
            </template>
            <template v-slot:description>
                <p>可以通过多种方式实现时间禁用。</p>
                <p>minDate可选的最小时间，maxDate可选的最大时间。</p>
                <p>maxRange：需要配合range使用，设置可选时间范围，格式为 2D（2天）、2M（2个月）、2Y（2年）</p>
                <p>disable和enable: 子项可以是时间（Date对象）、函数、对象的数组。</p>
                <p>以disable举例：</p>
                <p>当子项是Date对象时，禁用此日期；</p>
                <p>当子项是函数时，参数为日期，通过函数执行结果判断是否禁用；</p>
                <p>当子项是{from, to} 格式的对象时，表示从from日期到to日期都禁用</p>
                <p>disabledDate: 禁用函数，参数为日期，通过函数执行结果判断是否禁用</p>
            </template>
        </componetTemplate>
        <componetTemplate title="禁用和只读" template="ui/templates/datePicker/7.html">
            <template v-slot:demo>
                <Wb-input-date-picker :value="new Date()" disabled />
                <Wb-input-date-picker :value="new Date()" readonly />
            </template>
            <template v-slot:description>
                <p>设置readonly 只读</p>
                <p>设置disabled 禁用</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<style lang="scss">
.code-box-demo{
    .ui-date-picker{
        display: block;
        margin-top: 20px;
        width: 50%;
    }
    .ui-calendars{
        font-size: 12px;
    }
    .mt-20 {
        padding-top: 20px;
        color: rgba(0, 0, 0, 0.65);
        &.first{
            padding-top: 0px;
        }
    }
    .ui-date-picker:first-child{
        margin-top: 0px;
    }
    .mt-20 + .ui-date-picker{
        margin-top: 0px;
    }
    .flex{
        display: flex;
        flex-wrap: wrap;
    }
}
</style>

<script>
export default {
    data() {
        return {
            value: null,
        }
    },
    methods: {
        disabledDate(time) {
            if (time.getDate() === 3) {
                return true;
            }
            false;
        },
    }
}
</script>

## API

### InputDatePicker 和 DatePicker 共有的 Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  日期的值，可以使用v-model实现数据的双向绑定  | Date、Array、Number  |        null          |
| model       | 模式，可选值有`single`、`range`、 `multiple` | String   |          `single`         |
| format       | 时间格式：YYYY-MM-DD HH:mm:ss | String   |          `YYYY-MM-DD`         |
| maxDate       | 最大可选时间 |  Date   |       null       |
| minDate       | 最小可选时间 |  Date   |       null       |
| maxRange       |最大可选区间，格式为 /\d+[DMY]/ | String   |      null       |
| disable        |禁止的时间，格式可以为：[Date, Function, {from: Date, to: Date}] | Array   |      null       |
| enable       |可用的时间，格式可以为：[Date, Function, {from: Date, to: Date}] | Array   |      null       |
| disabledDate   | 禁止时间函数，参数为对应的时间 Date，执行结果为true则禁止 | Function   |      null       |
| rangeSeparator   | 区间选择中间的分割符号,只在 model 为 range 时生效 | String   |      `～`       |
| showConfirm   | 是否显示确认按钮，在多选强制为true，其他情况默认为 false | Boolean   |      -      |
| onlyMonth       | 是否只选择月份(兼容老的API，尽量使用 format代替)| Boolean   |     false      |
| enableTime       | 是否显示时间(兼容老的API，尽量使用 format代替)| Boolean   |     false      |
| enableSeconds       | 是否显示秒(兼容老的API，尽量使用 format代替) | Boolean   |     false      |


### InputDatePicker Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| placeholder          |  未选择时间时的提示语  | String  |       `请选择日期`          |
| icon          |  输入框左边的 icon  | String  |       `calendar`          |
| clearable          |  是否显示清除 icon  | Boolean  |      false         |
| position          |  弹窗的位置，会根据窗口大小自适应，可选值`bottomLeft` `bottomRight` `topLeft` `topRight` | String  |      `bottomLeft`         |
| readonly       | 是否只读 | Boolean   |     false      |
| disabled       | 是否禁用 | Boolean   |     false      |

### InputDatePicker Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-input          | 输入时触发  | (value) => void  |  
| on-change          | 值改变时触发  | (value) => void  |  
| on-enter          | 焦点在input, 按下enter键触发  | (event) => void  |  
| on-focus         | 获取焦点时触发  | (event) => void  |  
| on-blur          | 失去焦点时触发  | (event) => void  |  
| on-blur          | 失去焦点时触发  | (event) => void  |  

### DatePicker Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| inline          |  是否脱离文档流，ture则用relative定位，false则用absolute定位  | Boolean  |       true          |

### DatePicker Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-change          | 值改变时触发  | (value) => void  |  
| on-finish          | 选择结束触发  | () => void  |  