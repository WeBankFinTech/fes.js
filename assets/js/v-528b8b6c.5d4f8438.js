"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[972],{2296:(a,n,s)=>{s.r(n),s.d(n,{data:()=>e});const e={key:"v-528b8b6c",path:"/guide/image.html",title:"使用图片",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"使用图片",slug:"使用图片-1",children:[{level:3,title:"Vue 里使用图片",slug:"vue-里使用图片",children:[]},{level:3,title:"JS 里使用图片",slug:"js-里使用图片",children:[]},{level:3,title:"CSS 里使用图片",slug:"css-里使用图片",children:[]}]},{level:2,title:"public 文件夹",slug:"public-文件夹",children:[{level:3,title:"在HTML模板中使用",slug:"在html模板中使用",children:[]},{level:3,title:"在.vue 文件中使用",slug:"在-vue-文件中使用",children:[]}]}],filePathRelative:"guide/image.md",git:{updatedTime:1654594164e3,contributors:[{name:"harrywan",email:"445436867@qq.com",commits:1}]}}},2682:(a,n,s)=>{s.r(n),s.d(n,{default:()=>p});const e=(0,s(6252).uE)('<h1 id="使用图片" tabindex="-1"><a class="header-anchor" href="#使用图片" aria-hidden="true">#</a> 使用图片</h1><h2 id="使用图片-1" tabindex="-1"><a class="header-anchor" href="#使用图片-1" aria-hidden="true">#</a> 使用图片</h2><p>假设在 <code>src/images</code> 目录下有 <code>logo.png</code>。</p><h3 id="vue-里使用图片" tabindex="-1"><a class="header-anchor" href="#vue-里使用图片" aria-hidden="true">#</a> Vue 里使用图片</h3><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@/images/logo.png`<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="js-里使用图片" tabindex="-1"><a class="header-anchor" href="#js-里使用图片" aria-hidden="true">#</a> JS 里使用图片</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> imageUrl <span class="token keyword">from</span> <span class="token string">&#39;@/images/logo.png`&#39;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="css-里使用图片" tabindex="-1"><a class="header-anchor" href="#css-里使用图片" aria-hidden="true">#</a> CSS 里使用图片</h3><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.logo</span> <span class="token punctuation">{</span>\n    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&#39;@/images/logo.png&#39;</span><span class="token punctuation">)</span></span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>注意：</p><ol><li>这是 <code>webpack</code> 的规则，如果切到其他打包工具，可能会有变化</li><li><code>less</code> 中同样适用</li></ol><h2 id="public-文件夹" tabindex="-1"><a class="header-anchor" href="#public-文件夹" aria-hidden="true">#</a> <code>public</code> 文件夹</h2><p>有些内容不需要经过 <code>webpack</code> 模块化处理，则可以将这些内容放在 <code>public</code> 文件夹，构建后会直接复制到 <code>dist</code> 目录，所以你需要通过<code>BASE_URL</code>来引入它们。</p><h3 id="在html模板中使用" tabindex="-1"><a class="header-anchor" href="#在html模板中使用" aria-hidden="true">#</a> 在HTML模板中使用</h3><p>在 <code>public/index.html</code> 中需要设置：</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>&lt;%= BASE_URL %&gt;favicon.ico<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="在-vue-文件中使用" tabindex="-1"><a class="header-anchor" href="#在-vue-文件中使用" aria-hidden="true">#</a> 在.vue 文件中使用</h3><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>`${publicPath}my-image.png`<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      <span class="token literal-property property">publicPath</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BASE_URL</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div>',18),t={},p=(0,s(3744).Z)(t,[["render",function(a,n){return e}]])},3744:(a,n)=>{n.Z=(a,n)=>{const s=a.__vccOpts||a;for(const[a,e]of n)s[a]=e;return s}}}]);