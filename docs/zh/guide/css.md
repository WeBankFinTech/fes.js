# 使用 css

:::tip
本文档以 css 为示例，把后缀换成 `.less` 同样适用。
:::

## 全局样式
Fes.js 中约定 `src/global.css` 为全局样式，如果存在此文件，会被自动引入到入口文件最前面。

比如用于覆盖样式，
```css
.layout-content {
  max-width: 1000px;
}
```

## Vue单文件
```vue
<style>
.layout-content {
  max-width: 1000px;
}
</style>
```

## CSS Modules
支持 `Vue` 的 [CSS Modules](https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95) 用法，可以直接使用：
```vue
<style module>
.layout-content {
  max-width: 1000px;
}
```
如果想直接引入CSS文件的话，则CSS文件名需要包含`.module`，比如：
```js
import style from '@/styles/index.module.css'
console.log(style)
```

## CSS 预处理器
Fes.js 内置支持 `less`，不支持 `sass` 和 `stylus`，但如果有需求，可以通过 `chainWebpack` 配置或者 `fes-plugin` 插件的形式支持。