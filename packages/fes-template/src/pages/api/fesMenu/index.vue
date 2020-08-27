<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>
            配置公共左侧菜单
            <br> 在调用FesApp.setRole(...)之后，FesMenu只显示当前用户可以访问的菜单
        </p>
        <h2>API</h2>
        <p>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            属性
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            类型
                        </th>
                        <th style="text-align:left">
                            默认值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            title
                        </td>
                        <td style="text-align:left">
                            菜单标题
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            空
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            path
                        </td>
                        <td style="text-align:left">
                            菜单项点击后，跳转路径
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            空
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            subMenu
                        </td>
                        <td style="text-align:left">
                            子菜单，每项也有path和title
                        </td>
                        <td style="text-align:left">
                            Array
                        </td>
                        <td style="text-align:left">
                            空
                        </td>
                    </tr>
                </tbody>
            </table>
        </p>
        <h2>示例</h2>
        <pre>
    //在app.js文件中设置菜单
    this.set("FesMenu", [{
            title: "接口",
            path: '/api',
            subMenu: [{
                title: "Fes",
                path: '/api/fes',
            },{
                title: "FesApp",
                path: '/api/fesApp',
            },{
                title: "FesApi",
                path: '/api/fesApi',
            },{
                title: "FesMenu",
                path: '/api/fesMenu',
            },{
                title: "FesMap",
                path: '/api/fesMap',
            },{
                title: "FesFesx",
                path: '/api/fesFesx',
            },{
                title: "FesStorage",
                path: '/api/fesStorage',
            },{
                title: "FesUtil",
                path: '/api/fesUtil',
            }]
        },{
            title: "简单的列表页",
            path: '/list'
        },{
            title: "自定义内容列表页",
            path: '/list1'
        },{
            title: "内容很多的编辑",
            path: '/list/edit'
        }]
    );
        </pre>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    FesData: {
        data1: '1',
        money: 100000,
        card: '11122233242323',
        safety: '42222991018719191',
        map: '1',
        date: new Date().getTime()
    }
};
</script>
