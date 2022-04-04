import type { NavbarConfig } from '@vuepress/theme-default'

export const zh: NavbarConfig = [
  {
    text: '指南',
    link: '/zh/guide/',
  },
  {
    text: '编译时配置',
    link: '/zh/reference/config/',
  },
  {
    text: 'API',
    link: '/zh/reference/api/',
  },
  {
    text: '插件',
    link: '/zh/reference/plugin/',
  },
  {
    text: 'CLI',
    link: '/zh/reference/cli/',
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
    ],
  },
]
