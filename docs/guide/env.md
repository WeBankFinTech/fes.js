# 环境变量
在构建或者代码在端上运行中需要一些跟区分于环境的变量，用于配置构建流程或者运行时过程，这时候我们可以配置环境变量。


## 设置环境变量

### 执行命令时添加
比如：
```bash
# OS X, Linux
PORT=3000 umi dev

# Windows (cmd.exe)
set PORT=3000 && umi dev
```
如果要同时考虑 OS X 和 Windows，可借助三方工具 [cross-env](https://github.com/kentcdodds/cross-env)
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add cross-env --dev
cross-env PORT=3000 umi dev
```

  </CodeGroupItem>
  <CodeGroupItem title="NPM">

```bash
npm i cross-env --save-dev
cross-env PORT=3000 umi dev
```

  </CodeGroupItem>
</CodeGroup>

### 在 .env 文件中定义
Fes.js 中约定根目录下以 `.env` 开头的文件为环境变量配置文件。

比如：
```bash
PORT=3000
```
然后执行
```bash
fes dev
```
会以 3000 端口启动 dev server。

#### 本地临时配置
可以新建 `.env.local`，这份配置会和 `.env` 做 `merge` 后形成最终配置。

#### 多环境多份配置
可以通过环境变量 `FES_ENV` 区分不同环境来指定配置，这时候必须在执行命令前添加 `FES_ENV` 保证执行加载环境变量配置文件逻辑前 `FES_ENV` 已设置。

举个 🌰 ：
```bash
FES_ENV=sit umi dev
```
如果存在 `.env.sit` 文件，则会将 `.env.sit` 的配置和 `.env` 做 `merge` 后形成最终配置。

#### 配置优先级

临时配置 > 环境配置 > .env

::: tip
如果两份配置中存在相同的项，则优先级高的会覆盖优先级低的。
::: 

## 运行时环境变量
运行时环境变量需要以 `FES_APP_` 开头，比如在 `.env` 中配置：
```
FES_APP_KEY=11111
```
在代码中使用：
```js
console.log(process.env.FES_APP_KEY)
// 输出 11111
```

## 编译时环境变量列表

### FES_ENV
指定当前的环境，不同环境各自的配置文件。

### FES_PRESETS
添加额外的插件集入口

### FES_PLUGINS
添加额外的插件入口

### PORT
`fes dev` 时服务指定的端口号，默认是 `8080`

### HOST
默认是 `localhost`。

### HTTPS
默认是 `false`。

### WATCH
设为 none 时不监听文件变更。比如：
```
WATCH=none fes dev
```

### BABEL_CACHE
默认开启 Babel 编译缓存，值为 none 时禁用缓存。

### ANALYZE
用于分析 bundle 构成，默认关闭。

比如：
```
ANALYZE=1 fes build
```

### ANALYZE_MODE
默认是`server`

### ANALYZE_PORT
默认是`8888`
