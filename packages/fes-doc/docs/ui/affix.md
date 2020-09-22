---
pageClass: comp-page-class
---
# Affix 图钉

## 代码示例

<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础使用" template="ui/templates/affix/1.html">
            <template v-slot:demo>
                <Affix :offset-top="60">
                    <Wb-button type="primary" long>默认距离滚动元素顶部0px</Wb-button>
                </Affix>
            </template>
            <template v-slot:description>
                <p>图钉提供三个属性offset-top和offset-bottom，一个触发事件statu-change。</p>
                <p>默认offset-top=0，offset-bottom=undefined，均为Number类型，代表距离父滚动元素顶部或者底部的距离（单位：px）。</p>
                <p>当设置的offset-top或者offset-bottom太大超出父滚动元素高度时，变成默认的0px，即贴边。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate style="padding-top: 600px" title="slot自定义样式" template="ui/templates/affix/2.html">
            <template v-slot:demo>
                <Affix :offset-bottom="100">
                    <span class="demo-class">距离滚动元素顶部40px</span>
                </Affix>
            </template>
            <template v-slot:description>
                <p>自定义组件内元素的样式</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<style lang="scss">
.demo-class {
  height: 30px;
  padding: 0px 10px;
  text-align: center;
  line-height: 30px;
  background: #3399ff;
  color: #fff;
  display: inline-block;
}
</style>

<script>
</script>

## API

### Props

|      属性      |                 说明                 |   类型   |  默认值   |
|:-------------- |:------------------------------------ |:-------- |:--------- |
| height-to-show | 定义显示时距顶部的距离（单位：px）   | Number   | 400       |
| target         | 当处于滚动元素中时，定义滚动的父元素 | Function | document.body |


<div style="height:1000px"></div>