// .fes.js 只负责管理编译时配置，只能使用plain Object


export default {
    base: '/foo/',
    define: {
        __DEV__: false
    },
    html: {
        title: '海贼王'
    },
    publicPath: '/',
    access: {
        roles: {
            admin: ["/"]
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
        menus: [{
            name: 'index'
        }, {
            name: 'onepiece'
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
