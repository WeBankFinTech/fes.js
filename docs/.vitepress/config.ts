import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import { withPwa } from '@vite-pwa/vitepress';

import { navbar, sidebar } from './configs';

const BASE_URL = process.env.BASE ? `/${process.env.BASE}/` : '/';
export default withPwa(
    defineConfig({
        base: BASE_URL,
        title: 'Fes.js',
        description: '一个好用的前端应用解决方案',

        vite: {
            resolve: {
                alias: [
                    {
                        find: /^.*\/VPHero\.vue$/,
                        replacement: fileURLToPath(new URL('./theme/components/VPHero.vue', import.meta.url)),
                    },
                ],
            },
        },

        head: [['link', { rel: 'icon', href: `/logo.png` }]],

        themeConfig: {
            socialLinks: [{ icon: 'github', link: 'https://github.com/WeBankFinTech/fes.js' }],

            logo: '/logo.png',
            nav: navbar.zh,
            sidebar: sidebar.zh,

            outline: {
                label: '本页目录',
            },

            search: {
                provider: 'local',
            },

            footer: {
                message: 'Released under the MIT License.',
                copyright: 'Copyright © 2020-present Webank',
            },
        },

        pwa: {},
    }),
);
