// .fes.js 只负责管理编译时配置，只能使用plain Object


export default {
    base: '',
    define: {
        __DEV__: false
    },
    html: {
        title: '海贼王'
    },
    publicPath: '/',
    access: {
        roles: {
            admin: ["/", "/store", "https://www.baidu.com"]
        }
    },
    request: {
        dataField: 'result'
    },
    mock: {
        prefix: '/v2'
    },
    proxy: {
        '/v2': {
            'target': 'https://api.douban.com/',
            'changeOrigin': true,
        },
    },
    layout: {
        title: "Fes.js",
        footer: 'Created by MumbelFe',
        multiTabs: false,
        navigation: 'mixin',
        menus: [{
            name: 'index',
            icon: '/wine-outline.svg'
        }, {
            name: 'onepiece',
            icon: 'user',
            path: 'https://www.baidu.com'
        }, {
            name: 'store'
        }, {
            name: 'simpleList'
        }]
    },
    locale: {
        legacy: true
    },
    devServer: {
        port: 8080
    },
    enums: {
        status: [['0', '无效的'], ['1', '有效的']]
    },
    vuex: {
        strict: true
    },
    dynamicImport: true
};
