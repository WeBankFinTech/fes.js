# fes.js 源码编译

优雅的编译和日志输出，约定源码放在 `src` 目录。支持 node 端 cjs，browser：esm 编译。

不支持 browser 端的 cjs 编译，有两个理由：

1. 我们的内部包，目前来看只会在我们内部使用，没必再编译一份 cjs。
2. 即使后来有其他包使用，也不大可能不支持 esm，即便不支持，到时候再加也没问题。

## 使用方式

-   在项目根目录下添加 `build.config.js` 指定需要编译的 `packages` 包
-   可以通过 `--watch` cli 参数开启 `watch` 模式
-   如果需要只编译某个包，通过 `--pkg pkgName` 参数指定

## 配置

```
const config = {
    target: "node", // 编译目标 "node" | "browser", "node" 输出目录 lib, "browser" 输出目录 lib。默认编译目标 "node“
    pkgs: [], // 需要编译的 packages 包，默认编译根目录下所有的 packages 包，pkgs 参数只在根目录下的配置有效
    copy: [] // 直接拷贝，不进行编译
}
```
