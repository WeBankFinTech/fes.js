<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>一个App表示一个应用。管理一些应用级别的状态。</p>

        <h2>属性</h2>
        <ul>
            <li>
                <router-link to="/api/fesApi">
                    <p>this.FesApi</p>
                    <p>操作ajax的对象</p>
                </router-link>
            </li>
            <li>
                <router-link to="/api/fesMap">
                    <p>this.FesMap</p>
                    <p>数据字典，保存数据字典的容器，提供查找函数</p>
                </router-link>
            </li>
            <li>
                <router-link to="/api/fesUtil">
                    <p>this.FesUtil</p>
                    <p>工具函数，操作dom、对象等</p>
                </router-link>
            </li>
            <li>
                <router-link to="/api/fesFesx">
                    <p>this.FesFesx</p>
                    <p>存储全局状态的容器</p>
                </router-link>
            </li>
            <li>
                <router-link to="/api/fesStorage">
                    <p>this.FesStorage</p>
                    <p>操作存储: cookie、sessionStorage、localStorage</p>
                </router-link>
            </li>
            <li>
                <p>this.router</p>
                <p>当前路由对象，具体api查询vue-router v0.7</p>
            </li>
        </ul>

        <h2>函数</h2>
        <ul>
            <li>
                <p>init</p>
                <p>
                    初始化整个应用，我们只需要在app.js写入自定义的初始化内容，比如设置菜单、项目名等
                </p>
            </li>
            <li>
                <p>get(prop)</p>
                <p>
                    根据prop获取在App保存的应用层面的状态值
                </p>
            </li>
            <li>
                <p>set(prop, value)</p>
                <p>
                    设置应用层面的状态，包括FesName、FesMenu、FesUserName、FesRoleName、FesLogout
                </p>
            </li>
            <li>
                <p>setRole(role)</p>
                <p>
                    我们需要在common/rolesConfig.js中配置角色所属的菜单权限，可以把未登录状态也当作一种角色。根据当前登录状态或者用户设置不同的角色。菜单也会根据角色展示。
                </p>
            </li>
            <li>
                <p>getAllowPage()</p>
                <p>
                    返回当前能访问的页面
                </p>
            </li>
            <li>
                <p>setBeforeRouter(beforeRouter)</p>
                <p>
                    设置路由切换之前的事件钩子，可以根据条件判断是否阻止切换
                </p>
            </li>
            <li>
                <p>setAfterRouter(afterRouter)</p>
                <p>
                    路由切换之后的事件钩子
                </p>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
};
</script>
