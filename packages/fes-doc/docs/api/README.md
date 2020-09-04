---
sidebarDepth: 3
sidebar: auto
title: API参考
---

## FesApp

### addThrid
添加Vue的插件
```js
this.FesApp.addThrid(name, options)
```

### addDirective
添加全局插件
```js
this.FesApp.addDirective(name, options)
```

### addComponent
添加全局组件
```js
this.FesApp.addComponent(name, component)
```

### addFilter
添加全局过滤器
```js
this.FesApp.addFilter(name, func)
```

### get
从内部的状态容器`_fesx`中获取值
```js
this.FesApp.get(key)
```

### set
把内容保存到内部的状态容器`_fesx`
```js
this.FesApp.set(key, value)
```

### setRole
设置角色       
`roleId`角色的id              
`redirect` 设置角色后是否跳转到角色所属资源地址的第一个，默认为true           
`update` 当`redirect`为true跳转后是否使用当前路由，默认为true        
```js
this.FesApp.setRole(roleId, redirect, update)
```

### setAllowPage
设置当前用户可访问的资源列表         
`urls`用户可访问的资源列表         
`redirect`设置角色后是否跳转到角色所属资源地址的第一个，默认为true             
`update` 当`redirect`为true跳转后是否使用当前路由，默认为true        
```js
this.FesApp.setAllowPage(urls, redirect, update)
```

### getAllowPageAsync
获取当前用户的可访问资源列表
```js
this.FesApp.getAllowPageAsync()
```

### setLocale
更改当前的语言选项
```js
this.FesApp.setLocale('en')
```

### setFavicon
设置当前应用的Favicon
```js
this.FesApp.setLocale(url)
```

### router
Vue Router的实例，具体API请参考[router-实例方法](https://router.vuejs.org/zh/api/#router-%E5%AE%9E%E4%BE%8B%E6%96%B9%E6%B3%95)

### setBeforeRouter
路由跳转前的事件钩子，执行`next()`动作跳转路由，执行`next(false)`阻止跳转。
```js
this.FesApp.setBeforeRouter(function (to, from, next) {
    next();
});
```

### setAfterRouter
路由跳转后的事件钩子
```js
this.FesApp.setAfterRouter(function (route) {
    console.log("您浏览到了"+route.path)
});
```

### events
FesApp触发的事件

#### fes_logout
当点击系统默认退出按钮时，在FesApp上触发`fes_logout`事件。可以在退出事件里面执行清除逻辑。
```js
this.FesApp.on('fes_logout', (FesAppInstance) => {
})
```

### fes_logo_click
点击logo时触发
```js
this.FesApp.on('fes_logo_click', (FesAppInstance) => {
})
```


### FesEnv
FesEnv的引用，具体Api请参考[api-FesEnv](/api/#fesenv)

### FesStorage
FesStorage的引用，具体Api请参考[api-FesStorage](/api/#fesstorage)

### FesMap
FesMap的引用，具体Api请参考[api-FesMap](/api/#fesmap)

### FesUtil
FesUtil的引用，具体Api请参考[api-FesUtil](/api/#fesutil)

### FesApi
FesApi的引用，具体Api请参考[api-FesApi](/api/#fesapi)

## FesApi

### fetch
**fetch(url, data, option)**    
`url`为接口的请求路径，必填     
`data`是请求参数，可选       
`option`是请求配置，可选，具体配置可参考[axios](https://github.com/axios/axios)     
默认调用post请求，返回promise对象，可以通过 option 方法更改默认的 method。
```js
this.FesApi.fetch("/post").then(rst=>{})

// post + 传参数
this.FesApi.fetch("/post"，{}).then(rst=>{})

// get + 传参数
this.FesApi.fetch("/get", {}, 'get').then(rst=>{})

// post + 传参数 + 设置button请求中不能点击
this.FesApi.fetch("/post", {}, {
     method: 'post',
     button: button // 如果配置此项，则button在响应回来之前不能继续被点击
}}).then(rst=>{})
```
### option
**option(option)**     
配置ajax请求参数
```js
this.FesApi.option({
     baseURL: "http://l.sit.webank.io/pmbank-wpadm/product"  // baseURL默认为 this.FesEnv.api
});
```

### setHeader
**setHeader(headers)**
设置请求头，支持为 delete, get, head, post, put, patch 等特定方法设置特定的请求头
```js
this.FesApi.setHeader({
     'Accept': 'text/html', // 所有请求都会生效
     post: {
          'Content-Type': 'application/json' // 只有 post 请求生效
     }
})
```

### setError
**setError(errors)**           
只有状态码为200而且业务状态码为成功的情况下才算成功，其他情况都判断为失败。如果设置了错误码配置，则不自动提示错误消息，回调函数的参数为response。
```js
this.FesApi.setError({
     401: function(response){
          console.log(response)
     },
     10080: function(response){
          console.log(response)
     }
})
```

### setResponse
**setResponse(constructionOfResponse)**      
响应一般会由状态码、错误消息、数据组成。我们设置好接口的响应体的数据结构之后FES就能直接拿到错误码和业务数据。    
解析resultPath拿到的业务参数会作为then函数的第一个参数。如果resultPath是`*`则结果是响应的全部内容
```js
//设置响应结构
this.FesApi.setResponse({
     successCode : "0",
     codePath : "code",
     messagePath : "msg",
     resultPath : "result"  
});
```
也可以对单独的接口设置响应结构:
```js
this.FesApi.fetch("/query", {}, {
     resultFormat: {
          successCode : "0",
          codePath : "code",
          messagePath : "msg",
          resultPath : "result"  
     }
}}).then(rst=>{})
```

### setImportant
**setImportant(important)**         
设置那些URL是非常重要的，不能在短时间内重复发起的。在访问这些URL时，给予提示是否继续下去。
```js
this.FesApi.setImportant({
    'generalcard/action': {
        control: 10000,
        message: '您在十秒内重复发起手工清算操作，是否继续？'
    }
})
```

### setReqInterceptor & ejectReqInterceptor
请求拦截器和取消请求拦截，兼容`axios`拦截器的设置方法
```js
// 参数支持: function, [function, function]
// 请求拦截
const eject = api.setReqInterceptor(function (config) {
     // do something
})

// 取消请求拦截
api.ejectReqInterceptor(eject);
```

### setResInterceptor & ejectResInterceptor
响应拦截器和取消响应拦截，兼容`axios`拦截器的设置方法
```js
// 参数支持: function, [function, function]
// 响应拦截
const eject = api.setResInterceptor((response) => {
     // do something
}, (error) => {
     // do somthing for error
})

// 取消响应拦截
api.ejectResInterceptor(eject);
```

## FesFesx
FesFesx是全局状态容器，独立于组件之外的一个Map对象。储存在FesFesx中的数据也会存储在FesStroage中，当刷新页面时会恢复刷新前的状态。

### get
通过`key`获取值
```js
this.FesFesx.get(key)
```
其实也可以通过`this.FesFesx[key]`获取值

### set
设置`key`的值`value`，调用`set`方法设置的`key`是响应式的。
```js
this.FesFesx.set(key, value)
```

### clear
清除所有状态
```js
this.FesFesx.clear()
```

## FesMap

### getValueByName
通过描述获取值    
`item`表示数据字典项的名称    
`name`表示`item`数据字典项中某项的描述
```js
this.FesMap.getValueByName(item, name)
```

### getNameByValue
通过值获取值的描述    
`item`表示数据字典项的名称    
`value`表示`item`数据字典项中某项的值
```js
this.FesMap.getNameByValue(item, value)
```

## FesEnv
在 fes.config.js 中配置的环境变量可以通过 FesEnv 获取。
```js
// xxx为环境变量，也就是运行参数中的 --env=xxx
this.FesEnv = config.env['xxx'];

// 所以打包后`this.FesEnv.api` 等于 `config.env['xxx'].api`
this.FesEnv.api === config.env['xxx'].api;
```

## FesStorage
操作Storage，包含cookie、sessionStorage、localStorage。 category值session对应sessionStorage，local对应localStorage，cookie对应cookie

### set
往Storage中存入一个值
**set(key, value, category = SESSION, expired)**    
`key`是给值取的名称    
`value`是值的内容   
`category`是储存的类型，可选值有`session`、`local`、`cookie`    
`expired`是储存的时间，当`category`为`cookie`时可用
```js
this.FesStorage.set(key, value, category, expired)
```

### get
从Storage中取key对应的值
**get(key, category = SESSION)**    
`key`是给值取的名称    
`category`是储存的类型，可选值有`session`、`local`、`cookie` 


### clear
清除某个类型的所有值    
**clear(category = SESSION)**    
`category`是储存的类型，可选值有`session`、`local`、`cookie` 

### remove
删除key对应的值     
**remove(key, category = SESSION)**       
`key`是给值取的名称    
`category`是储存的类型，可选值有`session`、`local`、`cookie` 

## FesUtil

### getClass
获取dom节点`el`的样式class
```js
this.FesUtil.getClass(el)
```

### hasClass
判断dom节点是否有样式`name`
```js
this.FesUtil.hasClass(el, name)
```

### setClass
给dom节点`el`设置样式`cls`
```js
this.FesUtil.setClass(el, cls)
```

### addClass
给dom节点`el`添加一个样式`name`
```js
this.FesUtil.addClass(el, name)
```

### removeClass
删除节点`el`的样式`cls`
```js
this.FesUtil.removeClass(el, cls)
```

### contains
节点`el`是否是节点`parentEl`的子节点
```js
this.FesUtil.contains(parentEl, el)
```

### isPlainObject
是否是纯粹的Object对象
```js
this.FesUtil.isPlainObject(obj)
```

### isObject
是否是Object对象
```js
this.FesUtil.isObject(obj)
```

### isNumber
是否是数字
```js
this.FesUtil.isNumber(num)
```

### isDate
是否是日期
```js
this.FesUtil.isDate(date)
```

### isFunction
是否是函数
```js
this.FesUtil.isFunction(fn)
```

### isArray
是否是数组
```js
this.FesUtil.isArray(array)
```

### isString
是否是字符串
```js
this.FesUtil.isString(str)
```

### isNull
是否为空，为undefined、null或者空字符串
```js
this.FesUtil.isNull(something)
```

### event.on
绑定事件
**event.on(key, fn)**     
`key`是事件名称    
`fn`是事件触发时执行的回调函数 

### event.one
绑定事件，只监听一次就销毁    
**event.one(key, fn)**     
`key`是事件名称    
`fn`是事件触发时执行的回调函数 

### event.off
取消绑定事件    
**event.off(key)**     
`key`是事件名称    

### event.trigger
触发事件    
**event.trigger(key)**     
`key`是事件名称  

#### _
lodash工具函数集
```js
this.FesUtil._
```
