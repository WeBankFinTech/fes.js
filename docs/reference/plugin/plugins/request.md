# @fesjs/plugin-request

基于 axios 封装的 request，内置防止重复请求、请求缓存、错误处理等功能。

[4.x 版本请点击](./request-4.md)

## 启用方式

在 `package.json` 中引入依赖：

```json
{
    "dependencies": {
        "@fesjs/fes": "^3.0.0",
        "@fesjs/plugin-request": "^3.0.0"
    }
}
```

## 运行时配置

入口文件的全局配置，具体请求的配置参数会覆盖全局配置，支持 [axios](https://axios-http.com/zh/docs/req_config) 所有的参数。

```js
import { defineRuntimeConfig } from '@fesjs/fes';
import { isPlainObject } from 'lodash-es';

export default defineRuntimeConfig({
    request: {
        // API  前缀
        baseURL: '',
        dataHandler(data, response) {
            if (isPlainObject(data)) {
                // 处理响应内容异常
                if (data.code !== '0') {
                    if (data.code === '10000')
                        FMessage.error('hello world');

                    if (data.code === '20000')
                        FMessage.error('hello world');

                    throw new Error(response);
                }
                // 响应数据格式化
                return data?.result ? data.result : data;
            }
            return data;
        },
        // http 异常，和插件异常
        errorHandler(error) {
            if (error.response) {
                // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
            else if (error.request) {
                // 请求已经成功发起，但没有收到响应
                // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
                // 而在node.js中是 http.ClientRequest 的实例
                console.log(error.request);
            }
            else if (error.type) {
                // 插件异常
                console.log(error.msg);
            }
            else {
                // 发送请求时出了点问题
                console.log('Error', error.message);
            }
            console.log(error.config);
        },
        // 请求拦截器
        requestInterceptors: [],
        // 响应拦截器
        responseInterceptors: [],
        // 支持其他 axios 配置
        ...otherConfigs,
    },
});
```

## API

### request

-   **类型**：函数

-   **详情**：请求后端接口
-   **参数**：

    -   url: 后端接口 url
    -   data: 参数
    -   options: 配置支持 [axios](https://axios-http.com/zh/docs/req_config) 所有的参数，和插件扩展参数。

-   **返回值**: Promise

### useRequest

request 的封装，返回响应式 `loading`、`error`、 `data`

## 使用

### 发起一个普通 post 请求

```js
import { request } from '@fesjs/fes';

request('/api/login', {
    username: 'robby',
    password: '123456',
})
    .then((res) => {
        // do something
    })
    .catch((err) => {
        // 处理异常
    });
```

### merge 重复请求

连续发送多个请求，会被合并成一个请求，不会报 `REPEAT` 接口错误。

当发生 `REPEAT` 请求异常，并且确保自身代码合理的情况下，可以使用该配置。

```js
import { request } from '@fesjs/fes';

request(
    '/api/login',
    {
        username: 'robby',
        password: '123456',
    },
    {
        mergeRequest: true, // 在一个请求没有回来前，重复发送的请求会合并成一个请求
    },
)
    .then((res) => {
        // do something
    })
    .catch((err) => {
        // 处理异常
    });
```

### 请求缓存

```js
import { request } from '@fesjs/fes';

request(
    '/api/login',
    {
        username: 'robby',
        password: '123456',
    },
    {
        cache: {
            cacheType: 'ram', // ram: 内存，session: sessionStorage，local：localStorage
            cacheTime: 1000 * 60 * 3, // 缓存时间：默认3min
        },
    },
)
    .then((res) => {
        // do something
    })
    .catch((err) => {
        // 处理异常
    });
```

若 `cache` 传 `true`，则默认使用 `ram` 缓存类型，缓存时间 3min。

### 结合 use 使用

```js
import { useRequest } from '@fesjs/fes';

export default {
    setup() {
        const { loading, data, error } = useRequest('/api/login', {
            username: 'robby',
            password: '123456',
        });

        return {
            loading,
            data,
            error,
        };
    },
};
```

## 2.x 升级到 3.x

1. 删除 dataField 配置，通过 dataHandler 实现类似功能，详情看上文案例
2. errorHandler 改成了函数了，异常处理逻辑，查看上文案例
3. 废弃 base 参数，用 baseURL
4. 移除 skipErrorHandler 参数，目前还做了兼容，最好用 dataHandler 和 errorHandler 代替
