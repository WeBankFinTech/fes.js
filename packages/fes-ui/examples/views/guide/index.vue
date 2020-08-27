<template>
    <div class="body-panel">
        <div class="left-panel">
            <ul class="level-1">
                <li :class="{selected: $route.path=='/guide/install' }"> <a v-link="{ path:'/guide/install'}">安装</a> </li>
                <li :class="{selected: $route.path=='/guide/play' }"> <a v-link="{ path:'/guide/play'}">快速上手</a> </li>
                <li :class="{selected: $route.path=='/guide/log' }"> <a v-link="{ path:'/guide/log'}">更新日志</a> </li>
            </ul>
            <h3>介绍</h3>
            <ul class="level-2">
                <li :class="{selected: $route.path=='/guide/introduce' }"> <a v-link="{ path:'/guide/introduce'}">何为Fes</a> </li>
                <li :class="{selected: $route.path=='/guide/route' }"> <a v-link="{ path:'/guide/route'}">路由</a> </li>
                <li :class="{selected: $route.path=='/guide/layout' }"> <a v-link="{ path:'/guide/layout'}">布局</a> </li>
                <li :class="{selected: $route.path=='/guide/config' }"> <a v-link="{ path:'/guide/config'}">系统配置</a> </li>
                <li :class="{selected: $route.path=='/guide/role' }"> <a v-link="{ path:'/guide/role'}">权限管理</a> </li>
                <li :class="{selected: $route.path=='/guide/fes' }"> <a v-link="{ path:'/guide/fes'}">Fes实例</a> </li>
                <li :class="{selected: $route.path=='/guide/fesApp' }"> <a v-link="{ path:'/guide/fesApp'}">Fes应用</a> </li>
                <li :class="{selected: $route.path=='/guide/fesApi' }"> <a v-link="{ path:'/guide/fesApi'}">接口调用</a> </li>
                <li :class="{selected: $route.path=='/guide/fesMap' }"> <a v-link="{ path:'/guide/fesMap'}">数据字典</a> </li>
                <li :class="{selected: $route.path=='/guide/fesFesx' }"> <a v-link="{ path:'/guide/fesFesx'}">全局状态</a> </li>
                <li :class="{selected: $route.path=='/guide/fesStorage' }"> <a v-link="{ path:'/guide/fesStorage'}">存储数据</a> </li>
                <li :class="{selected: $route.path=='/guide/mock' }"> <a v-link="{ path:'/guide/mock'}">Mock数据</a> </li>
                <li :class="{selected: $route.path=='/guide/globalComponents' }"> <a v-link="{ path:'/guide/globalComponents'}">全局组件</a> </li>
            </ul>
        </div>
        <div class="right-panel">
            <router-view v-ref:pageview>
            </router-view>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
               
            }
        },
        ready: function () {
         
        },
        methods: {
        }
    }
</script>
