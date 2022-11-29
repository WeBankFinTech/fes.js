// .fes.js 只负责管理编译时配置，只能使用plain Object
export default {
    access: {
        roles: {
            admin: ['*'],
        },
    },
    layout: {
        title: 'webpack 主应用',
        footer: 'Created by MumbleFE',
        multiTabs: false,
        navigation: 'mixin',
        menus: [
            {
                name: 'index',
            },
            {
                title: 'webpack子应用',
                children: [
                    {
                        name: 'webpack-micro-index',
                    },
                    {
                        name: 'webpack-micro-test',
                    },
                ],
            },
            {
                title: 'vite子应用',
                children: [
                    {
                        name: 'vite-micro-index',
                    },
                    {
                        name: 'vite-micro-test',
                    },
                ],
            },
        ],
    },
    qiankun: {
        main: {
            apps: [
                {
                    name: 'webpack-micro', // 唯一 id
                    entry: '//localhost:9001', // html entry
                    props: {}, // 传递给子应用的数据
                },
                {
                    name: 'vite-micro', // 唯一 id
                    entry: '//localhost:8001', // html entry
                    props: {}, // 传递给子应用的数据
                },
            ],
        },
    },
    plugins: [
        require.resolve('../../../fes-plugin-model/lib'),
        require.resolve('../../../fes-plugin-layout/lib'),
        require.resolve('../../../fes-plugin-access/lib'),
        require.resolve('../../../fes-plugin-qiankun/lib'),
    ],
    presets: [require.resolve('../../../fes-builder-webpack/lib')],
};
