# 从 3.x 迁移到 4.x

构建模块从 commonjs 切换到 esm

## 需调整内容

- package.json 添加 `"type": "module"`
- vitOption 配置更名为 vite

## 版本 4.x 的 break

1. [@fesjs/builder-vite]: vite5 升级到 [vite8](https://cn.vitejs.dev/guide/migration.html)
2. [@fesjs/plugin-pinia]: pinia 2.x > [3.x](https://github.com/vuejs/pinia/releases/tag/v3.0.0)

## 插件

- 移除插件[@fesjs/plugin-vuex]
- 移除插件[@fesjs/plugin-windicss]
- 移除插件[@fesjs/plugin-jest]

## 注意

`vite8` 对 commonjs 的处理规则不一样, 如果 commonjs 包升级后处理有问题, 可以加配置
```js
    vite: {
        legacy: {
            // 暂时恢复到旧版本的 CJS 导出识别逻辑
            inconsistentCjsInterop: true,
        },
    } 
```