# @fesjs/plugin-model

## 启用方式
在 package.json 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-model": "^2.0.0"
    },
}
```
## 介绍
一种简易的数据管理方案。我们知道 Vue 的理念是用响应式数据驱动UI更新，提供 `reactive` 、 `ref` 等API把数据变成响应式的。我们使用`Provide / Inject`特性，在应用实例中共享响应式数据。

我们约定`src/models` 目录下的文件为项目定义的 `model` 文件。每个文件需要默认导出一个 `function`。

文件名则对应最终 `model` 的 `name`，你可以通过插件提供的 `API` 来消费 `model` 中的数据。

### Model 文件
**src/models/useAuthModel.js**
```js
import { reactive } from 'vue'

export default function useAuthModel() {
  const user = reactive({});

  const signin = ()=>{
      // todo
  }

  const signout = ()=>{
      // todo
  }

  return {
    user,
    signin,
    signout
  }
}
```

### 在组件中使用 Model
```vue
<script>
import { useModel } from "@fesjs/fes"
export default {
    setup(){
        const { user, signin, signout } = useModel("useAuthModel")
    }
}
</script>
```

### @@initialState
在`beforeRender`的返回的内容会写入`@@initialState`
```js
export const beforeRender = {
    loading: <PageLoading />,
    action() {
        const { setRole } = access;
        return new Promise((resolve) => {
            setTimeout(() => {
                setRole('admin');
                // 初始化应用的全局状态，可以通过 useModel('@@initialState') 获取，具体用法看@/components/UserCenter 文件
                resolve({
                    userName: 'harrywan'
                });
            }, 1000);
        });
    }
};
````
然后我们可以在其他组件中使用：
```vue
<template>
    <div class="right">{{initialState.userName}}</div>
</template>
<script>
import { useModel } from '@fesjs/fes';

export default {
    setup() {
        const initialState = useModel('@@initialState');
        return {
            initialState
        };
    }
};
</script>
<style scope>
</style>
```


## API

### useModel

**useModel(name)**
- **类型**：函数
  
- **详情**: 获取 Model 数据，也就是 Model 文件默认导出函数执行的结果。
- **参数**：
  - name，传入 Model 文件名

