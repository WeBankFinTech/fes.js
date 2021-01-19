<template><h1 id="frontmatter"><a class="header-anchor" href="#frontmatter">#</a> Frontmatter</h1>
<h2 id="首页"><a class="header-anchor" href="#首页">#</a> 首页</h2>
<p>本章节中的 Frontmatter 只会在首页中生效。</p>
<h3 id="home"><a class="header-anchor" href="#home">#</a> home</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>详情：</p>
<p>设定该页面是首页还是普通页面。</p>
<p>如果你不设置该 Frontmatter 或将其设为 <code>false</code> ，则该页面会是一个 <a href="#%E6%99%AE%E9%80%9A%E9%A1%B5%E9%9D%A2">普通页面</a></p>
</li>
<li>
<p>示例：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">home</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
<h3 id="heroimage"><a class="header-anchor" href="#heroimage">#</a> heroImage</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>首页图片的 URL 。</p>
</li>
<li>
<p>示例：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token comment"># Public 文件路径</span>
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> /hero.png
<span class="token comment"># URL</span>
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//vuejs.org/images/logo.png</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/assets.html#public-%E6%96%87%E4%BB%B6">指南 &gt; 静态资源 &gt; Public 文件</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="heroalt"><a class="header-anchor" href="#heroalt">#</a> heroAlt</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>首页图片的 <code>alt</code> 属性。</p>
<p>如果不设置，则默认使用 <a href="#heroText">heroText</a> 。</p>
</li>
</ul>
<h3 id="herotext"><a class="header-anchor" href="#herotext">#</a> heroText</h3>
<ul>
<li>
<p>类型： <code>string | null</code></p>
</li>
<li>
<p>详情：</p>
<p>首页的大标题。</p>
<p>如果不设置，则默认使用站点 <RouterLink to="/zh/reference/config.html#title">title</RouterLink> 。</p>
<p>设置为 <code>null</code> 来禁用首页大标题。</p>
</li>
</ul>
<h3 id="tagline"><a class="header-anchor" href="#tagline">#</a> tagline</h3>
<ul>
<li>
<p>类型： <code>string | null</code></p>
</li>
<li>
<p>详情：</p>
<p>首页的标语。</p>
<p>如果不设置，则默认使用站点 <RouterLink to="/zh/reference/config.html#description">description</RouterLink> 。</p>
<p>设置为 <code>null</code> 来禁用首页标语。</p>
</li>
</ul>
<h3 id="actions"><a class="header-anchor" href="#actions">#</a> actions</h3>
<ul>
<li>类型：</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token punctuation">{</span>
  text<span class="token operator">:</span> <span class="token builtin">string</span>
  link<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token keyword">type</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token string">'primary'</span> <span class="token operator">|</span> <span class="token string">'secondary'</span>
<span class="token punctuation">}</span><span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>
<p>详情：</p>
<p>配置首页按钮。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">actions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">text</span><span class="token punctuation">:</span> 快速上手
    <span class="token key atrule">link</span><span class="token punctuation">:</span> /zh/guide/getting<span class="token punctuation">-</span>started.html
    <span class="token key atrule">type</span><span class="token punctuation">:</span> primary
  <span class="token punctuation">-</span> <span class="token key atrule">text</span><span class="token punctuation">:</span> 项目简介
    <span class="token key atrule">link</span><span class="token punctuation">:</span> /guide/
    <span class="token key atrule">type</span><span class="token punctuation">:</span> secondary</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="features"><a class="header-anchor" href="#features">#</a> features</h3>
<ul>
<li>类型：</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
  details<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span><span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul>
<li>
<p>详情：</p>
<p>配置首页特性列表。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">features</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 简洁至上
    <span class="token key atrule">details</span><span class="token punctuation">:</span> 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  <span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Vue 驱动
    <span class="token key atrule">details</span><span class="token punctuation">:</span> 享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
  <span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> 高性能
    <span class="token key atrule">details</span><span class="token punctuation">:</span> VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="footer"><a class="header-anchor" href="#footer">#</a> footer</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>首页的页脚。</p>
</li>
</ul>
<h3 id="footerhtml"><a class="header-anchor" href="#footerhtml">#</a> footerHtml</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>详情：</p>
<p>是否允许页脚中使用 HTML 。</p>
<p>如果设置为 <code>true</code> ，那么 <a href="#footer">footer</a> 会被作为 HTML 代码处理。</p>
</li>
</ul>
<h2 id="普通页面"><a class="header-anchor" href="#普通页面">#</a> 普通页面</h2>
<p>本章节中的 Frontmatter 只会在普通页面中生效。</p>
<h3 id="editlink"><a class="header-anchor" href="#editlink">#</a> editLink</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>详情：</p>
<p>是否在本页面中启用 <em>编辑此页</em> 链接。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/reference/default-theme/config.html#editlink">默认主题 &gt; 配置 &gt; editLink</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="lastupdated"><a class="header-anchor" href="#lastupdated">#</a> lastUpdated</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>详情：</p>
<p>是否在本页面中启用 <em>最近更新时间戳</em> 。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/reference/default-theme/config.html#lastupdated">默认主题 &gt; 配置 &gt; lastUpdated</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="contributors"><a class="header-anchor" href="#contributors">#</a> contributors</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>详情：</p>
<p>是否在本页面中启用 <em>贡献者列表</em> 。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/reference/default-theme/config.html#contributors">默认主题 &gt; 配置 &gt; contributors</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="sidebar"><a class="header-anchor" href="#sidebar">#</a> sidebar</h3>
<ul>
<li>
<p>类型： <code>false | 'auto' | SidebarConfigArray | SidebarConfigObject</code></p>
</li>
<li>
<p>详情：</p>
<p>配置本页面的侧边栏。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/reference/default-theme/config.html#sidebar">默认主题 &gt; 配置 &gt; sidebar</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="prev"><a class="header-anchor" href="#prev">#</a> prev</h3>
<ul>
<li>
<p>类型： <code>NavLink | string</code></p>
</li>
<li>
<p>详情：</p>
<p>上一个页面的链接。</p>
<p>如果你不设置该 Frontmatter ，该链接会自动根据侧边栏配置进行推断。</p>
<p>为了手动配置上一页面的链接，你可以将其设置为一个 <code>NavLink</code> 对象或者一个字符串：</p>
<ul>
<li><code>NavLink</code> 对象应该有一个 <code>text</code> 字段和一个 <code>link</code> 字段。</li>
<li>字符串应为目标页面文件的路径。它将会被转换为 <code>NavLink</code> 对象，将页面标题作为 <code>text</code> ，将页面路由路径作为 <code>link</code> 。</li>
</ul>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token comment"># NavLink</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span>
  <span class="token key atrule">text</span><span class="token punctuation">:</span> Get Started
  <span class="token key atrule">link</span><span class="token punctuation">:</span> /guide/getting<span class="token punctuation">-</span>started.html

<span class="token comment"># NavLink - 外部 URL</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span>
  <span class="token key atrule">text</span><span class="token punctuation">:</span> GitHub
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com

<span class="token comment"># 字符串 - 页面文件路径</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span> /guide/getting<span class="token punctuation">-</span>started.md

<span class="token comment"># 字符串 - 页面文件相对路径</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span> ../../guide/getting<span class="token punctuation">-</span>started.md</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="next"><a class="header-anchor" href="#next">#</a> next</h3>
<ul>
<li>
<p>类型： <code>NavLink | string</code></p>
</li>
<li>
<p>详情：</p>
<p>下一个页面的链接。</p>
<p>如果你不设置该 Frontmatter ，该链接会自动根据侧边栏配置进行推断。</p>
<p>类型和 <a href="#prev">prev</a> Frontmatter 相同。</p>
</li>
</ul>
</template>