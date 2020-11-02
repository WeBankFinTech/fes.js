---
pageClass: comp-page-class
---
# Contextmenu 右键菜单
自定义的右键菜单

## 代码示例

<ClientOnly>
<componetTemplate title="基本使用" template="ui/templates/contextmenu/1.html">
    <template v-slot:demo>
        <contextmenu :data="actions" @on-choose="doAction">
            右键点击
        </contextmenu>
    </template>
    <template v-slot:description>
        <p>在data中提供下拉菜单数据内容，数据格式见API</p>
    </template>
</componetTemplate>
</ClientOnly>

<script>
export default {
    data() {
        return {
            actions: [ '新增', '删除', '复制']
        }
    },
    methods: {
        doAction (data, index) {
            this.$Toast("点击了" + data + index)
        }
    }
}
</script>

## API

### Dropdown Props
|  属性   |                                 说明                                 |        类型         |       默认值        |
|:------- |:-------------------------------------------------------------------- |:------------------- |:------------------- |
| data    | 菜单数据源                                                           | Array               | -                    |

### Dropdown Events
|   事件名    |          说明          | 返回值 |
|:----------- |:---------------------- |:------ |
| on-choose | 点击菜单项时触发的事件 | (item, index)  |

