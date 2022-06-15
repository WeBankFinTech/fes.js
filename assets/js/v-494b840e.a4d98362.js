"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[861],{4794:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-494b840e",path:"/reference/plugin/dev/",title:"插件介绍",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"开始",slug:"开始",children:[]},{level:2,title:"发布到 npm",slug:"发布到-npm",children:[]}],filePathRelative:"reference/plugin/dev/README.md",git:{updatedTime:1655278609e3,contributors:[{name:"wanchun",email:"445436867@qq.com",commits:1}]}}},7415:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const e=(0,a(6252).uE)('<h1 id="插件介绍" tabindex="-1"><a class="header-anchor" href="#插件介绍" aria-hidden="true">#</a> 插件介绍</h1><h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2><p>一个插件是一个 <code>npm</code> 包，它能够为 Fes.js 创建的项目添加额外的功能，这些功能包括：</p><ul><li>项目的 webpack 配置。</li><li>修改项目的 babel 配置。</li><li>添加新的 fes 命令 - 例如 <code>@fes/plugin-jest</code> 添加了 <code>fes test</code> 命令，允许开发者运行单元测试。</li><li>集成 Vue 的插件。</li><li>修改路由配置</li><li>提供运行时 API</li><li>...</li></ul><p>插件的入口是一个函数，函数会以 API 对象作为第一个参数：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">(</span><span class="token parameter">api</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>\n    api<span class="token punctuation">.</span><span class="token function">describe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n        <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;esbuild&#39;</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">config</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token function">schema</span><span class="token punctuation">(</span><span class="token parameter">joi</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token keyword">return</span> joi<span class="token punctuation">.</span><span class="token function">object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">enableBy</span><span class="token operator">:</span> api<span class="token punctuation">.</span>EnableBy<span class="token punctuation">.</span>config<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>API 对象是构建流程管理 Service 类的实例，api 提供一些有用的方法帮助你开发插件。</p><p><code>api.describe</code>用来描述插件：</p><ul><li><strong>key</strong>， 插件的 <code>key</code>，可以理解为插件的名称，在 <code>.fes.js</code> 中用 <code>key</code> 配置此插件。</li><li><strong>config</strong>，插件的配置信息： <ul><li>schema，定义配置的类型</li><li>default，默认配置</li></ul></li><li><strong>enableBy</strong>， 是否开启插件，可配置某些场景下禁用插件。</li></ul><h2 id="发布到-npm" tabindex="-1"><a class="header-anchor" href="#发布到-npm" aria-hidden="true">#</a> 发布到 npm</h2><p>以 <code>@fesjs/preset-</code>、<code>@fesjs/plugin-</code>、<code>@webank/fes-preset-</code>、<code>@webank/fes-plugin-</code>、<code>fes-preset-</code> 和 <code>fes-plugin-</code> 开头的依赖会被 Fes.js 自动注册为插件或插件集。</p><p>所以编写好的插件想发布到 npm 供其他人使用，包名必须是 <code>fes-preset-</code> 和 <code>fes-plugin-</code> 开头。</p>',12),p={},t=(0,a(3744).Z)(p,[["render",function(n,s){return e}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);