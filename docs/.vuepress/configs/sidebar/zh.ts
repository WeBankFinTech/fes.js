import type { SidebarConfig } from '@vuepress/theme-default'

export const zh: SidebarConfig = {
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
        '/guide/builder.md',
        '/guide/config.md',
        '/guide/runtime-config.md',
        '/guide/env.md',
        '/guide/route.md',
        '/guide/plugin.md',
        '/guide/template.md',
        '/guide/mock.md',
        '/guide/upgrade3.md',
      ]
    },
    {
      // isGroup: true,
      text: '样式和资源文件',
      children: [
        '/guide/image.md',
        '/guide/css.md',
        '/guide/public.md',
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
    '/reference/plugin/README.md',
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
        '/reference/plugin/plugins/pinia.md',
        '/reference/plugin/plugins/watermark.md',
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
