<p align="center">
  <a href="https://github.com/WeBankFinTech/fes.js">
    <img alt="fes.js" width="250" src="https://i.loli.net/2020/08/31/FB6zZyPEW5cVDAC.jpg">
  </a>
</p>

<div align="center">

一套优秀的中后台前端解决方案

[![GitHub issues](https://img.shields.io/github/issues/WeBankFinTech/fes.js.svg?style=flat-square)](https://github.com/WeBankFinTech/fes.js/issues)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/WeBankFinTech/fes.js/pulls)

</div>

- 在线体验 - [http://webank.gitee.io/fes-pro/](http://webank.gitee.io/fes-pro/)
- 使用文档 - [https://webank.gitee.io/fes.js/](https://webank.gitee.io/fes.js/)
- 更新日志 - [https://github.com/WeBankFinTech/fes.js/blob/master/CHANGELOG.md](https://github.com/WeBankFinTech/fes.js/blob/master/CHANGELOG.md)

# 前言
不管什么项目可能需要一个或者更多的管理台，管理台应用的内容一般是权限管理、增删改查、报表等业务逻辑相对固定的。但是大量的增删改查和接口联调非常耗费开发者时间，而且现在对管理台前端有了更高的要求，希望前端应用有美观而且统一的UI和一致的交互体验。     
Fes.js支撑从开发、联调、部署整个前端应用研发流程，提供模板项目、cli命令行工具、丰富的PC端组件和一系列API，提效中后台开发，让开发只关注如何用组件搭建出页面。


## 简介
Fes.js是一整套管理台前端应用解决方案，包含Fes-Cli、Fes-Core、Fes-UI三部分。
- Fes-Cli是命令行工具，一行命令创建工程、开启开发调试、打包发布。
- Fes-Core是运行时框架，固定页面布局，提供权限管理、储存管理、路由管理、接口管理、状态管理、数据字典管理、环境管理等API。以插件的方式提供扩展接口。
- Fes-UI是组件库，包含30+的PC端组件库，可以快速搭建出增删改查等页面

## 特性
- 国际化，语言可配置，通过API切换
- 自动生成路由，目录即路由
- 智能路由匹配，比你更懂想去哪
- 动态权限，不同权限对应不同菜单
- Mock 数据，本地数据调试
- 固定布局，只需关心页面内容
- 数据字典，简单定义，随处翻译
- 单元测试，为质量保障护航


## 页面举例
![home.png](https://i.loli.net/2020/09/24/tYOseINfD1F9Lg8.png)
![form.png](https://i.loli.net/2020/09/24/c8JIeQbxGhB3VFa.png)
![list.png](https://i.loli.net/2020/09/24/k3LWHY7ZjxtlF4z.png)
![listAndFrom.png](https://i.loli.net/2020/09/24/fFmi43r6KoXxnQu.png)
![listAndImg.png](https://i.loli.net/2020/09/24/2mzrDqyoEsQ4g96.png)
![fu.png](https://i.loli.net/2020/09/24/ahT3nFKr6DBPbej.png)


## 使用

1. 安装fes.js
```bash
# install
npm install @webank/fes-cli -g
```

2. 初始化项目
   
```bash
# create a project
fes init [project]
```

3. 安装依赖
```bash
cd [project] 
npm i
```

4. 启动本地服务
```bash
# start dev
npm run dev
```

5. 打包编译
```bash
# build
npm run build
```

6. 单元测试
```bash
# build
npm run test
```


## 社区联络微信群
<img alt="fes.js社区群" width="250" src="https://i.loli.net/2020/09/11/2XhKtPZd6NFVbDE.png">

如果群满了，请联系：      
<img alt="fes.js助手" width="250" src="https://i.loli.net/2020/09/16/sxwr62CKhmYOUyV.jpg"> 

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/WeBankFinTech/fes.js/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
