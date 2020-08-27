<template>
    <div class="layout-page article">
        <h1>Layout 栅格</h1>
        <h2>概述</h2>
        <row class="article-row">
            <cell span="24">span24: 100%</cell>
        </row>
        <row class="article-row">
            <cell span="12">span12: 50%</cell>
            <cell span="12">span12: 50%</cell>
        </row>
        <row class="article-row">
            <cell span="8">span8: 33.3333%</cell>
            <cell span="8">span8: 33.3333%</cell>
            <cell span="8">span8: 33.3333%</cell>
        </row>
        <row class="article-row">
            <cell span="6">span6: 25%</cell>
            <cell span="6">span6: 25%</cell>
            <cell span="6">span6: 25%</cell>
            <cell span="6">span6: 25%</cell>
        </row>
        <row class="article-row">
            <cell span="8" offset="8">offset8 span8</cell>
        </row>

        <p>采用了24栅格的概念，相比Bootstrp的12格，它可以实现更精细的布局比例。解决常用的布局问题、对齐问题、宽度自适应等问题。</p>
        <p>定义了两个概念，行Row和列Cell，具体使用方法如下：</p>
        <ul>
            <li>使用 Row 在水平方向创建一行</li>
            <li>将一组 Cell 插入 Row 中</li>
            <li>在 Cell 写入自己的内容</li>
            <li>通过设置 Cell 的span来控制 Cell 的宽度</li>
            <li>通过设置 Cell 的offset来控制 Cell 往右的偏移</li>
        </ul>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <row class="article-row">
                        <cell span="24">span24</cell>
                    </row>
                    <row class="article-row">
                        <cell span="12">span12</cell>
                        <cell span="12">span12</cell>
                    </row>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>水平排列的布局，Cell必须放在Row里面</p>
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

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <row class="article-row">
                        <cell span="8" offset="8">span8|offset8</cell>
                    </row>
                    <row class="article-row">
                        <cell span="12" offset="12">span12|offset12</cell>
                    </row>
                </div>
                <div class="panel-header">
                    <span>向右偏移</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置offset属性，将列进行右偏移，偏移栅格数为offset的值</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2></markdown2>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Cell props</h3>
        <markdown3></markdown3>
    </div>
</template>
<script type="text/ecmascript-6">
    import markdown1 from './md/layout1.md'
    import markdown2 from './md/layout2.md'
    import markdown3 from './md/layout3.md'
    export default {
        components: {
            markdown1,
            markdown2,
            markdown3
        },
        data: function () {
            return {
            }
        },
        methods: {
        }
    }
</script>
