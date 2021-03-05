# @fesjs/plugin-access



## 介绍
对于前端应用来说，权限就是页面、页面元素是否可见。

### 资源
Fes.js 把页面、页面元素统一叫做资源，每个资源都有 `accessId`：
- 页面的 `accessId` 默认是页面的路由 `path` 。比如页面 `pages/a.vue` 的路由 `path` 是 `/a`。当页面访问 `/a` 时会渲染当前页面，`/a` 也就是页面的 `accessId`。
  
- 页面元素的 `accessId` 没有默认值，我们可以自定义。
```vue
<template>
    <access :id="accessId"> accessOnepicess1 <input /> </access>
    <div v-access="accessId"> accessOnepicess2 </div>
</template>
<script>
export default {
    setup(){
        return {
            accessId: 'accessOnepicess'
        }
    }
}
</script>
```

### 角色
Fes.js 用角色定义一组资源。当访问 Fes.js 应用时，使用插件提供的 API 设置用户的角色，角色对应的资源才可见，非角色对应的资源不可见。


当然有时候业务比较复杂，角色不能在前端应用中预先定义，而是用户自定义的，储存在数据库中。不要怕！插件也提供粒度更细的 API 来控制当前用户能访问的资源。

## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-access": "^2.0.0"
    },
}
```

## 配置

### 编译时配置
在执行 `fes dev` 或者 `fes build` 时，通过此配置生成运行时的代码，在配置文件`.fes.js` 中配置：
```js
export default {
    access: {
        roles: {
            admin: ["/", "/onepiece", '/store']
        }
    }
}
```

#### roles
- **类型**：对象
  
- **默认值**：`{}`

- **详情**：     
  
  角色预定义列表。`key` 是角色 Id ，`value`是角色 Id 对应的资源列表。


### 运行时配置
在 `app.js` 中配置

#### unAccessHandler
- **类型**：`Function`
  
- **默认值**：`null`

- **详情**：     
  
  当进入某个路由时，如果路由对应的页面不属于可见资源列表，则会暂停进入，调用 `unAccessHandler` 函数。
- **参数**
  - router：createRouter 创建的路由实例
  - to： 准备进入的路由
  - from：离开的路由
  - next： [next函数](https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%8F%AF%E9%80%89%E7%9A%84%E7%AC%AC%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0-next)

比如：
```js
export const access = {
    unAccessHandler({ to, next }) {
        const accesssIds = accessApi.getAccess();
        if (to.path === '/404') {
            accessApi.setAccess(accesssIds.concat(['/404']));
            return next('/404');
        }
        if (!accesssIds.includes('/403')) {
            accessApi.setAccess(accesssIds.concat(['/403']));
        }
        next('/403');
    }
};

```

#### noFoundHandler
- **类型**：`Function`
  
- **默认值**：`null`

- **详情**：     
  
  当进入某个路由时，如果路由对应的页面不存在，则会调用 `noFoundHandler` 函数。
- **参数**
  - router：createRouter 创建的路由实例
  - to： 准备进入的路由
  - from：离开的路由
  - next： [next函数](https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%8F%AF%E9%80%89%E7%9A%84%E7%AC%AC%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0-next)

比如：
```js
export const access = {
    noFoundHandler({ next }) {
        const accesssIds = accessApi.getAccess();
        if (!accesssIds.includes('/404')) {
            accessApi.setAccess(accesssIds.concat(['/404']));
        }
        next('/404');
    }
};

```

## API

### access
插件 API 通过 `@fesjs/fes` 导出：
```js
import { access } from '@fesjs/fes'
```

#### access.hasAccess
- **类型**：函数
  
- **详情**: 判断某个资源是否可见。
- **参数**：
  - accessId，资源Id
- **返回值**：Boolean

#### access.isDataReady
- **类型**：函数
  
- **详情**：可以用异步数据来设置权限，`isDataReady` 用来判断异步数据是否已经加载完毕。
- **参数**：null
- **返回值**：Boolean
```js
import { access } from '@fesjs/fes';
console.log(access.isDataReady())
```


#### access.setRole
- **类型**：函数
  
- **详情**：设置当前的角色。
- **参数**：
  - roleId，角色Id，有两种类型：
    - String，对应着 `roles` 配置对象中的 `key`。
    - Promise，Promise resolve 的结果应对应着 `roles` 配置对象中的 `key`。
```js
import { access } from '@fesjs/fes';
access.setRole(['admin'])
```

#### access.setAccess
- **类型**：函数
  
- **详情**：设置当前的角色。
- **参数**：
  - accessIds，资源Id数组，有两种类型：
    - Array，数组项对应着 `roles` 配置对象中的 `key`。
    - Promise，Promise resolve 的结果应该是`Array<accessId>`。
```js
import { access } from '@fesjs/fes';
access.setAccess(['/a', '/b', '/c'])
```

#### access.getAccess
- **类型**：函数
  
- **详情**：返回当前可见的资源列表。
- **参数**：null

```js
import { access } from '@fesjs/fes';
access.getAccess();
```

### useAccess
- **类型**：[composition]((https://v3.cn.vuejs.org/guide/composition-api-introduction.html)) 函数
  
- **详情**：判断某个资源是否可见。
- **参数**：
  - accessId，资源Id
- **返回值**：`ref`
  
```vue
<template>
    <div v-if="accessOnepicess">accessOnepicess</div>
</template>
<script>
import { useAccess } from '@fesjs/fes';
export default {
    setup(){
        const accessOnepicess = useAccess('/onepiece1');
        return {
            accessOnepicess
        }
    }
}
</script>
```
### v-access
在指令 `v-access` 中传入 `accessId`，则当 `accessId` 拥有权限时渲染DOM，当没有权限时隐藏此DOM。
```vue
<template>
    <div v-access="accessId"> accessOnepicess2 </div>
</template>
<script>
export default {
    setup(){
        return {
            accessId: 'accessOnepicess'
        }
    }
}
</script>
```

### 组件 Access
组件 `Access` 中传入 `accessId`，则当 `accessId` 拥有权限时渲染此组件，当没有权限时隐藏此组件。
```vue
<template>
    <access :id="accessId"> accessOnepicess1 <input /> </access>
</template>
<script>
export default {
    setup(){
        return {
            accessId: 'accessOnepicess'
        }
    }
}
</script>
```