# @webank/fes-plugin-access



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
        "@webank/fes": "^2.0.0",
        "@webank/fes-plugin-access": "^2.0.0"
    },
}
```

## 配置

### 编译配置
在 `.fes.js` 中配置：
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
在 `app.js` 中配置：
```js
export const access = {
    noAccessHandler({ router, to, from, next}) {
        console.log("被拦截");
        next(false);
    }
};

```
#### noAccessHandler
- **类型**：函数
  
- **默认值**：null

- **详情**：     
  
  当进入某个路由时，如果路由对应的页面不属于可见资源列表，则会暂停进入，调用 `noAccessHandler` 函数。
- **参数**
  - router
  - to
  - from
  - next

## API

### access
```js
import { access } from '@webank/fes-plugin-access'
```

#### access.hasAccess
- **类型**：函数
  
- **详情**: 判断某个资源是否可见。
- **参数**：
  - accessId，资源Id
- **返回值**：Boolean

#### access.hasLoading
- **类型**：函数
  
- **详情**：可以用异步数据来设置权限，`hasLoading` 用来判断异步数据是否已经加载完毕。
- **参数**：null
- **返回值**：Boolean
```js
import { access } from '@webank/fes';
console.log(access.hasLoading())
```


#### access.setRole
- **类型**：函数
  
- **详情**：设置当前的角色。
- **参数**：
  - roleId，角色Id，有两种类型：
    - String，对应着 `roles` 配置对象中的 `key`。
    - Promise，Promise resolve 的结果应对应着 `roles` 配置对象中的 `key`。
```js
import { access } from '@webank/fes';
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
import { access } from '@webank/fes';
access.setAccess(['/a', '/b', '/c'])
```

#### access.addAccess
- **类型**：函数
  
- **详情**：添加某个资源Id为可见。
- **参数**：
  - accessId，资源Id

```js
import { access } from '@webank/fes';
access.addAccess("aaa");
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
import { useAccess } from '@webank/fes';
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