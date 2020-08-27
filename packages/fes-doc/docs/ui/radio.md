---
pageClass: comp-page-class
---
# Radio 单选

## 概述
表单组件-单选框。主要用于一组可选项单项选择，或者单独用于切换到选中状态。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/radio/1.html">
            <template v-slot:demo>
                <Radio-group v-model="value1" @on-change="change">
                    <Radio value="1">
                        apple
                    </Radio>
                    <Radio value="2">
                        android
                    </Radio>
                    <Radio value="3">
                        github
                    </Radio>
                </Radio-group>
            </template>
            <template v-slot:description>
                <p>使用Radio-group实现一组互斥的选项组。在组合使用时，Radio不再只根据value的值来判断是否选中，而是根据Radio-group的value值和自身value值判断。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="单独使用Radio" template="ui/templates/radio/2.html">
            <template v-slot:demo>
                <Radio v-model="checked">
                    是否同意xxxx
                </Radio> 
            </template>
            <template v-slot:description>
                <p>适合单独使用Radio的场景，用value控制radio是否被选中。用v-model实现数据的双向通讯。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="只读和禁用" template="ui/templates/radio/3.html">
            <template v-slot:demo>
                <Radio-group readonly>
                    <Radio value="1">
                        北京
                    </Radio>
                    <Radio value="2">
                        上海
                    </Radio>
                    <Radio value="3">
                        深圳
                    </Radio>
                </Radio-group>
                <Radio-group disabled>
                    <Radio value="1">
                        北京
                    </Radio>
                    <Radio value="2">
                        上海
                    </Radio>
                    <Radio value="3">
                        深圳
                    </Radio>
                </Radio-group>
            </template>
            <template v-slot:description>
                <p>设置属性readonly, 只读状态</p>
                <p>设置属性disabled, 禁用状态</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="垂直方向" template="ui/templates/radio/4.html">
            <template v-slot:demo>
                <Radio-group v-model="value2" vertical>
                    <Radio value="1">
                        apple
                    </Radio>
                    <Radio value="2">
                        android
                    </Radio>
                    <Radio value="3">
                        github
                    </Radio>
                </Radio-group>
            </template>
            <template v-slot:description>
                <p>设置属性 vertical ，选项垂直排列</p>
            </template>
        </componetTemplate>
        <componetTemplate title="按钮" template="ui/templates/radio/5.html">
            <template v-slot:demo>
                <Radio-group v-model="value3" type="button">
                    <Radio value="1">
                        北京
                    </Radio>
                    <Radio value="2">
                        上海
                    </Radio>
                    <Radio value="3">
                        深圳
                    </Radio>
                </Radio-group>
            </template>
            <template v-slot:description>
                <p>设置属性 type=button ，radio显示为按钮的样子</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<style lang="scss">
.code-box-demo{
    .ui-radio-group:first-child{
        margin-top: 0px;
    }
}
.ui-radio-group{
    display: block;
    margin-top: 20px;
}
</style>

<script>
export default {
    data() {
        return {
            checked: false,
            value1: '1',
            value2: '1',
            value3: '1'
        }
    },
    mounted () {
    },
    methods: {
        change(val) {
            console.log(val)
        }
    }
}
</script>

## API

### RadioGroup Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  输入的值, 可以使用v-model实现数据的双向绑定  | Number, String, Boolean  |        ''             |
| vertical       | 是否垂直排列 | Boolean   |            false         |
| type       | 单选按钮组类型，可选值有`button`和'' | String   |     ''      |
| readonly       | 是否只读 | Boolean   |     false      |
| disabled       | 禁用 | Boolean   |     false      |

### RadioGroup Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-change          | 值改变时触发  | (value, event) => void  |  

### Radio Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  输入的值, 可以使用v-model实现数据的双向绑定  | Boolean  |       false          |
| label       | 选项的内容 | String   |                ''          |
| disabled       | 是否禁止选中 | Boolean   |     false      |
| readonly       | 是否只读 | Boolean   |     false      |