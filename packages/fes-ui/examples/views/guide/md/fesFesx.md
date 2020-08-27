# 全局状态 FesFesx

管理全局状态的容器，独立于组件之外的一个Map对象，这样任何组件中都可以操作FesFesx中的值。
```html 
 <template>
     <div class="article">
         {{FesFesx.data}}
     </div>
 </template>
 <script type="text/ecmascript-6">
     export default {
         FesReady: function(){
            this.FesFesx.set("data", 1)
         }
     }
 </script>
```


## 函数
* get(prop)  
  根据prop获取值
* set(prop, value)  
  设置一个全局的状态
