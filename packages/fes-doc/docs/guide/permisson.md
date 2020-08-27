# 权限管理
权限管理也就是页面是否可见、按钮是否可见。我们把页面和按钮叫做资源，在内部定义了一个allowPage数组来控制用户可访问的资源。我们可以用角色（未登录状态也可以当作一个角色）定义一组资源。当用户访问应用时，用setRole设置用户的角色，这样就能控制用户显示的菜单和按钮。当然有时候角色不能预先定义，我们也提供setAllowPage来控制当前用户能访问的资源。  

## 权限分类

### 菜单权限
在`fes.config.js`中配置菜单`menu`，会根据配置生成左侧菜单列表。当用户的可访问资源列表`allowPage`更新时，如果页面路径在`allowPage`中，则菜单可见，否则隐藏菜单项。

### 按钮权限
菜单权限使用菜单的路径当做资源id，而按钮则可以自定义资源id。例如我们定义一个按钮的资源id为'/hr/shelf-action'：
```html
<Wb-button v-permission:="/hr/shelf-action"></Wb-button>
```
在如果设置角色或者直接设置可访问资源列表后, 资源列表包含'/hr/shelf-action'，则此按钮可见。
```javascript
 this.FesApp.setAllowPage(['/hr/shelf-action', ...])
```

## 角色
当应用的角色固定时，在前端配置好资源列表后，根据当前登录用户的角色赋予其对应权限。

### 定义角色
在 `fes.config.js` 中配置系统角色与资源的映射关系：

```javascript
export default {
    'unLogin': ['/home'],
    'service': ['/list', '/home'],
    'admin': ['/api/fesMap', '*']
}
```

### 设置角色
在app.js中设置：
```js
this.setRole('master')
```
在登录页面组件中设置：
```javascript
//登录时，设置为其他角色
this.FesApi.fetch("/getRoleName").then((res)=> {
    // 角色预先定义
    this.FesApp.setRole(res)
})
```

## 动态权限
某些应用需要有创建角色的功能，需要可配置角色的权限范围，故在前端不能写死角色对应的资源列表。在创建角色时，将角色名和角色拥有的权限范围也就是可访问资源列表通过接口保存在后台数据库中，当用户登录时响应返回用户的可访问资源列表，通过`setAllowPage`方法设置，就可以达到跟`setRole`一样的效果。         
**setAllowPage 与 setRole 互斥，只有一个会生效**
```js
// 角色由后台控制，只需要它返回url
this.FesApp.setAllowPage(res.urls)
```

