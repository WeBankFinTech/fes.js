# @fesjs/plugin-layout

## 介绍
为了进一步降低研发成本，我们尝试将布局通过 fes 插件的方式内置，只需通过简单的配置即可拥有布局，包括导航以及侧边栏。从而做到用户无需关心布局。
- 侧边栏菜单数据根据路由中的配置自动生成。
- 布局，提供 `side`、 `top`、`mixin` 三种布局。
- 主题，提供 `light`、`dark` 两种主题。
- 默认实现对路由的 404、403 处理。
- 搭配 [@fesjs/plugin-access](./access.html) 插件使用，可以完成对路由的权限控制。
- 搭配 [@fesjs/plugin-locale](./locale.html) 插件使用，提供切换语言的能力。
- 支持自定义头部区域。
- 菜单支持配置icon
- 菜单标题支持国际化
  
- 可配置页面是否需要 layout。

## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-layout": "^4.0.0"
    },
}
```

## 布局类型
配置参数是 `navigation`, 布局有三种类型 `side`、`mixin` 和 `top`， 默认是 `side`：
```js
export default {
    layout: {
        navigation: 'side'
    }
}
```

### side
<!-- ![side](/side.png) -->
<img :src="$withBase('side.png')" alt="side">

### top
<!-- ![top](/top.png) -->
<img :src="$withBase('top.png')" alt="top">

### mixin
<!-- ![mixin](/mixin.png) -->
<img :src="$withBase('mixin.png')" alt="mixin">

### 页面禁用布局
布局是默认开启的，但是可能某些页面不需要展示布局样式，比如登录页面。我们只需要在页面的`.vue`中添加如下配置：
```vue
<config lang="json">
{
    "layout": false
}
</config>
```
如果只是不想展示`sidebar`，则：
```
<config lang="json">
{
    "layout": {
        "sidebar": false
    }
}
</config>
```
`layout`的可选配置有：

- **sidebar**： 左侧区域，从v4.0.0开始，之前名称叫`side`
  
- **header**： 头部区域，从v4.0.0开始，之前名称叫`top`

- **logo**：logo和标题区域。


## keep-alive
从 4.0.7 开始支持配置路由页面缓存：
```
<config lang="json">
{
    "keep-alive": true
}
</config>
```

## 编译时配置
在 `.fes.js` 中配置：
```js
export default {
    layout: {
        // 标题
        title: "Fes.js",
        // 底部文字
        footer: 'Created by MumbleFE',
        // 主题light
        theme: 'dark'
        // 是否开启 tabs
        multiTabs: false,
        // 布局类型
        navigation: 'side',
        // 是否固定头部
        fixedHeader: false,
        // 是否固定sidebar
        fixedSideBar: true,
        // sidebar的宽度
        sideWidth: 200,
        menus: [{
            name: 'index'
        }, {
            name: 'onepiece'
        }, {
            name: 'store'
        }, {
            name: 'simpleList'
        }],
        menuConfig: {
            defaultExpandAll: false,
            expandedKeys: [],
            accordion: false
        }
    },
```

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

### fixedHeader
- **类型**：`Boolean`
  
- **默认值**：`false`

- **详情**：是否固定头部，不跟随页面滚动。

### fixedSideBar
- **类型**：`Boolean`
  
- **默认值**：`true`

- **详情**：是否固定sidebar，不跟随页面滚动。

### title
- **类型**：`String`
  
- **默认值**：`name` in package.json

- **详情**：产品名，会显示在 Logo 旁边。   

### logo
- **类型**：`String`
  
- **默认值**：默认提供 fes.js 的 Logo

- **详情**：Logo的链接


### multiTabs
- **类型**：`boolean`
  
- **默认值**：`false`

- **详情**：是否开启多页。

### menus
- **类型**：`Array`
  
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
    - 图标使用[fes-design icon](https://fes-design-4gvn317r3b6bfe17-1254145788.ap-shanghai.app.tcloudbase.com/zh/components/icon.html)，在这里使用组件名称。
```js
{
    icon: "AppstoreOutlined"
}
```
    - 图标使用本地或者远程svg图片。
```js
{
    icon: "/wine-outline.svg"
}
```
  
  - **children**：子菜单配置。

### menusConfig
- **类型**：`Object`
  
- **默认值**：`{}`

- **详情**：菜单的配置：
  
  - **defaultExpandAll**：是否默认展开全部菜单。
  
  - **expandedKeys**：配置默认展开的菜单，需要传子项是菜单路径的数组。

  - **accordion**：是否只保持一个子菜单的展开。
  
## 运行时配置
在 `app.js` 中配置：
```js
import UserCenter from '@/components/UserCenter';
export const layout = {
    customHeader: <UserCenter />
};

```

### menus
- **类型**：`(defaultMenus: [] )=> Ref | []`
  
- **详情**：运行时修改菜单，入参是默认菜单配置（.fes.js中的menu配置），需要返回一个`Ref`或者数组。

```js
import { ClusterOutlined } from '@fesjs/fes-design/icon'
export const layout = layoutConfig => ({
    ...layoutConfig,
    customHeader: <UserCenter />,
    menus: (defaultMenuData) => {
        const menusRef = ref(defaultMenuData);
        watch(() => layoutConfig.initialState.userName, () => {
            menusRef.value = [{
                name: 'store',
                icon: <ClusterOutlined />
            }];
        });
        return menusRef;
    }
});

```
`layoutConfig.initialState` 是 `beforeRender.action`执行后创建的应用初始状态数据。         

如果菜单需要根据某些状态动态改变，则返回`Ref`，否则只需要返回数组。

:::tip
在运行时配置菜单中的icon，需要传组件本身，而不是组件的名称。
:::


### header
- **类型**：`String`
  
- **默认值**：`true`

- **详情**：是否显示 header 区域。

### sidebar
- **类型**：`String`
  
- **默认值**：`true`

- **详情**：是否显示 sidebar 区域。

### logo
- **类型**：`String`
  
- **默认值**：`true`

- **详情**：是否显示 logo 区域。

### customHeader
- **类型**：Vue Component
  
- **默认值**：`null`

- **详情**：top的区域部分位置提供组件自定义功能。

### unAccessHandler
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

### noFoundHandler
- **类型**：函数
  
- **默认值**：null

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

### logoUrl
- **类型**：`String`
  
- **默认值**：默认提供 fes.js 的 Logo

- **详情**：Logo的链接。


### 其他运行时配置 (> 4.1.0)
编译时配置的内容同样支持在运行时配置，但是`logo`除外，用`logoUrl`替代。