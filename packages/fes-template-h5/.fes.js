// fes.config.js 只负责管理 cli 相关的配置
import pxtoviewport from 'postcss-px-to-viewport-8-plugin';
import { defineBuildConfig } from '@fesjs/fes';

export default defineBuildConfig({
    proxy: {
        '/v2': {
            target: 'https://api.douban.com/',
            changeOrigin: true,
        },
    },
    publicPath: '/',
    viteOption: {
        css: {
            postcss: {
                plugins: [
                    pxtoviewport({
                        unitToConvert: 'px',
                        viewportWidth: 375,
                        unitPrecision: 5,
                        propList: ['*'],
                        viewportUnit: 'vw',
                        fontViewportUnit: 'vw',
                        selectorBlackList: [],
                        minPixelValue: 1,
                        mediaQuery: false,
                        replace: true,
                        exclude: [],
                        landscape: false,
                        landscapeUnit: 'vw',
                    }),
                ],
            },
        },
        build: {
            target: 'es2015',
        },
    },
    targets: {
        chrome: 61,
        ios: 11,
    },
});
