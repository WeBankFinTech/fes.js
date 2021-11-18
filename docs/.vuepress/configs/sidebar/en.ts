import type { SidebarConfig } from '@vuepress/theme-default'

export const en: SidebarConfig = {
  '/guide/': [
    {
      // isGroup: true,
      text: '介绍',
      children: [
        '/guide/README.md',
        '/guide/getting-started.md',
      ],
    },
    {
      // isGroup: true,
      text: '基础',
      children: [
        '/guide/directory-structure.md',
        '/guide/config.md',
        '/guide/runtime-config.md',
        '/guide/route.md',
        '/guide/plugin.md',
        '/guide/template.md',
        '/guide/mock.md',
        '/guide/env.md',
        '/guide/css.md',
      ]
    },
    {
      // isGroup: true,
      text: '进阶',
      children: [
      ]
    },
    "/guide/contributing.md",
    "/guide/faq.md"
  ],
  '/reference/config/': [
    '/reference/config/README.md'
  ],
  '/reference/api/': [
    '/reference/api/README.md'
  ],
  '/reference/plugin/': [
    {
      // isGroup: true,
      text: 'Presets',
      children: [
      ],
    },
    {
      // isGroup: true,
      text: 'Plugins',
      children: [
        '/reference/plugin/plugins/access.md',
        '/reference/plugin/plugins/enums.md',
        '/reference/plugin/plugins/icon.md',
        '/reference/plugin/plugins/jest.md',
        '/reference/plugin/plugins/layout.md',
        '/reference/plugin/plugins/locale.md',
        '/reference/plugin/plugins/model.md',
        '/reference/plugin/plugins/request.md',
        '/reference/plugin/plugins/vuex.md',
        '/reference/plugin/plugins/qiankun.md',
        '/reference/plugin/plugins/windicss.md',
        '/reference/plugin/plugins/sass.md',
        '/reference/plugin/plugins/editor.md',
      ],
    },
    {
      // isGroup: true,
      text: '插件开发',
      children: [
        '/reference/plugin/dev/README.md',
        '/reference/plugin/dev/api.md'
      ],
    },
  ],
  '/reference/cli/': [
    '/reference/cli/README.md',
  ],
}
