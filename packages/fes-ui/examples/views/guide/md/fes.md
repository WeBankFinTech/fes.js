# Fes实例
Fes实例是Vue实例的升级版，添加些额外的属性，方便开发。在实例化 Fes 时，需要传入一个选项对象，它可以包含数据、模板、挂载元素、方法、生命周期钩子等选项。  

## 响应数据
```javascript
export default {
    FesData: {
        a: 1,
        b: 2
    }
}
```
挂载在`FesData`对象上的数据都是响应的，当数据变更时，视图会跟着变。当视图触发变更时，值也会跟着变。  

数据字典`FesMap`和全局状态`FesFesx`会挂载在`FesData`对象上成为响应数据。这样就可以直接在模版中使用FesMap和FesFesx，例如：
```html
    {{status | map FesMap.status}} {{ FesFesx.a }}
```

## 异步响应数据
异步响应数据是指当Fes实例初始化时把通过接口查询到的数据挂载在FesData上。
```javascript
export default {
    FesSyncData: {
        data: ["/query", {
            max: 100,
            min: 1
        }]
    },
}
```
会给FesData添加一个属性data，值是"/query"查询到的结果。  
{ max: 100, min: 1} 是查询条件，路由参数transition.to.params 和 transition.to.query 也会当作参数跟制定的参数一起传给后台。

## 生命周期

```javascript
//当组件初始化完毕时触发
FesReady: function(){
}

//当组件销毁时触发
FesDestroy: function(){
}
```

## 属性
*   this.FesApp App实例
*   this.FesUtil 工具函数
*   this.FesStorage 操作存储: cookie、sessionStorage、localStorage
*   this.FesApi 操作Ajax

## 过滤器
* 日期 : 1493725147722 => 2017-05-02 19:39:07  
```html
  <template>
    {{date | date}} 
  </template>
  <script type="text/ecmascript-6">
      export default {
          FesData: {
              date: new Date().getTime()
          }
      }
  </script>
```
* 日期（带参数） : 1493725147722 => 2017-05-02
```html
  <template>
    {{date | date 'yyyy-MM-dd'}}
  </template>
  <script type="text/ecmascript-6">
      export default {
          FesData: {
              date: new Date().getTime()
          }
      }
  </script>
```
* 金钱 : 100000 => 100,000.00
```html
  <template>
    {{money | money}} 
  </template>
  <script type="text/ecmascript-6">
      export default {
          FesData: {
              money: 100000,
          }
      }
  </script>
```
* 银行卡 : 11122233242323 => 1112 2233 2423 23
```html
  <template>
    {{card | card}} 
  </template>
  <script type="text/ecmascript-6">
      export default {
          FesData: {
              card: "11122233242323",
          }
      }
  </script>
```
* 加密 : 42222991018719191 => 4222***191
```html
  <template>
    {{safety | safety 4 3}}
  </template>
  <script type="text/ecmascript-6">
      export default {
          FesData: {
              safety: "42222991018719191",
          }
      }
  </script>
```
* 数据字典 : 1 => 成功
```html
  <template>
    {{map | map FesMap.status}} 
  </template>
  <script type="text/ecmascript-6">
      export default {
          FesData: {
              map: "1"
          }
      }
  </script>
```
```javascript
  //map.js
  export default {
      status: [["1", "成功"], ["2", "失败"]],
  };
```

