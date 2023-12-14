# 从 2.0.x 迁移到 3.0.x

## 版本 3.0.x 的 break

1. 编译时的 [base](../reference/config/index.md/#base) 配置，移到了 [router.base](../reference/config/index.md/#router) 下。
2. [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 从 `v3.x` 升级到了 `v4.x`，如果遇到配置不兼容，可以查看[webpack-dev-server 3.x 升级 4.x](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)。
3. [layout 插件](../reference/plugin/plugins/layout.md#_4-x-升级到-5-x) 有一些属性变更
3. [request 插件](../reference/plugin/plugins/request.md#_2-x-升级到-3-x) 有一些参数变更

## 继续使用 Webpack

1. 添加 Webpack 构建依赖包： `npm i @fesjs/builder-webpack -D`。
2. 如果设置了 `publicPath: './'`，请更改为 `publicPath: ''`
3. 如果有，将 `public/index.html` 文件挪到项目根目录，移除 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 相关配置，具体模版变量使用请查看[HTML 模版](../guide/template.html)。

## 换成 Vite

1. 安装依赖包 `npm i @fesjs/builder-vite`。
2. 将 Webpack 相关的配置换成 Vite，具体可查看[配置](../reference/config/index.md)。
3. 将 html 模版文件从 `public/index.html` 挪到项目根目录，如果有相应的 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 配置，需要改成 [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) 的写法。
4. 将 `require` 等 Vite 不支持的代码，改写成 Vite 支持的方式。

## 插件

插件都需要升级到 `3.0.x` 版本，新版添加了兼容`builder`的逻辑，但是提供的接口和配置没有变化，只需要升级版本即可使用。

-   [@fesjs/plugin-layout](../reference/plugin/plugins/layout.md) 需要升级到`5.0.x`版本。
-   [@fesjs/plugin-locale](../reference/plugin/plugins/locale.md) 需要升级到`4.0.x`版本。
-   [@fesjs/plugin-qiankun](../reference/plugin/plugins/qiankun.md) 由于`qiankun`技术限制，子应用目前还只能使用 Webpack 构建。
