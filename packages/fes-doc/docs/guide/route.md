# 路由
像`Vue`、`React`这类框架是用组件化搭建页面，路由解决的是路径到组件的匹配问题。Fes框架的路由基于[Vue-router](https://router.vuejs.org/zh-cn/)，感兴趣的同学可以看看。

## 路由规范
`Vue-router`加载的路由是使用 `router.config.js` 配置的。而`Fes.js`将根据项目的 `pages`目录结构自动生成路由规则
```
	pages
	├── index.vue         # 根路由页面 路径 index.html#/
    ├── a.vue             # 路径 /a
    ├── b                 # 文件夹b
    │   ├── index.vue     # 路径 /b
    │   ├── @id.vue       # 动态路由 /b/:id
    │   └── c.vue         # 路径 /b/c
    └── layout.vue        # 根路由下所有page共用的外层
```
1. 如果目录下有`layout.vue`，则子目录对应的路径是当前目录对应路径的子路由。如果没有则子目录对应的路径和当前目录对应路径是平级的。
2. 带参数的路径使用`@[filename].vue`的方式

<br>
Fes编译代码之前会根据 pages 目录结构生成下面的配置代码：

```javascript
import layout from 'D:\\git\\fes-template\\src\\pages\\layout.vue';
import index from 'D:\\git\\fes-template\\src\\pages\\index.vue';
import a from 'D:\\git\\fes-template\\src\\pages\\a.vue';
import b_index from 'D:\\git\\fes-template\\src\\pages\\b\\index.vue';
import b__id from 'D:\\git\\fes-template\\src\\pages\\b\\@id.vue';
import b_c from 'D:\\git\\fes-template\\src\\pages\\b\\b_c';
export default { 
    '/': { 
        component: layout,
        subRoutes: {
            '/' : {
                name: 'index', component: index
            },
            '/a' : {
                name: 'a', component: a
            },
            '/b' : {
                name: 'b_index', component: b_index
            },
            '/b/:id' : {
                name: 'b__id', component:  b__id
            },
            '/c' : {
                name: 'b_c', component:  b_c
            }
        }
    }
};
```

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
