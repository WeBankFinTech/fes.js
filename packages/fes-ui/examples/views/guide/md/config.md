# 全局配置

## LOGO
LOGO图片固定是 `assets/images/logo.png`，替换此图片即可。
 
## 系统名称
```javascript
//在app.js中设置
this.set("FesName", "FES");
```
一般情况都是在app.js中设置系统名


## 用户名
```javascript
//在app.js中设置
this.set("FesUserName", "万纯（harrywan）");
this.set("FesRoleName", "管理员");

//在.fes文件中设置
this.FesApp.set("FesUserName", "万纯（harrywan）")
this.FesApp.set("FesRoleName", "管理员");
```

## 退出逻辑
```javascript
this.set("FesLogout", ()=> {
    this.setRole('unLogin')
    this.FesStorage.set('userLogin', false)
});
```

## 菜单
这里设置的是全量菜单。使用setRole()设置role后，会自动根据角色配置的路由权限过滤菜单显示。
```javascript
//在fes.config.js中配置
{ menu: [{
        title: "接口",
        path: '/api',
        subMenu: [{
            title: "Fes",
            path: '/api/fes',
        },{
            title: "FesApp",
            path: '/api/fesApp',
        }]
    },{
        title: "简单的列表页",
        path: '/list'
    },{
        title: "自定义内容列表页",
        path: '/list1'
    },{
        title: "内容很多的编辑",
        path: '/list/edit'
    }]
}
```

## 环境变量

根据不同环境配置变量  
在项目中，这样引用 this.FesEnv.api  
打包后，this.FesEnv.api 会根据环境替换成相应的字符串  

```javascript
//在fes.config.js中配置
{ 'env': {
    // 本地开发环境 fes dev默认使用local环境
    'local': {
        'api': 'http://localhost'
    },
    // 测试环境 fes build --env=sit 触发使用
    'sit': {
        'api': 'http://h.adm-test.webank.io'
    },
    // 生产环境 fes build默认使用prod环境 fes dev --env=sit 触发使用
    'prod': {
        'api': 'http://adm.webank.io'
    }
} }
```