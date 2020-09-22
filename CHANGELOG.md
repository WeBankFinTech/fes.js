# Changelog

<!-- DO NOT CHANGE THESE COMMENTS - See .github/actions/trigger-github-release/update-changelog.js -->
<!-- insert-new-changelog-here -->
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