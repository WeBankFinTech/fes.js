// .fes.js 只负责管理编译时配置，只能使用plain Object


export default {
    base: '/foo/',
    define: {
        __DEV__: false
    },
    publicPath: '/',
    access: {
        roles: {
            admin: ["/", "/onepiece"]
        }
    },
    layout: {
        title: "Fes.js",
        logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        multiTabs: false,
        menus: [{
            name: 'index'
        }, {
            name: 'onepiece'
        }]
    },
    devServer: {
        port: 8080
    }
};
