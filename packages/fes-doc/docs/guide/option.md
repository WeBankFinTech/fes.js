---
sidebarDepth: 3
---

# Vue增强
fes.js基于Vue.js，对.vue单文件组件做了一些增强，扩展了一些配置和内置过滤器等。

## 实例

### FesFesx
FesFesx是全局状态容器，独立于组件之外的一个Map对象，在任何组件中可以通过`this.FesFesx`使用
```vue
<template>
    <div class="article">
        {{FesFesx.data}}
    </div>
</template>
<script>
    export default {
        FesReady(){
            this.FesFesx.set("data", 1)
        }
    }
</script>
```

### FesMap
FesMap是数据字典容器，在任何组件中可以通过`this.FesMap`使用
```vue
<template>
    <div class="article">
        {{data | map(FesMap['xxx'])}}
    </div>
</template>
```

### FesEnv
FesEnv的引用，具体Api请参考[api-FesEnv](/api/#fesenv)

### FesStorage
FesStorage的引用，具体Api请参考[api-FesStorage](/api/#fesstorage)

### FesUtil
FesUtil的引用，具体Api请参考[api-FesUtil](/api/#fesutil)

### FesApi
FesApi的引用，具体Api请参考[api-FesApi](/api/#fesapi)

## 选项

### FesLeft
控制页面的左侧是否显示，详情可见[全局组件](/guide/directory-structure.html#%E7%89%B9%E6%AE%8A%E7%BB%84%E4%BB%B6)

### FesHeader
控制页面的顶部(`FesHeader.vue`)是否显示，详情可见[全局组件](/guide/directory-structure.html#%E7%89%B9%E6%AE%8A%E7%BB%84%E4%BB%B6)

### FesData
参考Vue.js的[data](https://cn.vuejs.org/v2/api/#data)，目前两者使用起来几乎一致。假如未来Vue升级不兼容data时，使用FesData会尽可能保证兼容。
```js
export default {
    FesData(){
        return {
            a: 1,
            b: 2
        }
    }
}
```

### FesSyncData
异步响应数据是指当vue实例初始化时把通过接口查询到的数据挂载在FesData上，响应化。
```js
export default {
    FesSyncData: {
        data: ["/query", {
            max: 100,
            min: 1
        }]
    },
}
```
给`FesData`添加一个属性data，值是"/query"查询到的结果。 { max: 100, min: 1} 是查询条件，路由参数`transition.to.params` 和`transition.to.query` 也会当作参数跟自定义参数一起传给后台。

### FesCreated
当Vue实例创建完后立即调用，用法类似Vue的[created](https://cn.vuejs.org/v2/api/#created)

### FesReady
当Vue实例被挂载后调用立即调用，用法类似Vue的[mounted](https://cn.vuejs.org/v2/api/#mounted)

### FesBeforeDestroy
当Vue实例销毁之前调用。在这一步，实例仍然完全可用。用法类似Vue的[beforeDestroy](https://cn.vuejs.org/v2/api/#beforeDestroy)

### FesDestroy
当Vue实例销毁后调用。在这一步，实例仍然完全可用。用法类似Vue的[destroyed](https://cn.vuejs.org/v2/api/#destroyed)

## 过滤器

### date
把时间戳转换成日期，日期格式默认为`yyyy-MM-dd hh:mm:ss`
```vue
<template>
    {{date | date}}
</template>
<script>
export default {
    FesData(){
        return {
            date: new Date().getTime()
        }
    }
}
</script>
```
日期带参数：
```html
{{date | date('yyyy-MM-dd')}}
```

### money
金额过滤器，把数字`100000`转换成金额`100,000.00`
```vue
<template>
    {{money | money}}
</template>
<script>
export default {
    FesData: {
        money: 100000,
    }
}
</script>
```

### card
银行卡过滤器，把数字`11122233242323` 转换成 `1112 2233 2423 23`
```vue
<template>
    {{card | card}}
</template>
<script>
    export default {
        FesData: {
            card: "11122233242323",
        }
    }
</script>
```

### safety
给关键信息打码，把身份证号`42222991018719191`转换成`4222***191`
```vue
<template>
    {{safety | safety(4,3)}}
</template>
<script>
    export default {
        FesData: {
            safety: "42222991018719191",
        }
    }
</script>
```
参数表示保留几位不加密，第一个参数为前几位不加密，第二个参数为后几位不加密。

### map
数据字典过滤器    

首先定义数据字典：
```js
export default {
    map: {
        status: [["1", "成功"], ["2", "失败"]],
    }
};
```
在页面中使用：
```vue
<template>
    {{map | map(FesMap.status)}}
</template>
<script type="text/ecmascript-6">
    export default {
        FesData: {
            map: "1"
        }
    }
</script>
```