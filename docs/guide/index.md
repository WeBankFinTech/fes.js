# 介绍

<script setup>
import { withBase } from 'vitepress'
</script>

## 痛点

在开发一个前端项目之前，我们可能需要做如下准备工作：

-   搭建开发环境
-   约定代码规范
-   封装 API 请求
-   配置路由
-   实现布局、菜单、导航
-   实现登录
-   权限管理
-   ...

除了准备工作之外，还会遇到很多相似的业务类型，比如中后台应用大多都是工作台、增删改查、权限、图表等。如果每次项目都完全手动处理一遍，不仅耗费时间，久而久之可能会存在多种技术栈、开发规范，导致开发流程不统一，历史项目越来越难维护。所以我们需要一套完整的解决方案，管理开发到部署整个流程。

## Fes.js 是什么？

Fes.js 是一个好用的前端应用解决方案。Fes.js 以 Vue 3.0 和路由为基础，同时支持配置式路由和约定式路由，并以此进行功能扩展。配以覆盖编译时和运行时生命周期完善的插件体系，支持各种功能扩展和业务需求。

它主要具备以下特点：

-   🚀 **快速** ，内置了路由、开发、构建等，并且提供测试、布局、权限、国际化、状态管理、API 请求、数据字典、SvgIcon 等插件，可以满足大部分日常开发需求。
-   🧨 **简单** ，基于 Vue.js 3.0，上手简单。贯彻“约定优于配置”思想，设计插件上尽可能用约定替代配置，同时提供统一的插件配置入口，简单简洁又不失灵活。提供一致性的 API 入口，一致化的体验，学习起来更轻松。

-   💪 **健壮** ，只需要关心页面内容，减少写 BUG 的机会！提供单元测试、覆盖测试能力保障项目质量。

-   📦 **可扩展** ，借鉴 Umi 实现了完整的生命周期和插件化机制，插件可以管理项目的编译时和运行时，能力均可以通过插件封装进来，在 Fes.js 中协调有序的运行。

-   📡 **面向未来** ，在满足需求的同时，我们也不会停止对新技术的探索。已使用 Vue3.0 来提升应用性能，已使用 webpack5 提升构建性能和实现微服务，未来会探索 vite 等新技术。

## Fes.js 如何工作？

### 架构

<!-- ![架构](/framework.png "架构") -->
<img :src="withBase('framework.png')" alt="架构">

Fes.js 把大家常用的技术栈封装成一个个插件进行整理，收敛到一起，让大家只用 Fes.js 就可以完成 80% 的日常工作。

### 插件和插件集

<p>
    <img :src="withBase('plugins.png')" alt="插件" title="插件" style="width: 500px" class="medium-zoom-image">
</p>
Fes.js 支持插件和插件集，通过这张图应该很好理解到他们的关系，通过插件集我们把插件收敛依赖然后支持不同的业务类型。

### .fes 临时文件

.fes 临时目录是整个 Fes.js 项目的发动机，你的入口文件、路由等等都在这里，这些是由 fes 内部插件及三方插件生成的。

你通常会在 .fes 下看到以下目录

```
+ .fes
  + core     # 内部插件生成
  + pluginA  # 外部插件生成
  + presetB  # 外部插件生成
  + fes.js   # 入口文件
```

临时文件是 Fes.js 中非常重要的一部分，框架或插件会根据你的代码生成临时文件，这些原来需要放在项目里的脏乱差的部分都被藏在了这里。

你可以在这里调试代码，但不要在 .git 仓库里提交他，因为他的临时性，每次启动 fes 时都会被删除并重新生成。

## 为什么不是 ...?

### Vue CLI

Vue CLI 是基于 Vue.js 进行快速开发的完整系统，提供交互式脚手架、丰富的官方插件，并且可通过插件进行扩展，他在打包层把体验做到了极致，但是不包含路由，不是框架。所以，如果大家想基于他修改部分配置，或者希望在打包层之外也做技术收敛时，就会遇到困难。

### UMI

UMI 是个很好的选择，Fes.js 很多功能是借鉴 UMI 做的。UMI 是基于 React 封装的应用级框架，贯彻着函数式编程的思维。而 Vue 有所不同，虽然 Vue 3.0 向函数式迈了一大步，但大家可能依然喜欢编写 `.vue`文件，而非 `.jsx` 文件。两种思维方式会导致部分 API 设计上有所差异，虽然 UMI 有 `plugin-vue` ，但不太 "vue"。推荐喜欢 React 的同学使用 UMI。