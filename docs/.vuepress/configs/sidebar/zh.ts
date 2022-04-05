import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
  '/zh/guide/': [
    {
      // isGroup: true,
      text: '介绍',
      children: [
        '/zh/guide/README.md',
        '/zh/guide/getting-started.md',
      ],
    },
    {
      // isGroup: true,
      text: '基础',
      children: [
        '/zh/guide/directory-structure.md',
        '/zh/guide/builder.md',
        '/zh/guide/config.md',
        '/zh/guide/runtime-config.md',
        '/zh/guide/env.md',
        '/zh/guide/route.md',
        '/zh/guide/plugin.md',
        '/zh/guide/template.md',
        '/zh/guide/mock.md',
        '/zh/guide/upgrade2.1.md',
      ]
    },
    {
      // isGroup: true,
      text: '样式和资源文件',
      children: [
        '/zh/guide/image.md',
        '/zh/guide/css.md',
        '/zh/guide/public.md',
      ]
    },
    "/zh/guide/contributing.md",
    "/zh/guide/faq.md"
  ],
  '/zh/reference/config/': [
    '/zh/reference/config/README.md'
  ],
  '/zh/reference/api/': [
    '/zh/reference/api/README.md'
  ],
  '/zh/reference/plugin/': [
    '/zh/reference/plugin/README.md',
    {
      // isGroup: true,
      text: 'Plugins',
      children: [
        '/zh/reference/plugin/plugins/access.md',
        '/zh/reference/plugin/plugins/enums.md',
        '/zh/reference/plugin/plugins/icon.md',
        '/zh/reference/plugin/plugins/jest.md',
        '/zh/reference/plugin/plugins/layout.md',
        '/zh/reference/plugin/plugins/locale.md',
        '/zh/reference/plugin/plugins/model.md',
        '/zh/reference/plugin/plugins/request.md',
        '/zh/reference/plugin/plugins/vuex.md',
        '/zh/reference/plugin/plugins/qiankun.md',
        '/zh/reference/plugin/plugins/windicss.md',
        '/zh/reference/plugin/plugins/sass.md',
        '/zh/reference/plugin/plugins/editor.md',
        '/zh/reference/plugin/plugins/pinia.md',
      ],
    },
    {
      // isGroup: true,
      text: '插件开发',
      children: [
        '/zh/reference/plugin/dev/README.md',
        '/zh/reference/plugin/dev/api.md'
      ],
    },
  ],
  '/zh/reference/cli/': [
    '/zh/reference/cli/README.md',
  ],
}
