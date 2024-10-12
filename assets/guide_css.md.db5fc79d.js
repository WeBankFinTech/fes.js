import{_ as s,o as a,c as l,V as e}from"./chunks/framework.b31a4d00.js";const h=JSON.parse('{"title":"使用 css","description":"","frontmatter":{},"headers":[],"relativePath":"guide/css.md"}'),n={name:"guide/css.md"},o=e(`<h1 id="使用-css" tabindex="-1">使用 css <a class="header-anchor" href="#使用-css" aria-label="Permalink to &quot;使用 css&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>本文档以 css 为示例，把后缀换成 <code>.less</code> 同样适用。</p></div><h2 id="全局样式" tabindex="-1">全局样式 <a class="header-anchor" href="#全局样式" aria-label="Permalink to &quot;全局样式&quot;">​</a></h2><p>Fes.js 中约定 <code>src/global.css</code> 为全局样式，如果存在此文件，会被自动引入到入口文件最前面。</p><p>比如用于覆盖样式，</p><div class="language-css"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">layout-content</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">max-width</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1000px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="组件内样式" tabindex="-1">组件内样式 <a class="header-anchor" href="#组件内样式" aria-label="Permalink to &quot;组件内样式&quot;">​</a></h2><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">layout-content</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">max-width</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1000px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h2 id="引入第三方样式" tabindex="-1">引入第三方样式 <a class="header-anchor" href="#引入第三方样式" aria-label="Permalink to &quot;引入第三方样式&quot;">​</a></h2><p>可以直接通过 <code>import</code> 引入第三方组件，当然最好在入口文件<code>app.js</code>中引入</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// src/app.js</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">bootstrap/dist/css/bootstrap.css</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><h2 id="css-modules" tabindex="-1">CSS Modules <a class="header-anchor" href="#css-modules" aria-label="Permalink to &quot;CSS Modules&quot;">​</a></h2><p>支持 <code>Vue</code> 的 <a href="https://vue-loader.vuejs.org/zh/guide/css-modules.html#%E7%94%A8%E6%B3%95" target="_blank" rel="noreferrer">CSS Modules</a> 用法，可以直接使用：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">module</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">layout-content</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">max-width</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">1000px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>如果想直接引入CSS文件的话，则CSS文件名需要包含<code>.module</code>，比如：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> style </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@/styles/index.module.css</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(style)</span></span></code></pre></div><h2 id="css-预处理器" tabindex="-1">CSS 预处理器 <a class="header-anchor" href="#css-预处理器" aria-label="Permalink to &quot;CSS 预处理器&quot;">​</a></h2><p>Fes.js 内置支持 <code>less</code>，不支持 <code>sass</code> 和 <code>stylus</code>，但如果有需求，可以通过 <code>chainWebpack</code> 配置或者 <code>fes-plugin</code> 插件的形式支持。</p>`,18),p=[o];function t(c,r,i,d,y,D){return a(),l("div",null,p)}const u=s(n,[["render",t]]);export{h as __pageData,u as default};