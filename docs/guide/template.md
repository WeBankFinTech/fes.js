# HTML 模板

Fes.js 默认模板内容是：

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <title><%= title %></title>
    </head>
    <body>
        <div id="<%= mountElementId %>"></div>
    </body>
</html>
```

## 修改页面标题

```js
// .fes.js
export default {
    title: '这是页面标题',
};
```

页面的标题会设置成 `这是页面标题`。

## 模板变量

模版中可以使用的变量：

-   `NODE_ENV`: Node.js 环境变量
-   `FES_ENV`: Fes.js 环境变量
-   `BASE_URL`: publicPath
-   `.env.**`: 文件中以 `FES_APP_` 开头的变量

举个 🌰 ：

```env
# .env
FES_APP_HELLO_WORLD=hello world
```

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico" />
<body>
    <div><%= FES_APP_HELLO_WORLD %></div>
</body>
```
