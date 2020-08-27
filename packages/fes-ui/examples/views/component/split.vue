<template>
    <div class="checkbox-page article">
        <h1>Split 面板分割</h1>
        <h2>概述</h2>
        <p>基本组件-多选框。基本组件-多选框。主要用于一组可选项多项选择，或者单独用于标记切换某种状态。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case" style="height: 600px">
                    <split diretion="vertical" @on-move-start="movestart" @on-moving="moving" @on-move-end="moveend">
                        <splitItem>
                            1
                        </splitItem>
                        <splitItem>
                            2
                        </splitItem>
                        <splitItem>
                            3
                        </splitItem>
                    </split>
                </div>
                <div class="panel-header">
                    <span>单独使用</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置checked来标记是否选择，因为组件内部是使用v-model来绑定，所以需要将checked设置.sync实现数据的双向绑定，否则在改变状态时，使用者的数据并没有变化。</p>
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
        <h3>CheckboxGroup props</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">属性</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">类型</th>
                    <th style="text-align:left">默认值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">value</td>
                    <td style="text-align:left">选择的值，必须设置为.sync</td>
                    <td style="text-align:left">Array</td>
                    <td style="text-align:left">[]</td>
                </tr>
                <tr>
                    <td style="text-align:left">vertical</td>
                    <td style="text-align:left">选项排列方向</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>CheckboxGroup events</h3>
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
                    <td style="text-align:left">on-change</td>
                    <td style="text-align:left">值改变时触发</td>
                    <td style="text-align:left">event</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>Checkbox props</h3>
        <section>
            <table>
                <thead>
                <tr>
                    <th style="text-align:left">属性</th>
                    <th style="text-align:left">说明</th>
                    <th style="text-align:left">类型</th>
                    <th style="text-align:left">默认值</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td style="text-align:left">value</td>
                    <td style="text-align:left">选项的值，必输</td>
                    <td style="text-align:left">Number, String</td>
                    <td style="text-align:left">""</td>
                </tr>
                <tr>
                    <td style="text-align:left">checked</td>
                    <td style="text-align:left">是否被选中</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                <tr>
                    <td style="text-align:left">disabled</td>
                    <td style="text-align:left">是否禁用</td>
                    <td style="text-align:left">Boolean</td>
                    <td style="text-align:left">false</td>
                </tr>
                </tbody>
            </table>
        </section>

    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/checkbox1.md'
    import markdown2 from './md/checkbox2.md'
    import markdown3 from './md/checkbox3.md'
    export default {
        components: {
            markdown1, markdown2, markdown3
        },
        data: function () {
            return {
                show: false
            }
        },
        ready: function () {
        },
        methods: {
            movestart(val) {
            },
            moving(val) {
            },
            moveend(val) {
            },
        }
    }
</script>
<style>
    .ui-split {
        height: 300px;
        border: 1px solid #d7d7d7;
        margin: 20px 0;
    }
    .ui-split-vertical .ui-split-item:not(:first-child){
        border-top: 1px solid #d7d7d7;
    }
    .ui-split-horizontal .ui-split-item:not(:first-child){
        border-left: 1px solid #d7d7d7;
    }
</style>
