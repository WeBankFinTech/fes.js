<template><h1 id="页面"><a class="header-anchor" href="#页面">#</a> 页面</h1>
<p>VuePress 是以 Markdown 为中心的。你项目中的每一个 Markdown 文件都是一个单独的页面。</p>
<h2 id="路由"><a class="header-anchor" href="#路由">#</a> 路由</h2>
<p>默认情况下，页面的路由路径是根据你的 Markdown 文件的相对路径决定的。</p>
<p>假设这是你的 Markdown 文件所处的目录结构：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  └─ README.md
   ├─ contributing.md
   └─ README.md
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>将 <code>docs</code> 目录作为你的 <RouterLink to="/zh/reference/cli.html">sourceDir</RouterLink> ，例如你在运行 <code>vuepress dev docs</code> 命令。此时，你的 Markdown 文件对应的路由路径为：</p>
<table>
<thead>
<tr>
<th>相对路径</th>
<th>路由路径</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>/README.md</code></td>
<td><code>/</code></td>
</tr>
<tr>
<td><code>/contributing.md</code></td>
<td><code>/contributing.html</code></td>
</tr>
<tr>
<td><code>/guide/README.md</code></td>
<td><code>/guide/</code></td>
</tr>
<tr>
<td><code>/guide/page.md</code></td>
<td><code>/guide/page.html</code></td>
</tr>
</tbody>
</table>
<h2 id="frontmatter"><a class="header-anchor" href="#frontmatter">#</a> Frontmatter</h2>
<p>Markdown 文件可以包含一个 <a href="https://yaml.org/" target="_blank" rel="noopener noreferrer">YAML<OutboundLink/></a> Frontmatter 。Frontmatter 必须在 Markdown 文件的顶部，并且被包裹在一对三短划线中间。下面是一个基本的示例：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">lang</span><span class="token punctuation">:</span> zh<span class="token punctuation">-</span>CN
<span class="token key atrule">title</span><span class="token punctuation">:</span> 页面的标题
<span class="token key atrule">description</span><span class="token punctuation">:</span> 页面的描述</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>你肯定注意到 Frontmatter 中的字段和<RouterLink to="/zh/guide/configuration.html#config-file">配置文件</RouterLink>中的<RouterLink to="/zh/guide/configuration.html#%E7%AB%99%E7%82%B9%E9%85%8D%E7%BD%AE">站点配置</RouterLink>十分类似。你可以通过 Frontmatter 来覆盖当前页面的 <code>lang</code>, <code>title</code>, <code>description</code> 等属性。因此，你可以把 Frontmatter 当作页面级作用域的配置。</p>
<p>同样的，VuePress 有一些内置支持的 Frontmatter 字段，而你使用的主题也可能有它自己的特殊 Frontmatter 。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>前往 <RouterLink to="/zh/reference/config.html">Frontmatter 参考</RouterLink> 查看 VuePress 支持的 Frontmatter 配置。</p>
<p>前往 <RouterLink to="/zh/reference/default-theme/frontmatter.html">默认主题 &gt; Frontmatter 参考</RouterLink> 查看默认主题的 Frontmatter 配置。</p>
</div>
<h2 id="内容"><a class="header-anchor" href="#内容">#</a> 内容</h2>
<p>页面的主要内容是使用 Markdown 书写的。VuePress 首先会将 Markdown 转换为 HTML ，然后将 HTML 作为 Vue 单文件组件的 <code>&lt;template&gt;</code> 。</p>
<p>借助 <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it<OutboundLink/></a> 和 Vue 模板语法的能力，基础的 Markdown 可以得到很多的扩展功能。接下来，前往 <RouterLink to="/zh/guide/markdown.html">Markdown</RouterLink> 章节来了解 VuePress 中 Markdown 的扩展功能。</p>
</template>