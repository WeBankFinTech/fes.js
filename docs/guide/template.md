# HTML 模板

Fes.js 基于 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 实现的模板功能，默认模板内容是：
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

## 自定义模板
在 `src/public` 文件夹中创建`index.html`，Fes.js 约定如果这个文件存在，则会替换默认模板。

## 模板配置
在配置文件（`.fes.js`）中配置 `html`，把[配置](https://github.com/jantimon/html-webpack-plugin#options)的对象作为参数传入 `html-webpack-plugin` 实例。

举个 :chestnut: ：
```js
export default {
    html: {
        title: '海贼王'
    }
}
```
页面的标题会设置成'海贼王'。

## 模板变量
当然我们也可以手动编写模板，在模板中添加`link`、`link`、`meta`等标签。在我们手动配置模板时，有时候需要用到一些环境变量，模板里可以获取到的变量如下：

- **htmlWebpackPlugin**，特定于此插件的数据
- **webpackConfig**，用于此编译的webpack配置。例如，它可用于获取publicPath（webpackConfig.output.publicPath）。
- **compilation**，webpack编译对象。例如，可以使用它来获取已处理资产的内容，并将其直接内联到页面中compilation.assets[...].source()

举个 🌰 ：
```html
<link rel="icon" type="image/x-icon" href="<%= webpackConfig.output.publicPath %>favicon.png" />
```

除上述 `html-webpack-plugin` 插件提供的变量外，Fes.js 还把 `process.env` 中的环境变量添加到模板作用域内：
- `NODE_ENV`
- `FES_ENV`
- `.env` 文件中以 `FES_APP_` 开头的变量

举个 🌰 ：

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```