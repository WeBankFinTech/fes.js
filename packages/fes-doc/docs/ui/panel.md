---
pageClass: comp-page-class
---
# Panel 面板

## 概述
视图组件，面板来用包裹一段内容

## 代码示例
<ClientOnly>
<componetTemplate title="基础用法" template="ui/templates/panel/1.html">
    <template v-slot:demo>
        <Panel title="我是标题">
            <Icon type="md-arrow-round-back" slot="action"></Icon>
            <Wb-form label-position="left" :label-width="100">
                <Form-item label="输入框">
                    <wb-input placeholder="请输入"></wb-input>
                </Form-item>
                <Form-item label="密码输入框">
                    <wb-input placeholder="请输入" type="password"></wb-input>
                </Form-item>
                <Form-item label="数字输入框">
                    <wb-input placeholder="请输入" type="number"></wb-input>
                </Form-item>
                <Form-item label="数字输入框">
                    <wb-input placeholder="请输入" type="number"></wb-input>
                </Form-item>
            </Wb-form>
        </Panel>
    </template>
    <template v-slot:description>
        <p>基础用法。</p>
    </template>
</componetTemplate>
</ClientOnly>

<script>
export default {
}
</script>

<style lang="scss">
</style>



## API

### Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| title       | 标题         | String  |        undefined              |


### Solts
| 名称           | 说明                            |     
|:----------------|:--------------------------|
| action        |  配置面板的操作  |


