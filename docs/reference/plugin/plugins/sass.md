# @fesjs/plugin-sass



## 介绍
Fes.js 默认只支持 `less`，通过此插件扩展支持 `sass`

## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-sass": "^2.0.0"
    },
}
```

## global css
添加 `src/global.scss` 和 `src/global.sass` 为全局CSS入口，添加一些通用样式内容。

## Vue 单文件组件
Vue 单文件组件的 `<style></style>` 添加 `lang='scss'`，例如：
```vue
<style lang="scss">
</style>
``` 
