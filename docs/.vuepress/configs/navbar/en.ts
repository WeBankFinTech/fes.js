import type { NavbarConfig } from '@vuepress/theme-default'

export const en: NavbarConfig = [
  {
    text: 'Guide',
    link: '/guide/',
  },
  {
    text: 'Config',
    link: '/reference/config/',
  },
  {
    text: 'API',
    link: '/reference/api/',
  },
  {
    text: 'Plugin',
    link: '/reference/plugin/',
  },
  {
    text: 'CLI',
    link: '/reference/cli/',
  },
  {
    text: 'More',
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
