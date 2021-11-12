# 运行时配置

运行时配置和配置的区别是他跑在浏览器端，基于此，我们可以在这里写函数、`import` 浏览器端依赖等等，注意不要引入 `node` 依赖。

## 配置方式
约定 `src/app.js` 为运行时配置。运行时配置的类型有三种，具体查看[applypluginstype](../reference/api/#applypluginstype)。

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
                        userName: 'harrywan'
                    });
                }, 1000);
            });
        }
    }
};
```

### patchRoutes

patchRoutes({routes })


修改路由。

比如在最前面添加一个 /foo 路由：
```
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

### modifyClientRenderOpts

modifyClientRenderOpts(lastOpts)

修改 `clientRender` 参数。参数是一个对象：
- routes，路由配置信息
- rootElement， 渲染的根节点，默认是 `#app`，可通过配置 `mountElementId` 修改。
- initialState， 初始化数据，`beforeRender` 运行得到的数据。

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

- LastRootContainer，上一个插件修改后的结果。
- args，包含：
    - routes，全量路由配置
    - plugin，运行时插件机制

比如在可以包一层DIV：
```js
export function rootContainer(container) {
    return () => {
        return (
            <div>
                <RouterView></RouterView>
            </div>
        )
  }
}
```

### onAppCreated

onAppCreated({app})

创建 app 实例后触发。

比如用于安装 Vue 插件：
```js
import { createRouter } from "vue-router";

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

生成router时触发。

比如用于收集切换路由的记录：
```js
export function onRouterCreated({ router }) {
    router.afterEach((to, from) => {
        console.log(to)
    });
}
```

## 更多配置项
Fes.js 允许插件注册运行时配置，如果你使用插件，肯定会在插件里找到更多运行时的配置项。