// .fes.js 只负责管理编译时配置，只能使用plain Object

export default {
    exportStatic: {},
    define: {
        __DEV__: false,
    },
    publicPath: "./",
    html: {
        title: "海贼王",
    },
    router: {
        mode: "history",
    },
    access: {
        roles: {
            admin: ["*"],
            menuTest: ['/', '/onepiece', '/store'],
        },
    },
    request: {
        dataField: "result",
    },
    mock: {
        prefix: "/v2",
    },
    proxy: {
        "/v2": {
            target: "https://api.douban.com/",
            changeOrigin: true,
        },
    },
    layout: {
        title: "Fes.js",
        footer: "Created by MumbleFe",
        multiTabs: true,
        navigation: "mixin",
        theme: 'light',
        menus: [
            {
                name: "index",
                icon: "/wine-outline.svg",
            },
            {
                name: "onepiece",
                icon: "user",
                path: "https://www.baidu.com",
            },
            {
                title: "abcd",
                children: [
                    {
                        name: "store",
                    },
                ],
            },
            {
                // name: "setting",
                title: "setting",
                children: [
                    {
                        name: "test",
                    },
                ],
            },{
                name: 'editor',
                icon: "/wine-outline.svg"
            }
        ],
    },
    locale: {
        legacy: true,
    },
    devServer: {
        port: 8080,
    },
    enums: {
        status: [
            ["0", "无效的"],
            ["1", "有效的"],
        ],
    },
    vuex: {
        strict: true,
    },
    dynamicImport: true,
    extraBabelPlugins: [
        ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }, 'ant-design-vue'],
    ],
    monacoEditor: {
        languages: ['javascript', 'typescript', 'html', 'json']
    }
};
