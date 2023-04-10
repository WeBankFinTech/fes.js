import { defineUserConfig } from '@vuepress/cli';
import { defaultTheme } from '@vuepress/theme-default';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup';
import { pwaPlugin } from '@vuepress/plugin-pwa';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { navbar, sidebar } from './configs';

export default defineUserConfig({
    base: process.env.BASE ? `/${process.env.BASE}/` : '/',

    head: [
        ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
        ['link', { rel: 'icon', href: `/logo.png` }],
    ],

    // site-level locales config
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'Fes.js',
            description: '一个好用的前端应用解决方案',
        },
    },

    theme: defaultTheme({
        logo: '/logo.png',

        repo: 'WeBankFinTech/fes.js',

        docsDir: 'docs',

        docsBranch: 'next',

        // theme-level locales config
        locales: {
            /**
             * English locale config
             *
             * As the default locale of @vuepress/theme-default is English,
             * we don't need to set all of the locale fields
             */
            '/': {
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
                notFound: ['这里什么都没有', '我们怎么到这来了？', '这是一个 404 页面', '看起来我们进入了错误的链接'],
                backToHome: '返回首页',

                // other
                openInNewWindow: '在新窗口打开',
            },
        },
    }),

    plugins: [
		docsearchPlugin({
			appId: '4ZF3BCJTP5',
			apiKey: '09ff75bbe16bc6e166e103ffb57e10ea',
			indexName: 'fesjs',
			locales: {
				'/': {
					placeholder: '搜索文档',
				},
			},
		}),
		pwaPlugin(),
		pwaPopupPlugin({
			locales: {
				'/': {
					message: '发现新内容可用',
					buttonText: '刷新',
				},
			},
		}),
        backToTopPlugin()
    ],
});
