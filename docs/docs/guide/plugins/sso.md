# UM登录

UM登录是解决行内业务系统统一登录的一种方案，基于sso实现。  

## 开启UM登录

在 `fes.config.js` 中配置 
```js
export default {
    sso: true
}
```

## 登录成功回调
当登录成功后，触发`fes_sso_login`事件，在事件钩子中可以执行逻辑：
```js
this.FesApp.on('fes_sso_login', ()=>{
    this.FesApp.setRole('admin');
    this.FesApi.fetch("auth/uri.do", "get").then(rst => {
        //设置用户、角色等
        this.set("FesUserName", rst.user);
        this.set("FesRoleName", rst.roleName);
    })
})
```

## 后台接口配置

后台需要转发运保那边UM登录jar包封装的两个接口： `sso/config.do` 和 `sso/ticket-login.do`