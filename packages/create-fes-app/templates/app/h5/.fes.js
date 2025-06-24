// fes.config.js 只负责管理 cli 相关的配置
import { defineBuildConfig } from '@fesjs/fes'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'

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
    postcsspxtoviewport8plugin({
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
})
