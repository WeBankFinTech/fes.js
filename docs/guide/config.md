# 编译时配置

Fes.js 约定 `.fes.js` 文件为项目编译需要编译时配置文件，可以引入 node 端依赖项，不要引入浏览器端依赖项。

一份常见的配置示例如下（更多配置项请查阅[配置](../reference/config))：

```js
import { defineBuildConfig } from '@fesjs/fes';

export default defineBuildConfig({
    publicPath: '/',
    mock: {
        prefix: '/v2',
    },
    proxy: {
        '/v2': {
            target: 'https://api.douban.com/',
            changeOrigin: true,
        },
    },
    layout: {
        title: 'Fes.js',
        footer: 'Created by MumbelFe',
        multiTabs: false,
        menus: [
            {
                name: 'index',
            },
            {
                name: 'onepiece',
            },
            {
                name: 'store',
            },
            {
                name: 'simpleList',
            },
        ],
    },
});
```

## 本地临时配置文件

可以新建 `.fes.local.js` 作为本地临时配置文件。这份配置会和 `.fes.js` 做 `deep merge` 后形成最终配置。

```js
// .fes.js
export default { mock: false };

// .fes.local.js
export default {
    mock: true,
    devServer: { port: 8080 }
};
```

最终的配置是：

```js
{
    mock: true,
    devServer: { port: 8080 }
};
```

::: warning
`.fes.local.js` 是本地验证使用的临时配置，仅在 `fes dev` 时有效，请将其添加到 `.gitignore`，不要提交到 `git` 仓库中。
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
    devServer: { port: 8080 }
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

本地临时配置 > 环境配置 > 基础配置

::: tip
如果多份配置中存在相同的配置项，**则优先级高的会覆盖优先级低的**。
:::
