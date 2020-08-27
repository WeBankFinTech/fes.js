<template>
    <div class="button-page article">
        <h1>Collapse 折叠面板</h1>
        <h2>概述</h2>
        <p>基础组件</p>
        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <collapse v-model="activeKeys" accordion icon-position="left">
                        <collapse-panel name="1">
                            <template slot="title">
                                一致性 Consistency<Icon type="question-circle" />
                            </template>
                            <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                            <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                        </collapse-panel>
                        <collapse-panel name="2" title="反馈 Feedback">
                            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                        </collapse-panel>
                        <collapse-panel name="3" title="效率 Efficiency">
                            <div>简化流程：设计简洁直观的操作流程；</div>
                            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                        </collapse-panel>
                        <collapse-panel name="4" title="可控 Controllability">
                            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                        </collapse-panel>
                    </collapse>
                </div>
                <div class="panel-header">
                    <span>基本使用</span>
                </div>
                <div class="panel-desc">
                    <p>hello</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code" />
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Panel props</h3>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    components: {
    },
    data() {
        return {
            activeKeys: ['1', '2']
        };
    },
    methods: {
    }
};
</script>
