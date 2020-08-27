---
pageClass: comp-page-class
---
# Switch 开关

## 概述
需要表示开关状态/两种状态之间的切换时使用。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/switch/1.html">
            <template v-slot:demo>
                <Wb-switch v-model="value"/>
            </template>
            <template v-slot:description>
                <p>在组件中绑定v-model控制开关状态</p>
            </template>
        </componetTemplate>
        <componetTemplate title="文字和图标" template="ui/templates/switch/2.html">
            <template v-slot:demo>
                <Wb-switch>
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </Wb-switch>
                <Wb-switch>
                    <Icon slot="open" type="md-checkmark"></Icon>
                    <Icon slot="close" type="md-close"></Icon>
                </Wb-switch>
            </template>
            <template v-slot:description>
                <p>自定义内容，slot为open的文字或者图标在on为true时显示，反之依然。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="切换前询问" template="ui/templates/switch/3.html">
            <template v-slot:demo>
                <Wb-switch :confirm="confirm"></Wb-switch>
            </template>
            <template v-slot:description>
                <p>点击切换时，弹出confirm询问，点击确定之后才发生切换。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="只读和禁用" template="ui/templates/switch/4.html">
            <template v-slot:demo>
                <Wb-switch readonly></Wb-switch>
                <Wb-switch disabled></Wb-switch>
            </template>
            <template v-slot:description>
                <p>设置readonly为只读，设置disabled为禁用</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<style lang="scss">
</style>

<script>
export default {
    data() {
        return {
            value: false
        }
    },
    methods: {
        confirm() {
            return new Promise((resolve, reject)=>{
                this.$Message({
                    title: '警告', // 可以传入文本和domString
                    template: '是否切换状态？', // 可以传入文本和domString
                }).then(function (index) {
                    if (index == 0) {
                        resolve()
                    }
                })
            })
        },
    }
}
</script>

## API

### WbSwitch Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  日期的值，可以使用v-model实现数据的双向绑定  | String  |        null         |
| disabled       | 是否禁用 | Boolean   |     false      |
| readonly       | 是否只读 | Boolean   |     false      |
| confirm       |  状态切换前的询问，函数返回promise，当promise的状态为resolve时执行切换 |  Function   |       null      |


### WbSwitch Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-change          | 切换后触发  | (value) => void  |  
