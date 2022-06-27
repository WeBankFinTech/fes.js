# 贡献指南

## 包概览

项目仓库借助于 [Yarn 工作区](https://classic.yarnpkg.com/zh-Hans/docs/workspaces) 来实现 [ Monorepo](https://en.wikipedia.org/wiki/Monorepo) ，在 `packages` 目录下存放多个互相关联的独立包。

- `@fesjs/create-fes-app`: 创建项目模板模块。提供`create-fes-app`命令，提供创建多种类型项目模板的能力。
  
- `@fesjs/compiler`: 编译时插件管理模块。定义插件的生命周期、插件配置、插件通讯机制等。

- `@fesjs/runtime`: 运行时插件模块。集成了vue-router，定义运行时插件生命周期、插件通讯机制。

- `@fesjs/preset-build-in`: 内置插件集。包含`dev`、`build`等命令，集成webpack5+babel，提供方便编写插件的API，入口文件处理，路由处理等能力。

- `@fesjs/fes-template`: 适用于PC类型的模板项目。

- `@fesjs/fes-template-h5`: 适用于H5类型的模板项目。

- `@fesjs/plugin-${name}`: 官方插件。

- `@fesjs/fes`: 入口模块。提供`fes`命令和 API 入口，封装`@fesjs/compiler` + `@fesjs/runtime` + `@fesjs/preset-build-in`，用户只需要安装此依赖和其他插件。


## 开发准备

开发要求：

- [Node.js v14+](http://nodejs.org) 
- [Yarn v1](https://classic.yarnpkg.com/zh-Hans/docs/install)

本项目开发使用的一些主要工具：

- [Jest](https://jestjs.io/) 用于单元测试
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) 用于代码检查和格式化

克隆仓库：

```bash
git clone https://github.com/WeBankFinTech/fes.js.git
```

进入`fes.js`目录，安装依赖：

```bash
yarn
```

## 贡献文档
文档代码在`docs`目录，基于 [vuepress](https://v2.vuepress.vuejs.org/zh/) 实现。

#### 第一步：启动服务

```bash
yarn docs:dev
```

#### 第二步：修改md文件
菜单配置在`/docs/.vuepress/configs/sidebar/zh.ts`中，可以通过此配置找到对应想修改的文档。       

如果想添加图片，则可以先把图片添加至`/docs/.vuepress/public`，在代码中使用：
```html
<img :src="$withBase('framework.png')" alt="架构">
```

#### 第三步：查看更新
当md文档保存后，文档会自动更新，在`http://localhost:8080/`查看。



## 贡献源码
`Fes.js`统一使用`ES Module`规范编写源码，代码会在 node 端和浏览器端执行，所以源码需要编译后才能发布成包，再被执行。

#### 启动编译服务

```bash
yarn dev
```

当我们修改`build.config.js`中配置的包代码时，会把`src`目录的源码编译后到`lib`目录。

#### 修改源码
在了解`Fes.js`设计前提下，修改核心代码或者插件代码。

#### 验证修改内容

根据需求选择模板项目，比如选择`fes-template`，查看需验证的包是否已经添加到模板项目，如果没有：
1. 在package.json中添加包依赖
2. 在根目录执行`yarn`安装依赖
3. 启动服务
```bash
cd packages/fes-template
yarn dev
```
4. 在项目模板中添加代码验证修改内容
5. 打开`localhost:8000`查看结果

#### 快速调试技巧
每次修改插件或者核心代码后，需要重新在模板目录执行`fes dev`，再编写测试代码验证功能，比较费时费力。

可以先在模板的 `.fes` 目录中找到对应临时代码，更改逻辑，验证完后再将变更逻辑保存到正式文件中。

:::warning
直接修改临时文件切莫重新执行`fes dev`，修改会被覆盖。
:::


## 提交PR

1. fork项目!
2. 创建你的功能分支: git checkout -b my-new-feature
3. 本地提交新代码: git commit -am 'Add some feature'
4. 推送本地到服务器分支: git push origin my-new-feature
5. 创建一个PR