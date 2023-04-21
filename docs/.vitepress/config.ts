import { defineConfig } from 'vitepress';
import { withPwa } from '@vite-pwa/vitepress'

import { navbar, sidebar } from './configs';

const BASE_URL = process.env.BASE ? `/${process.env.BASE}/` : '/';
export default withPwa(defineConfig({
    base: BASE_URL,
    title: 'Fes.js',
    description: '一个好用的前端应用解决方案',

    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
    ],

    themeConfig: {
        logo: '/logo.png',
        nav: navbar.zh,
        sidebar: sidebar.zh,

        outline: {
            label: '本页目录'
        },

        search: {
            provider: 'local'
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2020-present Webank'
        },
    },

    pwa: {}
}));
