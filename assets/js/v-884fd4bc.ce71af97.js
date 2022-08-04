"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[229],{7657:(s,n,a)=>{a.r(n),a.d(n,{data:()=>e});const e={key:"v-884fd4bc",path:"/guide/css.html",title:"使用 css",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"全局样式",slug:"全局样式",children:[]},{level:2,title:"组件内样式",slug:"组件内样式",children:[]},{level:2,title:"引入第三方样式",slug:"引入第三方样式",children:[]},{level:2,title:"CSS Modules",slug:"css-modules",children:[]},{level:2,title:"CSS 预处理器",slug:"css-预处理器",children:[]}],filePathRelative:"guide/css.md",git:{updatedTime:1659613539e3,contributors:[{name:"qlin",email:"haizekuo@gmail.com",commits:1}]}}},8568:(s,n,a)=>{a.r(n),a.d(n,{default:()=>m});var e=a(6252);const c=(0,e.uE)('<h1 id="使用-css" tabindex="-1"><a class="header-anchor" href="#使用-css" aria-hidden="true">#</a> 使用 css</h1><div class="custom-container tip"><p class="custom-container-title">提示</p><p>本文档以 css 为示例，把后缀换成 <code>.less</code> 同样适用。</p></div><h2 id="全局样式" tabindex="-1"><a class="header-anchor" href="#全局样式" aria-hidden="true">#</a> 全局样式</h2><p>Fes.js 中约定 <code>src/global.css</code> 为全局样式，如果存在此文件，会被自动引入到入口文件最前面。</p><p>比如用于覆盖样式，</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.layout-content</span> <span class="token punctuation">{</span>\n  <span class="token property">max-width</span><span class="token punctuation">:</span> 1000px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="组件内样式" tabindex="-1"><a class="header-anchor" href="#组件内样式" aria-hidden="true">#</a> 组件内样式</h2><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">\n<span class="token selector">.layout-content</span> <span class="token punctuation">{</span>\n  <span class="token property">max-width</span><span class="token punctuation">:</span> 1000px<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="引入第三方样式" tabindex="-1"><a class="header-anchor" href="#引入第三方样式" aria-hidden="true">#</a> 引入第三方样式</h2><p>可以直接通过 <code>import</code> 引入第三方组件，当然最好在入口文件<code>app.js</code>中引入</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// src/app.js</span>\n<span class="token keyword">import</span> <span class="token string">&#39;bootstrap/dist/css/bootstrap.css&#39;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="css-modules" tabindex="-1"><a class="header-anchor" href="#css-modules" aria-hidden="true">#</a> CSS Modules</h2>',12),l=(0,e.Uk)("支持 "),t=(0,e._)("code",null,"Vue",-1),p=(0,e.Uk)(" 的 "),o={href:"https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95",target:"_blank",rel:"noopener noreferrer"},r=(0,e.Uk)("CSS Modules"),i=(0,e.Uk)(" 用法，可以直接使用："),u=(0,e.uE)('<div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">module</span><span class="token punctuation">&gt;</span></span>\n.layout-content {\n  max-width: 1000px;\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>如果想直接引入CSS文件的话，则CSS文件名需要包含<code>.module</code>，比如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> style <span class="token keyword">from</span> <span class="token string">&#39;@/styles/index.module.css&#39;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>style<span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="css-预处理器" tabindex="-1"><a class="header-anchor" href="#css-预处理器" aria-hidden="true">#</a> CSS 预处理器</h2><p>Fes.js 内置支持 <code>less</code>，不支持 <code>sass</code> 和 <code>stylus</code>，但如果有需求，可以通过 <code>chainWebpack</code> 配置或者 <code>fes-plugin</code> 插件的形式支持。</p>',5),d={},m=(0,a(3744).Z)(d,[["render",function(s,n){const a=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[c,(0,e._)("p",null,[l,t,p,(0,e._)("a",o,[r,(0,e.Wm)(a)]),i]),u],64)}]])},3744:(s,n)=>{n.Z=(s,n)=>{const a=s.__vccOpts||s;for(const[s,e]of n)a[s]=e;return a}}}]);