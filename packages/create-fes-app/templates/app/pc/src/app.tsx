import { access, defineRuntimeConfig } from '@fesjs/fes'
import { isPlainObject } from 'es-toolkit/compat'
import PageLoading from '@/components/pageLoading.vue'
import UserCenter from '@/components/userCenter.vue'

export default defineRuntimeConfig({
  beforeRender: {
    loading: <PageLoading />,
    action() {
      const { setRole } = access
      return new Promise((resolve) => {
        setTimeout(() => {
          setRole('admin')
          // 初始化应用的全局状态，可以通过 useModel('@@initialState') 获取，具体用法看@/components/UserCenter 文件
          resolve({
            userName: '李雷',
          })
        }, 1000)
      })
    },
  },
  request: {
    baseURL: '',
    timeout: 10000, // 默认 10s
    method: 'POST', // 默认 post
    mergeRequest: false, // 是否合并请求
    responseType: null, // 可选 'json' | 'text' | 'blob' | 'arrayBuffer' | 'formData'，默认根据 content-type 处理
    credentials: 'include', // 默认 include, 'include' | 'same-origin' | 'omit'
    headers: {}, // 传给服务器的 header
    cacheData: false, // 是否缓存
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

  layout: {
    renderCustom: () => <UserCenter />,
  },
})
