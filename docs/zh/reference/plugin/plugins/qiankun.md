# @fesjs/plugin-qiankun

Fes.js plugin for [qiankun](https://qiankun.umijs.org/)，参考[@umijs/plugin-qiankun](https://umijs.org/zh-CN/plugins/plugin-qiankun#MicroApp) 实现，喜欢 React 的同学推荐直接用 Umi。

## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-qiankun": "^2.0.0"
    },
}
```

## 介绍
有一种痛叫接手老项目，技术栈老旧，内容多，还要继续维护~

可能目前迁移、升级老项目最好的解决方案就是微前端。`plugin-qiankun` 是基于 `qiankun` 实现的 Fes.js 微前端解决方案。

## 主应用配置

### 第一步：注册子应用
```js
export default {
    qiankun: {
        main: {
            // 注册子应用信息
            apps: [
                {
                    name: 'app1', // 唯一 id
                    entry: '//localhost:8001', // html entry
                    props: {}  // 传递给子应用的数据
                },
                {
                    name: 'app2', // 唯一 id
                    entry: '//localhost:8002', // html entry
                },
            ],
        },
    },
};
```

### 第二步：装载子应用

#### 使用路由绑定的方式
:::warning
主应用和子应用需要自行适配路由路径！！！待完善...
:::

假设我们的系统之前有这样的一些路由：
```js
export default {
    router: {
        routes: [{
            "path": "/",
            "component": () => import('@/src/.fes/plugin-layout/index.js'),
            "children": [
                {
                    "path": "/onepiece",
                    "component": () => import('@/pages/onepiece'),
                    "name": "onepiece",
                    "meta": {
                        "name": "onepiece",
                        "title": "onepiece"
                    }
                }
            ]
        }]
    }
}
```
我们现在想在 `/son` 加载子应用 `app1`，只需要增加这样一些配置即可：
```js {16-23}
export default {
    router: {
        routes: [{
            "path": "/",
            "component": () => import('@/src/.fes/plugin-layout/index.js'),
            "children": [
                {
                    "path": "/onepiece",
                    "component": () => import('@/pages/onepiece'),
                    "name": "onepiece",
                    "meta": {
                        "name": "onepiece",
                        "title": "onepiece"
                    }
                },
                {
                    "path": "/son",
                    "meta": {
                        "name": "son",
                        "title": "子应用",
                        "microApp": "app1"
                    }
                }
            ]
        }]
    }
}
```
当前我们依然提倡约定路由的方式，在`src/pages` 目录新建 `son.vue`：
```vue
<config>
{
    "name": "son",
    "title": "子应用",
    "microApp": "app1"
}
</config>
```


####  使用 `<MicroApp />` 组件的方式
:::tip
建议使用这种方式来引入不带路由的子应用。 否则请自行关注子应用依赖的路由跟当前浏览器 url 是否能正确匹配上，否则很容易出现子应用加载了，但是页面没有渲染出来的情况。
:::
```vue
<template>
    <MicroApp :name="name" />
</template>
<script>
import { MicroApp } from '@fesjs/fes';

export default {
    components: { MicroApp },
    setup(){
        const name = "app1"
        return {
            name
        }
    }
}
</script>
```


## 子应用配置

### 第一步：插件注册
```js
export default {
    qiankun: {
        micro: {},
    }
};
```

### 第二步：配置运行时生命周期钩子（可选）
插件会自动为你创建好 `qiankun` 子应用需要的生命周期钩子，但是如果你想在生命周期期间加一些自定义逻辑，可以在子应用的 `src/app.js` 里导出 `qiankun` 对象，并实现每一个生命周期钩子，其中钩子函数的入参 `props` 由主应用自动注入。
```js
export const qiankun = {
    // 应用加载之前
    async bootstrap(props) {
        console.log('app1 bootstrap', props);
    },
    // 应用 render 之前触发
    async mount(props) {
        console.log('app1 mount', props);
    },
    // 当 props 更新时触发
    async update(props){
        console.log('app1 update,' props);
    },
    // 应用卸载之后触发
    async unmount(props) {
        console.log('app1 unmount', props);
    },
};

```

## 父子应用通讯

有两种方式实现

### 配合 [useModel](./model.md) 使用

确保已经安装了 `@fesjs/plugin-model`：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-model": "^2.0.0"
    },
}
```

#### 主应用传递 props

- 如果使用 `MicroApp` 组件模式消费子应用，直接通过 props 传递即可：
```vue
<template>
    <MicroApp :name="name" :user="user" />
</template>
<script>
import { MicroApp } from '@fesjs/fes';

export default {
    components: { MicroApp },
    setup(){
        const name = "app1"
        const user = ref("")
        return {
            name,
            user
        }
    }
}
</script>
```

- 如果使用路由绑定式消费子应用，那么约定`src/models/qiankunStateForMicro.js` 的模型数据将作为 `props` 船体给子应用，如：
```js
import { reactive } from 'vue';

export default () => {
    const state = reactive({ c: 1 });
    return {
        state
    };
};
```

#### 子应用消费 props

子应用中会自动生成一个全局名为 `qiankunStateFromMain` 的 `model`， 可以在任意组件中获取主应用透传的 `props` 的值。

```vue
<script>
export default {
    setup(){
        const mainState = useModel('qiankunStateFromMain');
        return {
            mainState
        };
    }
}
</script>
```

### 基于 props 传递

- 主应用使用 props 的模式传递数据（参考主应用装载子应用配置一节）
- 子应用在生命周期钩子中获取 props 消费数据（参考子应用运行时配置一节） 
