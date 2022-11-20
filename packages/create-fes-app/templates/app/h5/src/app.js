import { defineRuntimeConfig } from '@fesjs/fes';

export default defineRuntimeConfig({
    request: {
        // API  前缀
        baseURL: '',
        dataHandler(data, response) {
            // 处理响应内容异常
            if (data.code !== '0') {
                if (data.code === '20000') {
                    console.log('hello world');
                }
                throw new Error(response);
            }
            // 响应数据格式化
            return data?.result ? data.result : data;
        },
        // http 异常，和插件异常
        errorHandler(error) {
            if (error.response) {
                // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // 请求已经成功发起，但没有收到响应
                // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
                // 而在node.js中是 http.ClientRequest 的实例
                console.log(error.request);
            } else if (error.type) {
                // 插件异常
                console.log(error.msg);
            } else {
                // 发送请求时出了点问题
                console.log('Error', error.message);
            }
            console.log(error.config);
        },
        // 请求拦截器
        requestInterceptors: [],
        // 响应拦截器
        responseInterceptors: [],
    },
});
