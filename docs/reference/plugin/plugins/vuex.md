# @fesjs/plugin-vuex

::: tip
vue3+ 官方推荐使用[pinia](./pinia)，不在推荐使用 vuex。
:::

## 介绍

集成 vuex 插件

增强 vuex，导出所有的`mutations`、`actions`和`getter`的事件类型，编辑器提示

约定模式，module 和 plugin 定义放在 stores 目录下，文件名包含 plugin 被解析为插件，无需额外配置，定义即可用。

```
└── src
    ├── pages
    │    └── index.vue
    └── stores
    │    └── foo
    │    │    └── bar.js
    │    ├── counter.js
    │    ├── plugin-logger.js
    │    ├── user.js
    └── app.js
```

::: tip
为了防止`fesjs`与`vuex`的 export 冲突，fesjs 不提供导出 vuex 的任何 api。你可以直接使用 vuex 的 api

```js
import { useStore } from 'vuex';
```

:::

## 启用方式

在 `package.json` 中引入依赖：

```json
{
    "dependencies": {
        "@fesjs/fes": "^3.0.0",
        "@fesjs/plugin-vuex": "^3.0.0"
    }
}
```

## 配置

在 `.fes.js` 中配置：

```js
export default {
    vuex: {
        strict: true, // 开启严格模式
    },
};
```

## 场景使用

先定义在 stores 下定义 user 模块，包含嵌套模块

stores/user.js

```js
export default {
    namespaced: true,
    state: () => ({
        name: 'aring',
        age: 20,
    }),
    actions: {
        login() {
            return new Promise((reslove) => {
                setTimeout(() => {
                    console.log('login');
                    reslove('OK');
                }, 1000);
            });
        },
    },
    modules: {
        address: {
            state: () => ({
                province: '广东省',
                city: '深圳市',
                zone: '南山区',
            }),
            getters: {
                address(state) {
                    return state.province + state.city + state.zone;
                },
            },
        },
    },
};
```

stores/foo/bar.js

```js
export default {
    namespaced: true,
    state: () => ({
        count: 0,
    }),
    mutations: {
        increment(state) {
            state.count++;
        },
    },
    getters: {
        doubleCount(state) {
            return state.count * 2;
        },
    },
    actions: {
        asyncIncrement({ commit }) {
            setTimeout(() => {
                commit('increment');
            }, 2000);
        },
    },
};
```

::: tip
导出的`mutations`、`actions`和`getter`的事件类型，将会按文件命名；

如`ACTION_TYPES.user.login`指向 user 模块中 actions 的 login 方法

如`GETTER_TYPES.user.address`指向 user 模块中嵌套的 address getter

如`MUTATION_TYPES.fooBar.increment`指向 foo/bar 模块中 mutations 的 increment 方法
:::

在 vue 文件中使用 store

```vue
<template>
    <div>
        <h4>Vuex</h4>
        <div><button :disabled="disabled" @click="login">async login</button></div>
        <div>
            <button @click="fooBarIncrement">foo/bar：{{ fooBarDoubleCount }}</button>
        </div>
        <div>{{ address }}</div>
    </div>
</template>
<config>
{
    "name": "store",
    "title": "vuex测试"
}
</config>
<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { MUTATION_TYPES, GETTER_TYPES, ACTION_TYPES } from '@fesjs/fes';

export default {
    setup() {
        const store = useStore();
        console.log('store==>', store);
        const disabled = ref(false);
        // 可以利用导出的事件类型，不再通过字符传入（store.getters['user/address']）
        return {
            address: computed(() => store.getters[GETTER_TYPES.user.address]),
            disabled,
            login: () => {
                disabled.value = true;
                store.dispatch(ACTION_TYPES.user.login).then((res) => {
                    window.alert(res);
                    disabled.value = false;
                });
            },
            fooBarIncrement: () => store.commit(MUTATION_TYPES.fooBar.increment), // foo/bar目录会解析成驼峰fooBar
            fooBarDoubleCount: computed(() => store.getters[GETTER_TYPES.fooBar.doubleCount]),
        };
    },
};
</script>
```

::: tip
由于该插件注册在 onAppCreated 中，如果在 onAppCreated 及之前使用 useStore 时，获取不到 vuex 实例

`fesjs`导出了 vuex 实例`store`，如在 app.js 文件中

```js
import { store, GETTER_TYPES } from '@fesjs/fes';
console.log(store.getters[GETTER_TYPES.user.address]);
```

:::

## vuex 插件

stores 文件夹下的文件名包含 plugin 被解析为插件，vuex 插件写法参考[官方文档](https://next.vuex.vuejs.org/guide/plugins.html)

## API

### store

-   类型 `Object`
-   vuex 实例

### MUTATION_TYPES

-   类型 `Object`
-   mutation 的所有事件类型

### GETTER_TYPES

-   类型 `Object`
-   getter 的所有方法名

### ACTION_TYPES

-   类型 `Object`
-   action 的所有事件类型
