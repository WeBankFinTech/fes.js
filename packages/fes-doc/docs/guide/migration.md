# 从Fes1迁移到Fes2
Fes1基于Vue1.x实现，而Fes2基于Vue2.x实现。所以Fes升级到2.x主要就是修改代码兼容Vue2.x。

## `show`属性替换
在Fes1中，Modal、Loading等组件控制是否显现使用`show`属性：  
```vue
<template>
    <Modal :show.sync="showInner"></Modal>
</template>
<script>
export default {
    data() {
        return {
            showInner: false
        }
    }
}
</script>
```
在Fes2中，使用`ref.show()`：
```vue
<template>
    <div>
        <modal ref="modal"></modal>
        <button @click="showModal">显示弹窗</button>
    </div>
</template>
<script>
export default {
    methods: {
        showModal: function () {
            this.$refs.modal.show()
        }
    }
}
</script>
```

## `key`属性替换
由于Vue2.0中key属性变成关键字，所以Fes1中组件的`key`参数改为使用`prop`参数  
在Fes1中，一些组件比如`Column`使用`key`来标识当前列：
```vue
<template>
    <Wb-table :data="data">
        <Column key="date" name="日期"></Column>
    </Wb-table>
</template>
<script>
export default {
}
</script>
```
在Fes2中，使用`prop`：
```vue
<template>
    <Wb-table :data="data">
        <Column prop="date" name="日期"></Column>
    </Wb-table>
</template>
<script>
export default {
}
</script>
```

## `value.sync`替换
props在vue2.x只能单向传递，而在使用表单组件时，用户输入内容需要反馈到父组件中。这时候子组件可以显式地传递一个事件通知父组件更新值，我们可以用`v-model`语法糖进行数据双向绑定。阅读Vue文档[表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)了解更多细节。

## `v-el`和`v-ref`替换
Vue2.x弃用`v-el` 和 `v-ref` 指令，改为使用`ref`属性，在组件实例中通过`$refs`来拿到绑定的DOM对象或者组件实例。  
这意味着`v-el:my-element` 将写成这样：`ref="myElement"`，`v-ref:my-component`将写成 `ref="myComponent"`。
 
## `v-for`
Vue1.x遍历对象的参数顺序是 `(key, value)`，Vue2.x更新成`(value, key)`，跟常见的对象迭代器 (例如 lodash) 保持一致。   
Vue1.x使用v-for时，在迭代项中可以使用参数顺序`$index`，而且默认使用`track-by="$index"`。Vue2.x中`v-for`移除了隐式的`$index`，在循环的子项加上`:key="index"`。