---
pageClass: comp-page-class
---
# Draggable 拖拽

## 概述
拖拽改变列表数据时使用, 处理数据顺序问题

## 代码示例
<ClientOnly>
<row>
    <cell span="24" class="pr-20">
        <componetTemplate title="按钮类型" template="ui/templates/draggable/1.html">
            <template v-slot:demo>
                <Draggable 
                    v-model="list" 
                    @on-sort-ready="dragready" 
                    @on-sort-end="dragend" 
                    class="category-draggable"
                >
                    <template slot-scope="{item, index}">
                        <p>{{item.content}}</p>
                    </template>
                </Draggable>
            </template>
            <template v-slot:description>
                <p>通过设置差槽作用域获取子项item（默认子项名称），index（默认子项id名称），可以通过es2015的解构方式改变名称，</p>
                <p>可以通过重写ui-draggable-current-item类来自定义拖拽时子项样式</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
export default {
    data: function () {
        return {
            disabled: false,
            list: [
                {
                    content: '序号一',
                    key: 1
                },
                {
                    content: '序号二',
                    key: 2
                },
                {
                    content: '序号三',
                    key: 3
                }
            ]
        }
    },
    ready: function () {
    },
    methods: {
        dragready({e, item, index}) {
            console.log(e, item, index)
        },
        dragend({e, item, index}) {
            console.log(e, item, index)
        }
    }
}
</script>

<style>
.ui-dragging-item{
     background: #eee;
 }
 .draggable-page .son-panel .example-item{
    padding: 10px 40px;
    border: 1px solid #eee;
    margin: 0 0 20px 0; 
}
</style>

## API

### Draggable props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| disabled          | 是否阻止拖拽事件 | Boolean   |                     false                        |
| list        | 数据列表，必填 | Array   |                                             |

### Draggable Events

|      事件名      |                 说明                 |   回调参数   |
|:-------------- |:------------------------------------ |:-------- |:--------- |
| on-sort-ready | 拖拽开始时发生，可以在这通过控制dragDisabled阻止事件   | 共三个参数：依次为鼠标事件对象、当前拖拽节点、当前拖拽节点下标 |
| on-sort-end         | 拖拽结束时触发 | 共三个参数：依次为鼠标事件对象、当前拖拽节点、当前拖拽节点下标|