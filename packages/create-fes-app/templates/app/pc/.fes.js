// .fes.js 只负责管理编译时配置，只能使用plain Object


export default {
    access: {
        roles: {
            admin: ["*"],
            manager: ["/"]
        }
    },
    layout: {
        title: "Fes.js",
        footer: 'Created by MumbleFE',
        navigation: 'mixin',
        multiTabs: false,
        menus: [{
            name: 'index'
        }]
    },
    enums: {
        status: [['0', '无效的'], ['1', '有效的']]
    }
};
