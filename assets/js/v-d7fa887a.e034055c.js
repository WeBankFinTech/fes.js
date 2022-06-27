"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[617],{4148:(e,a,s)=>{s.r(a),s.d(a,{data:()=>n});const n={key:"v-d7fa887a",path:"/guide/contributing.html",title:"贡献指南",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"包概览",slug:"包概览",children:[]},{level:2,title:"开发准备",slug:"开发准备",children:[]},{level:2,title:"贡献文档",slug:"贡献文档",children:[]},{level:2,title:"贡献源码",slug:"贡献源码",children:[]},{level:2,title:"提交PR",slug:"提交pr",children:[]}],filePathRelative:"guide/contributing.md",git:{updatedTime:1656323604e3,contributors:[{name:"harrywan",email:"445436867@qq.com",commits:1}]}}},2526:(e,a,s)=>{s.r(a),s.d(a,{default:()=>I});var n=s(6252);const l=(0,n._)("h1",{id:"贡献指南",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#贡献指南","aria-hidden":"true"},"#"),(0,n.Uk)(" 贡献指南")],-1),r=(0,n._)("h2",{id:"包概览",tabindex:"-1"},[(0,n._)("a",{class:"header-anchor",href:"#包概览","aria-hidden":"true"},"#"),(0,n.Uk)(" 包概览")],-1),t=(0,n.Uk)("项目仓库借助于 "),o={href:"https://classic.yarnpkg.com/zh-Hans/docs/workspaces",target:"_blank",rel:"noopener noreferrer"},c=(0,n.Uk)("Yarn 工作区"),i=(0,n.Uk)(" 来实现 "),d={href:"https://en.wikipedia.org/wiki/Monorepo",target:"_blank",rel:"noopener noreferrer"},p=(0,n.Uk)(" Monorepo"),u=(0,n.Uk)(" ，在 "),h=(0,n._)("code",null,"packages",-1),b=(0,n.Uk)(" 目录下存放多个互相关联的独立包。"),f=(0,n.uE)('<ul><li><p><code>@fesjs/create-fes-app</code>: 创建项目模板模块。提供<code>create-fes-app</code>命令，提供创建多种类型项目模板的能力。</p></li><li><p><code>@fesjs/compiler</code>: 编译时插件管理模块。定义插件的生命周期、插件配置、插件通讯机制等。</p></li><li><p><code>@fesjs/runtime</code>: 运行时插件模块。集成了vue-router，定义运行时插件生命周期、插件通讯机制。</p></li><li><p><code>@fesjs/preset-build-in</code>: 内置插件集。包含<code>dev</code>、<code>build</code>等命令，集成webpack5+babel，提供方便编写插件的API，入口文件处理，路由处理等能力。</p></li><li><p><code>@fesjs/fes-template</code>: 适用于PC类型的模板项目。</p></li><li><p><code>@fesjs/fes-template-h5</code>: 适用于H5类型的模板项目。</p></li><li><p><code>@fesjs/plugin-${name}</code>: 官方插件。</p></li><li><p><code>@fesjs/fes</code>: 入口模块。提供<code>fes</code>命令和 API 入口，封装<code>@fesjs/compiler</code> + <code>@fesjs/runtime</code> + <code>@fesjs/preset-build-in</code>，用户只需要安装此依赖和其他插件。</p></li></ul><h2 id="开发准备" tabindex="-1"><a class="header-anchor" href="#开发准备" aria-hidden="true">#</a> 开发准备</h2><p>开发要求：</p>',3),m={href:"http://nodejs.org",target:"_blank",rel:"noopener noreferrer"},g=(0,n.Uk)("Node.js v14+"),k={href:"https://classic.yarnpkg.com/zh-Hans/docs/install",target:"_blank",rel:"noopener noreferrer"},v=(0,n.Uk)("Yarn v1"),_=(0,n._)("p",null,"本项目开发使用的一些主要工具：",-1),j={href:"https://jestjs.io/",target:"_blank",rel:"noopener noreferrer"},x=(0,n.Uk)("Jest"),U=(0,n.Uk)(" 用于单元测试"),w={href:"https://eslint.org/",target:"_blank",rel:"noopener noreferrer"},y=(0,n.Uk)("ESLint"),W=(0,n.Uk)(" + "),q={href:"https://prettier.io/",target:"_blank",rel:"noopener noreferrer"},P=(0,n.Uk)("Prettier"),z=(0,n.Uk)(" 用于代码检查和格式化"),E=(0,n.uE)('<p>克隆仓库：</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/WeBankFinTech/fes.js.git\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>进入<code>fes.js</code>目录，安装依赖：</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="贡献文档" tabindex="-1"><a class="header-anchor" href="#贡献文档" aria-hidden="true">#</a> 贡献文档</h2>',5),C=(0,n.Uk)("文档代码在"),H=(0,n._)("code",null,"docs",-1),R=(0,n.Uk)("目录，基于 "),A={href:"https://v2.vuepress.vuejs.org/zh/",target:"_blank",rel:"noopener noreferrer"},F=(0,n.Uk)("vuepress"),M=(0,n.Uk)(" 实现。"),Y=(0,n.uE)('<h4 id="第一步-启动服务" tabindex="-1"><a class="header-anchor" href="#第一步-启动服务" aria-hidden="true">#</a> 第一步：启动服务</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> docs:dev\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="第二步-修改md文件" tabindex="-1"><a class="header-anchor" href="#第二步-修改md文件" aria-hidden="true">#</a> 第二步：修改md文件</h4><p>菜单配置在<code>/docs/.vuepress/configs/sidebar/zh.ts</code>中，可以通过此配置找到对应想修改的文档。</p><p>如果想添加图片，则可以先把图片添加至<code>/docs/.vuepress/public</code>，在代码中使用：</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$withBase(<span class="token punctuation">&#39;</span>framework.png<span class="token punctuation">&#39;</span>)<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>架构<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="第三步-查看更新" tabindex="-1"><a class="header-anchor" href="#第三步-查看更新" aria-hidden="true">#</a> 第三步：查看更新</h4><p>当md文档保存后，文档会自动更新，在<code>http://localhost:8080/</code>查看。</p><h2 id="贡献源码" tabindex="-1"><a class="header-anchor" href="#贡献源码" aria-hidden="true">#</a> 贡献源码</h2><p><code>Fes.js</code>统一使用<code>ES Module</code>规范编写源码，代码会在 node 端和浏览器端执行，所以源码需要编译后才能发布成包，再被执行。</p><h4 id="启动编译服务" tabindex="-1"><a class="header-anchor" href="#启动编译服务" aria-hidden="true">#</a> 启动编译服务</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> dev\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>当我们修改<code>build.config.js</code>中配置的包代码时，会把<code>src</code>目录的源码编译后到<code>lib</code>目录。</p><h4 id="修改源码" tabindex="-1"><a class="header-anchor" href="#修改源码" aria-hidden="true">#</a> 修改源码</h4><p>在了解<code>Fes.js</code>设计前提下，修改核心代码或者插件代码。</p><h4 id="验证修改内容" tabindex="-1"><a class="header-anchor" href="#验证修改内容" aria-hidden="true">#</a> 验证修改内容</h4><p>根据需求选择模板项目来验证修改内容，比如选择<code>fes-template</code>：</p><ol><li>查看需待验证包是否已经添加到模板项目的依赖中，如果没有则在模板项目的 package.json 中添加包依赖，添加后在根目录执行<code>yarn</code>关联依赖</li><li>启动模板项目的开发服务</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> packages/fes-template\n<span class="token function">yarn</span> dev\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="3"><li>在项目模板中添加代码验证修改内容</li><li>打开<code>localhost:8000</code>查看结果</li></ol><h4 id="快速调试技巧" tabindex="-1"><a class="header-anchor" href="#快速调试技巧" aria-hidden="true">#</a> 快速调试技巧</h4><p>每次修改插件或者核心代码后，等待自动编译完，需要在模板目录重新执行<code>fes dev</code>，比较费时费力。</p><p>可以先在模板的 <code>.fes</code> 目录中找到对应临时代码，更改逻辑，验证完后再将变更逻辑保存到正式文件中。</p><div class="custom-container warning"><p class="custom-container-title">注意</p><p>直接修改临时文件切莫重新执行<code>fes dev</code>，修改会被覆盖。</p></div><h2 id="提交pr" tabindex="-1"><a class="header-anchor" href="#提交pr" aria-hidden="true">#</a> 提交PR</h2><ol><li>fork项目!</li><li>创建你的功能分支: git checkout -b my-new-feature</li><li>本地提交新代码: git commit -am &#39;Add some feature&#39;</li><li>推送本地到服务器分支: git push origin my-new-feature</li><li>创建一个PR</li></ol>',26),B={},I=(0,s(3744).Z)(B,[["render",function(e,a){const s=(0,n.up)("OutboundLink");return(0,n.wg)(),(0,n.iD)(n.HY,null,[l,r,(0,n._)("p",null,[t,(0,n._)("a",o,[c,(0,n.Wm)(s)]),i,(0,n._)("a",d,[p,(0,n.Wm)(s)]),u,h,b]),f,(0,n._)("ul",null,[(0,n._)("li",null,[(0,n._)("a",m,[g,(0,n.Wm)(s)])]),(0,n._)("li",null,[(0,n._)("a",k,[v,(0,n.Wm)(s)])])]),_,(0,n._)("ul",null,[(0,n._)("li",null,[(0,n._)("a",j,[x,(0,n.Wm)(s)]),U]),(0,n._)("li",null,[(0,n._)("a",w,[y,(0,n.Wm)(s)]),W,(0,n._)("a",q,[P,(0,n.Wm)(s)]),z])]),E,(0,n._)("p",null,[C,H,R,(0,n._)("a",A,[F,(0,n.Wm)(s)]),M]),Y],64)}]])},3744:(e,a)=>{a.Z=(e,a)=>{const s=e.__vccOpts||e;for(const[e,n]of a)s[e]=n;return s}}}]);