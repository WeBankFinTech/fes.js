# 从 2.0.x 迁移到 2.1.x

## 版本 2.1.x 的 break

1. 编译时的 [base](../reference/config/#base) 配置，移到了 [router.base](../reference/config/#router) 下

## 相关插件

由于需要兼容 Vite 的写法，插件也做了相关代码调整，

## 不变更构建方式

1. 添加 Webpack 构建依赖包： `npm i @fesjs/build-webpack -D`。
2. 如果有，将 `public/index.html` 文件挪到项目根目录，移除 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 相关配置，具体模版变量使用请查看[HTML 模版](../guide/template.html)。

## 换成 Vite

1. 安装依赖包 `npm i @fesjs/build-vite`。
2. 将 Webpack 相关的配置换成 Vite，具体可查看[配置](../reference/config)。
3. 将 html 模版文件从 `public/index.html` 挪到项目根目录，如果有相应的 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 配置，需要改成 [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html) 的写法。
4. 将 `require` 等 Vite 不支持的代码，改写成 Vite 支持的方式。
5. 由于需要兼容 Vite 写法，相关插件也做了相关调整，因此依赖的插件都需要升级最新的版本。如果用了 [@fesjs/plugin-sass](../reference/plugin/plugins/sass.html) 插件，直接移除，手动安装 `sass` 依赖即可。
