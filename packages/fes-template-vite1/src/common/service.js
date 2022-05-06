import { requestWrap } from '@fesjs/fes';

// TODO
// 响应体控制
// formData 控制
// 错误控制
// 跳错误页面 || 或者重新登录
// 段时间内不能重复发送的请求

// or
export default requestWrap({
    login: {
        url: '',
        throttle: 300,
        options: {
            method: 'get'
        }
    }
});
