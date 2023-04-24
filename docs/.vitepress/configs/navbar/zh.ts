// import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../../../../package.json'

export const zh = [
  {
    text: '指南',
    link: '/guide/',
    activeMatch: '/guide/'
  },
  {
    text: '编译时配置',
    link: '/reference/config/',
  },
  {
    text: 'API',
    link: '/reference/api/',
  },
  {
    text: '插件',
    link: '/reference/plugin/',
    activeMatch: '/plugin/'
  },
  {
    text: 'CLI',
    link: '/reference/cli/index.md',
  },
  {
    text: `v${version}`,
    items: [
      {
        text: 'v2.0',
        link:
          'https://fesjs.mumblefe.cn/2.0',
      },
      {
        text: 'v1.0',
        link: 'https://fesjs.mumblefe.cn/1.0',
      },
    ],
  },
  {
    text: '了解更多',
    items: [
      {
        text: '更新日志',
        link:
          'https://github.com/WeBankFinTech/fes.js/blob/master/CHANGELOG.md',
      },
      {
        text: 'fes-design',
        link:
          'http://fes-design.mumblefe.cn/',
      },
    ],
  },
]
