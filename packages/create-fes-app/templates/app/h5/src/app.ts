import { defineRuntimeConfig } from '@fesjs/fes'
import { isPlainObject } from 'lodash-es'

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
          return Promise.reject(data)
        }
        return data?.result ? data.result : data
      }
      return data
    },
    // http 异常，和插件异常
    errorHandler(error) {
      // 处理业务异常，例如上述 transformData 抛出的异常
      if (error.code) {
        console.log(error.msg)
      }
      else if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(`服务异常：${error.response.status}`)
      }
      else {
        // 请求异常
        console.log(error.msg || error.message || `请求失败`)
      }
    },
  },
})
