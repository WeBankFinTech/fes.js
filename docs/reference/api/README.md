---
sidebar: auto
---

# API
Fes.js 统一了API的出口，所有运行时API（包含Fes.js内置API和插件提供的API）全部通过`@fesjs/fes`导出。
```js
import { someApi  } from "@fesjs/fes"
```

## 基础API

### plugin
::: tip
主要在插件里面使用，项目代码中一般用不到。
:::

运行时插件接口，是 Fes.js 内置的跑在浏览器里的一套插件体系。
```js
import { plugin, ApplyPluginsType } from '@fesjs/fes';

// 注册插件
plugin.register({
  apply: { dva: { foo: 1 } },
  path: 'foo',
});
plugin.register({
  apply: { dva: { bar: 1 } },
  path: 'bar',
});

// 执行插件
// 得到 { foo: 1, bar: 1 }
plugin.applyPlugins({
  key: 'dva',
  type: ApplyPluginsType.modify,
  initialValue: {},
  args: {},
  async: false,
});

```

#### **plugin.register** 参数包含:     
- apply   插件文件导出的内容
- path    插件文件路径




#### **plugin.applyPlugins** 参数包含:     
- key，坑位的 key
- type，执行方式类型，详见 [ApplyPluginsType](#applypluginstype)
- initialValue，初始值
- args，参数
- async，是否异步执行且返回 Promise

### ApplyPluginsType
::: tip
主要在插件里面使用，项目代码中一般用不到。
:::

运行时插件执行类型，enum 类型，包含三个属性：
- compose，用于合并执行多个函数，函数可决定前序函数的执行时机
- modify，用于修改值
- event，用于执行事件，前面没有依赖关系


## 路由API

Fes.js 路由基于 [Vue Router 4.0](https://next.router.vuejs.org/introduction.html)，想了解更多的同学可以看看官方文档。


### useRoute
返回当前 `route` 实例，相当于在模板内使用 `$route`。必须在 `setup` 函数内调用。
```js
import { useRoute } from "@fesjs/fes";
export default {
    setup(){
        const route = useRoute()
    }
}
```

### useRouter
返回 `router` 实例，相当于在模板语法中使用 `$router`。必须在 `setup` 函数内调用。
```js
import { useRouter } from "@fesjs/fes";
export default {
    setup(){
        const router = useRouter()
    }
}
```

### onBeforeRouteUpdate
添加导航守卫，在当前路由即将更新时触发。类似于之前的`beforeRouteUpdate`，但是可用于任何组件。卸载组件时，将移除守卫。
```js
import { onBeforeRouteUpdate } from "@fesjs/fes";
export default {
    setup(){
        onBeforeRouteUpdate((to, from, next)=>{
        })
    }
}
```
### onBeforeRouteLeave
添加导航守卫，在当前路由即将离开时触发。类似于之前的`beforeRouteLeave`，但可用于任何组件。卸载组件时，将移除守卫。
```js
import { onBeforeRouteLeave } from "@fesjs/fes";
export default {
    setup(){
        onBeforeRouteLeave((to, from, next)=>{
        })
    }
}
```

### createWebHashHistory
::: tip
在开发插件时可能用上，平时一般用不上
:::
创建一个 hash 历史记录。对于没有主机的 web 应用程序 (例如 file://)，或当配置服务器不能处理任意URL时这非常有用。注意：如果 SEO 对你很重要，你应该使用 `createWebHistory`。

### createWebHistory
::: tip
在开发插件时可能用上，平时一般用不上
:::
创建HTML5历史记录。单页应用程序最常见的历史记录。必须通过 http 服务打开页面地址 。

### createMemoryHistory
::: tip
在开发插件时可能用上，平时一般用不上
:::
创建一个基于内存的历史记录。这个历史记录的主要目的是处理 SSR。它在一个特殊的位置开始，这个位置无处不在。如果用户不在浏览器上下文中，它们可以通过调用 router.push() 或 router.replace() 将该位置替换为启动位置。

### createRouter
创建一个路由器实例，该实例可用于 Vue 应用程序。查看[路由器选项](https://next.router.vuejs.org/api/#routeroptions)，了解可以传递的所有属性的列表。

### RouterLink
使用自定义组件路由器链接来创建链接，而不是使用常规标签。这使得 Vue 路由器无需重新加载页面即可更改 URL、处理 URL 生成及其编码。
```html
<router-link to="/about">Go to About</router-link>
```
可以查看[官方文档](https://next.router.vuejs.org/api/#router-link-props)了解更多 RouterLink 的 Porps。查看[官方文档](https://next.router.vuejs.org/api/#router-link-s-v-slot)了解 RouterLink 的作用域插槽。

### useLink
返回的结果跟 RouterLink 的作用域插槽的属性一致，查看[官方API](https://next.router.vuejs.org/api/#router-link-s-v-slot)了解更多。
```js
import { RouterLink, useLink } from '@fesjs/fes'

export default {
  name: 'AppLink',

  props: {
    // add @ts-ignore if using TypeScript
    ...RouterLink.props,
    inactiveClass: String,
  },

  setup(props) {
    // `props` contains `to` and any other prop that can be passed to <router-link>
    const { navigate, href, route, isActive, isExactActive } = useLink(props)

    // profit!

    return { isExternalLink }
  },
}
```

### RouterView
router-view 将显示当前 URL 的对应的路由组件。你可以把它放在任何地方，以适应你的布局。
```html
<router-view></router-view>
<router-view v-slot="{ Component, route }">
  <component :is="Component" />
</router-view>
```
可以查看[官方文档](https://next.router.vuejs.org/api/#router-view-props)了解更多 RouterView 的 Porps。查看[官方文档](https://next.router.vuejs.org/api/#router-view-s-v-slot)了解 RouterView 的作用域插槽。

### Router Methods
查看[官方文档](https://next.router.vuejs.org/api/#router-methods)了解更多