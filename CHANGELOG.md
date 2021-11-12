# Changelog

<!-- DO NOT CHANGE THESE COMMENTS - See .github/actions/trigger-github-release/update-changelog.js -->
<!-- insert-new-changelog-here -->

## [2.0.0](https://github.com/WeBankFinTech/fes/compare/v0.2.3...v2.0.0) (2021-07-01)

### 🚀 New Feature
发布2.0.0，重构90%以上的代码，以Vue 3.0和路由为基础，同时支持配置式路由和约定式路由，并以此进行功能扩展。匹配了覆盖编译时和运行时生命周期完善的插件体系，支持各种功能扩展和业务需求。

支持插件如下：
1. @fesjs/plugin-access	提供对页面资源的权限控制能力
2. @fesjs/plugin-enums	提供统一的枚举存取及丰富的函数来处理枚举
3. @fesjs/plugin-icon	svg 文件自动注册为组件
4. @fesjs/plugin-jest	基于 Jest，提供单元测试、覆盖测试能力
5. @fesjs/plugin-layout	简单的配置即可拥有布局，包括导航以及侧边栏
6. @fesjs/plugin-locale	基于 Vue I18n，提供国际化能力
7. @fesjs/plugin-model	简易的数据管理方案
8. @fesjs/plugin-request	基于 Axios 封装的 request，内置防止重复请求、请求节流、错误处理等功能
9. @fesjs/plugin-vuex	基于 Vuex, 提供状态管理能力
10. @fesjs/plugin-qiankun	基于 qiankun，提供微服务能力
11. @fesjs/plugin-sass	样式支持sass


## [0.2.3](https://github.com/WeBankFinTech/fes/compare/v0.2.2...v0.2.3) (2020-09-25)


### :bug: Bug Fix

* fes-template列表页中日期组件的value值不能为“” ([3cc894e](https://github.com/WeBankFinTech/fes/commit/3cc894e)) by: **harrywan**


### :memo: Documentation

* 更新affix组件 ([a897c3d](https://github.com/WeBankFinTech/fes/commit/a897c3d)) by: **harrywan**
* 更新在线文档入口地址 ([2114e39](https://github.com/WeBankFinTech/fes/commit/2114e39)) by: **harrywan**
* 替换图片 ([04c905b](https://github.com/WeBankFinTech/fes/commit/04c905b)) by: **harrywan**
## [0.2.2](https://github.com/WeBankFinTech/fes/compare/v0.2.1...v0.2.2) (2020-09-23)


### :bug: Bug Fix

* 解决fes-cli build 异常 ([cbbc29f](https://github.com/WeBankFinTech/fes/commit/cbbc29f)) by: **bac-joker**, closes [#20](https://github.com/WeBankFinTech/fes.js/issues/20)
## [0.2.1](https://github.com/WeBankFinTech/fes/compare/v0.2.0...v0.2.1) (2020-09-20)


### 🐛 Bug Fixes

* **fes-template:** solve the corejs3.x dependency problem ([e3e43c3](https://github.com/WeBankFinTech/fes/commit/e3e43c3))

## 0.2.0

### 🚀 New Feature

1. fes-cli 构架支持 gzip
2. fes-cli 支持路由懒加载
3. 添加在线[demo](http://webank.gitee.io/fes-pro/#/home)

### 🐛 Bug Fix

1. fes-cli 支持 global 全局安装，关闭[issues/17](https://github.com/WeBankFinTech/fes.js/issues/17) 
2. 解决 layout布局的FesHeader和FesLeft不生效问题
3. 更新文档中描述不准备的地方。

## 0.1.0

### 功能改进

#### fes-cli v0.1.4
- 去掉编译打包时时配置BannerPlugin，关闭[issues/7](https://github.com/WeBankFinTech/fes.js/issues/7) 
- `fes init`改为从npm下载项目模板，避免频繁更新项目模板而需要更新`fes`
- 下载模板后不默认执行`git init`，避免未安装git带来的问题。
   
#### fes-core v0.1.2
- Fes-Core替换Icon组件为ionicons图标。
- 首次运行时，跳转路由改为直接跳转到defaultPage，而不是通过设置根路由"/"的redirect，优化体验。

#### fes-template v0.1.3
- 项目中`@webank/fes-core`和`@webank/fes-ui`的依赖直接在项目模板package.json中指定，优化体验。
- 整理项目模板，方便体验权限管理功能。

#### fes-ui v0.1.1
- 修复`Layout`组件`offset`属性不生效

#### 文档
- 修复在线文档未正常渲染的问题。
- 更新文档中描述不准备的地方。 