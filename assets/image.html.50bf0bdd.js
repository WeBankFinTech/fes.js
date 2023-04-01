import{_ as a,o as n,c as s,f as e}from"./app.bd9c95b7.js";const t={},p=e(`<h1 id="使用图片" tabindex="-1"><a class="header-anchor" href="#使用图片" aria-hidden="true">#</a> 使用图片</h1><h2 id="使用图片-1" tabindex="-1"><a class="header-anchor" href="#使用图片-1" aria-hidden="true">#</a> 使用图片</h2><p>假设在 <code>src/images</code> 目录下有 <code>logo.png</code>。</p><h3 id="vue-里使用图片" tabindex="-1"><a class="header-anchor" href="#vue-里使用图片" aria-hidden="true">#</a> Vue 里使用图片</h3><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>@/images/logo.png\`<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="js-里使用图片" tabindex="-1"><a class="header-anchor" href="#js-里使用图片" aria-hidden="true">#</a> JS 里使用图片</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> imageUrl <span class="token keyword">from</span> <span class="token string">&#39;@/images/logo.png\`&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="css-里使用图片" tabindex="-1"><a class="header-anchor" href="#css-里使用图片" aria-hidden="true">#</a> CSS 里使用图片</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.logo</span> <span class="token punctuation">{</span>
    <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">&#39;@/images/logo.png&#39;</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p><ol><li>这是 <code>webpack</code> 的规则，如果切到其他打包工具，可能会有变化</li><li><code>less</code> 中同样适用</li></ol><h2 id="public-文件夹" tabindex="-1"><a class="header-anchor" href="#public-文件夹" aria-hidden="true">#</a> <code>public</code> 文件夹</h2><p>有些内容不需要经过 <code>webpack</code> 模块化处理，则可以将这些内容放在 <code>public</code> 文件夹，构建后会直接复制到 <code>dist</code> 目录，所以你需要通过<code>BASE_URL</code>来引入它们。</p><h3 id="在-html-模板中使用" tabindex="-1"><a class="header-anchor" href="#在-html-模板中使用" aria-hidden="true">#</a> 在 HTML 模板中使用</h3><p>在 <code>index.html</code> 中需要设置：</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>&lt;%= BASE_URL %&gt;favicon.ico<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="在-vue-文件中使用" tabindex="-1"><a class="header-anchor" href="#在-vue-文件中使用" aria-hidden="true">#</a> 在.vue 文件中使用</h3><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\`\${publicPath}my-image.png\`<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">publicPath</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">BASE_URL</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,18),c=[p];function o(l,i){return n(),s("div",null,c)}const d=a(t,[["render",o],["__file","image.html.vue"]]);export{d as default};
