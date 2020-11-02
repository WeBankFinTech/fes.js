# 从Fes2迁移到Fes3
Fes2中运行时框架和UI组件库的版本由Fes管理，当运行时框架或者组件库有不兼容升级时，需要整体发一个不兼容性升级的版本。而在打包服务中，不可能部署多个版本的fes命令，导致Fes2只能做兼容性升级，劣质代码不能被优化！   
Fes3重新设计架构，把Fes2的代码拆分出`fes-cli`、`fes-core`和`fes-ui`三个模块。由项目管理运行时框架`fes-core`和UI组件库`fes-ui`的版本，在打包服务中部署`fes-cli`。`fes-cli`的功能相对稳定，可以做兼容升级，`fes-core`和`fes-ui`则可以发布不兼容版本，老项目可以选择性升级。 
    
1、安装fes-cli
```
npm i @webank/fes-cli -g   
```
2、进入项目目录，更新项目依赖 
```
fes update
```

