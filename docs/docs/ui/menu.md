---
pageClass: comp-page-class
---
# Menu 导航菜单
为页面和功能提供导航的菜单列表。

## 概述
导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/menu/1.html">
            <template v-slot:demo>
                <Wb-menu :active-name.sync="activeName" :auto-close="true" :type="type" :width="180" @select="selectMenu">
                    <Wb-menu-item :icon="icon" name="1">我的菜单</Wb-menu-item>
                    <Wb-menu-item name="2">个人信息</Wb-menu-item>
                    <Wb-menu-item name="3">我的管理</Wb-menu-item>
                    <Wb-sub-menu title="内容管理">
                        <Wb-menu-item name="4-1">新增</Wb-menu-item>
                        <Wb-menu-item name="4-2">修改</Wb-menu-item>
                    </Wb-sub-menu>
                    <Wb-sub-menu title="内容管理">
                        <Wb-menu-group title="编辑">
                            <Wb-menu-item name="5-1">新增</Wb-menu-item>
                            <Wb-menu-item name="5-2">修改</Wb-menu-item>
                        </Wb-menu-group>
                        <Wb-menu-group title="查询">
                            <Wb-menu-item name="5-3">文章</Wb-menu-item>
                            <Wb-menu-item name="5-4">作者</Wb-menu-item>
                        </Wb-menu-group>
                    </Wb-sub-menu>
                </Wb-menu>
                <Wb-menu style="margin-top: 20px;" :active-name.sync="activeName" :auto-close="true" mode="horizontal" :type="type" @select="selectMenu">
                    <Wb-menu-item name="1">我的菜单</Wb-menu-item>
                    <Wb-menu-item name="2">个人信息</Wb-menu-item>
                    <Wb-menu-item name="3">我的管理</Wb-menu-item>
                    <Wb-sub-menu title="内容管理">
                        <Wb-menu-item name="4-1">新增</Wb-menu-item>
                        <Wb-menu-item name="4-2">修改</Wb-menu-item>
                    </Wb-sub-menu>
                    <Wb-sub-menu title="内容管理">
                        <Wb-menu-group title="编辑">
                            <Wb-menu-item name="5-1">新增</Wb-menu-item>
                            <Wb-menu-item name="5-2">修改</Wb-menu-item>
                        </Wb-menu-group>
                        <Wb-menu-group title="查询">
                            <Wb-menu-item name="5-3">文章</Wb-menu-item>
                            <Wb-menu-item name="5-4">作者</Wb-menu-item>
                        </Wb-menu-group>
                    </Wb-sub-menu>
                </Wb-menu>
            </template>
            <template v-slot:description>
                <p>有两种布局类型，可选horizontal（水平）、vertical(垂直)两种，默认为vertical。</p>
                <p>有两种颜色类型，点击下方可切换：</p>
                <Radio-group v-model="type">
                    <Radio value="light">
                        light
                    </Radio>
                    <Radio value="dark">
                        dark
                    </Radio>
                </Radio-group>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="配合vue-router使用" template="ui/templates/menu/2.html">
            <template v-slot:demo>
                <route-menu :menu="menu" :width="180"></route-menu>
            </template>
            <template v-slot:description>
                <p>传入MenuList，就可以自动实现点击跳转的逻辑</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
export default {
    data(){
        return {
            activeName: "1",
            type: 'light',
            icon: require('../../images/icon_notice.png'),
            menu: [
                {
                    title: '组件',
                    icon: require('../../images/icon_notice.png'),
                    subMenu: [
                        {
                            title: 'Layout 栅格',
                            path: '/ui/layout'
                        },
                        {
                            title: 'Icon 图标',
                            path: '/ui/icon'
                        },
                        {
                            title: 'Menu',
                            path: '/ui/menu'
                        }
                    ]
                },
                {
                    title: 'Button',
                    path: '/ui/button'
                },
                {
                    title: 'Tab',
                    path: '/ui/tab'
                }
            ]
        }
    },
    mounted(){
        console.log(this)
    },
    methods: {
        selectMenu(name) {
            console.log('activeName:' + this.activeName, 'name:' + name);
        }
    }
}
</script>

## API

### RouteMenu Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| mode          | 布局模式，可选有`horizontal`水平, `vertical` 垂直 | String  |       vertical              |
| type          | 颜色类型，可选有`light`白色, `dark`蓝色 | String  |       light              |
| width          | 宽度  | Number/String  |                   |
| autoClose        | 是否自动收起菜单。当垂直模式时，点击菜单列表，是否关闭已经打开的菜单列表 | Boolean   |      false |
| menu          | 菜单配置项  | Array  |       无              |
| menu.title   | 菜单标题 | String   |    空      |
| menu.path   | 菜单项点击后，跳转路径 | String   |    空   |                 
| menu.subMenu   | 子菜单，每项也有path和title | Array   |    空   |          
| menu.icon   | 图标 | String   |    空   |        
               
### Menu Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| mode          | 布局模式，可选有`horizontal`水平, `vertical` 垂直 | String  |       vertical              |
| type          | 颜色类型，可选有`light`白色, `dark`蓝色  | String  |       light              |
| width          | 宽度  | Number/String  |          undefined         |
| active-name        | 激活菜单的 name 值 | Number/String   |                     undefined                        |
| autoClose        | 是否自动收起菜单。当垂直模式时，点击菜单列表，是否关闭已经打开的菜单列表 | Boolean   |          false              |

### Menu Events
| 事件名         | 说明                       | 返回值     |
|:--------------|:--------------------------|:--------|
| select          | 选择菜单（Menu-item）时触发  | name  |

### MenuGroup Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| title          | 分组标题  | String  |       空             |

### SubMenu Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| title          | 必填，唯一标识  | Number/String  |       空             |
| icon          | 图标，url 或者 base64数据  | String  |       空             |
| expand          | 默认是否展开  | Boolean  |       false             |

### MenuItem props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| name          | 必填，唯一标识  | Number/String  |       空             |
| icon          | 图标，url 或者 base64数据  |  String  |       空             |
