# 目录结构

在[快速上手](./getting-started.html)中，大家对框架应该有初步的印象，接下来我们了解下目录结构。Fes.js 遵循 `约定优于配置` 的原则，一个基础的 Fes.js 项目大致是这样的：
```
fes-template
├── package.json
├── tsconfig.json
├── mock.js
├── .fes.js
├── .env
├── dist
├── public
│   └── index.html
└── src
    ├── .fes
    └── pages
    │    └── index.vue
    └── app.js
```

### 根目录

#### package.json
包含插件和插件集，以 `@fesjs/preset-`、`@fesjs/plugin-`、`fes-preset-` 和 `fes-plugin-` 开头的依赖会被自动注册为插件或插件集。

#### tsconfig.json
解决 `@fesjs/fes` 和使用 `@` 的 API 提示

#### .fes.js
配置文件，包含 Fes.js 内置功能和插件的配置。

#### .env
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

#### mock.js
mock 数据的配置文件。

### dist 目录
执行 `fes build` 后，产物默认会存放在这里。

### public 目录
此目录下所有文件会被 `copy` 到输出路径。

#### index.html
默认的 `html` 模板文件，如果删除此 `html` 则会使用内置的 `html` 模板文件。

### src 目录

#### .fes 目录
临时文件目录，比如入口文件、路由等，都会被临时生成到这里。不要提交 `.fes` 目录到 `git` 仓库，他们会在 `fes dev` 和 `fes build` 时被删除并重新生成。

#### pages 目录
所有路由组件存放在这里。

#### app.js
运行时配置文件，可以在这里扩展运行时的能力，比如修改路由等。