---
pageClass: comp-page-class
---
# Loading 加载中

## 概述
加载中动画，支持定义颜色、大小和边线宽度。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/loading/1.html">
            <template v-slot:demo>
                <Loading></Loading>
                <Loading size="24px" border-width="5px"></Loading>
                <Loading color="red" size="18px" border-width="1px"></Loading>
            </template>
            <template v-slot:description>
                <p>最简单的用法。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="自定义配置" template="ui/templates/loading/2.html">
            <template v-slot:demo>
                <Wb-button>
                    <Loading color="#657180" size="18px" border-width="1px"></Loading>
                    提交中...
                </Wb-button>
            </template>
            <template v-slot:description>
                <p>可以把Loading组件放入其他组件中。</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

## API

### Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| color          |  边线的颜色  | String  |        #2db7f5              |
| size       | 圆圈的直径 | String   |                 32px                        |
| borderWidth       | 边线宽度 | String   |                2px            |