<template><h1 id="静态资源"><a class="header-anchor" href="#静态资源">#</a> 静态资源</h1>
<h2 id="相对路径"><a class="header-anchor" href="#相对路径">#</a> 相对路径</h2>
<p>你可以在你的 Markdown 内容中使用相对路径来引用静态资源：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">图片</span>](<span class="token url">./image.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>一般情况下，我们推荐你使用这种方式来引用图片，因为人们通常会把图片放在引用它的 Markdown 文件附近。</p>
<h2 id="public-文件"><a class="header-anchor" href="#public-文件">#</a> Public 文件</h2>
<p>你可以把一些静态资源放在 Public 目录中，它们会被复制到最终生成的网站的根目录下。</p>
<p>默认的 Public 目录是  <code>.vuepress/public</code> ，可以通过配置来修改。</p>
<p>在下列这些情况中，你可能会用到它：</p>
<ul>
<li>你可能需要提供一些静态资源，但是它们并不直接被你的 Markdown 文件引用，比如 favicon 和 PWA 图标。</li>
<li>你可能想要托管一些共享的静态资源，甚至可能需要在你的网站外部引用它，比如 Logo 图片。</li>
<li>你可能想在你的 Markdown 内容中通过绝对路径来引入图片。</li>
</ul>
<p>以我们文档的源文件为例，我们把 VuePress 的 Logo 放在了 Public 目录下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>└─ docs
   ├─ .vuepress
   <span class="token operator">|</span>  └─ public
   <span class="token operator">|</span>     └─ hero.png  <span class="token comment"># &lt;- Logo 文件</span>
   └─ guide
      └─ assets.md    <span class="token comment"># &lt;- 我们在这里</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>我们可以这样在当前页面引用 Logo ：</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">VuePress Logo</span>](<span class="token url">/hero.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>Output</strong></p>
<p><img src="/hero.png" alt="VuePress Logo"></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>配置参考： <RouterLink to="/zh/reference/config.html#public">public</RouterLink></p>
</div>
<h3 id="base-helper"><a class="header-anchor" href="#base-helper">#</a> Base Helper</h3>
<p>如果你的网站部署在非根路径下，即 <RouterLink to="/zh/reference/config.html#base">base</RouterLink> 不是 <code>&quot;/&quot;</code> ，你需要把 <code>base</code> 添加到 Public 文件的绝对路径前。</p>
<p>举例来说，如果你想要把网站部署到 <code>https://foo.github.io/bar/</code> ，那么应该把 <code>base</code> 设置为 <code>&quot;/bar/&quot;</code> ，此时你必须在 Markdown 文件中这样引用 Public 文件：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">VuePress Logo</span>](<span class="token url">/bar/hero.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>显然，一旦某一天你修改了 <code>base</code>，这样的路径引用将会显得异常脆弱。这也是我们推荐你使用相对路径来引用静态文件的原因。</p>
<p>为了解决这个问题，VuePress 提供了内置的一个 Helper <code>$withBase</code> ，它可以帮助你生成正确的路径：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$withBase(<span class="token punctuation">'</span>/hero.png<span class="token punctuation">'</span>)<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>VuePress Logo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在 Markdown 中使用这个 Helper 会显得有些冗长，因此它可能对主题和插件作者更有帮助。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>配置参考： <RouterLink to="/zh/reference/config.html#base">base</RouterLink></p>
</div>
<h2 id="依赖包和路径别名"><a class="header-anchor" href="#依赖包和路径别名">#</a> 依赖包和路径别名</h2>
<p>尽管这不是常见用法，但是你可以从依赖包中引用图片：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D package-name
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">来自依赖包的图片</span>](<span class="token url">package-name/image.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在配置文件中设置的路径别名也同样支持：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  alias<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">'@alias'</span><span class="token operator">:</span> <span class="token string">'/path/to/some/dir'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">来自路径别名的图片</span>](<span class="token url">@alias/image.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>配置参考： <RouterLink to="/zh/reference/config.html#alias">alias</RouterLink></p>
</div>
</template>