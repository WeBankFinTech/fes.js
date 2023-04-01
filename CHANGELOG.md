## [3.0.1](https://github.com/WeBankFinTech/fes.js/compare/v3.0.1-0...v3.0.1) (2023-04-01)


### Features

* change request to fetch ([21c404a](https://github.com/WeBankFinTech/fes.js/commit/21c404aa0701acf75542fd9c4b1c77866dfa744b))



## [3.0.1-0](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.17...v3.0.1-0) (2023-04-01)


### Bug Fixes

* 打开相同path的链接会更新route & 第一次打开会触发onActivated ([#145](https://github.com/WeBankFinTech/fes.js/issues/145)) ([864904e](https://github.com/WeBankFinTech/fes.js/commit/864904e68d5dcb3d7c61ec2e69ecfd6224541f6f))
* 解决 core-js 版本问题 ([#165](https://github.com/WeBankFinTech/fes.js/issues/165)) ([bb51ba1](https://github.com/WeBankFinTech/fes.js/commit/bb51ba18ad82fade940cc34d1243b99a766d0705))
* 解决 webpack 安全漏洞问题 ([#176](https://github.com/WeBankFinTech/fes.js/issues/176)) ([ad352f2](https://github.com/WeBankFinTech/fes.js/commit/ad352f2b442375bd388ae4c400dfd45c1faab1d9))
* 解决 webpack 缓存问题 ([#166](https://github.com/WeBankFinTech/fes.js/issues/166)) ([a9fae0f](https://github.com/WeBankFinTech/fes.js/commit/a9fae0fa7dd35ab40a2bc237be6276896e69d5da))
* 修复 fes-icon 删除 viewBox 导致异常问题 ([#153](https://github.com/WeBankFinTech/fes.js/issues/153)) ([17ab4f2](https://github.com/WeBankFinTech/fes.js/commit/17ab4f2b79954393878f360eaa47c2d81b38bec7))
* 修复watermark插件类型问题 ([fdf548d](https://github.com/WeBankFinTech/fes.js/commit/fdf548d6c38ab8234fb75fc7549f21871f83756c))
* build cache ([a7ed929](https://github.com/WeBankFinTech/fes.js/commit/a7ed9297d4a7d3c39fd2ccf9d9d8869e7cdca56f))
* **built-in:**  规范 beforeRender 逻辑，如果异常，则不应该执行后续的 router.beforeEach ([#179](https://github.com/WeBankFinTech/fes.js/issues/179)) ([07b1d84](https://github.com/WeBankFinTech/fes.js/commit/07b1d844f06cf64304fe15709d96b0e3133c32f4))
* defineRouteMeta parse 异常 ([#151](https://github.com/WeBankFinTech/fes.js/issues/151)) ([7cb69d1](https://github.com/WeBankFinTech/fes.js/commit/7cb69d18439e5b18b5c98d599b86d41c0c28d78e))
* js 语法错误导致 dev 退出 ([#149](https://github.com/WeBankFinTech/fes.js/issues/149)) ([9e3e5c1](https://github.com/WeBankFinTech/fes.js/commit/9e3e5c1aca7f632b1d59dcf08685d9819217009b))
* plugin-locale的legacy默认为false, 最新版vue-i18n中设置为true不支持composition api方式 ([d714a64](https://github.com/WeBankFinTech/fes.js/commit/d714a64b00d9e68c175940e180cec27b5d41f4fe))
* qiankun plugin props error ([#150](https://github.com/WeBankFinTech/fes.js/issues/150)) ([ec1cf5b](https://github.com/WeBankFinTech/fes.js/commit/ec1cf5b4270e13b0f20c96fbf6e3bca7e540eede))
* request cache 类型声明问题 ([3caaf58](https://github.com/WeBankFinTech/fes.js/commit/3caaf58afb97818ef3c67343172531ceb54b4e6b))


### Features

* 对齐 webpack 和 vite 文件输出 ([852aad2](https://github.com/WeBankFinTech/fes.js/commit/852aad294c808d21e730a82b8715116a59018841))
* 给使用mini-css-extract-plugin增加开关 ([#178](https://github.com/WeBankFinTech/fes.js/issues/178)) ([d258a27](https://github.com/WeBankFinTech/fes.js/commit/d258a274baf229a171277978b0cd2e33ae0d133d))
* 优化一些demo ([679b5ce](https://github.com/WeBankFinTech/fes.js/commit/679b5ce3be91b286eebfd341b238e2976fecdc74))
* 优化peer依赖 ([bafa4d0](https://github.com/WeBankFinTech/fes.js/commit/bafa4d08cc88290451191604e9289ab1e8915596))
* 增加bootstrap和clean命令 ([c87be8a](https://github.com/WeBankFinTech/fes.js/commit/c87be8a78803348197a7c9fcd18af0c30ac81755))
* script setup 支持 defineRouteMeta ([#144](https://github.com/WeBankFinTech/fes.js/issues/144)) ([05d593e](https://github.com/WeBankFinTech/fes.js/commit/05d593e0f86b846e94c1cb255c152ec718e1474b))
* template改为使用workspace协议 ([e808556](https://github.com/WeBankFinTech/fes.js/commit/e80855638507e7ccdab8a49757e060083eadd123))



# [3.0.0-rc.17](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.16...v3.0.0-rc.17) (2023-03-17)


### Bug Fixes

* 水印插件兼容微前端场景,应用唯一 ([e7987ee](https://github.com/WeBankFinTech/fes.js/commit/e7987ee60f342e305e4c123a1610ea301f4ebd53))



# [3.0.0-rc.16](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.15...v3.0.0-rc.16) (2023-03-14)


### Bug Fixes

* 修复plugin-access和plugin-layout中noFoundHandler和unAccessHandler的类型错误问题 ([b1adca9](https://github.com/WeBankFinTech/fes.js/commit/b1adca9f117234584bbe67d5d39f5ee91948fcf0))



# [3.0.0-rc.15](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.14...v3.0.0-rc.15) (2023-03-13)


### Bug Fixes

* 修复其他dom变化也会导致水印重新渲染的问题 ([#175](https://github.com/WeBankFinTech/fes.js/issues/175)) ([7c432ba](https://github.com/WeBankFinTech/fes.js/commit/7c432badf6f7563d872da62fbca65c124f4ca4cd))


### Features

* **plugin-layout:** 多页签支持配置title ([#174](https://github.com/WeBankFinTech/fes.js/issues/174)) ([fc4173a](https://github.com/WeBankFinTech/fes.js/commit/fc4173a7e800511ee03abbf5169b2bed5e94beaf))



# [3.0.0-rc.14](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.13...v3.0.0-rc.14) (2023-03-06)


### Bug Fixes

* 修复plugin-layout中计算默认展开菜单未考虑未配置在菜单的路由场景 ([#172](https://github.com/WeBankFinTech/fes.js/issues/172)) ([943ffba](https://github.com/WeBankFinTech/fes.js/commit/943ffba07ff0e201635d4f01d6126bdd5829d0ef))



# [3.0.0-rc.13](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.12...v3.0.0-rc.13) (2023-03-01)


### Bug Fixes

* cjs ([862ba3c](https://github.com/WeBankFinTech/fes.js/commit/862ba3cf9c7d123755f908e5aabb01ca553355e6))
* css ([8ef9a1c](https://github.com/WeBankFinTech/fes.js/commit/8ef9a1c862055d1b1ee8a8f0daac43cd4ef23b57))
* exclude ([9204184](https://github.com/WeBankFinTech/fes.js/commit/92041845c68320f7b68da8825e0be350c82cd67a))
* keep browsers ([9d6b32b](https://github.com/WeBankFinTech/fes.js/commit/9d6b32be88aba540e6b4b5334f9f9c92285abcd8))
* minify ([bda1bb4](https://github.com/WeBankFinTech/fes.js/commit/bda1bb4cf53e7b9dd12d74e4eff416c80857e763))
* rm swc/css ([0e05f23](https://github.com/WeBankFinTech/fes.js/commit/0e05f23bc15d86170d44b86ed6bf3dc9adbec65e))
* swc/css ([2d92ad8](https://github.com/WeBankFinTech/fes.js/commit/2d92ad883f16467b6a306cbc66b961ab9e22bafe))
* swc/css ([c4fd1f6](https://github.com/WeBankFinTech/fes.js/commit/c4fd1f6fea3be84f19c65ff048290684abb21e1f))
* targets ([acb27c4](https://github.com/WeBankFinTech/fes.js/commit/acb27c4c918fa91e04540a3eb44435936c34f556))
* 固定corejs版本吧 ([f823a8c](https://github.com/WeBankFinTech/fes.js/commit/f823a8cf5e8c284487c5c3efb7fb4b11ac0bb58f))


### Features

* log more error ([f5dddd7](https://github.com/WeBankFinTech/fes.js/commit/f5dddd770057f562bcff24bdc3bf3e18fad54aa1))
* plugin-swc ([e05fb32](https://github.com/WeBankFinTech/fes.js/commit/e05fb32a76c7ef309f17ada1ed4bc340886d768b))
* swc/css ([a9c8469](https://github.com/WeBankFinTech/fes.js/commit/a9c8469b9592b4bff9639488b50d01ffd2e09278))
* use swc with webpack ([3c7edef](https://github.com/WeBankFinTech/fes.js/commit/3c7edefc622046d012701c86efbc87a5acb805c9))
* 升级swc版本 ([3211408](https://github.com/WeBankFinTech/fes.js/commit/32114081336d00f717bbc04ce9b3de2fbe42fce8))
* 只在prod开压缩 ([bca7273](https://github.com/WeBankFinTech/fes.js/commit/bca727338bc8220e7a8051609fdc1d75a37216fe))


### Reverts

* devtool ([db6f279](https://github.com/WeBankFinTech/fes.js/commit/db6f2799efae436843d89e2abcd6600e4fc52d52))



# [3.0.0-rc.12](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.11...v3.0.0-rc.12) (2023-02-27)


### Bug Fixes

* 修复 ts 类型声明问题 ([159fcf0](https://github.com/WeBankFinTech/fes.js/commit/159fcf013bb795d457f79a32bd8756149b9fff23))



# [3.0.0-rc.11](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.10...v3.0.0-rc.11) (2023-02-21)


### Bug Fixes

* .d.ts 类型异常 ([5d537c5](https://github.com/WeBankFinTech/fes.js/commit/5d537c55c0c3d409afa04c600954aefa77a6c57b))



# [3.0.0-rc.10](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.9...v3.0.0-rc.10) (2023-02-21)


### Bug Fixes

* layout插件菜单会自动展开当前路由 & 修复之前不合理用法 ([#171](https://github.com/WeBankFinTech/fes.js/issues/171)) ([e3bd573](https://github.com/WeBankFinTech/fes.js/commit/e3bd57342957124fe09db98b37231e7749b6a94d))



# [3.0.0-rc.9](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.8...v3.0.0-rc.9) (2023-01-30)


### Bug Fixes

* fix login plugin build error ([#169](https://github.com/WeBankFinTech/fes.js/issues/169)) ([a1cbdb5](https://github.com/WeBankFinTech/fes.js/commit/a1cbdb558f7f361993dc66d8d12eb65baeba3034))



# [3.0.0-rc.8](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.7...v3.0.0-rc.8) (2023-01-11)


### Features

* 添加 login 插件 ([#168](https://github.com/WeBankFinTech/fes.js/issues/168)) ([8332b11](https://github.com/WeBankFinTech/fes.js/commit/8332b1114ce73b49a5facb251a045edef019b232))



# [3.0.0-rc.7](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.6...v3.0.0-rc.7) (2023-01-06)


### Bug Fixes

* 解决 core-js 版本问题 ([#164](https://github.com/WeBankFinTech/fes.js/issues/164)) ([eee453b](https://github.com/WeBankFinTech/fes.js/commit/eee453b601c0799b4c4836e8dbde77e80e0871f8))
* webpack 缓存不断叠加 ([#167](https://github.com/WeBankFinTech/fes.js/issues/167)) ([ab4cc6a](https://github.com/WeBankFinTech/fes.js/commit/ab4cc6a5a8d6f99921597720d184cc3efe13b100))


### Features

* **build script:** generate sourcemap for developer ([#162](https://github.com/WeBankFinTech/fes.js/issues/162)) ([22000e4](https://github.com/WeBankFinTech/fes.js/commit/22000e4f9c254e1597c750c1f1f3a36c5672547b))



# [3.0.0-rc.6](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.5...v3.0.0-rc.6) (2022-12-11)


### Features

* upgrade vite4.x ([#160](https://github.com/WeBankFinTech/fes.js/issues/160)) ([3b0ab19](https://github.com/WeBankFinTech/fes.js/commit/3b0ab19bf195f96957c23dda28540be5c2d1407a))



# [3.0.0-rc.5](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.4...v3.0.0-rc.5) (2022-12-07)


### Features

* 支持配置选择vite ([#159](https://github.com/WeBankFinTech/fes.js/issues/159)) ([42b83cc](https://github.com/WeBankFinTech/fes.js/commit/42b83cc54fdea8163b394e17f6660d10246806b5))



# [3.0.0-rc.4](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.3...v3.0.0-rc.4) (2022-11-29)


### Features

* qiankun插件支持vite ([#157](https://github.com/WeBankFinTech/fes.js/issues/157)) ([5c44181](https://github.com/WeBankFinTech/fes.js/commit/5c44181fcd8d9fdbe2f8d99ce7421587079c7296))



# [3.0.0-rc.3](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.2...v3.0.0-rc.3) (2022-11-25)


### Bug Fixes

* 修复 viteLegacy 配置问题 ([aec267f](https://github.com/WeBankFinTech/fes.js/commit/aec267f83ff0486b78f3b33f97b8608fc4e1833f))
* 修复 windows 兼容问题 ([9a518bc](https://github.com/WeBankFinTech/fes.js/commit/9a518bcb9598798498064c948da698511cbb5189))
* remove Created by MumbleFE ([b6ba33d](https://github.com/WeBankFinTech/fes.js/commit/b6ba33df6e945d7e78feb209d2117370fbf47322))



# [3.0.0-rc.2](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-rc.1...v3.0.0-rc.2) (2022-11-17)


### Bug Fixes

* 导出 RequestOptions 类型 ([03e98ac](https://github.com/WeBankFinTech/fes.js/commit/03e98ac667f92dbcbd0b90033b7a29695d2d2426))
* 修复 request ts 类型提示问题 ([2469009](https://github.com/WeBankFinTech/fes.js/commit/246900923a71b872cda37003c08fae3046d250d9))



# [3.0.0-beta.32](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.31...v3.0.0-beta.32) (2022-11-15)


### Bug Fixes

* 修复 request ts 类型提示问题 ([2469009](https://github.com/WeBankFinTech/fes.js/commit/246900923a71b872cda37003c08fae3046d250d9))



# [3.0.0-beta.31](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.29...v3.0.0-beta.31) (2022-11-10)


### Bug Fixes

* 解决 ts 提示问题 ([#155](https://github.com/WeBankFinTech/fes.js/issues/155)) ([92e154e](https://github.com/WeBankFinTech/fes.js/commit/92e154e48b0f057f1d4525d59f089d2fb6edcdd9))


### Features

* 路由支持配置base & plugin-locale插件legacy默认false ([#154](https://github.com/WeBankFinTech/fes.js/issues/154)) ([104571b](https://github.com/WeBankFinTech/fes.js/commit/104571b2a4a78b6df18f4ef9288668d245ca88ab))



# [3.0.0-beta.30](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.29...v3.0.0-beta.30) (2022-11-10)


### Bug Fixes

* 解决 ts 提示问题 ([#155](https://github.com/WeBankFinTech/fes.js/issues/155)) ([92e154e](https://github.com/WeBankFinTech/fes.js/commit/92e154e48b0f057f1d4525d59f089d2fb6edcdd9))


### Features

* 路由支持配置base & plugin-locale插件legacy默认false ([#154](https://github.com/WeBankFinTech/fes.js/issues/154)) ([104571b](https://github.com/WeBankFinTech/fes.js/commit/104571b2a4a78b6df18f4ef9288668d245ca88ab))



# [3.0.0-beta.29](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.28...v3.0.0-beta.29) (2022-11-09)


### Bug Fixes

* 优化类型声明 ([cb1af88](https://github.com/WeBankFinTech/fes.js/commit/cb1af88de67397fc739cb8e24e70d7be11404f56))



# [3.0.0-beta.28](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.27...v3.0.0-beta.28) (2022-11-07)


### Bug Fixes

* 修复 icon-plugin viewBox 删除问题 ([e4f3dff](https://github.com/WeBankFinTech/fes.js/commit/e4f3dff7fafa87acf576c50c9415b2afdbb5ab04))
* config 不是 json 格式导致 dev 退出 ([a384335](https://github.com/WeBankFinTech/fes.js/commit/a384335534f956769103b2343bc2c2ca8bed1f98))
* defineRouteMeta parse 异常 ([76afad7](https://github.com/WeBankFinTech/fes.js/commit/76afad7c2d5e35d78f0ae3c6ecccba968a718b98))



# [3.0.0-beta.27](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.26...v3.0.0-beta.27) (2022-10-10)


### Bug Fixes

* qiankun props 异常 ([339c811](https://github.com/WeBankFinTech/fes.js/commit/339c81126a491b6a2cd2d47ed25a79479908de6e))



# [3.0.0-beta.26](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.25...v3.0.0-beta.26) (2022-09-29)



# [3.0.0-beta.25](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.24...v3.0.0-beta.25) (2022-09-29)


### Bug Fixes

* runtime 添加 d.ts ([4f85b22](https://github.com/WeBankFinTech/fes.js/commit/4f85b22c302955788cfc41aa738bc9a3b09ca68a))



# [3.0.0-beta.24](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.23...v3.0.0-beta.24) (2022-09-27)


### Bug Fixes

* js 语法错误导致 dev 退出 ([2840b46](https://github.com/WeBankFinTech/fes.js/commit/2840b462ecb0cc1a7ddaee08032f65d0ccc95237))



# [3.0.0-beta.23](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.22...v3.0.0-beta.23) (2022-09-22)


### Bug Fixes

* 修复SelectLang.vue的循环依赖问题 ([#148](https://github.com/WeBankFinTech/fes.js/issues/148)) ([0a64739](https://github.com/WeBankFinTech/fes.js/commit/0a64739a2252976db3bad930c2bdfbe8843ceeb8))



# [3.0.0-beta.22](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.21...v3.0.0-beta.22) (2022-09-15)


### Bug Fixes

* 升级 fes-design 依赖 ([9141e77](https://github.com/WeBankFinTech/fes.js/commit/9141e77865197f00cb8cef96e49568f95b504f1c))



# [3.0.0-beta.21](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.20...v3.0.0-beta.21) (2022-08-26)


### Bug Fixes

* 优化构建 ([d0691ca](https://github.com/WeBankFinTech/fes.js/commit/d0691ca90a8948809966c529c1be4cfc242fd4e5))



# [3.0.0-beta.20](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.19...v3.0.0-beta.20) (2022-08-23)


### Bug Fixes

* 修复现代浏览器 polyfill 问题 ([#147](https://github.com/WeBankFinTech/fes.js/issues/147)) ([dbbf447](https://github.com/WeBankFinTech/fes.js/commit/dbbf4473624ab8c5876897da1499a71d9eb23312))



# [3.0.0-beta.19](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.18...v3.0.0-beta.19) (2022-08-18)


### Bug Fixes

* 修复plugin-layout把未缓存页面当做undefined丢进缓存列表出现的问题 ([7b696e4](https://github.com/WeBankFinTech/fes.js/commit/7b696e41ffd4dc5f67c7bfe0bf83aa303a3d63de))



# [3.0.0-beta.18](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.17...v3.0.0-beta.18) (2022-08-17)



# [3.0.0-beta.17](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.16...v3.0.0-beta.17) (2022-08-15)


### Bug Fixes

* **plugin-layout:**  打开相同path的链接会更新页签为新的 & 正确触发onActivated ([#146](https://github.com/WeBankFinTech/fes.js/issues/146)) ([86ff19b](https://github.com/WeBankFinTech/fes.js/commit/86ff19b3d10498a15f1abcbccefcffca54fb522d)), closes [#144](https://github.com/WeBankFinTech/fes.js/issues/144) [#145](https://github.com/WeBankFinTech/fes.js/issues/145)


### Features

* 升级 vite3 ([#143](https://github.com/WeBankFinTech/fes.js/issues/143)) ([fa77896](https://github.com/WeBankFinTech/fes.js/commit/fa7789653c01a57bbaab2e30fe2a64733154fd5b))



# [3.0.0-beta.16](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.15...v3.0.0-beta.16) (2022-08-01)


### Bug Fixes

* **plugin-qiankun:** 修复主应用状态变更后使用useModel没有响应问题 ([c64bd48](https://github.com/WeBankFinTech/fes.js/commit/c64bd4844d3bde1d69da45fdaefc348ba0fbb5a0))



# [3.0.0-beta.15](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.14...v3.0.0-beta.15) (2022-07-18)


### Bug Fixes

* 路由生成支持全数字 ([ba73ac7](https://github.com/WeBankFinTech/fes.js/commit/ba73ac7ff7beb5271c70f4154fa1357e180ef35c))



# [3.0.0-beta.14](https://github.com/WeBankFinTech/fes.js/compare/v3.0.0-beta.13...v3.0.0-beta.14) (2022-07-15)


### Bug Fixes

* 修复win下路径问题 ([bcce28d](https://github.com/WeBankFinTech/fes.js/commit/bcce28d5674da8497270c0f6e414a5d9f11aa1da))


### Features

* 文件目录名带@转化成动态路由 ([#137](https://github.com/WeBankFinTech/fes.js/issues/137)) ([9b3b7e5](https://github.com/WeBankFinTech/fes.js/commit/9b3b7e5d0c52e2c4c27046968d228f407b76cd7e))



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
