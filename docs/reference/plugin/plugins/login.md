# @fesjs/plugin-login

## 介绍

管理自定义 login 页面，包括 login 页面权限问题，跳转登陆问题。

## 启用方式

在 `package.json` 中引入依赖：

```json
{
    "dependencies": {
        "@fesjs/fes": "^3.0.0-rc.2",
        "@fesjs/plugin-login": "^3.0.0-rc.1"
    }
}
```

## 运行时配置

```js
import { defineRuntimeConfig } from '@fesjs/fes';

export default defineRuntimeConfig({
    login: {
        loginPath: '/login', // 登陆页面路径，默认 /login，也可以用路由的 name
        hasLogin() {
            // 进入页面前判断是否登陆的逻辑，每次跳转非登陆页面都会检测，直到为 true，支持异步
            return true;
        },
    },
});
```
