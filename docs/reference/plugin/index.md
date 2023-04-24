# 介绍

<script setup>
import { withBase } from 'vitepress'
</script>

## 插件列表

| 插件                                               | 介绍                                                                    |
| -------------------------------------------------- | ----------------------------------------------------------------------- |
| [@fesjs/plugin-access](./plugins/access.md)        | 提供对页面资源的权限控制能力                                            |
| [@fesjs/plugin-enums](./plugins/enums.md)          | 提供统一的枚举存取及丰富的函数来处理枚举                                |
| [@fesjs/plugin-icon](./plugins/icon.md)            | svg 文件自动注册为组件                                                  |
| [@fesjs/plugin-jest](./plugins/jest.md)            | 基于 `Jest`，提供单元测试、覆盖测试能力                                 |
| [@fesjs/plugin-layout](./plugins/layout.md)        | 简单的配置即可拥有布局，包括导航以及侧边栏                              |
| [@fesjs/plugin-locale](./plugins/locale.md)        | 基于 `Vue I18n`，提供国际化能力                                         |
| [@fesjs/plugin-model](./plugins/model.md)          | 简易的数据管理方案                                                      |
| [@fesjs/plugin-request](./plugins/request.md)      | 基于 `Axios` 封装的 request，内置防止重复请求、请求节流、错误处理等功能 |
| [@fesjs/plugin-vuex](./plugins/vuex.md)            | 基于 `Vuex`, 提供状态管理能力                                           |
| [@fesjs/plugin-qiankun](./plugins/qiankun.md)      | 基于 `qiankun`，提供微服务能力                                          |
| [@fesjs/plugin-sass](./plugins/sass.md)            | 样式支持 sass                                                           |
| [@fesjs/plugin-monaco-editor](./plugins/editor.md) | 提供代码编辑器能力， 基于`monaco-editor`（VS Code 使用的代码编辑器）    |
| [@fesjs/plugin-windicss](./plugins/windicss.md)    | 基于 `windicss`，提供原子化 CSS 能力                                    |
| [@fesjs/plugin-pinia](./plugins/pinia.md)          | 基于 `pinia`，提供状态管理                                              |
| [@fesjs/plugin-watermark](./plugins/watermark.md)  | 水印                                                                    |
| [@fesjs/plugin-swc](./plugins/swc.md)              | swc                                                                     |

## 架构

<!-- ![架构](/framework.png "架构") -->
<img :src="withBase('framework.png')" alt="架构">

Fes.js 把大家常用的技术栈封装成一个个插件进行整理，收敛到一起，让大家只用 Fes.js 就可以完成 80% 的日常工作。
