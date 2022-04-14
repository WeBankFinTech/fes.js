import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: '指南',
    link: '/guide/',
  },
  {
    text: '配置',
    link: '/reference/config/',
  },
  {
    text: 'API',
    link: '/reference/api/',
  },
  {
    text: '插件',
    link: '/reference/plugin/',
  },
  {
    text: 'CLI',
    link: '/reference/cli/',
  },
  {
    text: '了解更多',
    children: [
      {
        text: '更新日志',
        link:
          'https://github.com/WeBankFinTech/fes.js/blob/master/CHANGELOG.md',
      },
      {
        text: 'v1 文档',
        link: 'https://webank.gitee.io/fes.js/',
      },
      {
        text: 'fes-design',
        link:
          'http://fes-design.mumblefe.cn/',
      },
    ],
  },
]
