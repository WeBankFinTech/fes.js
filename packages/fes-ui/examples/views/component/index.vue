<template>
    <div class="body-panel">
        <div class="left-panel">
            <ul class="level-1">
                <li :class="{selected: $route.path=='/component/install' }">
                    <router-link to="/component/install">
                        安装
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/play' }">
                    <router-link to="/component/play">
                        快速上手
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/log' }">
                    <router-link to="/component/log">
                        更新日志
                    </router-link>
                </li>
            </ul>
            <h3>组件</h3>
            <ul class="level-2">
                <li :class="{selected: $route.path=='/component/draggable' }">
                    <router-link to="/component/draggable">
                        Draggable 拖拽
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/layout' }">
                    <router-link to="/component/layout">
                        Layout 栅格
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/icon' }">
                    <router-link to="/component/icon">
                        Icon 图标
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/button' }">
                    <router-link to="/component/button">
                        Button 按钮
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/menu' }">
                    <router-link to="/component/menu">
                        Menu 菜单
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/tab' }">
                    <router-link to="/component/tab">
                        Tabs 标签页
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/table' }">
                    <router-link to="/component/table">
                        Table 表格
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/pagination' }">
                    <router-link to="/component/pagination">
                        Pagination 分页
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/panel' }">
                    <router-link to="/component/panel">
                        Panel 面板
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/collapse' }">
                    <router-link to="/component/collapse">
                        Collapse 折叠面板
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/tree' }">
                    <router-link to="/component/tree">
                        Tree 树形控件
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/step' }">
                    <router-link to="/component/step">
                        Step 步骤条
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/zoom' }">
                    <router-link to="/component/zoom">
                        Zoom 图片放大镜
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/carousel' }">
                    <router-link to="/component/carousel">
                        Carousel 轮播
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/toast' }">
                    <router-link to="/component/toast">
                        Toast 全局提示
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/message' }">
                    <router-link to="/component/message">
                        Message 对话框
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/modal' }">
                    <router-link to="/component/modal">
                        Modal 模态框
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/tooltip' }">
                    <router-link to="/component/tooltip">
                        Tooltip 文本提示
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/loading' }">
                    <router-link to="/component/loading">
                        Loading 加载中
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/input' }">
                    <router-link to="/component/input">
                        Input 输入框
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/select' }">
                    <router-link to="/component/select">
                        Select 选择器
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/radio' }">
                    <router-link to="/component/radio">
                        Radio 单选
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/checkbox' }">
                    <router-link to="/component/checkbox">
                        Checkbox 多选
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/datePicker' }">
                    <router-link to="/component/datePicker">
                        DatePicker 日期选择器
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/timePicker' }">
                    <router-link to="/component/timePicker">
                        TimePicker 时间选择器
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/switch' }">
                    <router-link to="/component/switch">
                        Switch 开关
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/upload' }">
                    <router-link to="/component/upload">
                        Upload 上传
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/form' }">
                    <router-link to="/component/form">
                        Form 表单
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/affix' }">
                    <router-link to="/component/affix">
                        Affix 图钉
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/backtop' }">
                    <router-link to="/component/backtop">
                        BackTop 回到顶部
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/processCircle' }">
                    <router-link to="/component/processCircle">
                        ProcessCircle 进度环
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/dropdown' }">
                    <router-link to="/component/dropdown">
                        Dropdown 下拉菜单
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/contextmenu' }">
                    <router-link to="/component/contextmenu">
                        Contextmenu 右键菜单
                    </router-link>
                </li>
                <li :class="{selected: $route.path=='/component/split' }">
                    <router-link to="/component/split">
                        split 分割面板
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="right-panel">
            <router-view />
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
}
</script>
