---
pageClass: comp-page-class
---
# Toast 全局提示

## 概述
轻量级的信息反馈组件，在屏幕中间显示，并自动消失。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/toast/1.html">
            <template v-slot:demo>
                <Wb-button @click="click1">显示普通的提示</Wb-button>
            </template>
            <template v-slot:description>
                <p>最基本的提示，默认在3秒后消失。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="提示类型" template="ui/templates/toast/2.html">
            <template v-slot:demo>
                <Wb-button type="error" @click="click2">显示错误的提示</Wb-button>
                <Wb-button type="warn" @click="click4">显示警告的提示</Wb-button>
                <Wb-button type="success" @click="click3">显示成功的提示</Wb-button>
            </template>
            <template v-slot:description>
                <p>不同的提示状态：成功、警告、错误。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="显示时间" template="ui/templates/toast/3.html">
            <template v-slot:demo>
                <Wb-button @click="click5">10s显示</Wb-button>
            </template>
            <template v-slot:description>
                <p>设置配置对象中的duration，可以修改显示时间</p>
            </template>
        </componetTemplate>
        <componetTemplate title="在头部提示" template="ui/templates/toast/4.html">
            <template v-slot:demo>
                <Wb-button @click="click6">在头部提示</Wb-button>
            </template>
            <template v-slot:description>
                <p>设置配置对象中的align为top，默认是center</p>
            </template>
        </componetTemplate>
        <componetTemplate title="提示关闭回调" template="ui/templates/toast/5.html">
            <template v-slot:demo>
                <Wb-button @click="click7">提示关闭回调</Wb-button>
            </template>
            <template v-slot:description>
                <p>设置配置对象中的onClose，当toast关闭时执行onClose</p>
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
            this.$Toast('我是一条提示消息')
        },
        click2 () {
            this.$Toast.error('用户名或者密码不正确')
        },
        click3 () {
            this.$Toast.success('创建订单成功')
        },
        click4 () {
            this.$Toast.warn('请输入正确的用户名')
        },
        click5 () {
            this.$Toast('10s后才关闭', {
                duration: 10000,
            })
        },
        click6 () {
            this.$Toast('提示在头部', {
                align: 'top'
            })
        },
        click7 () {
            this.$Toast('正在加载中', {
                onClose: ()=>{
                    this.$Toast("我关闭了！")
                }
            })
        }
    }
}
</script>

## API
提供了静态方法，在Vue实例里面调用以下方法来使用组件
```js
this.$Toast(message, [option])
this.$Toast.success(message, [option])
this.$Toast.error(message, [option])
this.$Toast.warn(message, [option])
```
立即销毁提示：
```js
const destroy = this.$Toast(message, [option]);
destroy()
```

### Options
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| message          |  提示内容  | String  |        null              |
| option.duration       | 提示显示时间 | Number   |                 3000                        |
| option.align        | 提示的区域，可选值有`top`,`center` | String   |                    `center`               |
| option.onClose        | 当提示消失时触发的事件 | Function   |                    null              |

