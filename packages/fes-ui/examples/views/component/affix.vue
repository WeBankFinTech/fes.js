<template>
    <div class="article">
        <h1>Affix 图钉</h1>
        <h2>代码示例</h2>
        
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Affix :target="getTarget">
                        <Wb-button type="primary" long>默认距离滚动元素顶部0px(此处为.right-panel,默认为window)</Wb-button>
                    </Affix>
                </div>
                <div class="panel-header">
                    <span>基本使用</span>
                </div>
                <div class="panel-desc">
                    <p>图钉提供三个属性offset-top和offset-bottom,一个触发事件statu-change</p>
                    <p>默认offset-top=0，offset-bottom=undefined，均为Number类型，代表距离父滚动元素顶部或者底部的距离（单位：px）</p>
                    <p>当设置的offset-top或者offset-bottom太大超出父滚动元素高度时，变成默认的0px，即贴边</p>
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
                    <Affix :offset-top="40" :target="getTarget">
                        <span class="demo-class">距离滚动元素.right-panel顶部40px</span>
                    </Affix>
                </div>
                <div class="panel-header">
                    <span>slot自定义样式</span>
                </div>
                <div class="panel-desc">
                    <p>在Affix内自定义自己的图钉样式</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2></markdown2>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Affix :offset-bottom="0" @on-change="change" :target="getTarget">
                        <Wb-button type="primary" long>距离滚动元素.right-panel底部0px</Wb-button>
                    </Affix>
                </div>
                <div class="panel-header">
                    <span>on-change事件</span>
                </div>
                <div class="panel-desc">
                    <p>@status-change绑定事件可以监听图钉状态变化</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown3></markdown3>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Affix props</h3>
        <markdown4></markdown4>
        <h3>Affix event</h3>
        <markdown5></markdown5>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/affix1.md'
    import markdown2 from './md/affix2.md'
    import markdown3 from './md/affix3.md'
    import markdown4 from './md/affix4.md'
    import markdown5 from './md/affix5.md'
    export default {
        components: {
            markdown1, markdown2, markdown3, markdown4, markdown5
        },
        methods: {
            change(status) {
                // this.$Toast(`第三个图钉当前状态：${status}`);
            },
            getTarget() {
                return document.getElementsByClassName('right-panel')[0]
            }
        }
    }
</script>
<style scoped>
    .demo-class{
        height: 30px;
        padding:0px 10px;
        text-align:center;
        line-height: 30px;
        background: #3399ff;
        color: #fff;
        display: inline-block;
    }
</style>
