// import type { SidebarConfig } from '@vuepress/theme-default';

export const zh = {
    '/guide/': [
        {
            text: '开始',
            items: [
                {
                    text: '介绍',
                    link: '/guide/index.md'
                },
                {
                    text: '快速上手',
                    link: '/guide/getting-started.md'
                }
            ],
        },
        {
            text: '基础',
            items: [
                {
                    text: '目录结构',
                    link: '/guide/directory-structure.md'
                },{
                    text: 'Vite 和 Webpack 双构建',
                    link: '/guide/builder.md'
                },{
                    text: '编译时配置',
                    link: '/guide/config.md'
                },{
                    text: '运行时配置',
                    link: '/guide/runtime-config.md'
                },{
                    text: '环境变量',
                    link: '/guide/env.md'
                },{
                    text: '路由',
                    link: '/guide/route.md'
                },{
                    text: '插件',
                    link: '/guide/plugin.md'
                },{
                    text: 'HTML 模板',
                    link: '/guide/template.md'
                },{
                    text: 'Mock 数据',
                    link: '/guide/mock.md'
                },{
                    text: '从 2.0.x 迁移到 3.0.x',
                    link: '/guide/upgrade3.md'
                }
            ],
        },
        {
            text: '样式和资源文件',
            items: [
                {
                    text: '使用图片',
                    link: '/guide/image.md'
                },
                {
                    text: '使用 css',
                    link: '/guide/css.md'
                },
                {
                    text: '静态资源',
                    link: '/guide/public.md'
                }
            ],
        },
        {
            text: '贡献指南',
            link: '/guide/contributing.md'
        },
        {
            text: '常见问题',
            link: '/guide/faq.md'
        },
    ],
    '/reference/plugin/': [
        {
            text: '介绍',
            link: '/reference/plugin/index.md'
        },
        {
            text: 'Plugins',
            items: [
                {
                    text: '@fesjs/plugin-access',
                    link: '/reference/plugin/plugins/access.md'
                },
                {
                    text: '@fesjs/plugin-enums',
                    link: '/reference/plugin/plugins/enums.md'
                },
                {
                    text: '@fesjs/plugin-icon',
                    link: '/reference/plugin/plugins/icon.md'
                },
                {
                    text: '@fesjs/plugin-jest',
                    link: '/reference/plugin/plugins/jest.md'
                },
                {
                    text: '@fesjs/plugin-layout',
                    link: '/reference/plugin/plugins/layout.md'
                },
                {
                    text: '@fesjs/plugin-locale',
                    link: '/reference/plugin/plugins/locale.md'
                },
                {
                    text: '@fesjs/plugin-model',
                    link: '/reference/plugin/plugins/model.md'
                },
                {
                    text: '@fesjs/plugin-request',
                    link: '/reference/plugin/plugins/request.md'
                },
                {
                    text: '@fesjs/plugin-vuex',
                    link: '/reference/plugin/plugins/vuex.md'
                },
                {
                    text: '@fesjs/plugin-qiankun',
                    link: '/reference/plugin/plugins/qiankun.md'
                },
                {
                    text: '@fesjs/plugin-windicss',
                    link: '/reference/plugin/plugins/windicss.md'
                },
                {
                    text: '@fesjs/plugin-sass',
                    link: '/reference/plugin/plugins/sass.md'
                },
                {
                    text: '@fesjs/plugin-editor',
                    link: '/reference/plugin/plugins/editor.md'
                },
                {
                    text: '@fesjs/plugin-pinia',
                    link: '/reference/plugin/plugins/pinia.md'
                },
                {
                    text: '@fesjs/plugin-watermark',
                    link: '/reference/plugin/plugins/watermark.md'
                },
                {
                    text: '@fesjs/plugin-login',
                    link: '/reference/plugin/plugins/login.md'
                },
                {
                    text: '@fesjs/plugin-swc',
                    link: '/reference/plugin/plugins/swc.md'
                },
            ],
        },
        {
            text: '插件开发',
            items: [{
                text: '插件介绍',
                link: '/reference/plugin/dev/index.md'
            }, {
                text: '插件API',
                link: '/reference/plugin/dev/api.md'
            }],
        },
    ],
};
