<template><h1 id="插件"><a class="header-anchor" href="#插件">#</a> 插件</h1>
<p>借助于 <RouterLink to="/zh/references/plugin-api.html">Plugin API</RouterLink> ， VuePress 插件可以为你提供各种不同的功能。</p>
<h2 id="社区插件"><a class="header-anchor" href="#社区插件">#</a> 社区插件</h2>
<p>社区用户创建了很多插件，并将它们发布到了 <a href="https://www.npmjs.com/search?q=keywords:vuepress-plugin" target="_blank" rel="noopener noreferrer">NPM<OutboundLink/></a> 上。 VuePress 团队也在 <a href="https://www.npmjs.com/search?q=%40vuepress%20keywords%3Aplugin" target="_blank" rel="noopener noreferrer">@vuepress<OutboundLink/></a> Scope 下维护了一些官方插件。查看插件本身的文档可以获取更详细的指引。</p>
<p>一般而言，你需要在 <RouterLink to="/zh/reference/plugin-api.html#plugins">plugins</RouterLink> 配置项中设置你要使用的插件名称：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">'foo'</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">/* 配置项 */</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>你可以使用插件名称或者它的简称：</p>
<table>
<thead>
<tr>
<th>插件名称</th>
<th>简称</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>vuepress-plugin-foo</code></td>
<td><code>foo</code></td>
</tr>
<tr>
<td><code>@org/vuepress-plugin-bar</code></td>
<td><code>@org/bar</code></td>
</tr>
<tr>
<td><code>@vuepress/plugin-foobar</code></td>
<td><code>@vuepress/foobar</code></td>
</tr>
</tbody>
</table>
<h2 id="本地插件"><a class="header-anchor" href="#本地插件">#</a> 本地插件</h2>
<p>如果你想要使用自己的插件，但是又不想发布它，你可以创建一个本地插件。</p>
<p>推荐你直接将 <RouterLink to="/zh/guide/configuration.html#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6">配置文件</RouterLink> 作为插件使用，因为 <RouterLink to="/zh/reference/config.html#%E6%8F%92%E4%BB%B6-api">几乎所有的插件 API 都可以在配置文件中使用</RouterLink>，这在绝大多数场景下都更为方便。</p>
<p>但是如果你在配置文件中要做的事情太多了，最好还是将它们提取到单独的插件中，然后通过设置绝对路径或者通过 require 来使用它们：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">'/path/to/your-plugin.js'</span><span class="token punctuation">,</span>
    <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./another-plugin'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>前往 <RouterLink to="/zh/guide/advanced/plugin.html">深入 &gt; 开发插件</RouterLink> 学习如何开发你自己的插件。</p>
</template>