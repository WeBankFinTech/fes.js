---
pageClass: comp-page-class
---
# Select 选择器

## 概述
使用模拟的增强下拉选择器来代替浏览器原生的选择器。

## 代码示例
<ClientOnly>
<row class="ui-select-docs">
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/select/1.html">
            <template v-slot:demo>
                <Wb-select v-model="value1">
                    <wb-option :value="1" label="北京市"></wb-option>
                    <wb-option :value="2">上海市</wb-option>
                    <wb-option :value="3" disabled>深圳市</wb-option>
                    <wb-option :value="4">杭州市</wb-option>
                    <wb-option :value="5">南京市</wb-option>
                    <wb-option :value="6">重庆市</wb-option>
                </Wb-select>
            </template>
            <template v-slot:description>
                <p>Wb-select内部嵌套Wb-option使用，类似原生select内部嵌套option</p>
                <p>Wb-selec默认宽度是100%</p>
                <p>设置Wb-option为disabled表示禁用此选项</p>
                <p>当选择一项时触发on-change事件</p>
            </template>
        </componetTemplate>
        <componetTemplate title="多选" template="ui/templates/select/2.html">
            <template v-slot:demo>
                <Wb-select v-model="value2" multiple :multiple-limit="2">
                    <wb-option :value="1" label="北京市"></wb-option>
                    <wb-option :value="2">上海市</wb-option>
                    <wb-option :value="3">深圳市</wb-option>
                    <wb-option :value="4">杭州市</wb-option>
                    <wb-option :value="5">南京市</wb-option>
                    <wb-option :value="6">重庆市</wb-option>
                </Wb-select>
            </template>
            <template v-slot:description>
                <p>添加multiple属性，value值必须是数组</p>
                <p>可以通过multipleLimit属性来控制最多选择几个，默认为0</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="可搜索" template="ui/templates/select/3.html">
            <template v-slot:demo>
                <Wb-select v-model="value3" filterable>
                    <wb-option :value="1">北京市</wb-option>
                    <wb-option :value="2">上海市</wb-option>
                    <wb-option :value="3">深圳市</wb-option>
                    <wb-option :value="4">杭州市</wb-option>
                    <wb-option :value="5">南京市</wb-option>
                    <wb-option :value="6">重庆市</wb-option>
                </Wb-select>
                <Wb-select v-model="value3" filterable @on-search="search">
                    <wb-option v-for="item in options" :key="item" :value="item">{{item}}</wb-option>
                </Wb-select>
            </template>
            <template v-slot:description>
                <p>设置filterable属性，则选项可以根据输入的内容筛选。</p>
                <p>通过on-search监听输入的内容，在回调更新option选项数据</p>
            </template>
        </componetTemplate>
        <componetTemplate title="高性能" template="ui/templates/select/4.html">
            <template v-slot:demo>
                <Wb-select v-model="value4" :options="arr" options-value-name="value1" options-text-name="text1" filterable          @on-change="change">
                </Wb-select>
            </template>
            <template v-slot:description>
                <p>将列表数据通过options传入，可以达到高性能，渲染1万+的数据也不卡</p>
                <p>optionsValueName配置传入数据中value的字段名</p>
                <p>optionsTextName配置传入数据中text的字段名</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<style lang="scss">
.ui-select-docs {
    .ui-select {
        display: block;
        margin-top: 20px;
        width: 50%
    }
    .ui-select .ui-select-dropdown-list {
        padding: 0;
    }
}
.code-box-demo{
    .ui-select:first-child{
        margin-top: 0px;
    }
}

</style>

<script>
export default {
    data() {
        return {
            value1: '',
            value2: [],
            value3: '',
            value4: '',
            options: [1, 2, 3, 4],
            arr: []
        }
    },
    mounted () {
        setTimeout(() => {
            let i = 0;
            this.arr = [];
            while (i < 10000) {
                this.arr.push({
                    value1: i,
                    text1: `option${i}`
                })
                i++;
            }
        }, 1000);
    },
    methods: {
        change (value) {
            console.log(value)
        },
        search(value){
            setTimeout(()=>{
                this.options = [];
                for(let i=1; i< 10; i++){
                    this.options.push(value + '|' + i)
                }
            }, 500)
        }
    }
}
</script>

## API

### Select Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  输入的值, 可以使用v-model实现数据的双向绑定  | Number, String, File  |        ''             |
| placeholder       | 提示语 | String   |                ''          |
| disabled       | 是否禁止输入 | Boolean   |     false      |
| readonly       | 是否只读 | Boolean   |     false      |
| clearable       | 是否显示清空按钮 | Boolean   |     false      |
| filterable       | 是否可筛选 | Boolean   |     false      |
| multiple       | 是否多选 | Boolean   |      false         |
| multipleLimit       | 仅多选时使用，限制选择数，默认值0不限制选择个数 | Number   |      0        |
| options       | 配置选项的数据 | Array   |      null        |
| optionsValueName       | 指定选项对象的那个字段为值 | String   |    'value'        |
| optionsTextName       | 指定选项对象的那个字段为text | String   |    'text'        |

### Select Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-search          | 当设置filterable为true，输入过滤条件时触发。连续输入不触发，自带200毫秒的debounce  | (value, event) => void  |  
| on-change          | 值改变时触发  | (value, event) => void  |  

### Option Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  选项的值  | Number, String  |        ''             |
| label       | 选项的内容 | String   |                ''          |
| disabled       | 是否禁止选中 | Boolean   |     false      |