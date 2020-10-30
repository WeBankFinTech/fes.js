---
sidebarDepth: 3
sidebar: auto
title: CLI命令
---

## init
初始化一个fes的项目模板，使用最新版本的`fes-template`
```shell
fes init [name]
```

## dev      
开发调试，启动本地服务
```shell
fes dev
```

### 参数

#### env
配置使用什么环境，对应着`fes.config.js`中的`env`
```shell
fes dev --env=develop
```

## build
编译打包
```shell
fes build
```
### 参数

#### env
配置使用什么环境，对应着`fes.config.js`中的`env`
```shell
fes dev --env=prod
```

## test:unit
单元测试
```shell
fes test:unit
```

### 参数

#### single-run
是否只执行一次，默认是`watch`模式，文件更新后会执行一次测试
```shell
fes test:unit --single-run
```

#### coverage
是否进行覆盖测试
```shell
fes test:unit --coverage
```
#### 其他参数
单元测试使用`karma`来管理测试，支持`karma`的所有参数，使用如下命令查看完整参数：
```
fes test:unit -h
```

## route
编译路由，根据`pages`下组件目录生成路由
```shell
fes update
```

## components
编译公共组件，componets下的组件自动注入到全局组件
```shell
fes components
```
