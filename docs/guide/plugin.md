# 插件

## 插件的 id 和 key
每个插件都会对应一个 `id` 和一个 `key`，**`id` 是路径的简写，`key` 是进一步简化后用于配置的唯一值**。

比如插件 `/node_modules/@fesjs/plugin-foo/index.js`，通常来说，其 `id` 为 `@fesjs/plugin-foo`，`key` 为 `foo`。

::: tip
id 一般用不上，对于普通开发者 key 用来配置插件，而插件开发者可以使用 key 判断是否安装某个插件。 
:::

## 启动插件
有多种方式引入插件

### package.json 依赖
Fes.js 会自动检测 `dependencies` 和 `devDependencies` 里的 fes 插件，比如：
```json
{
  "dependencies": {
    "@fesjs/plugin-request": "^2.0.0"
  }
}
```
那么 `@fesjs/plugin-request` 会自动被注册，无需在配置里重复声明。

### 配置
在配置里可通过 `presets` 和 `plugins` 配置插件，比如：
```js
export default {
    presets: ['./preset', 'foo/presets'],
    plugins: ['./plugin'],
}
```
通常用于几种情况：

1. 项目相对路径的插件
2. 非 npm 包入口文件的插件

::: warning
请不要配置 npm 包的插件，否则会报重复注册的错误
:::

### 环境变量
还可通过环境变量 `FES_PRESETS` 和 `FES_PLUGINS` 注册额外插件。

比如：
```bash
FES_PRESETS=/a/b/preset.js fes dev
```

## 禁用插件

通过配置插件的 `key` 为 `false`，比如：
```js
export default {
    mock: false,
}
```
Mock 插件的 `key` 是 `mock`，我们在配置文件中配置 `mock` 为 `false`，则会禁用 Mock 插件及其功能。

## 配置插件

通过插件的 `key` 来配置插件，比如：
```js
export default {
    mock: { 
        prefix: '/v2'
    }
}
```
这里的 `mock` 是 Mock插件 的 key。