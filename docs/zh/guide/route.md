# 路由

像 Vue 、React 这类框架是用组件化搭建页面，路由解决的是路径到组件的匹配问题。Fes.js 基于 `Vue Router` 实现的路由，想了解更多的同学可以看看[官方文档](https://next.router.vuejs.org/)。

## 路由配置

在配置文件 `.fes.js`中通过 `router` 进行配置。
```js
export default {
    router: {
        routes: [],
        mode: 'hash'
    }
}
```

### routes
`routes` 是配置添加到路由的初始路由列表，格式为路由信息的数组。具体使用参考 [Vue Router 文档](https://next.router.vuejs.org/zh/guide/) 中关于路由配置、路由匹配相关内容。


### mode 
创建历史记录的类型：
- **h5**，对应 [createWebHistory](https://next.router.vuejs.org/zh/api/#createwebhistory)
- **hash**，对应 [createWebHashHistory](https://next.router.vuejs.org/zh/api/#createWebHashHistory)
- **memory**，对应 [createMemoryHistory](https://next.router.vuejs.org/zh/api/#createWebHashHistory)

## 约定式路由
约定式路由也叫文件路由，就是不需要手写配置，文件系统即路由，通过目录和文件及其命名分析出路由配置。      

### 约定规范
比如以下文件结构：
```
pages
├── index.vue         # 根路由页面 路径为 /
├── *.vue             # 模糊匹配 路径为 *
├── a.vue             # 路径 /a
├── b                 # 文件夹b
│   ├── index.vue     # 路径 /b
│   ├── @id.vue       # 动态路由 /b/:id
│   ├── c.vue         # 路径 /b/c
│   └── layout.vue    # /b 路径下所有页面公共的布局组件
└── layout.vue        # 根路由下所有页面共用的布局组件
```
编译后会得到以下路由配置：
```js
[
    {
        "path": "/",
        "component": require('@/pages/layout').default,
        "count": 5,
        "children": [
            {
                "path": "/a",
                "component": require('@/pages/a').default,
                "name": "a",
                "meta": {},
                "count": 7
            },
            {
                "path": "/b",
                "component": require('@/pages/b/layout').default,
                "count": 7,
                "children": [
                    {
                        "path": "/b/c",
                        "component": require('@/pages/b/c').default,
                        "name": "b_c",
                        "meta": {},
                        "count": 14
                    },
                    {
                        "path": "/b/:id",
                        "component": require('@/pages/b/@id').default,
                        "name": "b__id",
                        "meta": {},
                        "count": 13
                    },
                    {
                        "path": "/b",
                        "component": require('@/pages/b/index').default,
                        "name": "b_index",
                        "meta": {},
                        "count": 7
                    }
                ]
            },
            {
                "path": "/",
                "component": require('@/pages/index').default,
                "name": "index",
                "meta": {},
                "count": 5
            },
            {
                "path": "/:pathMatch(.*)",
                "component": require('@/pages/*').default,
                "name": "FUZZYMATCH",
                "meta": {},
                "count": 3
            }
        ]
    }
]
```

**需要注意的是，满足以下任意规则的文件不会被注册为路由**：
- 不是 `.vue` 文件
- `components` 目录中的文件


### 动态路由
Fes.js 里约定以 `@` 开头的文件或文件夹映射为动态路由。
比如：

- `src/pages/users/@id.vue` 会成为 `/users/:id`
- `src/pages/users/@id/settings.vue` 会成为 `/users/:id/settings`

### 嵌套路由
Fes.js 里约定目录下有 `layout.vue` 时会生成嵌套路由，以 `layout.vue` 为该目录的公共父组件，`layout.vue` 中必须实现 `RouterView`

比如以下目录结构：
```
pages
└── users
    ├── layout.vue
    ├── index.vue
    └── list.vue
```
会生成路由：
```js
[
    { 
        path: '/users', component: require('@/pages/users/layout').default,
        children: [
            { path: '/users', component: require('@/pages/users/index').default },
            { path: '/users/list', component: require('@/pages/users/list').default },
        ]
    }
]
```

### 模糊匹配
Fes.js 下约定文件名为 `*` 的路由是模糊匹配路由，可以用此特性实现 [404 路由](https://next.router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1)。     

比如以下目录结构：

```
pages
├── index.vue         # 根路由页面 路径为 /
└── *.vue             # 模糊匹配 路径为 *
```
会生成路由：
```js
[
    { 
        path: '/', component: require('@/pages/index').default, count: 5
    },
    {
        path: '/:pathMatch(.*)', component: require('@/pages/**').default, count: 3
    }
]
```
这样，如果访问 `/foo`，`/` 不能匹配，会 fallback 到 `*` 路由，通过 `src/pages/*.vue` 进行渲染。

### 扩展路由元信息
我们在定义路由时可以配置`meta`字段，用来记录一些跟路由相关的信息：
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```
在 Fes.js 里约定在 `.vue` 文件中的 `config` 为 `meta` 配置。如果 `pages/a.vue` 中有如下配置：
```vue
<config>
{
    "name": "store",
    "title": "vuex测试"
}
</config>
```
则编译后的路由配置为：
```js{5-8}
[
    { 
        path: '/a', 
        component: require('@/pages/a').default, 
        meta: {
            "name": "store",
            "title": "vuex测试"
        }
    },
]
```

### 智能路由
可以看到，编译后路由都会有 `count` 属性，这是我们根据精准匹配优先算法原则设计出路由排名算法，对匹配到的路由打分：
- 路由的路径每个子项得到4分
- 子项为静态细分(`/list`)再加3分
- 子项为动态细分（`/:orderId`）再加2分
- 根段(`/`)再1分
- 通配符(`*`)匹配到的减去1分

当我们跳转路由时，如果 URL 匹配到多个路由，则选择分数最高的路由。

## 路由跳转
想学习更多，可以查看 [Vue Router 官方文档](https://next.router.vuejs.org/zh/guide/essentials/navigation.html#%E6%9B%BF%E6%8D%A2%E5%BD%93%E5%89%8D%E4%BD%8D%E7%BD%AE)。

### 声明式
```vue
<template>
    <router-link to="/home">Home</router-link>
</template>
```

### 命令式
页面跳转 API 由 `router` 实例提供，查看 [Vue Rouer 文档](https://next.router.vuejs.org/zh/api/#router-%E6%96%B9%E6%B3%95)了解更多。

```js
import { useRouter } from '@webank/fes';

export default {
    setup(){
        const router = useRouter();
        // 这三种形式是等价的
        router.push('/users/posva#bio')
        router.push({ path: '/users/posva', hash: '#bio' })
        router.push({ name: 'users', params: { username: 'posva' }, hash: '#bio' })
        // 只改变 hash
        router.push({ hash: '#bio' })
        // 只改变 query
        router.push({ query: { page: '2' } })
        // 只改变 param
        router.push({ params: { username: 'jolyne' } })

        // 跳转到上一个路由
        router.goBack();

        // 跳转到前一个历史记录
        router.go(1);

        // 替换历史堆栈中的记录
        router.replace('/new');
    }
}

```