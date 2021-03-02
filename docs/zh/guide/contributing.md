# 贡献指南

## 概览

项目仓库借助于 [Yarn Classic 工作区](https://classic.yarnpkg.com/zh-Hans/docs/workspaces) 来实现 [Monorepo](https://en.wikipedia.org/wiki/Monorepo) ，在 `packages` 目录下存放了多个互相关联的独立 Package 。

- `@webank/create-fes-app`: 创建项目模板模块。提供`create-fes-app`命令，提供创建多种类型项目模板的能力。
  
- `@webank/fes`: 入口模块。提供`fes`命令和 API 入口。 

- `@webank/fes-compiler`: 编译时插件管理模块。定义插件的生命周期、插件配置、插件通讯机制等。

- `@webank/fes-runtime`: 运行时插件模块。集成了vue-router，定义运行时插件生命周期、插件通讯机制。

- `@webank/fes-preset-build-in`: 内置插件集。包含`dev`、`build`等命令，集成webpack5+babel，提供方便编写插件的API，入口文件处理，路由处理等能力。

- `@webank/fes-template`: 适用于PC类型的模板项目。

- `@webank/fes-template-h5`: 适用于H5类型的模板项目。

- `@webank/fes-plugin-${name}`: 官方插件。

- `@webank/fes`: 是 `@webank/compiler` + `@webank/fes-runtime` + `@webank/fes-preset-build-in` 的封装。用户只需要安装此依赖和额外的插件或者插件集。

## 开发配置

开发要求：

- [Node.js](http://nodejs.org) **version 12+**
- [Yarn v1 classic](https://classic.yarnpkg.com/zh-Hans/docs/install)

克隆代码仓库，并安装依赖：

```bash
yarn
```

监听源文件修改：

```bash
yarn build
```

打开另一个终端，开始开发项目文档网站：

```bash
yarn docs:dev
```

本项目开发使用的一些主要工具：

- [Jest](https://jestjs.io/) 用于单元测试
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) 用于代码检查和格式化
- [@umi/father](https://github.com/umijs/father) 用于将ES6语法编译成ES5或者CommonJS

## 开发脚本

### `yarn build`

`build` 命令会使用 `father-build` 将 ES6 编译为 CommonJS。

本项目在编写Node端的代码时也用ES6，所以你在克隆代码仓库后，可能需要先执行该命令来确保项目代码可以顺利运行，因为编译后的 JS 文件被 `.gitignore` 排除在仓库以外了。
### `yarn docs:dev`
`docs:` 前缀表明，这些命令是针对文档 (documentation) 进行操作的，即 `docs` 目录。      
使用 Vue Press在本地启动文档网站服务器，用于实时查看文档效果。

### 调试功能
在开发完插件代码后，需要在template项目中验证功能
- 进入`packages/template`目录
- 执行`yarn dev`