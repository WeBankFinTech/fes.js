---
pageClass: comp-page-class
---
# Message 提示

## 概述
重量级的信息反馈组件，在屏幕中间显示，显示少量内容，给予提示，需要用户确认。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/message/1.html">
            <template v-slot:demo>
                <Wb-button @click="click1">显示内容</Wb-button>
                <Wb-button @click="click2">显示标题和内容</Wb-button>
            </template>
            <template v-slot:description>
                <p>基础用法，默认有确认和取消两个按钮</p>
            </template>
        </componetTemplate>
        <componetTemplate title="自定义配置" template="ui/templates/message/2.html">
            <template v-slot:demo>
                <Wb-button @click="click5">可配置的Message</Wb-button>
            </template>
            <template v-slot:description>
                <p>传入配置对象，可以配置标题、内容、按钮文字</p>
                <p>标题和内容支持传入html</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="Message类型" template="ui/templates/message/3.html">
            <template v-slot:demo>
                <Wb-button @click="click3">alert模式</Wb-button>
                <Wb-button @click="click4">confirm模式</Wb-button>
            </template>
            <template v-slot:description>
                <p>alert模式只有确认按钮，confirm模式有确认和取消按钮。</p>
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
        click1 () {
            this.$Message("我是提示").then(function (index) {
                console.log(index)
            })
        },
        click2 () {
            this.$Message("标题", "我是提示").then(function (index) {
                console.log(index)
            })
        },
        click3 () {
            this.$Message.alert("标题", "我是提示").then(function (index) {
                console.log(index)
            })
        },
        click4 () {
            this.$Message.confirm("标题", "我是提示").then(function (index) {
                console.log(index)
            })
        },
        click5 () {
            this.$Message({
                title: '标题',              //可以传入文本和domString
                template: '我是模版',        //可以传入文本和domString
                buttons: [{                 //最多有两个, 第一条配置第一个button
                    text: '确定',
                    class: "xx"
                },{                         //配置第二个button
                    text: "放弃",
                    class: "yy"
                }]
            }).then(function (index) {
                console.log(index)
            })
        }
    }
}
</script>

## API
提供了静态方法，在Vue实例里面调用以下方法来使用组件
```js
this.$Message(title, template)
this.$Message(option)
this.$Message.success(title, template)
this.$Message.success(option)
this.$Message.error(title, template) 
this.$Message.error(option)
this.$Message.warn(title, template)
this.$Message.warn(option)
```
函数执行的返回值是promise，当点击按钮时触发resolve，参数是按钮的index
```js
this.$Message.confirm("标题", "我是提示").then(function (index) {
    console.log(index)
})
```

### Options
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| title          |  标题，内容可以是字符串和包含Dom结构的字符串  | String  |        null              |
| template       | 提示内容，内容可以是字符串和包含Dom结构的字符串 | String   |                 null                        |
| buttons       | 配置按钮的数据，最多两个，多余的不显示 | Array   |                []             |
| buttons.text        | 按钮文字 | String   |                    null              |
| buttons.show        | 按钮是否显示 | Boolean   |                    true              |
| buttons.class        | 按钮的样式 | String   |                    null              |
