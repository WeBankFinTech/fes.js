import type { UserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { navbar, sidebar } from './configs'

const config: UserConfig<DefaultThemeOptions> = {
  base: '/',

  evergreen: process.env.NODE_ENV !== 'production',

  head: [['link', { rel: 'manifest', href: '/manifest.webmanifest' }], ['link', { rel: 'icon', href: `/logo.png` }]],

  // site-level locales config
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Fes.js',
      description: 'A Good Front-end Application Solution',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Fes.js',
      description: '一套好用的前端应用解决方案',
    },
  },

  themeConfig: {
    logo: '/logo.png',

    repo: 'WeBankFinTech/fes.js',

    docsDir: 'docs',

    // theme-level locales config
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // navbar
        navbar: navbar.en,

        // sidebar
        sidebar: sidebar.en,

        // page meta
        editLinkText: 'Edit this page on GitHub',
      },

      /**
       * Chinese locale config
       */
      '/zh/': {
        // navbar
        navbar: navbar.zh,
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',

        // sidebar
        sidebar: sidebar.zh,

        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',

        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',

        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',

        // other
        openInNewWindow: '在新窗口打开',
      },
    },
  },

  plugins: [
    // [
    //   '@vuepress/plugin-docsearch',
    //   {
    //     apiKey: '<API_KEY>',
    //     indexName: '<INDEX_NAME>',
    //     locales: {
    //       '/': {
    //         placeholder: 'Search Documentation',
    //       },
    //       '/zh/': {
    //         placeholder: '搜索文档',
    //       },
    //     },
    //   },
    // ],
    ['@vuepress/plugin-pwa'],
    [
      '@vuepress/plugin-pwa-popup',
      {
        locales: {
          '/': {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
          '/zh/': {
            message: '发现新内容可用',
            buttonText: '刷新',
          },
        },
      },
    ],
  ],
}

export = config
