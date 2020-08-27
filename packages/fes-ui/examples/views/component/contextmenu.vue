<template>
    <div class="message-page article">
        <h1>Contextmenu 右键菜单</h1>
        <h2>概述</h2>
        <p>自定义的右键菜单</p>


        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <contextmenu :data="actions" @on-choose="doAction">
                        右键点击看看
                    </contextmenu>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown></markdown>
                </div>
            </Cell>
        </Row>


        <h2>Props</h2>
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
                    <td style="text-align:left">data</td>
                    <td style="text-align:left">右键选项</td>
                    <td style="text-align:left">Array</td>
                    <td style="text-align:left">null</td>
                </tr>
                </tbody>
            </table>
        </section>

        <h3>events</h3>
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
                    <td style="text-align:left">on-choose</td>
                    <td style="text-align:left">选择时触发</td>
                    <td style="text-align:left">[data, index]</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown from './md/contextmenu.md'
    export default {
        components: {
            markdown
        },
        data(){
            return {
                actions: [ '新增', '删除', '复制']
            }
        },
        methods: {
            doAction: function (data, index) {
                this.$Toast("点击了" + data)
            }
        }
    }
</script>
