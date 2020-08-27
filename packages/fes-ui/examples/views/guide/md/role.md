# 权限管理
权限管理在前端系统来说就是菜单管理和路由控制。我们用角色来区分权限，用户跟角色一一对应，同时把未登录状态也当作一个角色。
一个角色对应着一组菜单。访问某个路由时，判断路由是否在当前角色的菜单里面，如果不在则阻止。

## 配置角色
在 `fes.config.js` 中配置系统角色与访问权限
```javascript
// 系统角色与访问权限配置，路由数组的第一项为默认路由，成功设置角色后默认跳入 路由数组的第一项
export default {
    'unLogin': ['/home'],
    'service': ['/list', '/home'],
    'admin': ['/api/fesMap', '*']
}
```

## 设置角色
在app.js中设置：
```javascript
// 初始化时，先判断当前用户是否登录，如果未登录，用setRole()设置当前角色为'unLogin'，只能访问 /home
if (!this.FesStorage.get('userLogin') === true) {
    this.setRole('unLogin')
}

//设置退出逻辑
this.set("FesLogout", ()=> {
    this.setRole('unLogin')
    this.FesStorage.set('userLogin', false)
});
```

在登录页面组件中设置：
```javascript
//登录时，设置为其他角色
this.FesApi.fetch("/getRoleName").then((res)=> {
    this.FesApp.setRole(res)
})
```
