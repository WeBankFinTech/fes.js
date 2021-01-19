<template><h1 id="主题"><a class="header-anchor" href="#主题">#</a> 主题</h1>
<p>VuePress 主题为你提供了布局、样式和其他功能，帮助你专注于 Markdown 内容的写作。</p>
<p>VuePress 有一个开箱即用的默认主题，正使用在你当前正在浏览的文档网站上。默认主题为文档网站提供了基础且实用的功能，你可以前往 <RouterLink to="/zh/reference/default-theme/config.html">默认主题配置参考</RouterLink> 获取全部的配置列表。</p>
<p>然而，你可能觉得默认主题不够出色。或者你想要搭建一个其他类型的网站而不是文档，比如博客。此时，你可以尝试 <a href="#%E7%A4%BE%E5%8C%BA%E4%B8%BB%E9%A2%98">使用社区主题</a> 或者 <a href="#%E6%9C%AC%E5%9C%B0%E4%B8%BB%E9%A2%98">创建本地主题</a>。</p>
<h2 id="社区主题"><a class="header-anchor" href="#社区主题">#</a> 社区主题</h2>
<p>社区用户创建了很多主题，并将它们发布到了 <a href="https://www.npmjs.com/search?q=keywords:vuepress-theme" target="_blank" rel="noopener noreferrer">NPM<OutboundLink/></a> 上。查看主题本身的文档可以获取更详细的指引。</p>
<p>一般而言，你需要在 <RouterLink to="/zh/reference/config.html#theme">theme</RouterLink> 配置项中设置你要使用的主题名称：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'foo'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>你可以使用主题名称或者它的简称：</p>
<table>
<thead>
<tr>
<th>主题名称</th>
<th>简称</th>
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
<h2 id="本地主题"><a class="header-anchor" href="#本地主题">#</a> 本地主题</h2>
<p>如果你想要使用自己的自定义主题，但是又不想发布它，你可以创建一个本地主题。</p>
<p>首先，创建本地主题目录，一般是 <code>.vuepress/theme</code> ：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>└─ docs
   ├─ .vuepress
   │  ├─ theme
   │  │  └─ index.js
   │  └─ config.js
   └─ README.md
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>然后，设置主题目录的绝对路径来使用它：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'/path/to/docs/.vuepress/theme'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>接下来，前往 <RouterLink to="/zh/guide/advanced/theme.html">深入 &gt; 开发主题</RouterLink> 学习如何开发你自己的主题。</p>
</template>