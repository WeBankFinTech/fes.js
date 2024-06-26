import { defineBuildConfig } from '@fesjs/fes';

export default defineBuildConfig({
    builder: 'vite',
    define: {
        __DEV__: false,
    },
    title: '海贼王',
    router: {
        mode: 'hash',
    },
    access: {
        roles: {
            admin: ['*'],
            menuTest: ['/', '/menuTest'],
        },
    },
    mock: {
        prefix: '/v2',
    },
    proxy: {
        '/v2': {
            target: 'https://api.douban.com/',
            changeOrigin: true,
        },
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
                match: ['/route/*'],
            },
            {
                name: 'editor',
                icon: '/wine-outline.svg',
            },
            {
                title: '$externalLink',
                icon: 'UserOutlined',
                path: 'https://www.baidu.com',
            },
            {
                name: 'mock',
            },
            {
                title: '菜单权限测试',
                children: [
                    {
                        title: '子菜单',
                        path: '/menuTest',
                        query: { id: 1 },
                    },
                ],
            },
            {
                name: 'cssModule',
            },
            {
                name: 'pinia',
            },
        ],
    },
    enums: {
        status: [
            ['0', '无效的'],
            ['1', '有效的'],
        ],
    },
    dynamicImport: true,
    monacoEditor: {
        languages: ['javascript', 'typescript', 'html', 'json'],
    },
});
