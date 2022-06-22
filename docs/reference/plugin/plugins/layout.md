# @fesjs/plugin-layout

## 介绍
为了进一步降低研发成本，我们将布局利用 `fes.js` 插件的方式内置，只需通过简单的配置即可拥有布局，包括导航以及侧边栏。从而做到用户无需关心布局。
- 侧边栏菜单数据根据路由中的配置自动生成。
- 布局，提供 `side`、 `top`、`mixin`、`left-right` 四种布局。
- 主题，提供 `light`、`dark` 两种主题。
- 默认实现对路由的 404、403 处理。
- 搭配 [@fesjs/plugin-access](./access.html) 插件使用，可以完成对路由的权限控制。
- 搭配 [@fesjs/plugin-locale](./locale.html) 插件使用，提供切换语言的能力。
- 支持自定义头部或者侧边栏区域。
- 菜单支持配置icon。
- 菜单标题支持国际化。
  
- 可配置页面是否需要 layout。

## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^3.0.0",
        "@fesjs/plugin-layout": "^5.0.0"
    },
}
```

## 布局类型
配置参数是 `navigation`, 布局有三种类型 `side`、`mixin` 、`top` 和 `left-right`， 默认是 `side`。

### side
<!-- ![side](/side.png) -->
<img :src="$withBase('side.png')" alt="side">

### top
<!-- ![top](/top.png) -->
<img :src="$withBase('top.png')" alt="top">

### mixin
<!-- ![mixin](/mixin.png) -->
<img :src="$withBase('mixin.png')" alt="mixin">

### left-right
<!-- ![mixin](/mixin.png) -->
<img :src="$withBase('left-right.png')" alt="left-right">

### 页面个性化

可以为页面单独设置布局类型：
```
<config lang="json">
{
    "layout": {
        "navigation": 'top'
    }
}
</config>
```
当设置为 `null` 时，页面不使用布局。


## 页面缓存

支持配置页面缓存，通过[定义路由元信息](../../../guide/route.html#扩展路由元信息)开启缓存：
```js
import { defineRouteMete } from '@fesjs/fes';

defineRouteMeta({
    "keep-alive": true
})
```

### 处理嵌套路由
Fes.js 里约定目录下有 `layout.vue` 时会生成嵌套路由，以 `layout.vue` 为该目录的公共父组件，layout.vue 中必须实现 `<RouterView/>`。如果嵌套路由下的页面设置了 `keep-alive`，则需要用 `<Page/>` 替换 `<RouterView/>`，`<Page/>`实现了页面缓存。

```vue
<template>
    <Page></Page>
</template>
<script>
import { Page } from '@fesjs/fes'
export default {
    components: {
        Page
    }
}
</script>
```

## 配置

#### 编译时配置方式

在 `.fes.js` 中配置：
```js
export default {
    layout: {
        // 标题
        title: "Fes.js",
        // 底部文字
        footer: 'Created by MumbleFE',
        // 主题light
        theme: 'dark',
        menus: [{
            name: 'index'
        }, {
            name: 'onepiece'
        }, {
            name: 'store'
        }, {
            name: 'simpleList'
        }],

    },
```

#### 运行时配置方式

在 `app.js` 中配置：
```js
import UserCenter from '@/components/UserCenter';
export const layout = {
    renderHeader: ()=> <UserCenter />,
    menus: [{
        name: 'index'
    }]
};

```
在`fes.js`中，运行时配置有定义对象和函数两种方式，当使用函数配置`layout`时，`layoutConfig`是编译时配置结果，`initialState`是 `beforeRender.action`执行后创建的应用初始状态数据。         
。
```js
export const layout = (layoutConfig, { initialState }) => ({
    renderHeader: () => <UserCenter />,
    menus: () => {
        const menusRef = ref(layoutConfig.menus);
        watch(
            () => initialState.userName,
            () => {
                menusRef.value = [
                    {
                        name: 'store',
                    },
                ];
            },
        );
        return menusRef;
    },
});
```

最终配置结果是运行时配置跟编译时配置合并的结果，运行时配置优先于编译时配置。

实际上运行配置能做的事情更多，推荐用运行时配置方式。



### footer
- **类型**：`String`
  
- **默认值**：`null`

- **详情**：页面底部的文字。

### theme
- **类型**：`String`
  
- **默认值**：`dark`

- **详情**：主题，可选有 `dark`、`light`

### navigation
- **类型**：`String`
  
- **默认值**：`side`

- **详情**：页面布局类型，可选有 `side`、 `top`、 `mixin` 

### isFixedHeader
- **类型**：`Boolean`
  
- **默认值**：`false`

- **详情**：是否固定头部，不跟随页面滚动。

### isFixedSidebar
- **类型**：`Boolean`
  
- **默认值**：`true`

- **详情**：是否固定sidebar，不跟随页面滚动。

### title
- **类型**：`String`
  
- **默认值**：默认为 [编译时配置title](../../../reference/config/#title)

- **详情**：产品名。   

### logo
- **类型**：`String`
  
- **默认值**：默认提供 `fes.js` 的 Logo

- **详情**：Logo的链接


### multiTabs
- **类型**：`boolean`
  
- **默认值**：`false`

- **详情**：是否开启多页。

### menus
- **类型**：`[] | ()=> Ref<[]>`
  
- **默认值**：`[]`

- **详情**：菜单配置，子项具体配置如下：
  
  - **name**：菜单的名称。通过匹配 `name` 和路由元信息 [meta](../../../guide/route.md#扩展路由元信息) 中的 `name`，把菜单和路由关联起来，然后使用路由元信息补充菜单配置，比如 `title`、`path` 等。
  
  - **path**：菜单的路径，可配置第三方地址。

  - **match**：额外匹配的路径，当前路由命中匹配规则时，此菜单高亮。 (v4.0.0+）

```
{
    path: '/product',
    match: ['/product/*', '/product/create']
}
```
  
  - **title**：菜单的标题，如果同时使用[国际化插件](./locale.md)，而且`title`的值以`$`开头，则使用`$`后面的内容去匹配语言设置。

  - **icon**: 菜单的图标，只有一级标题展示图标。

    - 图标使用[fes-design icon](https://fes-design-4gvn317r3b6bfe17-1254145788.ap-shanghai.app.tcloudbase.com/zh/components/icon.html)，编译时配置使用组件名称，我们会自动引入组件。

    - 图标使用本地或者远程svg图片。

```js
{
    icon: "/wine-outline.svg"
}
```
  
  - **children**：子菜单配置。

:::tip
函数类型仅在运行时可用，可以实现动态变更菜单。
:::



### menuProps
- **类型**：`Object`
  
- **默认值**：`{}`

- **详情**：菜单的配置：
  
  - **defaultExpandAll**：是否默认展开全部菜单。
  
  - **expandedKeys**：配置默认展开的菜单，需要传子项是菜单路径的数组。

  - **accordion**：是否只保持一个子菜单的展开。
  

### sideWidth
- **类型**：`Number`
  
- **默认值**：`200`

- **详情**：sidebar的宽度
  

### renderCustom
- **类型**： `()=> VNodes`
  
- **默认值**：`null`

- **详情**： 自定义区域内容，仅运行时。


### unAccessHandler
- **类型**：`({ to, from, next})=> void`
  
- **默认值**：`null`

- **详情**：仅运行时，当进入某个路由时，如果路由对应的页面不属于可见资源列表，则会暂停进入，调用 `unAccessHandler` 函数。
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

### noFoundHandler
- **类型**：`({ to, from, next})=> void`
  
- **默认值**：`null`

- **详情**：仅运行时，当进入某个路由时，如果路由对应的页面不存在，则会调用 `noFoundHandler` 函数。
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


### 4.x 升级到 5.x

1. 个性化 layout 配置改为使用传入 navigation
2. renderHeader 改为 renderCustom
3. fixedHeader 改为 isFixedHeader
4. menusConfig 改为 menuProps
5. fixedSideBar 改为 isFixedSidebar
6. 去掉运行时 logo、header、sidebar 三个区域显示配置，请改为使用 navigation: left-right