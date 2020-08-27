<template>
    <div class="button-page article">
        <h1>Panel 面板</h1>
        <h2>概述</h2>
        <p>基础组件，触发业务逻辑时使用</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Panel title="我是标题">
                        <Icon slot="action" type="rollback"/>
                        <!-- <Wb-button type="primary" icon="plus" slot="action">新增</Wb-button> -->
                        11111111111
                    </Panel>
                </div>
                <div class="panel-header">
                    <span>按钮类型</span>
                </div>
                <div class="panel-desc">
                    <p>按钮类型有：默认按钮、主按钮、幽灵按钮、文字按钮以及四种颜色按钮。</p>
                    <p>通过设置type为primary、ghost、text、info、success、warn、error创建不同样式的按钮，不设置为默认样式。</p>
                </div>
            </Cell>
            <div class="panel-split"/>
            <Cell class="son-panel" span="12">
                <div class="code"/>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Panel props</h3>
        <!--<markdown3></markdown3>-->
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    components: {
    },
    data: function () {
        return {
        }
    },
    methods: {
        console() {
            console.log(1)
        }
    }
}
</script>
