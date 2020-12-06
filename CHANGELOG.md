# Changelog

<!-- DO NOT CHANGE THESE COMMENTS - See .github/actions/trigger-github-release/update-changelog.js -->
<!-- insert-new-changelog-here -->
## [0.4.6](https://github.com/WeBankFinTech/fes/compare/v0.4.5...v0.4.6) (2020-12-06)


### :bug: Bug Fix

* **fes-cli:** 兼容高版本node ([839a933](https://github.com/WeBankFinTech/fes/commit/839a933)) by: **bac-joker**
## [0.4.5](https://github.com/WeBankFinTech/fes/compare/v0.4.4...v0.4.5) (2020-11-27)


### :bug: Bug Fix

* **fes-cli:** 修复mock对post请求的支持 ([e4815cb](https://github.com/WeBankFinTech/fes/commit/e4815cb)) by: **万纯**
* **fes-core:** v-permisson也支持模糊匹配 ([9d29199](https://github.com/WeBankFinTech/fes/commit/9d29199)) by: **万纯**
* **fes-ui:** 修复select组件展示内容长多的选项时超出框范围 ([97ef412](https://github.com/WeBankFinTech/fes/commit/97ef412)) by: **万纯**


### :memo: Documentation

* **fes-doc:** 更正对v-perssion用法 ([27abe1b](https://github.com/WeBankFinTech/fes/commit/27abe1b)) by: **万纯**
## [0.4.4](https://github.com/WeBankFinTech/fes/compare/v0.4.3...v0.4.4) (2020-11-13)


### :bug: Bug Fix

* **fes-core:** 修复模糊匹配对"/"路由判断失效 ([47f67e5](https://github.com/WeBankFinTech/fes/commit/47f67e5)) by: **harrywan**


### :memo: Documentation

* 手动修改更新文档 ([d599d2d](https://github.com/WeBankFinTech/fes/commit/d599d2d)) by: **harrywan**
## [0.4.3](https://github.com/WeBankFinTech/fes/compare/v0.4.2...v0.4.3) (2020-10-30)


### 优化

* 单元测试改为使用karma框架
* 支持覆盖测试
* 使用hard-source-webpack-plugin优化编译速度


### :memo: Documentation

* 单元测试文档 ([eef8924](https://github.com/WeBankFinTech/fes/commit/eef8924)) by: **harrywan**
  
## [0.4.2](https://github.com/WeBankFinTech/fes/compare/v0.4.1...v0.4.2) (2020-10-30)


### :memo: Documentation

* rEADME添加单元测试描述 ([2fd6e05](https://github.com/WeBankFinTech/fes/commit/2fd6e05)) by: **harrywan**
## [0.4.1](https://github.com/WeBankFinTech/fes/compare/v0.4.0...v0.4.1) (2020-10-27)


### ♻ 代码重构

* **fes-template:** test目录也上传到npm ([1c191ac](https://github.com/WeBankFinTech/fes/commit/1c191ac)) by: **harrywan**
# [0.4.0](https://github.com/WeBankFinTech/fes/compare/v0.3.1...v0.4.0) (2020-10-27)


### :rocket: New Feature

* **fes-cli:** babel-runtie集成在fes-cli中,支持项目配置fes-cli ([2622ef2](https://github.com/WeBankFinTech/fes/commit/2622ef2)) by: **harrywan**
* **fes-cli:** 支持单元测试 ([bf07558](https://github.com/WeBankFinTech/fes/commit/bf07558)) by: **harrywan**


### ♻ 代码重构

* **fes-cli:** 精简和优化mock代码 ([d521575](https://github.com/WeBankFinTech/fes/commit/d521575)) by: **harrywan**
## [0.3.1](https://github.com/WeBankFinTech/fes/compare/v0.3.0...v0.3.1) (2020-10-23)


### :bug: Bug Fix

* **fes-cli:** 修复window下编译路由配置时路径问题 ([9b29b8e](https://github.com/WeBankFinTech/fes/commit/9b29b8e)) by: **harrywan**
# [0.3.0](https://github.com/WeBankFinTech/fes/compare/v0.2.4...v0.3.0) (2020-10-22)


### :rocket: New Feature

* **fes-cli:** 路由支持模糊匹配和智能路由匹配 ([f6c3f5f](https://github.com/WeBankFinTech/fes/commit/f6c3f5f)) by: **harrywan**, closes [#32](https://github.com/WeBankFinTech/fes.js/issues/32)
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