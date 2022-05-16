# 支持 Vite 和 Webpack 双构建

`Fes.js@2.1.x` 版本支持 Vite 和 Webpack 两种构建方式，不再内置构建方式，需要开发者自行选择:

-   选用 Vite 构建，安装 `npm i @fesjs/builder-vite` 依赖即可。
-   选用 Webpack 构建，安装 `npm i @fesjs/builder-webpack` 依赖即可。

## 使用差异

由于 Fes.js 在 Vite 和 Webpack 上做了一层封装，开发者关心的构建配置不会太多。从使用上来说，主要存在以下几个差异点：

### 配置

Webpack 和 Vite 构建在配置方面有一些差异，具体可以查看[配置](../reference/config)。

### 静态文件处理

由于 Vite 的限制，不支持 `require` 语法，具体 Vite 的用法可以查看[官网](https://cn.vitejs.dev/guide/assets.html)

### html 模版

html 模版比较常规的需求，例如模版变量，Webpack 和 Vite 之间没什么差异。如果有其他特殊的需求， Webpack 可以使用 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)，Vite 使用[vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) 进行个性化配置。
