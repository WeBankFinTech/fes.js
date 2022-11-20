// fes.config.js 只负责管理 cli 相关的配置
import { defineBuildConfig } from '@fesjs/fes';
import pxtoviewport from '@ttou/postcss-px-to-viewport';

export default defineBuildConfig({
    define: {
        // __VUE_OPTIONS_API__: true,
        // __VUE_PROD_DEVTOOLS__: false
    },
    html: {
        title: '拉夫德鲁',
    },
    targets: {
        chrome: '61',
        ios: '10',
    },
    extraPostCSSPlugins: [
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
});
