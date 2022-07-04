# [3.0.0-beta.13](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.12...v3.0.0-beta.13) (2022-07-04)


### Bug Fixes

* 修复layout的bug ([3e3ee6a](https://github.com/WeBankFinTech/fes.js/commit/3e3ee6a4b44dfb38dca1a569339a1b5fb18ace6e))



# [3.0.0-beta.12](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.11...v3.0.0-beta.12) (2022-06-27)


### Features

* 插件开发文档和模板 ([#135](https://github.com/WeBankFinTech/fes.js/issues/135)) ([3b8af8a](https://github.com/WeBankFinTech/fes.js/commit/3b8af8aacba7afe370635f745e0a95f4784d491b))



# [3.0.0-beta.11](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.10...v3.0.0-beta.11) (2022-06-23)


### Bug Fixes

* 优化项目模板ts配置 ([dd455fb](https://github.com/WeBankFinTech/fes.js/commit/dd455fba7bfba6e2bfa7c45fcfa846861f993ad7))



# [3.0.0-beta.10](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.9...v3.0.0-beta.10) (2022-06-16)



# [3.0.0-beta.9](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.8...v3.0.0-beta.9) (2022-06-16)



# [3.0.0-beta.8](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.7...v3.0.0-beta.8) (2022-06-14)


### Bug Fixes

* 修复qiankun内存泄露 ([5bacf31](https://github.com/WeBankFinTech/fes.js/commit/5bacf31098a51eeb949d75399108da31c8753503))
* 修复乾坤 bug ([2a43385](https://github.com/WeBankFinTech/fes.js/commit/2a433855f0d311298461579da81af83ffbdef255))


### Features

* plugin-layout 多页签可以删除当前页面 ([400d254](https://github.com/WeBankFinTech/fes.js/commit/400d254a4b9969fc76127b587e6267e08702cf5f))



# [3.0.0-beta.7](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.6...v3.0.0-beta.7) (2022-05-25)


### Bug Fixes

* npm 包 ts 文件丢失问题 ([bf4475f](https://github.com/WeBankFinTech/fes.js/commit/bf4475f2405334a50255ee85cde0bf8a078d760b))



# [3.0.0-beta.6](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.5...v3.0.0-beta.6) (2022-05-19)


### Bug Fixes

* polyfill改为使用@vitejs/plugin-legacy ([53c8a33](https://github.com/WeBankFinTech/fes.js/commit/53c8a33aac2e71db9dfc6563adc174a71c27f1c4))



# [3.0.0-beta.5](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2022-05-18)


### Bug Fixes

* **builder-vite:** 修复build时找不到入口js问题 ([fef2aee](https://github.com/WeBankFinTech/fes.js/commit/fef2aeefaea60a1f4e0b2734254a816c88295308))



# [3.0.0-beta.4](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2022-05-17)


### Bug Fixes

* vite忽略@fesjs/fes ([e2c6cd0](https://github.com/WeBankFinTech/fes.js/commit/e2c6cd085f4330d53c2e3b83e59045313b9268b2))



# [3.0.0-beta.3](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.2...v3.0.0-beta.3) (2022-05-17)



# [3.0.0-beta.2](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.1...v3.0.0-beta.2) (2022-05-17)


### Bug Fixes

* initialState存在非setup使用场景,不能使用provide/inject ([45e95a0](https://github.com/WeBankFinTech/fes.js/commit/45e95a0d0afdac6807ca046d9a0b3a09c12b558a))
* 优化模板 ([cfdfd51](https://github.com/WeBankFinTech/fes.js/commit/cfdfd510f3e3491f8efd2f0e86a889770d55e6cf))
* 修正包版本 ([5d6aed8](https://github.com/WeBankFinTech/fes.js/commit/5d6aed8ac09a792d1bb74b8aacad16542f4af051))
* 模板优化 ([55e5a6f](https://github.com/WeBankFinTech/fes.js/commit/55e5a6f15dbaf6633e6f1bd9dad092a28f7b55bf))



## [3.0.0-beta.1](https://github.com/WeBankFinTech/fes.js/compare/v2.0.0...v2.1.1) (2022-05-16)

### Bug Fixes

-   编译所有 .vue | .jsx 文件，不管是否在 node_modules ([#101](https://github.com/WeBankFinTech/fes.js/issues/101)) ([1e033d4](https://github.com/WeBankFinTech/fes.js/commit/1e033d488fe5ed58fbcc9731ac3ebd5dad9319b3))
-   当 public 文件夹下没有可 copy 的文件会造成编译失败 ([#123](https://github.com/WeBankFinTech/fes.js/issues/123)) ([ad60fb5](https://github.com/WeBankFinTech/fes.js/commit/ad60fb5bb70f9114f72b4bc590179accccb85427))
-   检测 vue 和@vue/compiler-sfc 的版本,保证一致 ([8e39dcf](https://github.com/WeBankFinTech/fes.js/commit/8e39dcf2c2206d64ba37b986de78f9d1b80f9d99))
-   解决 layout menu 空菜单问题 + env 环境覆盖问题 ([afd5497](https://github.com/WeBankFinTech/fes.js/commit/afd5497f797a5b2fd5ef2bff0068d3b62f442e31))
-   解决 windicss 在开发环境 css 加载顺序问题 ([#95](https://github.com/WeBankFinTech/fes.js/issues/95)) ([2981a66](https://github.com/WeBankFinTech/fes.js/commit/2981a66218142c06faf0bbbb42058e43ec6b776c))
-   添加 windi.config.js 文件到 npm 包 ([10d4f31](https://github.com/WeBankFinTech/fes.js/commit/10d4f31205c8f2bd1f141321b51ab7637ef8da81))
-   未正确配置 files ([fb9f7c8](https://github.com/WeBankFinTech/fes.js/commit/fb9f7c84e84d7fa250a60f725521ccea3a902a6b))
-   修复 watch 池为空 ([0d1c717](https://github.com/WeBankFinTech/fes.js/commit/0d1c71767a9f896a0eb5290fc6fb0a63604451dc))
-   修复 webpack 修改文件重复编译问题 ([fb3b5a6](https://github.com/WeBankFinTech/fes.js/commit/fb3b5a6dd15325782b43f7bfe4a4bc765893c0dc))
-   修复一些 bug ([443879b](https://github.com/WeBankFinTech/fes.js/commit/443879bf4ffed6a827c829da33aaef39960db795))
-   修复 father-build 的 ESM 编译异常 ([1523c38](https://github.com/WeBankFinTech/fes.js/commit/1523c380e075c8df6948c73a794bc8344039dd3d))
-   修复 locale 更新设置 fes_locale 标记问题 ([43cc5dd](https://github.com/WeBankFinTech/fes.js/commit/43cc5dda9c7b85eb2fda300af149716d3e482cf7))
-   修复 pc 模板依赖问题 ([0c0bc8a](https://github.com/WeBankFinTech/fes.js/commit/0c0bc8a05b21b83208be2a4b4c314bfa5b4f2d71))
-   修复 peer 依赖错误 ([87039c2](https://github.com/WeBankFinTech/fes.js/commit/87039c27faa02da55d4fdd5c7fcb5de53b8d9c31))
-   修复 qiankun 的 demo ([f46e442](https://github.com/WeBankFinTech/fes.js/commit/f46e442ddf43ff4d67fd340f9945388512c37d8a))
-   修复 vite 版本在 win 下的兼容性问题 ([4a53145](https://github.com/WeBankFinTech/fes.js/commit/4a53145ca6efca153c4140d79a15786102489418))
-   修复 vite 热更新问题 ([7da7a34](https://github.com/WeBankFinTech/fes.js/commit/7da7a348e219759b69920272d09bffb667620e80))
-   修改缓存等级 ([f16579c](https://github.com/WeBankFinTech/fes.js/commit/f16579c5a1ee3cef257251e8ea1b71296792e97e))
-   移除 getHostname、getPort、getServer ([a366f96](https://github.com/WeBankFinTech/fes.js/commit/a366f9694a86ba290c85e0227cbb58cf400add98))
-   移除可有可无代码 ([f715682](https://github.com/WeBankFinTech/fes.js/commit/f715682ccda1fa3b9d46cdcdd3807ceb7135e310))
-   优化 webpack 构建时的信息输出 ([53a8deb](https://github.com/WeBankFinTech/fes.js/commit/53a8deb4f8355a969bf8b87bd4092fb7deff48db))
-   重新梳理构建流程 ([40d8332](https://github.com/WeBankFinTech/fes.js/commit/40d8332030ce92ddfb41340e46a7687ea9c26e80))
-   自定义 config 不兼容 vue-loader 问题 ([e5b1e17](https://github.com/WeBankFinTech/fes.js/commit/e5b1e17b266868ad6637cb6e29f29625b70d1591))
-   await request error ([2c38d20](https://github.com/WeBankFinTech/fes.js/commit/2c38d20841aa95c7950817c3f461a56d972cfb2e))
-   connect-history-api-fallback 挪回 webpack，vite 后续再考虑支持 ([0100b10](https://github.com/WeBankFinTech/fes.js/commit/0100b105674bf13295285ca48c3b0ee069fb491b))
-   export Generator ([5a5d809](https://github.com/WeBankFinTech/fes.js/commit/5a5d80952267fe8f6c031983cd9207a6d4df8ef7))
-   fix docs ([#98](https://github.com/WeBankFinTech/fes.js/issues/98)) ([9aca54c](https://github.com/WeBankFinTech/fes.js/commit/9aca54ce6036dae5f597ac71c0af83f2fe26e579))
-   generate get request url key ([1eb20b0](https://github.com/WeBankFinTech/fes.js/commit/1eb20b03858c609836cb6477170b56617e171a38))
-   plugin-icon 压缩问题 ([5d5829d](https://github.com/WeBankFinTech/fes.js/commit/5d5829d9097a9f6ec8652bd94cbb463b89d8652e))
-   **plugin-layout:** 多页签标题正确显示 ([fb6b7c3](https://github.com/WeBankFinTech/fes.js/commit/fb6b7c339bd1c44148110a6ca97459f58bdb168e))
-   **plugin-layout:** 修复多页签 layout 设置为 false 依然显示的问题 ([f213d7c](https://github.com/WeBankFinTech/fes.js/commit/f213d7cc4963b07e1c0bb1b203e53d47125d65d8))
-   **plugin-layout:** layout 的 aside 宽度未跟随配置改变 ([65de66c](https://github.com/WeBankFinTech/fes.js/commit/65de66c5d8a033966c9f06e20463d9b93b82d91f))
-   **plugin-layout:** main 需要设置 z-index:0 ([a678db4](https://github.com/WeBankFinTech/fes.js/commit/a678db45a59b9462a9b36aaba93040c2b83ef3f2))
-   plugin-locale 兼容 composition 场景变更 locale ([f94b00a](https://github.com/WeBankFinTech/fes.js/commit/f94b00a7229f2892ac88323e4972ad2561469bd1))
-   **plugin-qiankun:** 修复更新 props 时,model 未响应式更新 ([4a30416](https://github.com/WeBankFinTech/fes.js/commit/4a304163e364e38275d6524e01997e6e36063839))
-   plugin-qiankun 修复主应用更新 props 不触发 update ([c0cc29d](https://github.com/WeBankFinTech/fes.js/commit/c0cc29da4432db5acf5fc513327af3e2ad375654))
-   plugin-request ([1fc01ba](https://github.com/WeBankFinTech/fes.js/commit/1fc01ba05fed1226b833ddf23c703b325d2db00a))
-   qiankun demo ([4caf8fa](https://github.com/WeBankFinTech/fes.js/commit/4caf8fa0fa1620f456bb08d1feb86f766ebd1051))
-   request cache 异常 ([5c6a7ef](https://github.com/WeBankFinTech/fes.js/commit/5c6a7ef788d215e924f6a4823600aaa5158beee8))
-   request response 问题 ([4786541](https://github.com/WeBankFinTech/fes.js/commit/4786541c56c933c6226570ee790de467e7e71691))
-   request skipErrorHandler 配置问题 ([#121](https://github.com/WeBankFinTech/fes.js/issues/121)) ([c946536](https://github.com/WeBankFinTech/fes.js/commit/c946536e8e1092f8c7b94c6a8c50fd6d17601bea))
-   run vite ([c04148f](https://github.com/WeBankFinTech/fes.js/commit/c04148f84dd71dab89bd8dbb2b74ac6944f10723))
-   template 需要 watermark 依赖 ([2ca3951](https://github.com/WeBankFinTech/fes.js/commit/2ca3951c3f0cbfde47161a37620660c12653f2cc))
-   vite polyfill 问题 ([b5d28c5](https://github.com/WeBankFinTech/fes.js/commit/b5d28c598999967c7d8606a01cb77c4080308d9b))
-   vue and @vue/compiler-sfc version match problem ([57e77d5](https://github.com/WeBankFinTech/fes.js/commit/57e77d54d4b70221223f58b8f908173118e42338))
-   watermark 自定义 container 时样式优化 ([#119](https://github.com/WeBankFinTech/fes.js/issues/119)) ([cb40631](https://github.com/WeBankFinTech/fes.js/commit/cb40631a8641b4ec8dba760f1df97c49003420f0))
-   windicss 配置检测 ([c9ced7e](https://github.com/WeBankFinTech/fes.js/commit/c9ced7e1b861171d45fc890e973c5c999441fa20))
-   windows 问题 ([5724cbd](https://github.com/WeBankFinTech/fes.js/commit/5724cbd8f3e7510394c525f66fa20e1761461686))

### Features

-   plugin-watermark 提供 destroyWatermark ([#124](https://github.com/WeBankFinTech/fes.js/issues/124)) ([70b034a](https://github.com/WeBankFinTech/fes.js/commit/70b034a3513b56f6814ed89d0f84ee18733beba2))
-   编译支持 ts ([37ab86c](https://github.com/WeBankFinTech/fes.js/commit/37ab86c7b35397e24d3e364caebd3f942be511c6))
-   插件改为使用 fes-design ([700b0f9](https://github.com/WeBankFinTech/fes.js/commit/700b0f9747a249a3bef318d9a550004678f05257))
-   初步实现 vite dev 构建 ([31ff105](https://github.com/WeBankFinTech/fes.js/commit/31ff10532efc5fac4d6a95a0e703e4bc4e6eff36))
-   当 build-in 版本变化时,缓存失效 ([1bfb4b1](https://github.com/WeBankFinTech/fes.js/commit/1bfb4b1c1a3ec1b88fcd8f25a2b0697b701c4dc5))
-   更改打版本策略 ([1bfea84](https://github.com/WeBankFinTech/fes.js/commit/1bfea84ff0610a360dcceeba1442a29dd8da45e4))
-   更新 readme ([7ba9c67](https://github.com/WeBankFinTech/fes.js/commit/7ba9c677ee34bf104315d2fb312406a969f5d734))
-   更新 readme ([24760eb](https://github.com/WeBankFinTech/fes.js/commit/24760eb2d883bd17e6ca5dbad3b3502c23459b69))
-   更新 readme ([058e72c](https://github.com/WeBankFinTech/fes.js/commit/058e72cbb392f3dfb613448f08febf26ad68730e))
-   构建类型定义 ([023b223](https://github.com/WeBankFinTech/fes.js/commit/023b223854a24e7f7c64ce13f4298d74ee999fcd))
-   构建类型定义 ([1e2198b](https://github.com/WeBankFinTech/fes.js/commit/1e2198b671cde38d759a48d4af06993cb93bb207))
-   将 ignore vue custom block logic move to preset ([5e5efb2](https://github.com/WeBankFinTech/fes.js/commit/5e5efb276a4ef01c7dbf87249f6de9f6c640006a))
-   路由生成支持 .jsx 后缀 ([7f305bc](https://github.com/WeBankFinTech/fes.js/commit/7f305bc74b898cbe64530574a966bd9f9761dc97))
-   命名 ([0ee6ed2](https://github.com/WeBankFinTech/fes.js/commit/0ee6ed2c834915c5e2d3ec56eb877104912d5c2a))
-   升级版本号 ([94fe4e0](https://github.com/WeBankFinTech/fes.js/commit/94fe4e068956245de612ffd38152bbfb2ba7c889))
-   升级 fes-design ([ec75e40](https://github.com/WeBankFinTech/fes.js/commit/ec75e406c05fe267591ed7ff6f0e0e6a102f0b61))
-   升级 fes-design 到 0.5.0 ([2bcd10c](https://github.com/WeBankFinTech/fes.js/commit/2bcd10ccf90a372146d9b47a168d9fd084a820f2))
-   使用最新版 layout 和 locale ([6d2dedf](https://github.com/WeBankFinTech/fes.js/commit/6d2dedf44a91647c9f286aba38d80e339db6e2ac))
-   使用最新版 layout 和 locale ([2994164](https://github.com/WeBankFinTech/fes.js/commit/299416497e1908cc3ce8abaeb5527bfdfe7c3468))
-   添加一些描述文件 ([14d3f4b](https://github.com/WeBankFinTech/fes.js/commit/14d3f4bd0ff7543d4f2f3f44b0a2cd293c103a6c))
-   添加一些描述文件 ([3ffab50](https://github.com/WeBankFinTech/fes.js/commit/3ffab500966f513c74b6f9e7549201544deb6a96))
-   统一 core-js 版本 ([8a1a1fc](https://github.com/WeBankFinTech/fes.js/commit/8a1a1fc772c30966016949a9e8841e21b4bce374))
-   完善 vite build ([049c953](https://github.com/WeBankFinTech/fes.js/commit/049c9532de2e7315e654b232f0faa53b6f8e9961))
-   页面支持 tsx，提供 defineRoute 配置 tsx 和 jsx 的 route ([#106](https://github.com/WeBankFinTech/fes.js/issues/106)) ([5b1553e](https://github.com/WeBankFinTech/fes.js/commit/5b1553ef5856b56b96ae8b12e3ddd1fb478a7a32))
-   优化 dataField 逻辑 ([51c83c2](https://github.com/WeBankFinTech/fes.js/commit/51c83c2df270645ce7d9444dc042338a0571c7c7))
-   优化 release 流程 ([562fc00](https://github.com/WeBankFinTech/fes.js/commit/562fc003b208465c379b4516b471a5cac48fd8f1))
-   优化 vue-i18n 引入 ([67657ab](https://github.com/WeBankFinTech/fes.js/commit/67657ab9e32969c62f80fcfcdf30dbf8a0d3e516))
-   优化 webpack 信息输出 ([2f1c551](https://github.com/WeBankFinTech/fes.js/commit/2f1c5515226a00cc8856297046ab0d224a2aef77))
-   优化 windicss 配置 ([#104](https://github.com/WeBankFinTech/fes.js/issues/104)) ([d1c93bd](https://github.com/WeBankFinTech/fes.js/commit/d1c93bd4353ce890a5f67756c0df17550eb58756))
-   优化按路由导出多 html 的 title 逻辑 ([0f0c646](https://github.com/WeBankFinTech/fes.js/commit/0f0c646ceda2492fcc8aaf5b2abbc2c9f6224303))
-   优化包依赖 + 优化 fes-plugin-test ([67b7436](https://github.com/WeBankFinTech/fes.js/commit/67b74367ed625da3f3fd82e7daa7006413a66e68))
-   优化构建 ([242787c](https://github.com/WeBankFinTech/fes.js/commit/242787c3581edb8837077ee8997016eb495f7e69))
-   优化依赖版本 ([d31d07b](https://github.com/WeBankFinTech/fes.js/commit/d31d07bbbbcb08464bb9cc49ec612a95022ef28e))
-   优化源码测试 ([876cac7](https://github.com/WeBankFinTech/fes.js/commit/876cac7b9d9c2b414f7d4a74b1c108adc8641089))
-   优化 mock ([81d3405](https://github.com/WeBankFinTech/fes.js/commit/81d34052516f82906c6f95266689f09a4c367031))
-   增加乾坤构建提示 ([59ca087](https://github.com/WeBankFinTech/fes.js/commit/59ca087b23a1eb84780d191887780bac542281ff))
-   针对请求文件的情况进行优化 ([#91](https://github.com/WeBankFinTech/fes.js/issues/91)) ([e00acc4](https://github.com/WeBankFinTech/fes.js/commit/e00acc4a7e2c966833b4a4cf361d0320f96a7038))
-   支持按路由编译出.html 文件 ([04a33d2](https://github.com/WeBankFinTech/fes.js/commit/04a33d2c6870f1c14321f7055758940dd4ba98e8))
-   支持 keep-alive ([444ed4b](https://github.com/WeBankFinTech/fes.js/commit/444ed4ba3c9be9864c9a7811224e6d1d805aad1b))
-   支持 pnpm ([8528e24](https://github.com/WeBankFinTech/fes.js/commit/8528e24599f475c5b8912e68c1cd99e3eed88241))
-   支持 pnpm ([0fac113](https://github.com/WeBankFinTech/fes.js/commit/0fac113adec018391bb6c90a6d734f7c8b1e403f))
-   重写源码编译 ([209b0c0](https://github.com/WeBankFinTech/fes.js/commit/209b0c0525c39a75cb70772d7140b1f565e6a213))
-   app 入口文件支持 .tsx, .jsx 后缀 ([7fc5d63](https://github.com/WeBankFinTech/fes.js/commit/7fc5d63abd8d24d031b70d38e4d2f0c9b25b52ec))
-   enums 和 vuex 构建配置提示 ([972518f](https://github.com/WeBankFinTech/fes.js/commit/972518ff9ce5b952c83a650efc5a3a8cb1e59930))
-   **fes-plugin-monaco-editor:** 新增 monaco-editor 插件,提供编辑器能力 ([74cf05e](https://github.com/WeBankFinTech/fes.js/commit/74cf05e15e3d29677cf9bfb18b869e8e7b83480c))
-   layout/locale/editor/sass 等插件兼容 vite ([15c93eb](https://github.com/WeBankFinTech/fes.js/commit/15c93eb80e17fdb15a926b0e2450a4bc57be93b7))
-   patchRoutes 延后,放在 createRouter 之前执行 ([b4fe951](https://github.com/WeBankFinTech/fes.js/commit/b4fe951859d99df77b5df0be99f53826a6b14e57))
-   **plugin-layout:** 菜单支持配置额外的匹配规则 ([c998c39](https://github.com/WeBankFinTech/fes.js/commit/c998c39559de95684f7e1a62786ed054ec9c3750))
-   **plugin-layout:** 菜单支持配置额外的匹配规则 ([ab949fb](https://github.com/WeBankFinTech/fes.js/commit/ab949fb6a8da282f964570f87080dc22aa2c7e9c))
-   **plugin-layout:** 区域展示支持全局配置 ([0f3a4e7](https://github.com/WeBankFinTech/fes.js/commit/0f3a4e793a05df4fbc169828a116c8b7d7b6ce72))
-   plugin-layout 支持运行时配置编译时的参数 ([12418f2](https://github.com/WeBankFinTech/fes.js/commit/12418f2ffe79eebd48c7fcadf9826da0d0611723))
-   plugin-pinia ([476b7bf](https://github.com/WeBankFinTech/fes.js/commit/476b7bfe660dd39079408e1d642d793a924b91ef))
-   qiankun 支持多页签 keepalive ([#117](https://github.com/WeBankFinTech/fes.js/issues/117)) ([41b8433](https://github.com/WeBankFinTech/fes.js/commit/41b843396c04cb91093c503a50f0daf9cc21b8d0))
-   qiankun 主应用 vite 改造 ([116bf5f](https://github.com/WeBankFinTech/fes.js/commit/116bf5f39a9f84edf233b6ffb36cfa33966e63cc))
-   upgrade windicss-webpack-plugin ([7ddf1b7](https://github.com/WeBankFinTech/fes.js/commit/7ddf1b7aff35fcaa1cdc7f97ff8f93b08e30ac93))
-   vite 的 mock 也改为 express 语法 ([5117afc](https://github.com/WeBankFinTech/fes.js/commit/5117afc9c51a8a4e847112d443e59c05f8188eac))
-   watermark ([#112](https://github.com/WeBankFinTech/fes.js/issues/112)) ([98bae6d](https://github.com/WeBankFinTech/fes.js/commit/98bae6d141de6a7b88fbaf625c6a6593d6edbc85))
-   watermark 默认样式优化 ([#116](https://github.com/WeBankFinTech/fes.js/issues/116)) ([ae84ba3](https://github.com/WeBankFinTech/fes.js/commit/ae84ba3bae4e3f2a283ca30acf6dc39e9694dcdb))
-   windicss ([5747466](https://github.com/WeBankFinTech/fes.js/commit/5747466c43ee6cb76dc090f9862a38fe38884bdf))
-   windicss ([895e47c](https://github.com/WeBankFinTech/fes.js/commit/895e47c857f49c786ca12d476a06b2d7c63a9460))

<!-- DO NOT CHANGE THESE COMMENTS - See .github/actions/trigger-github-release/update-changelog.js -->
<!-- insert-new-changelog-here -->

## [2.0.0](https://github.com/WeBankFinTech/fes/compare/v0.2.3...v2.0.0) (2021-07-01)

### 🚀 New Feature

发布 2.0.0，重构 90%以上的代码，以 Vue 3.0 和路由为基础，同时支持配置式路由和约定式路由，并以此进行功能扩展。匹配了覆盖编译时和运行时生命周期完善的插件体系，支持各种功能扩展和业务需求。

支持插件如下：

1. @fesjs/plugin-access 提供对页面资源的权限控制能力
2. @fesjs/plugin-enums 提供统一的枚举存取及丰富的函数来处理枚举
3. @fesjs/plugin-icon svg 文件自动注册为组件
4. @fesjs/plugin-jest 基于 Jest，提供单元测试、覆盖测试能力
5. @fesjs/plugin-layout 简单的配置即可拥有布局，包括导航以及侧边栏
6. @fesjs/plugin-locale 基于 Vue I18n，提供国际化能力
7. @fesjs/plugin-model 简易的数据管理方案
8. @fesjs/plugin-request 基于 Axios 封装的 request，内置防止重复请求、请求节流、错误处理等功能
9. @fesjs/plugin-vuex 基于 Vuex, 提供状态管理能力
10. @fesjs/plugin-qiankun 基于 qiankun，提供微服务能力
11. @fesjs/plugin-sass 样式支持 sass

## [0.2.3](https://github.com/WeBankFinTech/fes/compare/v0.2.2...v0.2.3) (2020-09-25)

### :bug: Bug Fix

-   fes-template 列表页中日期组件的 value 值不能为“” ([3cc894e](https://github.com/WeBankFinTech/fes/commit/3cc894e)) by: **harrywan**

### :memo: Documentation

-   更新 affix 组件 ([a897c3d](https://github.com/WeBankFinTech/fes/commit/a897c3d)) by: **harrywan**
-   更新在线文档入口地址 ([2114e39](https://github.com/WeBankFinTech/fes/commit/2114e39)) by: **harrywan**
-   替换图片 ([04c905b](https://github.com/WeBankFinTech/fes/commit/04c905b)) by: **harrywan**

## [0.2.2](https://github.com/WeBankFinTech/fes/compare/v0.2.1...v0.2.2) (2020-09-23)

### :bug: Bug Fix

-   解决 fes-cli build 异常 ([cbbc29f](https://github.com/WeBankFinTech/fes/commit/cbbc29f)) by: **bac-joker**, closes [#20](https://github.com/WeBankFinTech/fes.js/issues/20)

## [0.2.1](https://github.com/WeBankFinTech/fes/compare/v0.2.0...v0.2.1) (2020-09-20)

### 🐛 Bug Fixes

-   **fes-template:** solve the corejs3.x dependency problem ([e3e43c3](https://github.com/WeBankFinTech/fes/commit/e3e43c3))

## 0.2.0

### 🚀 New Feature

1. fes-cli 构架支持 gzip
2. fes-cli 支持路由懒加载
3. 添加在线[demo](http://webank.gitee.io/fes-pro/#/home)

### 🐛 Bug Fix

1. fes-cli 支持 global 全局安装，关闭[issues/17](https://github.com/WeBankFinTech/fes.js/issues/17)
2. 解决 layout 布局的 FesHeader 和 FesLeft 不生效问题
3. 更新文档中描述不准备的地方。

## 0.1.0

### 功能改进

#### fes-cli v0.1.4

-   去掉编译打包时时配置 BannerPlugin，关闭[issues/7](https://github.com/WeBankFinTech/fes.js/issues/7)
-   `fes init`改为从 npm 下载项目模板，避免频繁更新项目模板而需要更新`fes`
-   下载模板后不默认执行`git init`，避免未安装 git 带来的问题。

#### fes-core v0.1.2

-   Fes-Core 替换 Icon 组件为 ionicons 图标。
-   首次运行时，跳转路由改为直接跳转到 defaultPage，而不是通过设置根路由"/"的 redirect，优化体验。

#### fes-template v0.1.3

-   项目中`@webank/fes-core`和`@webank/fes-ui`的依赖直接在项目模板 package.json 中指定，优化体验。
-   整理项目模板，方便体验权限管理功能。

#### fes-ui v0.1.1

-   修复`Layout`组件`offset`属性不生效

#### 文档

-   修复在线文档未正常渲染的问题。
-   更新文档中描述不准备的地方。
