# @fesjs/plugin-request

基于 fetch 封装的 request，内置防止重复请求、请求缓存、错误处理等功能。

## 启用方式

在 `package.json` 中引入依赖：

```json
{
    "dependencies": {
        "@fesjs/fes": "^3.0.0",
        "@fesjs/plugin-request": "^4.0.0-beta.0"
    }
}
```

## 运行时配置

入口文件的全局配置，具体请求的配置参数会覆盖全局配置，支持 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included) 所有的参数。

```js
import { defineRuntimeConfig } from '@fesjs/fes';

export default defineRuntimeConfig({
    request: {
        baseURL: '',
        timeout: 10000, // 默认 10s
        method: 'POST', // 默认 post
        mergeRequest: false, // 是否合并请求
        responseType: null, // 可选 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'，默认根据 content-type 处理
        credentials: 'include', // 默认 include, 'include' | 'same-origin' | 'omit'
        headers: {}, // 传给服务器的 header
        cacheData: false, // 是否缓存
        requestInterceptor: (config: Config) => Config,
        responseInterceptor: (response: RequestResponse) => RequestResponse,
        transformData(data, response) {
            // 处理响应内容异常
            if (isPlainObject(data)) {
                if (data.code === '10000') {
                    return Promise.reject(data);
                }
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
            } else if (error.msg) {
                console.log(error.msg);
            } else {
                // 发送请求时出了点问题
                console.log('Error', error.message);
            }
            console.log(error.config);
        },
        // 支持其他 fetch 配置
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
    -   options: 配置支持 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#sending_a_request_with_credentials_included) 所有的参数，和插件扩展参数。

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
        cacheData: {
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

若 `cacheData` 传 `true`，则默认使用 `ram` 缓存类型，缓存时间 3min。

### 请求 abort

```javascript
import { request } from '@fesjs/fes';

const controller = new AbortController();
request('/url/abort', null, {
    signal: controller.signal,
}).then((response) => {
    console.log('process response: ' + response);
});
// cancel the request
controller.abort();
```

### 获取 response headers

```javascript
import { rawRequest } from '@fesjs/fes';

const controller = new AbortController();
rawRequest('/url/abort', null, {
    signal: controller.signal,
}).then((response) => {
    console.log('process headers: ' + response.headers);
});
// cancel the request
controller.abort();
```

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

## 3.x 升级到 4.x

1. 缓存参数 cache 改成 cacheData（避免与 fetch 原本的 cache 冲突）
2. dataHandler 改成 transformData
3. requestInterceptors 改为 requestInterceptor，不在支持数组，只支持函数
4. responseInterceptors 改为 responseInterceptor，不在支持数组，只支持函数
5. 其他 axios 特有的配置不在支持
