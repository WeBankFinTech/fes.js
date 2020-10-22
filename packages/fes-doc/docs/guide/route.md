# 路由
像`Vue`、`React`这类框架是用组件化搭建页面，路由解决的是路径到组件的匹配问题。Fes框架的路由基于[Vue-router](https://router.vuejs.org/zh-cn/)，感兴趣的同学可以看看。

## 路由规范
`Vue-router`加载的路由是使用 `router.config.js` 配置的。而`Fes.js`将根据项目的 `pages`目录结构自动生成路由规则
```
	pages
	├── index.vue         # 根路由页面 路径 index.html#/
    ├── *.vue             # 模糊匹配 路径 *
    ├── a.vue             # 路径 /a
    ├── b                 # 文件夹b
    │   ├── index.vue     # 路径 /b
    │   ├── @id.vue       # 动态路由 /b/:id
    │   └── c.vue         # 路径 /b/c
    └── layout.vue        # 根路由下所有page共用的外层
```
1. 如果目录下有`layout.vue`，则子目录对应的路径是当前目录对应路径的子路由。如果没有则子目录对应的路径和当前目录对应路径是平级的。
2. 带参数的路径使用`@[filename].vue`的方式，例如@id.vue
3. 支持模糊匹配，例如`pages/*.vue`对应的路径是`*`，可以通过此路由实现404效果
4. pages下的components文件夹下的.vue不被解析成路由，可以存放跟业务相关的公共组件。

## 智能路由匹配
根据精准匹配优先算法原则设计出路由排名算法，对匹配到的路由打分，选择分数最高的路由：
- 路由的路径每个子项得到4分
- 子项为静态细分(/list)再加3分
- 子项为动态细分（/:orderId）再加2分
- 根段加1分
- 通配符匹配到的减去1分

通过智能路由匹配可以解决类似`/list/create`和`/list/:id`到底匹配什么路由的问题。

## 跳转路由
API参考[Vue-router](https://router.vuejs.org/zh-cn/)。[路由实例](https://router.vuejs.org/zh-cn/api/router-instance.html)路由实例会挂载在FesApp对象上。

例如跳转可以：
```javascript
 this.FesApp.router.push(location, onComplete?, onAbort?)
 this.FesApp.router.replace(location, onComplete?, onAbort?)
 this.FesApp.router.go(n)
 this.FesApp.router.back()
```

切换前切换后事件钩子：
```javascript
this.FesApp.setBeforeRouter(function (from, to, next) {
    next();
});

this.FesApp.setAfterRouter(function (route) {
    console.log("您浏览到了"+route.path)
});
```
