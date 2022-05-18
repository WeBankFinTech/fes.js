# 从 2.0.x 迁移到 3.0.x

## 版本 3.0.x 的 break

1. 编译时的 [base](../reference/config/#base) 配置，移到了 [router.base](../reference/config/#router) 下。
2. [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 从 `v3.x` 升级到了 `v4.x`，如果遇到配置不兼容，可以查看[webpack-dev-server 3.x 升级 4.x](https://github.com/webpack/webpack-dev-server/blob/master/migration-v4.md)。

## 不变更构建方式

1. 添加 Webpack 构建依赖包： `npm i @fesjs/builder-webpack -D`。
2. 如果有，将 `public/index.html` 文件挪到项目根目录，移除 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 相关配置，具体模版变量使用请查看[HTML 模版](../guide/template.html)。

## 换成 Vite

1. 安装依赖包 `npm i @fesjs/builder-vite`。
2. 将 Webpack 相关的配置换成 Vite，具体可查看[配置](../reference/config)。
3. 将 html 模版文件从 `public/index.html` 挪到项目根目录，如果有相应的 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 配置，需要改成 [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) 的写法。
4. 将 `require` 等 Vite 不支持的代码，改写成 Vite 支持的方式。

## 插件

如果使用 Webpack 构建，插件是向后兼容的。如果是使用 Vite 构建，大部分插件也是向后兼容的，需要处理的插件有：

-   [@fesjs/plugin-qiankun](../reference/plugins/qiankun) 需要升级到 `2.1.x` 版本。
-   [@fesjs/plugin-windicss](../reference/plugins/windicss) 需要升级到 `2.1.x` 版本。
-   [@fesjs/plugin-sass](../reference/plugins/sass) 直接移除，再安装 `sass` 包即可。
