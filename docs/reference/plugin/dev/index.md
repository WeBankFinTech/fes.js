# 插件介绍

## 开始

一个插件是一个 `npm` 包，它能够为 Fes.js 创建的项目添加额外的功能，这些功能包括：

-   项目的 webpack 配置。
-   修改项目的 babel 配置。
-   添加新的 fes 命令 - 例如 `@fes/plugin-jest` 添加了 `fes test` 命令，允许开发者运行单元测试。
-   集成 Vue 的插件。
-   修改路由配置
-   提供运行时 API
-   ...

插件的入口是一个函数，函数会以 API 对象作为第一个参数：

```js
export default (api) => {
    api.describe({
        key: 'esbuild',
        config: {
            schema(joi) {
                return joi.object();
            },
            default: {},
        },
        enableBy: api.EnableBy.config,
    });
};
```

API 对象是构建流程管理 Service 类的实例，api 提供一些有用的方法帮助你开发插件。

`api.describe`用来描述插件：

-   **key**， 插件的 `key`，可以理解为插件的名称，在 `.fes.js` 中用 `key` 配置此插件。
-   **config**，插件的配置信息：
    -   schema，定义配置的类型
    -   default，默认配置
-   **enableBy**， 是否开启插件，可配置某些场景下禁用插件。

## 创建插件

##### 第一步：安装`create-fes-app`

```bash
npm i -g @fesjs/create-fes-app
```

##### 第二步：创建插件项目

```bash
create-fes-app pluginName
```

在询问`Pick an template`时选择`Plugin`!

##### 第三步：进入插件目录 & 安装依赖

```bash
cd pluginName & pnpm i
```

##### 第四步：启动编译

```bash
pnpm dev
```

##### 第五步：使用插件 API 完成你的插件！（可以参考其他插件理解 api 用法和场景）

## 发布到 npm

以 `@fesjs/preset-`、`@fesjs/plugin-`、`@webank/fes-preset-`、`@webank/fes-plugin-`、`fes-preset-` 和 `fes-plugin-` 开头的依赖会被 Fes.js 自动注册为插件或插件集。

所以编写好的插件想发布到 npm 供其他人使用，包名必须是 `fes-preset-` 和 `fes-plugin-` 开头。
