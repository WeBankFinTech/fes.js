import{_ as s,o as a,c as e,V as l}from"./chunks/framework.b31a4d00.js";const y=JSON.parse('{"title":"@fesjs/plugin-sass","description":"","frontmatter":{},"headers":[],"relativePath":"reference/plugin/plugins/sass.md"}'),o={name:"reference/plugin/plugins/sass.md"},n=l(`<h1 id="fesjs-plugin-sass" tabindex="-1">@fesjs/plugin-sass <a class="header-anchor" href="#fesjs-plugin-sass" aria-label="Permalink to &quot;@fesjs/plugin-sass&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p>Fes.js 默认只支持 <code>less</code>，通过此插件扩展支持 <code>sass</code>。</p><div class="tip custom-block"><p class="custom-block-title">webpack 构建 sass 插件</p><p>如果使用 Vite 构建，直接装 <code>sass</code> 依赖即可，不需要安装此插件。</p></div><h2 id="启用方式" tabindex="-1">启用方式 <a class="header-anchor" href="#启用方式" aria-label="Permalink to &quot;启用方式&quot;">​</a></h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">dependencies</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">@fesjs/fes</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^3.0.0</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">        </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">@fesjs/plugin-sass</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">^3.0.0</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><h2 id="global-css" tabindex="-1">global css <a class="header-anchor" href="#global-css" aria-label="Permalink to &quot;global css&quot;">​</a></h2><p>添加 <code>src/global.scss</code> 和 <code>src/global.sass</code> 为全局 CSS 入口，添加一些通用样式内容。</p><h2 id="vue-单文件组件" tabindex="-1">Vue 单文件组件 <a class="header-anchor" href="#vue-单文件组件" aria-label="Permalink to &quot;Vue 单文件组件&quot;">​</a></h2><p>Vue 单文件组件的 <code>&lt;style&gt;&lt;/style&gt;</code> 添加 <code>lang=&#39;scss&#39;</code>，例如：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">scss</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div>`,12),p=[n];function t(c,r,i,D,d,F){return a(),e("div",null,p)}const h=s(o,[["render",t]]);export{y as __pageData,h as default};