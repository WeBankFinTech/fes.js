<template><h1 id="assets"><a class="header-anchor" href="#assets">#</a> Assets</h1>
<h2 id="relative-urls"><a class="header-anchor" href="#relative-urls">#</a> Relative URLs</h2>
<p>You can reference any assets using relative URLs in your Markdown content:</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">An image</span>](<span class="token url">./image.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>This is generally the suggested way to import images, as users usually place images near the Markdown file that references them.</p>
<h2 id="public-files"><a class="header-anchor" href="#public-files">#</a> Public Files</h2>
<p>You can put some static assets inside public directory, and they will be copied to the root of the generated directory.</p>
<p>The default public directory is <code>.vuepress/public</code>, which can be changed in config.</p>
<p>It would be useful in some cases:</p>
<ul>
<li>You may need to provide static assets that are not directly referenced in any of your Markdown files, for example, favicon and PWA icons.</li>
<li>You may need to serve some shared static assets, which may even be referenced outside your site, for example, logo images.</li>
<li>You may want to reference images using absolute URLs in your Markdown content.</li>
</ul>
<p>Take our documentation source files as an example, we are putting the logo of VuePress inside the public directory:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>└─ docs
   ├─ .vuepress
   <span class="token operator">|</span>  └─ public
   <span class="token operator">|</span>     └─ hero.png  <span class="token comment"># &lt;- Logo file</span>
   └─ guide
      └─ assets.md    <span class="token comment"># &lt;- Here we are</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>We can reference our logo in current page like this:</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">VuePress Logo</span>](<span class="token url">/hero.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>Output</strong></p>
<p><img src="/hero.png" alt="VuePress Logo"></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Config reference: <RouterLink to="/reference/config.html#public">public</RouterLink></p>
</div>
<h3 id="base-helper"><a class="header-anchor" href="#base-helper">#</a> Base Helper</h3>
<p>If your site is deployed to a non-root URL, i.e. the <RouterLink to="/reference/config.html#base">base</RouterLink> is not <code>&quot;/&quot;</code>, you will need to prepend the <code>base</code> to the absolute URLs of your public files.</p>
<p>For example, if you plan to deploy your site to <code>https://foo.github.io/bar/</code>, then <code>base</code> should be set to <code>&quot;/bar/&quot;</code>, and you have to reference your public files in Markdown like this:</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">VuePress Logo</span>](<span class="token url">/bar/hero.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Obviously, it is brittle if you ever decide to change the <code>base</code>. This is the reason why we suggest to reference static assets using relative URLs.</p>
<p>To help with that, VuePress provides a built-in helper <code>$withBase</code> that generates the correct path:</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>$withBase(<span class="token punctuation">'</span>/hero.png<span class="token punctuation">'</span>)<span class="token punctuation">"</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>VuePress Logo<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>The helper is verbose in Markdown. So it might be more helpful for theme and plugin authors.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Config reference: <RouterLink to="/reference/config.html#base">base</RouterLink></p>
</div>
<h2 id="packages-and-path-aliases"><a class="header-anchor" href="#packages-and-path-aliases">#</a> Packages and Path Aliases</h2>
<p>Although it is not a common usage, you can reference images from dependent packages:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D package-name
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">Image from dependency</span>](<span class="token url">package-name/image.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>The path aliases that set in config file are also supported:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  alias<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">'@alias'</span><span class="token operator">:</span> <span class="token string">'/path/to/some/dir'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url"><span class="token operator">!</span>[<span class="token content">Image from path alias</span>](<span class="token url">@alias/image.png</span>)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Config reference: <RouterLink to="/reference/config.html#alias">alias</RouterLink></p>
</div>
</template>