<template>
    <div class="draggable-page article">
        <h1>Draggable 拖拽</h1>
        <h2>概述</h2>
        <p>拖拽改变列表数据时使用, 处理数据顺序问题069</p>
    
        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Draggable v-model="list" @on-sort-ready="dragready" @on-sort-end="dragend" class="category-draggable">
                        <template slot-scope="{item, index}">
                            <p>{{item.content}}</p>
                        </template>
                    </Draggable>
                </div>
                <div class="panel-header">
                    <span>按钮类型</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置差槽作用域获取子项item（默认子项名称），index（默认子项id名称），可以通过es2015的解构方式改变名称，</p>
                    <p>可以通过重写ui-draggable-current-item类来自定义拖拽时子项样式</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1></markdown1>
                </div>
            </Cell>
        </Row>
    
        <h2>API</h2>
        <h3>Draggable props</h3>
        <markdown2></markdown2>
        <h3>Draggable Events</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">事件名</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">返回值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">item-dragstart</td>
                    <td style="text-align:left">拖拽开始时发生，可以在这通过控制dragDisabled阻止事件</td>
                    <td style="text-align:left">当前拖拽item</td>
                </tr>
                <tr>
                    <td style="text-align:left">item-dragstart</td>
                    <td style="text-align:left">拖拽结束时触发</td>
                    <td style="text-align:left"></td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/draggable1.md'
import markdown2 from './md/draggable2.md'
export default {
    components: {
        markdown1, markdown2
    },
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
        dragready() {
            console.log(this.disabled)
        },
        dragend() {
            console.log('end')
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
