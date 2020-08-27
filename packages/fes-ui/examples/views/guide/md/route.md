# 路由
像Vue、React是组件化的开发模式。路由解决的是路径到组件的匹配问题，定义什么url挂载什么组件。Fes框架路由用的是<a target="_blank" href="https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn">Vue-router</a>，感兴趣的同学可以看看Vue-router。

#### Vue-router对于路由的配置是使用router.map配置的。而Fes呢？Fes将根据项目的pages目录结构自动生成路由规则

	pages
	├── index.fes         # 根路由页面 路径 index.html#/
    ├── a.fes             # 路径 /a
    ├── b                 # 文件夹b
    │   ├── index.fes     # 路径 /b
    │   ├── @id.fes       # 动态路由 /b/:id
    │   └── c.fes         # 路径 /b/c
    └── layout.fes        # 根路由下所有page共用的外层
    1) 如果目录下有layout.fes，则子目录对应的路径是当前目录对应路径的子路由。如果没有则子目录对应的路径和当前目录对应路径是平级的。
    2）带参数的路径使用@id.fes的方式

#### Fes编译代码之前会根据pages目录结构生成下面的配置代码：

```javascript
import layout from 'D:\\git\\fes-template\\src\\pages\\layout.fes';
import index from 'D:\\git\\fes-template\\src\\pages\\index.fes';
import a from 'D:\\git\\fes-template\\src\\pages\\a.fes';
import b_index from 'D:\\git\\fes-template\\src\\pages\\b\\index.fes';
import b@id from 'D:\\git\\fes-template\\src\\pages\\b\\@id.fes';
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
                name: 'b_c', component:  b_c
            }
        }
    }
};
```

## API：
API参考<a target="_blank" href="https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn">Vue-router</a>。路由实例会挂载在FesApp对象上。
例如跳转可以：
```javascript
 this.FesApp.router.go()
```

## 切换前切换后事件钩子：
在app.js中如下设置：
```javascript
this.setBeforeRouter(function (transition) {
    transition.next();
});

this.setAfterRouter(function (transition) {
    console.log("您浏览到了"+transition.to.path)
});
```
