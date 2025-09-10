# 从 3.x 迁移到 4.x

构建模块从 commonjs 切换到 esm

## 需调整内容

- package.json 添加 `"type": "module"`

## 版本 4.x 的 break

1. [@fesjs/builder-vite]: vite5 升级到 [vite7](https://cn.vitejs.dev/guide/migration.html)
2. [@fesjs/plugin-pinia]: pinia 2.x > [3.x](https://github.com/vuejs/pinia/releases/tag/v3.0.0)

## 插件

- 移除插件[@fesjs/plugin-vuex]
- 移除插件[@fesjs/plugin-windicss]
- 移除插件[@fesjs/plugin-jest]
