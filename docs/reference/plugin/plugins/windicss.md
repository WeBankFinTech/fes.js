# @fesjs/plugin-windicss

::: warning 即将废弃
由于 windicss 不怎么维护了，本插件即将废弃，推荐使用 [tailwindcss](https://tailwindcss.com/)。
:::

## 介绍

`windicss` 支持

## 启用方式

在 `package.json` 中引入依赖：

```json
{
    "devDependencies": {
        "@fesjs/plugin-windicss": "^2.0.0"
    }
}
```

## 配置

在 `.fes.js` 配置文件中添加自定义配置，详细配置[请看](https://windicss.org/integrations/webpack.html)：

```js
export default {
    windicss: {
        root: './',
    },
};
```
