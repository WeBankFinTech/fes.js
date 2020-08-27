# 接口调用 FesApi
对vue-resource的封装。公共的异常处理，响应处理等。

## 函数
* get(url, data, option)  
  发起一个get请求，返回值是promise对象
```javascript 
     this.FesApi.get("/query").then(rst=>{})
```
* post(url, data, option)  
  发起一个post请求，返回值是promise对象
```javascript 
     this.FesApi.post("/query").then(rst=>{})
```
* fetch(url, data, option)  
  默认调用post请求，返回值是promise对象
```javascript 
     this.FesApi.fetch("/query").then(rst=>{})
```
* option(option)  
  设置ajax的公共配置，比如root（根路径）、timeout（超时时间）、xhr（xhr对象）
```javascript 
     this.FesApi.option({
          root: "http://l.sit.webank.io/pmbank-wpadm/product"
      });
```
* setError(errors)  
  设置当响应状态是非200时触发的事件钩子，比如401啊等
```javascript 
     this.FesApi.setError({
        200: function(){
            alert(200)
        }
     })
```
* setResponse(constructionOfResponse)  
  设置响应结构。响应一般会由状态码、错误消息、数据组成。通过此函数设置一个路径，当响应回来是来解析响应。 **promise的第一个参数是解析resultPath拿到的值**。
```javascript 
     //设置响应结构
     this.FesApi.setResponse({
         successCode : "0",
         codePath : "code",
         messagePath : "msg",
         resultPath : "result"
     });
```