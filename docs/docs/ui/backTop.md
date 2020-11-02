---
pageClass: comp-page-class
---
# BackTop 回到顶部

## 概述
页面过长时，方便回到页面顶部

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础使用" template="ui/templates/backTop/1.html">
            <template v-slot:demo>
                <Back-top></Back-top>
            </template>
            <template v-slot:description>
                <p>默认target滚动元素为document.body，默认height-to-show为400px。</p>
                <p>由于此时页面滚动元素为.right-panel，所以这里不会看到效果。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="自定义样式" template="ui/templates/backTop/2.html">
            <template v-slot:demo>
                <Back-top style="bottom: 100px" :height-to-show="300">
                    <div class="self-cls">TOP</div>
                </Back-top>
            </template>
            <template v-slot:description>
                <p>自定义组件内元素的样式</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<style lang="scss">
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

<script>
export default {
}
</script>

## API

### Props

|      属性      |                 说明                 |   类型   |  默认值   |
|:-------------- |:------------------------------------ |:-------- |:--------- |
| height-to-show | 定义显示时距顶部的距离（单位：px）   | Number   | 400       |
| target         | 当处于滚动元素中时，定义滚动的父元素 | Function | document.body |


<div style="height:1000px"></div>