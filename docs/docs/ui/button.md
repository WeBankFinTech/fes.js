---
pageClass: comp-page-class
---
# Button 按钮

## 概述
基础组件，触发业务逻辑时使用。

## 代码示例

<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="按钮类型" template="ui/templates/button/1.html">
            <template v-slot:demo>
                <Wb-button>Default</Wb-button>
                <Wb-button type="ghost">Ghost</Wb-button>
                <Wb-button type="text">Text</Wb-button>
                <Wb-button type="primary">Primary</Wb-button>
                <Wb-button type="info">Info</Wb-button>
                <Wb-button type="success">Success</Wb-button>
                <Wb-button type="warn">Warn</Wb-button>
                <Wb-button type="error">Error</Wb-button>
            </template>
            <template v-slot:description>
                <p>按钮类型有：默认按钮、主按钮、幽灵按钮、文字按钮以及四种颜色按钮。</p>
                <p>通过设置type为primary、ghost、text、info、success、warn、error创建不同样式的按钮，不设置为默认样式。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="图标按钮及按钮形状" template="ui/templates/button/3.html">
            <template v-slot:demo>
                <Wb-button icon="md-search" circle></Wb-button>
                <Wb-button icon="md-search" circle>查询</Wb-button>
                <Wb-button icon="md-search">查询</Wb-button>
            </template>
            <template v-slot:description>
                <p>通过设置icon属性在Button内部嵌入一个Icon, 显示在Button内部的左边</p>
                <p>通过设置circle属性，可以将Button显示为圆角</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="禁用" template="ui/templates/button/2.html">
            <template v-slot:demo>
                <Wb-button disabled>Default</Wb-button>
                <Wb-button type="ghost" disabled>Ghost</Wb-button>
                <Wb-button type="text" disabled>Text</Wb-button>
                <Wb-button type="primary" disabled>Primary</Wb-button>
                <Wb-button type="info" disabled>Info</Wb-button>
                <Wb-button type="success" disabled>Success</Wb-button>
                <Wb-button type="warn" disabled>Warn</Wb-button>
                <Wb-button type="error" disabled>Error</Wb-button>
            </template>
            <template v-slot:description>
                <p>当设置disabled属性为true时，按钮不可点击</p>
            </template>
        </componetTemplate>
        <componetTemplate title="长按钮" template="ui/templates/button/4.html">
            <template v-slot:demo>
                <Wb-button type="success" long>确认提交</Wb-button>
                <Wb-button type="error" long>确认删除</Wb-button>
            </template>
            <template v-slot:description>
                <p>Button组件的宽度默认是通过内容撑开，但是当设置long属性后按钮为100%宽度</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

## API

### Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| type          | 按钮的类型，可选值是primary、ghost、text、info、success、warn、error或者无  | String  |        null              |
| long        | 控制按钮是否显示为100%宽度 | Boolean   |                     false                        |
| circle        | 控制按钮显示为圆的 | Boolean   |                     false                        |
| disabled        | 控制按钮是否可以点击 | Boolean   |                     false                        |
| icon        | 控制按钮内部左侧显示的小图标 | String   |                     null                        |
| control        | 防止多次点击，在设置的时间内，只有一次点击有效 | Number   |                     300                        |

### Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| click          | 单击按钮触发  | (event) => void  |    