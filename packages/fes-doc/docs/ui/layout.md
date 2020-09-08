---
pageClass: comp-page-class
---
# Layout 栅格

## 概述
<ClientOnly>
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
</ClientOnly>

采用了24栅格的概念，相比Bootstrp的12格，它可以实现更精细的布局比例。解决常用的布局问题、对齐问题、宽度自适应等问题。   

定义了两个概念，行Row和列Cell，具体使用方法如下：   
* 使用 Row 在水平方向创建一行
* 将一组 Cell 插入 Row 中
* 在 Cell 写入自己的内容
* 通过设置 Cell 的span来控制 Cell 的宽度
* 通过设置 Cell 的offset来控制 Cell 往右的偏移

## 代码示例

<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/layout/1.html">
            <template v-slot:demo>
                <row class="article-row">
                    <cell span="24">span24</cell>
                </row>
                <row class="article-row">
                    <cell span="12">span12</cell>
                    <cell span="12">span12</cell>
                </row>
            </template>
            <template v-slot:description>
                <p>水平排列的布局，Cell必须放在Row里面</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="向右偏移" template="ui/templates/layout/2.html">
            <template v-slot:demo>
                <Row class="article-row">
                    <Cell span="8" offset="8">span8|offset8</Cell>
                </Row>
                <Row class="article-row">
                    <Cell span="12" offset="12">span12|offset12</Cell>
                </Row>
            </template>
            <template v-slot:description>
                <p>通过设置offset属性，将列进行右偏移，偏移栅格数为offset的值</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

## API

### Cell props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| span          | 栅格的占位格数，可选值为0~24的整数  | String\|Number  |        null              |
| offset        | 栅格的向右偏移数，可选值为0~24的整数 | String\|Number   |                     null                        |

