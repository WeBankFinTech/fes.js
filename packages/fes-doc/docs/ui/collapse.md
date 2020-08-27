---
pageClass: comp-page-class
---
# Collapse 折叠面板

## 概述
把一大段内容折叠起来。

## 代码示例

<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基本使用" template="ui/templates/collapse/1.html">
            <template v-slot:demo>
                <collapse v-model="activeKeys" accordion icon-position="left">
                    <collapse-panel name="1">
                        <template slot="title">
                            一致性 Consistency<Icon type="md-help-circle" />
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
            </template>
            <template v-slot:description>
                <p>通过匹配Collpase的value跟CollapsePanel的name属性，如果包含，则当前选项展开</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
    </cell>
</Row>
</ClientOnly>

<script>
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


## API

### Collapse Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          | 展开的选项，可以使用v-model双向绑定  | String/Number/Array  |        null              |
| bordered        | 是否有边框 | Boolean   |                     false                        |
| accordion        | 是否手风琴 | Boolean   |                     false                        |
| iconPosition        | icon的位置，可选值有`left``right` | String   |                     `right`                        |

### CollapsePanel Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| disabled          | 是否禁用  | Boolean  |        false              |
| title        | 标题的内容 | String   |                     ''                        |
| name        | 选项的名称 | String/Number   |                     null                        |
| forceRender        | 是否强制展开 | Boolean   |                    false                      |
| showArrow        | 是否显示icon | Boolean   |                    true                      |
