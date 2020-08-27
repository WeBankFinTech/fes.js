<template>
    <div class="layout-page article">
        <h1>Menu 导航菜单</h1>
        <h2>代码示例</h2>

        <Row class="panel">
            <Cell span="24" style=" padding: 100px;">
                <Wb-menu :active-name.sync="activeName" :type="type" mode="horizontal" @select="selectMenu">
                    <Wb-menu-item :icon="icon" name="1">我的菜单</Wb-menu-item>
                    <Wb-menu-item name="2">个人信息</Wb-menu-item>
                    <Wb-menu-item name="3">我的管理</Wb-menu-item>
                    <Wb-sub-menu :icon="icon" title="内容管理">
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
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="6">
                <div class="menuContainer">
                    <Wb-menu :active-name.sync="activeName" :auto-close="false" :type="type" :width="180" @select="selectMenu">
                        <Wb-menu-item :icon="icon" name="1">我的菜单</Wb-menu-item>
                        <Wb-menu-item name="2">个人信息</Wb-menu-item>
                        <Wb-menu-item name="3">我的管理</Wb-menu-item>
                        <Wb-sub-menu :icon="icon" title="内容管理">
                            <Wb-menu-item :icon="icon" name="4-1">新增</Wb-menu-item>
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
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>普通用法</p>
                    <Radio-group v-model="type">
                        <Radio value="light">
                            light
                        </Radio>
                        <Radio value="dark">
                            dark
                        </Radio>
                    </Radio-group>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="18">
                <div class="code">
                    <markdown1 />
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="6">
                <div class="menuContainer">
                    <route-menu :menu="menu" :width="180" :type="type" />
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>配合vue-router使用</p>
                    <Radio-group v-model="type">
                        <Radio value="light">
                            light
                        </Radio>
                        <Radio value="dark">
                            dark
                        </Radio>
                    </Radio-group>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="18">
                <div class="code">
                    <markdown2 />
                </div>
            </Cell>
        </Row>
        <h2>API</h2>
        <markdown3 />
    </div>
</template>
<script>
import markdown1 from './md/menu1.md';
import markdown2 from './md/menu2.md';
import markdown3 from './md/menu3.md';

export default {
    components: {
        markdown1,
        markdown2,
        markdown3
    },
    data() {
        return {
            activeName: 1,
            type: 'light',
            icon: require('../../images/icon_notice.png'),
            menu: [
                {
                    title: '组件',
                    icon: require('../../images/icon_notice.png'),
                    subMenu: [
                        {
                            icon: require('../../images/icon_notice.png'),
                            title: 'Layout 栅格',
                            path: '/component/layout'
                        },
                        {
                            title: 'Icon 图标',
                            path: '/component/icon'
                        },
                        {
                            title: 'Menu',
                            path: '/component/menu'
                        }
                    ]
                },
                {
                    title: 'Button',
                    path: '/component/button'
                },
                {
                    title: 'Tab',
                    path: '/component/tab'
                }
            ]
        };
    },
    methods: {
        selectMenu(name) {
            console.log('activeName:' + this.activeName, 'name:' + name);
        }
    }
};
</script>
<style scoped>
.menuContainer {
  padding-bottom: 20px;
}
.panel .panel-split {
  left: 25%;
}
</style>