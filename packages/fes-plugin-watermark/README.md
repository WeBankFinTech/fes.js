
## Fes.js 是什么？
Fes.js 是一个好用的前端应用解决方案。提供覆盖编译构建到代码运行的每个生命周期的插件体系，支持各种功能扩展和业务需求。以 路由为基础，同时支持配置式路由和约定式路由，保证路由的功能完备。整体上以约定、配置化、组件化的设计思想，让用户仅仅关心用组件搭建页面内容。基于Vue.js3.0，充分利用Vue丰富的生态。技术曲线平缓，上手也简单。在经过多个项目中打磨后趋于稳定。     

它主要具备以下功能：
- 🚀  __快速__ ，内置了路由、开发、构建等，并且提供测试、布局、权限、国际化、状态管理、API请求、数据字典、SvgIcon等插件，可以满足大部分日常开发需求。  
  
- 🧨  __简单__ ，基于Vue.js 3.0，上手简单。贯彻“约定优于配置”思想，设计插件上尽可能用约定替代配置，同时提供统一的插件配置入口，简单简洁又不失灵活。提供一致性的API入口，一致化的体验，学习起来更轻松。

- 💪  __健壮__ ，只需要关心页面内容，减少写BUG的机会！提供单元测试、覆盖测试能力保障项目质量。

- 📦  __可扩展__ ，借鉴Umi实现了完整的生命周期和插件化机制，插件可以管理项目的编译时和运行时，能力均可以通过插件封装进来，在 Fes.js 中协调有序的运行。

- 📡  __面向未来__ ，在满足需求的同时，我们也不会停止对新技术的探索。已使用Vue3.0来提升应用性能，已使用webpack5提升构建性能和实现微服务，未来会探索vite等新技术。

## 插件

|  插件   | 介绍  | 
|  ----  | ----  |
| [@fesjs/plugin-access](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/access.html)  | 提供对页面资源的权限控制能力 | 
| [@fesjs/plugin-enums](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/enums.html#%E4%BB%8B%E7%BB%8D)  | 提供统一的枚举存取及丰富的函数来处理枚举 | 
| [@fesjs/plugin-icon](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/icon.html#%E4%BB%8B%E7%BB%8D)  | svg 文件自动注册为组件 |  
| [@fesjs/plugin-jest](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/jest.html#%E5%90%AF%E7%94%A8%E6%96%B9%E5%BC%8F)  | 基于 `Jest`，提供单元测试、覆盖测试能力 | 
| [ @fesjs/plugin-layout](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/layout.html) |  简单的配置即可拥有布局，包括导航以及侧边栏 |
| [@fesjs/plugin-locale](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/locale.html#%E4%BB%8B%E7%BB%8D) |  基于 `Vue I18n`，提供国际化能力 |
| [@fesjs/plugin-model](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/model.html#%E4%BB%8B%E7%BB%8D) |  简易的数据管理方案 |
| [@fesjs/plugin-request](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/request.html#%E5%90%AF%E7%94%A8%E6%96%B9%E5%BC%8F) |  基于 `Axios` 封装的 request，内置防止重复请求、请求节流、错误处理等功能 |
| [@fesjs/plugin-vuex](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/vuex.html#%E5%90%AF%E7%94%A8%E6%96%B9%E5%BC%8F) |  基于 `Vuex`, 提供状态管理能力 |
| [@fesjs/plugin-qiankun](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/qiankun.html#%E4%BB%8B%E7%BB%8D) |  基于 `qiankun`，提供微服务能力 |
| [@fesjs/plugin-sass](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/sass.html#%E4%BB%8B%E7%BB%8D) |  样式支持sass |
| [@fesjs/plugin-monaco-editor](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/editor.html#%E4%BB%8B%E7%BB%8D) | 提供代码编辑器能力，  基于`monaco-editor`（VS Code使用的代码编辑器） |
| [@fesjs/plugin-windicss](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/windicss.html) | 基于 `windicss`，提供原子化 CSS 能力 |
| [@fesjs/plugin-pinia](https://winixt.gitee.io/fesjs/zh/reference/plugin/plugins/pinia.html) | pinia，状态处理 |

## 像数 1, 2, 3 一样容易
使用 `yarn`：
```bash
# 创建模板
yarn create @fesjs/fes-app myapp

# 安装依赖
yarn 

# 运行
yarn dev
```

使用 `npm`：
```bash
# 创建模板
npx @fesjs/create-fes-app myapp

# 安装依赖
npm install 

# 运行
npm run dev
```

## 反馈

请联系开源助手加入微信群：    

<img src="https://i.loli.net/2020/09/16/sxwr62CKhmYOUyV.jpg" height="250"/> 