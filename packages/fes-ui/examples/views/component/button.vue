<template>
    <div class="button-page article">
        <h1>Button 按钮</h1>
        <h2>概述</h2>
        <p>基础组件，触发业务逻辑时使用</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-button @click="console" disabled>Default</Wb-button>
                    <Wb-button type="ghost">Ghost</Wb-button>
                    <Wb-button type="text">Text</Wb-button>
                    <Wb-button type="primary">Primary</Wb-button>
                    <Wb-button type="info">Info</Wb-button>
                    <Wb-button type="success">Success</Wb-button>
                    <Wb-button type="warn">Warn</Wb-button>
                    <Wb-button type="error">Error</Wb-button>
                </div>
                <div class="panel-header">
                    <span>按钮类型</span>
                </div>
                <div class="panel-desc">
                    <p>按钮类型有：默认按钮、主按钮、幽灵按钮、文字按钮以及四种颜色按钮。</p>
                    <p>通过设置type为primary、ghost、text、info、success、warn、error创建不同样式的按钮，不设置为默认样式。</p>
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
                    <Wb-button icon="md-search" circle></Wb-button>
                    <Wb-button icon="md-search" circle>查询</Wb-button>
                    <Wb-button icon="md-search">查询</Wb-button>
                </div>
                <div class="panel-header">
                    <span>图标按钮及按钮形状</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置icon属性在Button内部嵌入一个Icon, 显示在Button内部的左边</p>
                    <p>通过设置circle属性，可以将Button显示为圆角</p>
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

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-button type="success" long>确认提交</Wb-button>
                    <Wb-button type="error" long>确认删除</Wb-button>
                </div>
                <div class="panel-header">
                    <span>长按钮</span>
                </div>
                <div class="panel-desc">
                    <p>通过设置long属性，可以将按钮设置为100%宽度</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown4></markdown4>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Button props</h3>
        <markdown3></markdown3>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/button1.md';
import markdown2 from './md/button2.md';
import markdown3 from './md/button3.md';
import markdown4 from './md/button4.md';

export default {
    components: {
        markdown1, markdown2, markdown3, markdown4
    },
    data() {
        return {
        };
    },
    ready() {
    },
    methods: {
        console() {
            console.log(1);
        }
    }
};
</script>
