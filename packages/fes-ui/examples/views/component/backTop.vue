<template>
    <div class="article">
        <h1>BackTop 回到顶部</h1>
        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <BackTop :target="getTarget"></BackTop>
                </div>
                <div class="panel-header">
                    <span>基本使用</span>
                </div>
                <div class="panel-desc">
                    <p>默认target滚动元素为document.body，默认height-to-show为400px</p>
                    <p>由于此时页面滚动元素为.right-panel，所以这里不会看到效果</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown4></markdown4>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <BackTop :target="getTarget" :height-to-show="100"></BackTop>
                </div>
                <div class="panel-header">
                    <span>更改设置</span>
                </div>
                <div class="panel-desc">
                    <p>设置target的值以及滚动高度，自定义组件行为</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1></markdown1>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <BackTop style="bottom: 100px" :target="getTarget" :height-to-show="500">
                        <div class = "self-cls">TOP</div>
                    </BackTop>
                </div>
                <div class="panel-header">
                    <span>自定义样式</span>
                </div>
                <div class="panel-desc">
                    <p>自定义组件内元素的样式</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2></markdown2>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Affix props</h3>
        <markdown3></markdown3>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/backTop1.md'
    import markdown2 from './md/backTop2.md'
    import markdown3 from './md/backTop3.md'
    import markdown4 from './md/backTop4.md'

    export default {
        components: {
            markdown1, markdown2, markdown3, markdown4
        },
        methods: {
            getTarget() {
                return document.getElementsByClassName('right-panel')[0];
            }
        }
    }
</script>
<style scoped>
    .self-cls{
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        background-color: #5cadff;
    }
    .self-cls:hover{
        background-color: #3399ff;
    }
</style>
