import{_ as e,o as a,c as o,V as t}from"./chunks/framework.b31a4d00.js";const f=JSON.parse('{"title":"常见问题","description":"","frontmatter":{},"headers":[],"relativePath":"guide/faq.md"}'),s={name:"guide/faq.md"},n=t(`<h1 id="常见问题" tabindex="-1">常见问题 <a class="header-anchor" href="#常见问题" aria-label="Permalink to &quot;常见问题&quot;">​</a></h1><h4 id="为什么代码提示不生效" tabindex="-1">为什么代码提示不生效？ <a class="header-anchor" href="#为什么代码提示不生效" aria-label="Permalink to &quot;为什么代码提示不生效？&quot;">​</a></h4><ol><li>需要先运行一次<code>fes dev</code></li><li>检查tsconfig.json，<code>include</code>包含当前编辑文件，<code>compilerOptions.path</code>包含</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;@/*&quot;: [&quot;./src/*&quot;],</span></span>
<span class="line"><span style="color:#babed8;">&quot;@@/*&quot;: [&quot;./src/.fes/*&quot;]</span></span></code></pre></div>`,4),c=[n];function l(i,r,d,p,_,u){return a(),o("div",null,c)}const q=e(s,[["render",l]]);export{f as __pageData,q as default};