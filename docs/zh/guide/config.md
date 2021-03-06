# 配置

Fes.js 约定 `.fes.js` 文件为项目基础配置文件，一份常见的配置示例如下：

```js
export default {
    base: '/foo/',
    publicPath: '/',
    devServer: {
        port: 8080
    }
    mock: {
        prefix: '/v2'
    },
    proxy: {
        '/v2': {
            'target': 'https://api.douban.com/',
            'changeOrigin': true, 
        },
    },
    layout: {
        title: "Fes.js",
        footer: 'Created by MumbelFe',
        multiTabs: false,
        menus: [{
            name: 'index'
        }, {
            name: 'onepiece'
        }, {
            name: 'store'
        }, {
            name: 'simpleList'
        }]
    }
}
```

## 本地临时配置文件
可以新建 `.fes.local.js` 作为本地临时配置文件。这份配置会和 `.fes.js` 做 `deep merge` 后形成最终配置。
```js
// .fes.js
export default { mock: false };

// .fes.local.js
export default { 
    mock: true,
    dvServer: { port: 8080 }
};
```
最终的配置是：
```js
{ 
    mock: true,
    devServer: { port: 8080 }
};
```
::: tip
`.fes.local.js` 是本地验证使用的临时配置，仅在 `fes dev` 时有效，请将其添加到 `.gitignore`，务必不要提交到 `git` 仓库中。
:::

## 多环境多份配置
可以通过环境变量 `FES_ENV` 区分不同环境，来指定当前环境的配置文件，这份配置会和 `.fes.js` 做 `deep merge` 后形成最终配。

比如配置如下：
```js
// .fes.js
export default { mock: false };

// .fes.uat.js
export default { 
    mock: true,
    dvServer: { port: 8080 }
};
```
当我们运行：
```bash
FES_ENV=uat fes dev
```
这时候会命中 `.fes.uat.js` 这份环境配置，最终配置是：
```js
{ 
    mock: true,
    devServer: { port: 8080 }
};
```

## 优先级

本地临时配置  >  环境配置  >  基础配置

::: tip
如果多份配置中存在相同的配置项，**则优先级高的会覆盖优先级低的**。
::: 
