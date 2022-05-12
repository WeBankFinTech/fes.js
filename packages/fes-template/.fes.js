// .fes.js 只负责管理编译时配置，只能使用plain Object

export default {
    // exportStatic: {},
    define: {
        __DEV__: false
    },
    html: {
        title: '海贼王'
    },
    router: {
        mode: 'hash'
    },
    access: {
        roles: {
            admin: ['*'],
            menuTest: ['/', '/menuTest']
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
            target: 'https://api.douban.com/',
            changeOrigin: true
        }
    },
    layout: {
        title: 'Fes.js',
        footer: 'Created by MumbleFE',
        multiTabs: false,
        navigation: 'side',
        theme: 'dark',
        menus: [
            {
                name: 'index',
                icon: '/wine-outline.svg',
                match: ['/route/*']
            },
            {
                name: 'store'
            },
            {
                name: 'editor',
                icon: '/wine-outline.svg'
            },
            {
                title: '$externalLink',
                icon: 'UserOutlined',
                path: 'https://www.baidu.com'
            },
            {
                name: 'mock'
            },
            {
                title: '菜单权限测试',
                children: [
                    {
                        title: '子菜单',
                        path: '/menuTest'
                    },
                ]
            },
            {
                name: 'cssModule'
            },
            {
                name: 'pinia'
            }
        ]
    },
    locale: {
        legacy: true
    },
    devServer: {
        port: 8080
    },
    enums: {
        status: [
            ['0', '无效的'],
            ['1', '有效的']
        ]
    },
    vuex: {
        strict: true
    },
    dynamicImport: true,
    monacoEditor: {
        languages: ['javascript', 'typescript', 'html', 'json']
    },
    presets: [
        require.resolve('../fes-builder-webpack/lib'),
    ]
};
