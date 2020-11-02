# Release 记录


## v0.1.0

### 功能改进

#### fes-cli
1. 去掉编译打包时时配置BannerPlugin，关闭[issues/7](https://github.com/WeBankFinTech/fes.js/issues/7) 
2. `fes init`改为从npm下载项目模板，避免频繁更新项目模板而需要更新`fes`
3. 下载模板后不默认执行`git init`，避免未安装git带来的问题。
   
#### fes-core
1.  Fes-Core替换Icon组件为ionicons图标。
2.  首次运行时，跳转路由改为直接跳转到defaultPage，而不是通过设置根路由"/"的redirect，优化体验。

#### fes-template
1. 项目中`@webank/fes-core`和`@webank/fes-ui`的依赖直接在项目模板package.json中指定，优化体验。
2. 整理项目模板，方便体验权限管理功能。

#### 文档
1.  修复在线文档未正常渲染的问题。
2.  更新文档中描述不准备的地方。       