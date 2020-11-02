---
pageClass: comp-page-class
---
# Checkbox 多选

## 概述
表单组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/checkbox/1.html">
            <template v-slot:demo>
                <Checkbox-group v-model="value1" @on-change="change">
                    <Checkbox value="1">
                        apple
                    </Checkbox>
                    <Checkbox value="2">
                        android
                    </Checkbox>
                    <Checkbox value="3">
                        github
                    </Checkbox>
                </Checkbox-group>
            </template>
            <template v-slot:description>
                <p>Checkbox-group可以多选。在组合使用时，Checkbox不再根据自身value的值来判断是否选中，而是根据Checkbox-group的value值和自身value值判断。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="单独使用" template="ui/templates/checkbox/2.html">
            <template v-slot:demo>
                <Checkbox v-model="checked">checkbox</Checkbox>
                <Checkbox label="使用disabeld，checkbox" disabled></Checkbox>
            </template>
            <template v-slot:description>
                <p>适合单独使用Checkbox的场景，用value控制Checkbox是否被选中。用v-model实现数据的双向通讯。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="垂直方向" template="ui/templates/checkbox/3.html">
            <template v-slot:demo>
                <Checkbox-group v-model="value2" vertical>
                    <Checkbox value="1">
                        apple
                    </Checkbox>
                    <Checkbox value="2">
                        android
                    </Checkbox>
                    <Checkbox value="3">
                        github
                    </Checkbox>
                </Checkbox-group>
            </template>
            <template v-slot:description>
                <p>设置属性 vertical ，选项垂直排列</p>
            </template>
        </componetTemplate>
        <componetTemplate title="只读和禁用" template="ui/templates/checkbox/4.html">
            <template v-slot:demo>
                <Checkbox-group readonly>
                    <Checkbox value="1">
                        apple
                    </Checkbox>
                    <Checkbox value="2">
                        android
                    </Checkbox>
                    <Checkbox value="3">
                        github
                    </Checkbox>
                </Checkbox-group>
                <Checkbox-group disabled>
                    <Checkbox value="1">
                        apple
                    </Checkbox>
                    <Checkbox value="2">
                        android
                    </Checkbox>
                    <Checkbox value="3">
                        github
                    </Checkbox>
                </Checkbox-group>
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
    .ui-checkbox-group:first-child{
        margin-top: 0px;
    }
}
.ui-checkbox-group{
    display: block;
    margin-top: 20px;
}
</style>

<script>
export default {
    data() {
        return {
            checked: false,
            value1: [],
            value2: []
        }
    },
    methods: {
        change(val) {
            console.log(val)
        }
    }
}
</script>

## API

### CheckboxGroup Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  输入的值, 可以使用v-model实现数据的双向绑定  | Number, String, Boolean  |        ''             |
| vertical       | 是否垂直排列 | Boolean   |            false         |
| readonly       | 是否只读 | Boolean   |     false      |
| disabled       | 禁用 | Boolean   |     false      |

### CheckboxGroup Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-change          | 值改变时触发  | (value, event) => void  |  

### Checkbox Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  输入的值, 可以使用v-model实现数据的双向绑定  | Boolean  |       false          |
| label       | 选项的内容 | String   |                ''          |
| disabled       | 是否禁止选中 | Boolean   |     false      |
| readonly       | 是否只读 | Boolean   |     false      |