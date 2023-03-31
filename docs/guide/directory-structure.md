# 目录结构

在[快速上手](./getting-started.html)中，大家对框架应该有初步的印象，接下来我们了解下目录结构。Fes.js 遵循 `约定优于配置` 的原则，一个基础的 Fes.js 项目大致是这样的：

```
fes-template
├── package.json
├── tsconfig.json
├── mock.js
├── .fes.js
├── .env
├── index.html
├── dist
├── public
│   └── logo.png
└── src
    ├── .fes
    └── pages
    │    └── index.vue
    └── app.js
```

### package.json

```json
{
    "name": "@fesjs/template",
    "version": "2.0.0",
    "description": "fes项目模版",
    "scripts": {
        "build": "fes build",
        "prod": "FES_ENV=prod fes build",
        "analyze": "ANALYZE=1 fes build",
        "dev": "fes dev",
        "test": "fes test"
    },
    "keywords": ["管理端", "fes", "fast", "easy", "strong"],
    "files": [".eslintrc.js", ".gitignore", ".fes.js", ".fes.prod.js", "mock.js", "package.json", "README.md", "tsconfig.json", "/src", "/config"],
    "repository": {
        "type": "git",
        "url": "git+https://github.com/WeBankFinTech/fes.js.git",
        "directory": "packages/fes-template"
    },
    "author": "harrywan",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/WeBankFinTech/fes.js/issues"
    },
    "homepage": "https://github.com/WeBankFinTech/fes.js#readme",
    "publishConfig": {
        "access": "public"
    },
    "devDependencies": {
        "@webank/eslint-config-webank": "1.2.1"
    },
    "dependencies": {
        "@fesjs/fes": "^3.0.0",
        "@fesjs/builder-webpack": "^3.0.0",
        "@fesjs/plugin-access": "^3.0.0",
        "@fesjs/plugin-layout": "^5.0.0",
        "@fesjs/plugin-model": "^3.0.0",
        "@fesjs/plugin-enums": "^3.0.0",
        "@fesjs/plugin-jest": "^3.0.0",
        "@fesjs/plugin-vuex": "^3.0.0",
        "@fesjs/plugin-request": "^3.0.0",
        "@fesjs/plugin-qiankun": "^3.0.0",
        "@fesjs/plugin-sass": "^3.0.0",
        "@fesjs/plugin-monaco-editor": "^3.0.0",
        "@fesjs/plugin-windicss": "^3.0.0",
        "@fesjs/fes-design": "^0.7.23",
        "vue": "^3.2.47",
        "vuex": "^4.0.0"
    },
    "private": true
}
```

其中`@fesjs/fes`是 Fes.js 核心依赖，另外以 `@fesjs/preset-`、`@fesjs/plugin-`、`@webank/fes-preset-`、`@webank/fes-plugin-`、`fes-preset-` 和 `fes-plugin-` 开头的依赖会被自动注册为插件或插件集。`@fesjs/builder-` 开头的会被注册为构建器。

### tsconfig.json

解决 `@fesjs/fes` 和使用 `@` 的 API 提示

### .fes.js

配置文件，包含 Fes.js 内置功能和安装的其他插件配置。

### mock.js

`mock` 数据的配置文件。

### .env

定义环境变量。

比如 `.env` 文件内容如下：

```
PORT=8888
FES_ENV=prod
```

等同于 node 端运行时，设置如下：

```
process.env.PORT = '8888';
process.env.FES_ENV = 'prod';
```

### dist 目录

执行 `fes build` 后，产物默认会存放在这里。

### public 目录

此目录下所有文件为静态资源，会被复制到输出路径。

### index.html

默认的 `html` 模板文件，如果删除此 `html` 则会使用内置的 `html` 模板文件。

### src 目录

### .fes 目录

临时文件目录，比如入口文件、路由等，都会被临时生成到这里。

:::warning
不要提交 `.fes` 目录到 `git` 仓库，他们会在 `fes dev` 和 `fes build` 时被删除并重新生成。
:::

### pages 目录

所有路由组件文件存放在这里。

### app.js

运行时配置文件，可以在这里扩展运行时的能力，比如修改路由等。
