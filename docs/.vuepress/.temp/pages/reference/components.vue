<template><h1 id="built-in-components"><a class="header-anchor" href="#built-in-components">#</a> Built-in Components</h1>
<h2 id="clientonly"><a class="header-anchor" href="#clientonly">#</a> ClientOnly</h2>
<ul>
<li>Usage:</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ClientOnly</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>NonSsrFriendlyComponent</span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ClientOnly</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>
<p>Details:</p>
<p>This component and its children will only be rendered in client-side. That means, it will not be rendered to HTML during build (SSR).</p>
<p>If a component is trying to access Browser / DOM APIs directly in <code>setup()</code>, an error will occur during build because those APIs are unavailable in Node.js environment. In such case, you could do either:</p>
<ul>
<li>Modify the component to only access Browser / DOM APIs in <code>onBeforeMount()</code> or <code>onMounted()</code> hook.</li>
<li>Wrap the component with <code>&lt;ClientOnly&gt;</code>.</li>
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
<li>Type: <code>string</code></li>
<li>Required: <code>false</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p>Usage:</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Content</span> <span class="token attr-name">page-path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Content</span> <span class="token attr-name">page-path</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/foo.html<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>
<p>Details:</p>
<p>This component will render the Markdown content of a page.</p>
<p>If the <code>pagePath</code> prop is not provided, it will render the page of current route path.</p>
<p>This component is mainly for developing themes. You won't need it in most cases.</p>
</li>
</ul>
<h2 id="outboundlink"><a class="header-anchor" href="#outboundlink">#</a> OutboundLink</h2>
<ul>
<li>Usage:</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>OutboundLink</span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li>
<p>Details:</p>
<p>This component will render an indicator for links to external URLs.</p>
<p>This component is mainly for developing themes. You won't need it in most cases.</p>
</li>
</ul>
</template>