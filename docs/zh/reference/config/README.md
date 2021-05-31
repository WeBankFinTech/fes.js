---
sidebar: auto
---

# 配置

以下配置项通过字母排序。

## alias

- 类型： `object`
- 默认值： `{}`
- 详情：  

    配置别名，对引用路径进行映射。

- 示例：
```js
export default {
    alias: {
       main: 'src/assets/styles/main'
    }
}
```
然后 `import('main')`，实际上是 `import('src/assets/styles/main')`。

## base

- 类型： `string`
- 默认值： `''`
- 详情：  

    设置路由前缀，通常用于部署到非根目录。比如你有路由 `/pageA`、`/pageB`，然后设置了 `base` 为 `/manage/`，那么就可以通过 `/manage/pageA`、`/manage/pageB` 访问到它们。

## chainWebpack

- 类型：`function`
- 默认值：`null`
- 详情：

    通过 [webpack-chain](https://github.com/neutrinojs/webpack-chain) 的 API 修改 webpack 配置。

示例：

```js
export default {
    chainWebpack(memo, { env, webpack }) {
        // 删除 fes 内置插件
        memo.plugins.delete('copy');
    },
}
```


## cssLoader

- 类型： `object`
- 默认值： `''`
- 详情：  

    设置 [css-loader 配置项](https://github.com/webpack-contrib/css-loader#options)。

## copy

- 类型： `Array(string)  ||  Array(object)`
- 默认值： `[]`
- 详情：

    设置要复制到输出目录的文件、文件夹。
    
    配置约定 `from-to` 规则， 其中 `from` 是相对于 `cwd` 的路径，`to` 是相对于输出路径的路径。
- 示例：
```js
export default {
    copy: {
        from: '/src/assets/images',
        to: 'assets/images'
    }
}
```
上面示例中，实现了将 `cwd` 路径中的 `/src/assets/images` 文件夹，在编译完成后，`copy` 到输出路径下的 `assets/images` 文件夹。

## define

- 类型： `object`
- 默认值： `{}`
- 详情：
    
    用于提供给代码中可用的变量。
- 示例：
```js
export default {
    define: {
        __DEV__: 'development'
    }
}
```
然后你代码里写 `console.log(__DEV__)`，会被编译成 `console.log('development')`。

## devServer

- 类型： `object`
- 默认值： `{}`
- 详情：
    
    配置开发服务器。支持以下子配置项：

    - port，端口号，默认 `8000`
    - host，默认 `localhost`
    - https，是否启用 https server，同时也会开启 HTTP/2

    启用 port 和 host 也可以通过环境变量 `PORT` 和 `HOST` 临时指定。

## devtool

- 类型： `string`
- 默认值： `cheap-module-source-map` in dev, `undefined` in build
- 详情：

    用户配置 sourcemap 类型。详见 [ webpack#devtool 配置](https://webpack.js.org/configuration/devtool/#devtool)。

## dynamicImport

- 类型： `boolean`
- 默认值： false
- 详情：

    路由是否按需加载
## externals

- 类型：`object`
- 默认值：`{}`
- 详情：

    设置哪些模块可以不被打包，通过 `<script>` 或其他方式引入。

示例：

```js
export default {
    externals: {
      vue: 'window.Vue',
    },
}
```


## extraBabelPlugins

- 类型： `array`
- 默认值： `[]`
- 详情：  

 配置额外的 babel 插件。

- 示例：
```js
export default {
    extraBabelPlugins: [
        ['import', { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: 'css' }],
    ],
}
```

## extraPostCSSPlugins

- 类型： `array`
- 默认值： `[]`
- 详情：  

    设置额外的 [postcss 插件](https://github.com/postcss/postcss/blob/master/docs/plugins.md)。

## inlineLimit

- 类型： `number`
- 默认值： `8192`(8k)
- 详情：

    配置图片文件是否走 base64 编译的阈值。默认是 `8192` 字节，小于它会被编译为 base64 编码，否则会生成单独的文件。
    
## lessLoader

- 类型： `object`
- 默认值： `{}`
- 详情：

    设置 [less-loader 配置项](https://github.com/webpack-contrib/less-loader)。

## mock

- 类型： `object || boolean`
- 默认值： `{}`
- 详情：

    配置 mock 属性。

    - 当 mock 为 `boolean` 类型时，`true` 表示打开 mock，`false` 表示关闭 mock。
    - 当 mock 为 `object` 类型时，默认打开 mock。也可以通过子属性 `prefix` 添加过滤条件，满足条件的走 mock 文件。 

- 示例：
```js
export default {
    mock: {
        prefix: '/api/auth'
    }
}
```
然后所有以 `/api/users` 开始的请求，就能进入 mock.js 文件处理。

## mountElementId

- 类型： `string`
- 默认值： `app`
- 详情：

    指定渲染到的 HTML 元素 id。

## nodeModulesTransform

- 类型： `object`
- 默认值： `{ exclude: [] }`
- 详情：

    默认编译所有 `node_modules` 下的包，可以通过配置 `exclude` 来跳过某些包，以提高编译速度。

## outputPath

- 类型： `string`
- 默认值： `dist`
- 详情：

    指定输出路径。

::: tip
不允许设定为 `src`、`public`、`pages` 等约定目录。
:::

## plugins

- 类型： `Array(string)`
- 默认值： `[]`
- 详情：

    配置额外的 `fes` 插件。
    数组项为指向插件的路径，可以是 npm 依赖、相对路径或绝对路径。如果是相对路径，则会从项目根目录开始找。

- 示例：
```js
export default {
  plugins: [
    // npm 依赖
    'fes-plugin-hello',
    // 相对路径
    './plugin',
    // 绝对路径
    `${__dirname}/plugin.js`,
  ],
};
```


## postcssLoader

- 类型： `object`
- 默认值： `{}`
- 详情：

    设置 [postcss-loader 配置项](https://github.com/postcss/postcss-loader#options)。

## proxy

- 类型： `object`
- 默认值： `{}`
- 详情：

    配置代理能力。

- 示例：
```js
export default {
    proxy: {
        '/v2': {
            'target': 'https://api.douban.com/',
            'changeOrigin': true, 
        }
    }
}
```
然后访问 `/v2/movie/in_theaters_proxy` 就能访问到 [http://api.douban.com/v2/movie/in_theaters_proxy](http://api.douban.com/v2/movie/in_theaters_proxy) 的数据。

## publicpath

- 类型： `publicPath`
- 默认值： `/`
- 详情：

    配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 `publicPath` 的值，当你需要修改静态文件地址时，比如使用 CDN 部署，把 `publicPath` 的值设为 CDN 的值就可以。

## router

- 类型： `object`
- 默认值： `{ mode: 'hash' }`
- 详情： 配置路由，具体请查看指南中关于路由的介绍

## singular
- 类型： `boolean`
- 默认值： `false`
- 详情：

    配置是否启用单数模式的目录。 比如 `src/pages` 的约定在开启后为 `src/page` 目录，@fesjs/fes-plugins 插件也遵照此配置的约定。

## targets
- 类型： `object`
- 默认值： `{}`
- 详情：

    配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。

## terserOptions

- 类型： `object`
- 默认值：
```js
const defaultTerserOptions = {
    compress: {
        // turn off flags with small gains to speed up minification
        arrows: false,
        collapse_vars: false, // 0.3kb
        comparisons: false,
        computed_props: false,
        hoist_funs: false,
        hoist_props: false,
        hoist_vars: false,
        inline: false,
        loops: false,
        negate_iife: false,
        properties: false,
        reduce_funcs: false,
        reduce_vars: false,
        switches: false,
        toplevel: false,
        typeofs: false,

        // a few flags with noticeable gains/speed ratio
        // numbers based on out of the box vendor bundle
        booleans: true, // 0.7kb
        if_return: true, // 0.4kb
        sequences: true, // 0.7kb
        unused: true, // 2.3kb

        // required features to drop conditional branches
        conditionals: true,
        dead_code: true,
        evaluate: true
    },
    mangle: {
        safari10: true
    }
}
```
- 详情：

    配置 [压缩器 terser 的配置项](https://github.com/terser/terser#minify-options)
