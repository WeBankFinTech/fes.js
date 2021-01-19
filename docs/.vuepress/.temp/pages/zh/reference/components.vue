<template><h1 id="内置组件"><a class="header-anchor" href="#内置组件">#</a> 内置组件</h1>
<h2 id="clientonly"><a class="header-anchor" href="#clientonly">#</a> ClientOnly</h2>
<ul>
<li>使用：</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ClientOnly</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>NonSsrFriendlyComponent</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ClientOnly</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>
<p>详情：</p>
<p>该组件和它的子元素只会在客户端被渲染。也就是说，它不会在构建 (SSR) 过程中被渲染到 HTML 内。</p>
<p>如果一个组件在 <code>setup()</code> 中直接使用 浏览器 / DOM API ，它会导致构建过程报错，因为这些 API 在 Node.js 的环境中是无法使用的。在这种情况下，你可以选择一种方式：</p>
<ul>
<li>修改这个组件，只在  <code>onBeforeMount()</code> 或 <code>onMounted()</code> Hook 中使用 浏览器 / DOM API 。</li>
<li>使用 <code>&lt;ClientOnly&gt;</code> 包裹这个组件。</li>
</ul>
</li>
</ul>
<h2 id="content"><a class="header-anchor" href="#content">#</a> Content</h2>
<ul>
<li>
<p>Props:</p>
<ul>
<li>pagePath
<ul>
<li>类型： <code>string</code></li>
<li>是否必须： <code>false</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p>使用：</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Content</span> <span class="token attr-name">page-path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Content</span> <span class="token attr-name">page-path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/foo.html<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>
<p>详情：</p>
<p>该组件会渲染页面的 Markdown 内容。</p>
<p>如果没有传入 <code>pagePath</code> Prop ，它会渲染当前路由路径下的页面。</p>
<p>该组件主要是为了开发主题时使用。在绝大多数情况下你不会用到它。</p>
</li>
</ul>
<h2 id="outboundlink"><a class="header-anchor" href="#outboundlink">#</a> OutboundLink</h2>
<ul>
<li>使用：</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>OutboundLink</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>
<p>详情：</p>
<p>该组件会渲染一个标识外部 URL 链接的图标。</p>
<p>该组件主要是为了开发主题时使用。在绝大多数情况下你不会用到它。</p>
</li>
</ul>
</template>