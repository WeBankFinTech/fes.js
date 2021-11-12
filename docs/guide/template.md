# HTML和静态资源

Fes.js 基于 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 实现的模板功能，默认 HTML模板 是：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```


## 替换模板
在 `src/public` 文件夹中创建`index.html`，Fes.js 约定如果这个文件存在，则会替换默认模板。

## 配置模板

### 配置
在配置文件（`.fes.js`）中配置 `html`，把配置的对象作为参数传入 `html-webpack-plugin` 实例。

举个 :chestnut: ：
```js
export default {
    html: {
        title: '海贼王'
    }
}
```
页面的 title 会设置成'海贼王'。

### 手动
当然我们也可以手动编写模板，在模板中添加`link`、`link`、`meta`等标签。在我们手动配置模板时，有时候需要用到一些环境变量，模板里可以获取到的变量如下：

- **htmlWebpackPlugin**，特定于此插件的数据
- **webpackConfig**，用于此编译的webpack配置。例如，它可用于获取publicPath（webpackConfig.output.publicPath）。
- **compilation**，webpack编译对象。例如，可以使用它来获取已处理资产的内容，并将其直接内联到页面中compilation.assets[...].source()

举个 🌰 ：
```html
<link rel="icon" type="image/x-icon" href="<%= webpackConfig.output.publicPath %>favicon.png" />
```

除上述 `html-webpack-plugin` 三点之外，Fes.js 还把 `process.env` 中的环境变量添加到模板作用域内：
- `NODE_ENV`
- `FES_ENV`
- `.env` 文件中以 `FES_APP_` 开头的变量

## 处理静态资源

放置在 public 目录下或通过绝对路径被引用。这类资源将会直接被拷贝，而不会经过 webpack 的处理。

### `public` 文件夹

任何放置在 public 文件夹的静态资源都会被简单的复制，而不经过 webpack。你需要通过绝对路径来引用它们。

* 在 public/index.html 或其它通过 html-webpack-plugin 用作模板的 HTML 文件中，你需要通过 <%= BASE_URL %> 设置链接前缀：

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

* 在模板中，你首先需要向你的组件传入基础 URL：

```html
setup() {
  return {
    publicPath: process.env.BASE_URL
  }
}
```

然后：

```html
<img :src="`${publicPath}my-image.png`">
```
