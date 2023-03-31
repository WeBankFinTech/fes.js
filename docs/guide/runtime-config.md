# 运行时配置

Fes.js 约定 `src/app.js` 为运行时配置文件。运行时配置和配置的区别是他跑在浏览器端，因此我们可以在这里写函数、引入浏览器端依赖项等等，注意不要引入 node 端依赖项。

## 运行时为啥需要配置？

Fes.js 框架跟传统开发模式不一样。传统开发模式中用户编写 entry 文件，而 Fes.js 中 entry 文件由框架生成，用户就不必要编写胶水代码。内置插件和其他插件提供的一些运行时功能提供用户或者其他插件自定义。

例如：

plugin-access 插件定义运行时配置项：

```js
api.addRuntimePluginKey(() => 'access');
```

plugin-access 插件读取配置项：

```js
const runtimeConfig = plugin.applyPlugins({
    key: 'access',
    type: ApplyPluginsType.modify,
    initialValue: {},
});
```

而用户则只需要配置：

```js
// app.js
import { defineRuntimeConfig } from '@fesjs/fes';

export default defineRuntimeConfig({
    access: memo => ({
        ...memo
        unAccessHandler({
            router, to, from, next
        }) {
            // 处理逻辑
        },
        noFoundHandler({
            router, to, from, next
        }) {
            // 处理逻辑
        },
    }),
});
```

## 配置智能提示

配置可以单独导出，也可以通过 `defineRuntimeConfig` 工具函数获取类型提示。

方式一（推荐，有类型提示）：

```js
// app.js
import { defineRuntimeConfig } from '@fesjs/fes';

export default defineRuntimeConfig({
    access: memo => ({
        ...memo
        unAccessHandler({
            router, to, from, next
        }) {
            // 处理逻辑
        },
        noFoundHandler({
            router, to, from, next
        }) {
            // 处理逻辑
        },
    }),
    // ...其他配置项
});
```

方式二：

```js
// app.js
export const access = memo => ({
    ...memo
    unAccessHandler({
        router, to, from, next
    }) {
        // 处理逻辑
    },
    noFoundHandler({
        router, to, from, next
    }) {
        // 处理逻辑
    },
});
```

## 配置项

### beforeRender

beforeRender(lastOpts)

在渲染之前执行，执行`action`过程中显示 `loading` 配置的组件，执行结果作为参数 `initialState` 传给 `modifyClientRenderOpts`。

示例：

```js
// app.js
import { access } from '@fesjs/fes';
import PageLoading from '@/components/PageLoading';
import UserCenter from '@/components/UserCenter';

export function beforeRender(lastOpts) {
    return {
        ...lastOpts,
        loading: <PageLoading />,
        action() {
            const { setRole } = access;
            return new Promise((resolve) => {
                setTimeout(() => {
                    setRole('admin');
                    resolve({
                        userName: 'harrywan',
                    });
                }, 1000);
            });
        },
    };
}
```

### patchRoutes 

patchRoutes({routes })

:::warning
准备删除此API，推荐使用`modifyRoute`
:::

修改路由。

比如在最前面添加一个 /foo 路由：

```js
export function patchRoutes({ routes }) {
    routes.unshift({
        path: '/foo',
        component: require('@/extraRoutes/foo').default,
    });
}
```

:::tip
直接修改 `routes`, 不需要返回
:::


### modifyRoute
modifyRoute({base, createHistory, routes})

修改路由配置信息。

比如在最前面添加一个 /foo 路由：

```js
export function modifyRoute(memo) {
    return {
        ...memo,
        routes: [
            {
                path: '/foo',
                component: require('@/extraRoutes/foo').default,
            }, 
            ...memo.routes
        ]
    }
}
```


比如修改 base:
```js
export function modifyRoute(memo) {
    return {
        ...memo,
        base: window.location.href
    }
}
```

比如改为使用createMemoryHistory：
```js
export function modifyRoute(memo) {
    return {
        ...memo,
        createHistory: createMemoryHistory
    }
}
```


### modifyClientRenderOpts

modifyClientRenderOpts(lastOpts)

修改 `clientRender` 参数。参数是一个对象：

-   routes，路由配置信息
-   rootElement， 渲染的根节点，默认是 `#app`，可通过配置 `mountElementId` 修改。
-   initialState， 初始化数据，`beforeRender` 运行得到的数据。

比如在微前端里动态修改渲染根节点：

```js
let isSubApp = false;
export function modifyClientRenderOpts(lastOpts) {
    return {
        ...lastOpts,
        rootElement: isSubApp ? 'sub-root' : lastOpts.rootElement,
    };
}
```

### rootContainer

rootContainer(LastRootContainer, args)

修改交给 Vue 渲染时的根组件，默认是 `<RouterView></RouterView>`。

-   LastRootContainer，上一个插件修改后的结果。
-   args，包含：
    -   routes，全量路由配置
    -   plugin，运行时插件机制

比如在可以包一层 DIV：

```js
export function rootContainer(container) {
    return () => {
        return (
            <div>
                <RouterView></RouterView>
            </div>
        );
    };
}
```

### onAppCreated

onAppCreated({app})

创建 app 实例后触发。

比如用于安装 Vue 插件：

```js
import { createRouter } from 'vue-router';

export function onAppCreated({ app }) {
    const router = createRouter();
    app.use(router);
}
```

### render

render(oldRender: Function)

覆写 render。

比如用于渲染之前做权限校验。

### onRouterCreated

onRouterCreated({router})

生成 router 时触发。

比如用于收集切换路由的记录：

```js
export function onRouterCreated({ router }) {
    router.afterEach((to, from) => {
        console.log(to);
    });
}
```

## 更多配置项

Fes.js 允许插件注册运行时配置，如果你使用插件，肯定会在插件里找到更多运行时的配置项。
