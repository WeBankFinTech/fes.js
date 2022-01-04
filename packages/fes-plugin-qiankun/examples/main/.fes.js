// .fes.js 只负责管理编译时配置，只能使用plain Object


export default {
    access: {
        roles: {
            admin: ["*"]
        }
    },
    layout: {
        title: "Fes.js",
        footer: 'Created by MumbleFE',
        multiTabs: false,
        navigation: 'mixin',
        menus: [{
            name: 'index',
        }, {
            title: "子应用1",
            children: [{
                name: 'app1-index'
            },{
                name: 'app1-test'
            }]
        }]
    },
    qiankun: {
        main: {
            apps: [
                {
                    name: 'app1', // 唯一 id
                    entry: '//localhost:8001', // html entry
                    props: {}  // 传递给子应用的数据
                }
            ]
        }
    },
    plugins: [
        require.resolve('../../../fes-plugin-model/lib'),
        require.resolve('../../../fes-plugin-layout/lib'),
        require.resolve('../../../fes-plugin-access/lib'),
        require.resolve('../../../fes-plugin-qiankun/lib'),
    ]
};
