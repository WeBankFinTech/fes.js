import { defineRuntimeConfig } from '@fesjs/fes';

export default defineRuntimeConfig({
    request: {
        baseURL: '/ras-mas',
        responseDataAdaptor() {},
        dataHandler(data) {
            console.log('data', data);
            if (data?.code !== '0') {
                if (data.code === '10000') {
                    console.log('code', data.code);
                }
                if (data?.code === '20000') {
                    console.log('code', data.code);
                }
                throw new Error(data);
            }
            return data.result ? data.result : data;
        },
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
            console.log('error', error.config);
        },
    },
    patchRoutes: () => {
        console.log('patchRoutes');
    },
});
