# @fesjs/plugin-pinia

## 介绍

集成 [pinia](https://pinia.vuejs.org/) ，提供状态管理的能力，封装一些胶水代码，可以直接定义 store 使用。

为了防止 `Fes.js` 与 `pinia` 提供的 API 冲突，`Fes.js`不提供任何 `pinia` 的 API，相关 API 直接从 `pinia` 导出：

```js
import { defineStore } from 'pinia';
```

约定 `plugin` 定义放在 `stores` 目录下，文件名包含 plugin 被解析为插件，无需额外配置，定义即可用。

```
└── src
    ├── pages
    │    └── index.vue
    └── stores
    │    ├── plugin-logger.js
    │    ├── user.js
    └── app.js
```

## 启用方式

在 `package.json` 中引入依赖：

```json
{
    "dependencies": {
        "@fesjs/fes": "^3.0.0",
        "@fesjs/plugin-pinia": "^3.0.0",
        "pinia": "^2.0.11"
    }
}
```

## API

### pinia

`createPinia`执行后创建的实例。

```js
import { pinia } from '@fesjs/fes';
```

## 使用

### 定义 store

我们在 `src/store/main.js`中：

```js
import { defineStore } from 'pinia';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('main', {
    // other options...
});
```

### setup

```js
import { useStore } from '@/store/main';
export default {
    setup() {
        const store = useStore();
    },
};
```

### 非 setup

比如在 app.js 中:

```js
import { pinia } from '@fesjs/fes';

export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = accessApi;
        return new Promise((resolve) => {
            setTimeout(() => {
                const store = useStore(pinia);
                store.$patch({
                    userName: '李雷',
                    role: 'admin',
                });
                setRole('admin');
            }, 1000);
        });
    },
};
```
