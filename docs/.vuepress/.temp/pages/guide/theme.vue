<template><h1 id="theme"><a class="header-anchor" href="#theme">#</a> Theme</h1>
<p>VuePress theme can provide layouts, styles and many other features for you, helping you to focus on writing Markdown content.</p>
<p>VuePress has a default theme out of the box, which is applied to our documentation site you are currently browsing. The default theme provides basic but useful features for documentation site, you can check out <RouterLink to="/reference/default-theme/config.html">Default Theme Config Reference</RouterLink> for a full list of config.</p>
<p>However, you might think it is not good enough. Or, you want to build a different type of site, for example, a blog, instead of a documentation. Then, you can try to <a href="#community-theme">use a community theme</a> or <a href="#local-theme">create a local theme</a>.</p>
<h2 id="community-theme"><a class="header-anchor" href="#community-theme">#</a> Community Theme</h2>
<p>Community users have created lots of theme and published them to <a href="https://www.npmjs.com/search?q=keywords:vuepress-theme" target="_blank" rel="noopener noreferrer">NPM<OutboundLink/></a>. You should check the theme's own documentation for detailed guide.</p>
<p>In general, you need to specify the name of the theme to use in <RouterLink to="/reference/config.html#theme">theme</RouterLink> option:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>You can use either theme name or its shorthand:</p>
<table>
<thead>
<tr>
<th>Theme Name</th>
<th>Shorthand</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>vuepress-theme-foo</code></td>
<td><code>foo</code></td>
</tr>
<tr>
<td><code>@org/vuepress-theme-bar</code></td>
<td><code>@org/bar</code></td>
</tr>
<tr>
<td><code>@vuepress/theme-default</code></td>
<td><code>@vuepress/default</code></td>
</tr>
</tbody>
</table>
<h2 id="local-theme"><a class="header-anchor" href="#local-theme">#</a> Local Theme</h2>
<p>If you want to use your own custom theme but don't want to publish it, you can create a local theme.</p>
<p>First, create the local theme directory, typically <code>.vuepress/theme</code> :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>└─ docs
   ├─ .vuepress
   │  ├─ theme
   │  │  └─ index.js
   │  └─ config.js
   └─ README.md
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Then, set the absolute path of the theme directory to use it:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'/path/to/docs/.vuepress/theme'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Next, refer to <RouterLink to="/guide/advanced/theme.html">Advanced &gt; Writing a Theme</RouterLink> for how to write your own theme.</p>
</template>