"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[463],{93:(s,a,n)=>{n.r(a),n.d(a,{data:()=>e});const e={key:"v-5bf80046",path:"/reference/plugin/plugins/sass.html",title:"@fesjs/plugin-sass",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"介绍",slug:"介绍",children:[]},{level:2,title:"启用方式",slug:"启用方式",children:[]},{level:2,title:"global css",slug:"global-css",children:[]},{level:2,title:"Vue 单文件组件",slug:"vue-单文件组件",children:[]}],filePathRelative:"reference/plugin/plugins/sass.md",git:{updatedTime:1655278609e3,contributors:[{name:"wanchun",email:"445436867@qq.com",commits:1}]}}},5310:(s,a,n)=>{n.r(a),n.d(a,{default:()=>l});const e=(0,n(6252).uE)('<h1 id="fesjs-plugin-sass" tabindex="-1"><a class="header-anchor" href="#fesjs-plugin-sass" aria-hidden="true">#</a> @fesjs/plugin-sass</h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>Fes.js 默认只支持 <code>less</code>，通过此插件扩展支持 <code>sass</code></p><h2 id="启用方式" tabindex="-1"><a class="header-anchor" href="#启用方式" aria-hidden="true">#</a> 启用方式</h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">&quot;@fesjs/fes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;@fesjs/plugin-sass&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="global-css" tabindex="-1"><a class="header-anchor" href="#global-css" aria-hidden="true">#</a> global css</h2><p>添加 <code>src/global.scss</code> 和 <code>src/global.sass</code> 为全局CSS入口，添加一些通用样式内容。</p><h2 id="vue-单文件组件" tabindex="-1"><a class="header-anchor" href="#vue-单文件组件" aria-hidden="true">#</a> Vue 单文件组件</h2><p>Vue 单文件组件的 <code>&lt;style&gt;&lt;/style&gt;</code> 添加 <code>lang=&#39;scss&#39;</code>，例如：</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>',11),t={},l=(0,n(3744).Z)(t,[["render",function(s,a){return e}]])},3744:(s,a)=>{a.Z=(s,a)=>{const n=s.__vccOpts||s;for(const[s,e]of a)n[s]=e;return n}}}]);