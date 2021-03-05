# @fesjs/plugin-vuex
## 介绍
集成vuex插件

增强vuex，导出所有的mutations、actions和getter的事件类型，编辑器提示

约定模式，module和plugin定义放在sotres目录下，文件名包含plugin被解析为插件，无需额外配置，定义即可用。

::: tip
vuex的提供的api直接导入使用
:::
## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-vuex": "^2.0.0"
    }
}
```

## 配置
在 `.fes.js` 中配置：
```js
export default {
    vuex: {
        strict: true // 开启严格模式
    }
}
```

## 场景使用
vuex定义模块之后，使用getter、mutation、action都是通过传入字符路径，如：
```js
import { useStore } from 'vuex';
const store = useStore();
store.getters['user/address']
store.commit('counter/increment')
store.dispatch('user/login')
```

使用该插件，可以利用导出的事件类型，如：
```js
import { useStore } from 'vuex';
import { MUTATION_TYPES, GETTER_TYPES, ACTION_TYPES } from '@fesjs/fes';
const store = useStore();
store.getters[GETTER_TYPES.user.address]
store.commit(MUTATION_TYPES.counter.increment)
store.dispatch(ACTION_TYPES.user.login)
```
## API
### MUTATION_TYPES
* 类型 `Object`
* mutation的所有事件类型
 
### GETTER_TYPES
* 类型 `Object`
* getter的所有方法名
### ACTION_TYPES
* 类型 `Object`
* action的所有事件类型
