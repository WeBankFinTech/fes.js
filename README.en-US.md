English | [简体中文](./README.md)


<p align="center">
  <a href="../../">
    <img alt="fes.js" width="250" src="./images/fes-logo.png">
  </a>
</p>

<div align="center">

An excellent front-end solution

[![GitHub issues](https://img.shields.io/github/issues/WeBankFinTech/fes.js.svg?style=flat-square)](../../issues)
[![MIT](https://img.shields.io/dub/l/vibe-d.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](../../pulls)

</div>

- document - [http://fesjs.mumblefe.cn/](http://fesjs.mumblefe.cn/)
- changelog - [CHANGELOG.md](./CHANGELOG.md)
- 3.0 ( vite and webpack ) - [http://fesjs.mumblefe.cn/next/](http://fesjs.mumblefe.cn/next/)

# Pain points
Before developing a front-end project, we may need to do the following preparations：
- Set up a development environment
- Conventional code specification
- Encapsulate API requests
- Configure routing
- Realize layout, menu, navigation
- Realize login
- authority management
- ...

In addition to the preparation work, there are many similar business types. For example, most of the middle and back-end applications are workbenches, additions, deletions, changes, permissions, charts, etc. If each project is completely processed manually, it will not only take time, but over time there may be multiple technology stacks and development specifications, leading to inconsistent development processes and making historical projects more and more difficult to maintain. So we need a complete solution to manage the entire process from development to deployment.


## Fes.js ？
Fes.js is an excellent front-end application solution. Fes.js is based on Vue 3.0 and routing, and supports both configuration routing and convention routing, which can be used for functional expansion. Equipped with a complete plug-in system covering the compile-time and runtime life cycle, it supports various function extensions and business requirements.    

It mainly has the following functions:
- 🚀  __fast__ , Built-in routing, development, construction, etc., and provide plug-ins such as testing, layout, permissions, internationalization, state management, API requests, data dictionary, SvgIcon, etc., which can meet most of the daily development needs.  
  
- 🧨  __easy__ , Based on Vue.js 3.0, easy to get started. Carry out the idea of "Convention is better than configuration", design plug-ins as much as possible to replace configuration with conventions, and provide a unified plug-in configuration entry, which is simple, concise and flexible. Provide a consistent API entry, a consistent experience, and easier learning.

- 💪  __strong__ , Only need to care about the content of the page, reduce the chance of writing BUG! Provide unit testing and coverage testing capabilities to ensure project quality.

- 📦  __expanded__ , Drawing lessons from Umi, it implements a complete life cycle and plug-in mechanism. The plug-in can manage the compile time and runtime of the project, and the capabilities can be encapsulated through the plug-in, and run in an orderly manner in Fes.js.

- 📡  __future__ , While meeting demand, we will not stop exploring new technologies. Vue3.0 has been used to improve application performance, webpack5 has been used to improve construction performance and implement microservices, and new technologies such as vite will be explored in the future.

## Plugins

|  plugin   | introduce  | 
|  ----  | ----  |
| [@fesjs/plugin-access](http://fesjs.mumblefe.cn/reference/plugin/plugins/access.html)  | Provides the ability to control the permissions of page resources | 
| [@fesjs/plugin-enums](http://fesjs.mumblefe.cn/reference/plugin/plugins/enums.html#%E4%BB%8B%E7%BB%8D)  | Provide unified enumeration access and rich functions to handle enumeration | 
| [@fesjs/plugin-icon](http://fesjs.mumblefe.cn/reference/plugin/plugins/icon.html#%E4%BB%8B%E7%BB%8D)  | svg file is automatically registered as a component |  
| [@fesjs/plugin-jest](http://fesjs.mumblefe.cn/reference/plugin/plugins/jest.html#%E5%90%AF%E7%94%A8%E6%96%B9%E5%BC%8F)  | Based on `Jest`, provide unit testing and coverage testing capabilities | 
| [ @fesjs/plugin-layout](http://fesjs.mumblefe.cn/reference/plugin/plugins/layout.html) |  Simple configuration to have a layout, including navigation and sidebar |
| [@fesjs/plugin-locale](http://fesjs.mumblefe.cn/reference/plugin/plugins/locale.html#%E4%BB%8B%E7%BB%8D) |  Based on `Vue I18n`, providing internationalization capabilities |
| [@fesjs/plugin-model](http://fesjs.mumblefe.cn/reference/plugin/plugins/model.html#%E4%BB%8B%E7%BB%8D) |  Simple data management solution |
| [@fesjs/plugin-request](http://fesjs.mumblefe.cn/reference/plugin/plugins/request.html#%E5%90%AF%E7%94%A8%E6%96%B9%E5%BC%8F) |  Based on the request encapsulated by `Axios`, built-in functions such as preventing repeated requests, request throttling, and error handling |
| [@fesjs/plugin-vuex](http://fesjs.mumblefe.cn/reference/plugin/plugins/vuex.html#%E5%90%AF%E7%94%A8%E6%96%B9%E5%BC%8F) |  Based on `Vuex`, provide state management capabilities |
| [@fesjs/plugin-qiankun](http://fesjs.mumblefe.cn/reference/plugin/plugins/qiankun.html#%E4%BB%8B%E7%BB%8D) |  Based on `qiankun`, provide microservice capabilities |
| [@fesjs/plugin-sass](http://fesjs.mumblefe.cn/reference/plugin/plugins/sass.html#%E4%BB%8B%E7%BB%8D) |  Style support sass |
| [@fesjs/plugin-monaco-editor](http://fesjs.mumblefe.cn/reference/plugin/plugins/editor.html#%E4%BB%8B%E7%BB%8D) | Provide code editor capability, based on `monaco-editor` (code editor used by VS Code) |
| [@fesjs/plugin-pinia](http://fesjs.mumblefe.cn/reference/plugin/plugins/pinia.html) | state manager |
| [@fesjs/plugin-watermark](http://fesjs.mumblefe.cn/reference/plugin/plugins/watermark.html) | watermark |

## As easy as counting 1, 2, 3
use `yarn`：
```bash
# Create a template
yarn create @fesjs/fes-app myapp

# Installation dependencies
yarn 

# run
yarn dev
```

use `npm`：
```bash
# Create a template
npx @fesjs/create-fes-app myapp

# Installation dependencies
npm install 

# run
npm run dev
```

## Start On Cloud IDE

[https://idegithub.com/WeBankFinTech/fes.js](https://idegithub.com/WeBankFinTech/fes.js)

## Feedback

| Github Issue  | WeChat group | Fes.js开源运营小助手 |
| --- | --- | --- |
| [@fesjs/fes.js/issues](../../issues) | <img src="https://i.loli.net/2020/09/11/2XhKtPZd6NFVbDE.png" width="250" /> | <img src="https://i.loli.net/2020/09/16/sxwr62CKhmYOUyV.jpg" height="250"/> |


## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](../../issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Community activity

### Fesjs community award-winning essay activity

In order for the Fes.js open source project to run better, and to give back to the open source community, the community launched an award-winning essay event! Everyone is welcome to post practical experience to provide reference for community users and a wider range of developers.

The output of experience can also help your system accumulate your own projects, sort out your work ideas, and also help your technology blog to promote. Good practice cases will have the opportunity to be invited to participate in the project community technical meeting to share, hurry up and participate.     

Please stamp: https://mp.weixin.qq.com/s/nV4NG_OUUrdgtft8g_IW4g
 

