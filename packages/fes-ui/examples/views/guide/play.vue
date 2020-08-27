<template>
    <div class="article">
        <h1>快速上手</h1>

        <h2>创建工程</h2>
        <p>
            fes init [projectName]
        </p>

        <h2>启动项目</h2>
        <p>
            进入工程目录，执行 fes dev 进入开发模式
        </p>

        <h2>打包</h2>
        <p>
            进入工程目录，执行 fes build [--env=sit]。命令执行完在根目录下生成dist目录，里面存放打包好的静态资源文件。
        </p>
    </div>
       <!--<Row><h2>1 项目目录与路由</h2></Row>-->
        <!--<Row>-->
            <!--<Cell span="20" offset="1">-->
                <!--<h3>1.1 Fes将根据项目的pages目录结构自动生成路由规则</h3>-->
            <!--</Cell>-->
        <!--</Row>-->
        <!--<pre>-->
        <!--pages                 # 文件夹pages-->
        <!--├── index.fes         # 根路由页面 路径 index.html#/-->
        <!--├── a.fes             # 路径 /a-->
        <!--├── b                 # 文件夹b-->
        <!--│   ├── index.fes     # 路径 /b-->
        <!--│   ├── @id.fes       # 动态路由 /b/:id-->
        <!--│   └── c.fes         # 路径 /b/c-->
        <!--└── layout.fes        # 根路由下所有page共用的外层-->
        <!---->
        <!--pages文件下的文件为根路径 如:/a-->
        <!---->
        <!--普通子路由 pages文件夹下文件夹b里面的文件bar.fes则为 /b/bar-->

        <!--动态路径参数 /b/:id 当需要把某种模式匹配到的所有路由，全都映射到同个组件可以使用动态路径参数-->
                    <!--现在呢，像 /b/foo 和 /b/bar 都将映射到相同的路由。-->
                    <!---->
                    <!--如果/b路由下既有动态子路由，又有普通子路由，先匹配普通子路由。即/b/:id和/b/c优先匹配/b/c-->

        <!--</pre>-->
        <!--<Row>-->
            <!--<Cell span="20" offset="1">-->
                <!--<h3>1.2 侧边栏导航配置</h3>-->
            <!--</Cell>-->
        <!--</Row>-->
        <!--<pre>-->
        <!--对应1.1生成的路由规则在项目src/app.js中配置,在侧边栏自动生成对应的列表菜单-->

            <!--//设置菜单-->
            <!--this.set("FesMenu", [{-->
                <!--title: "b",-->
                <!--path: '/b',-->
                <!--subMenu: [{-->
                    <!--title: "c",-->
                    <!--path: '/b/c',-->
                <!--}]-->
            <!--},{-->
                <!--title: "简单的列表页",-->
                <!--path: '/list'-->
            <!--},{-->
                <!--title: "自定义内容列表页",-->
                <!--path: '/list1'-->
            <!--},{-->
                <!--title: "内容很多的编辑",-->
                <!--path: '/list/edit'-->
            <!--}]-->
        <!--);-->
        <!--</pre>-->
        <!--<hr>-->
    <!--<Row><h2>2 公共模块的配置</h2></Row>-->
    <!--<pre>-->
    <!--2.1 侧边栏底部配置-->

        <!--2.1.1 项目文件left.vue模板为空时,默认显示FesUserName、FesRoleName和退出按钮(FesLogout), 项目中\src\app.js做相应设置-->

        <!--//设置退出逻辑-->
        <!--this.set("FesLogout", function () {-->
            <!--alert(1)-->
        <!--});-->

        <!--//设置用户、角色等-->
        <!--setTimeout(()=> {-->
            <!--this.set("FesUserName", "万纯（harrywan）");-->
            <!--this.set("FesRoleName", "管理员");-->
        <!--}, 1000);-->

        <!--2.1.2 项目文件left.vue做自定义设置时，2.1.1部分则不显示，使用自定义文件内容-->

    <!--2.2 头部菜单配置-->
        <!---->
        <!--头部菜单默认不显示，可以通过给 .layout-right-header 元素上加class .show-->

        <!--项目文件top.vue模板为自定义头部内容-->
    <!--</pre>-->
    <!--<hr>-->
    <!--<Row><h2>3 右边主体内容示例</h2></Row>-->
    <!--<Row><h3>主体内容布局可以使用<a v-link="{ path:'/component'}">fes-ui组件</a>，也可以使用fes封装性更高的Fes-search-panel、Fes-list-panel、Fes-query-page、Fes-route-menu等等组件</h3></Row>-->
    <!--<markdown></markdown>-->
    <!--<pre>-->
        <!--注意这里的data使用FesData-->
    <!--</pre>-->
    <!--<hr>-->
    
</template>
<script type="text/ecmascript-6">
import markdown from './md/play.md'
    export default {
        data: function () {
            return {
            }
        },
        components: {
            markdown,
        },
        ready: function () {
        },
        methods: {
        }
    }
</script>
