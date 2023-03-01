# @fesjs/plugin-swc

## 介绍
webpack 启用 swc，构建速度更快！


## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^3.0.0",
        "@fesjs/plugin-swc": "^3.0.0"
    },
}
```

## 编译时配置
传对象时使用swc进行编译和压缩，[loader配置](https://swc.rs/docs/configuration/swcrc)，默认usage模式。
```js
export default {
    swc: {
        loader: {
            env: {
                coreJs: '3.27',
            },
        }
    },
}
```
