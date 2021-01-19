<template><h1 id="frontmatter"><a class="header-anchor" href="#frontmatter">#</a> Frontmatter</h1>
<h2 id="lang"><a class="header-anchor" href="#lang">#</a> lang</h2>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>页面的语言。</p>
<p>它将会覆盖站点配置中的 <code>lang</code> 配置项</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/reference/config.html#lang">配置 &gt; lang</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="title"><a class="header-anchor" href="#title">#</a> title</h2>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>页面的标题。</p>
<p>如果你不在 Frontmatter 中设置 <code>title</code> ，那么页面中第一个一级标题（即 <code># title</code>）的内容会被当作标题使用。</p>
</li>
</ul>
<h2 id="description"><a class="header-anchor" href="#description">#</a> description</h2>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>页面的描述。</p>
<p>它将会覆盖站点配置中的 <code>description</code> 配置项</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/reference/config.html#description">配置 &gt; description</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="head"><a class="header-anchor" href="#head">#</a> head</h2>
<ul>
<li>
<p>类型： <code>HeadConfig[]</code></p>
</li>
<li>
<p>详情：</p>
<p>页面 <code>&lt;head&gt;</code> 标签内添加的额外标签。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">head</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token punctuation">-</span> meta
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> foo
      <span class="token key atrule">content</span><span class="token punctuation">:</span> bar
  <span class="token punctuation">-</span> <span class="token punctuation">-</span> link
    <span class="token punctuation">-</span> <span class="token key atrule">rel</span><span class="token punctuation">:</span> canonical
      <span class="token key atrule">href</span><span class="token punctuation">:</span> foobar</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>渲染为：</p>
<div class="language-markup ext-html line-numbers-mode"><pre v-pre class="language-markup"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>foo<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bar<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>canonical<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>foobar<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul>
<li>参考：
<ul>
<li><RouterLink to="/zh/reference/config.html#head">配置 &gt; head</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="date"><a class="header-anchor" href="#date">#</a> date</h2>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>页面的创建日期。</p>
<p>应按照 <code>yyyy-MM-dd</code> 的格式来指定日期，或者遵循 <a href="https://yaml.org/type/timestamp.html" target="_blank" rel="noopener noreferrer">YAML Timestamp Type<OutboundLink/></a> 。</p>
</li>
</ul>
<h2 id="permalink"><a class="header-anchor" href="#permalink">#</a> permalink</h2>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>页面的永久链接。</p>
<p>它将会覆盖根据文件路径来决定的默认路由路径。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><a href="#permalinkpattern">Frontmatter &gt; permalinkPattern</a></li>
<li><RouterLink to="/zh/guide/page.html#%E8%B7%AF%E7%94%B1">指南 &gt; 页面 &gt; 路由</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="permalinkpattern"><a class="header-anchor" href="#permalinkpattern">#</a> permalinkPattern</h2>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>为页面生成永久链接的 Pattern 。</p>
<p>如果 Frontmatter 中设置了 <code>permalink</code> ，那么这个字段则不会生效。</p>
</li>
<li>
<p>使用：</p>
<table>
<thead>
<tr>
<th>Pattern</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>:year</code></td>
<td>创建日期的 年 部分</td>
</tr>
<tr>
<td><code>:month</code></td>
<td>创建日期的 月 部分</td>
</tr>
<tr>
<td><code>:day</code></td>
<td>创建日期的 日 部分</td>
</tr>
<tr>
<td><code>:slug</code></td>
<td>页面文件名的 Slug</td>
</tr>
<tr>
<td><code>:raw</code></td>
<td>原始路由路径</td>
</tr>
</tbody>
</table>
<p><code>:year</code>, <code>:month</code> 和 <code>:day</code> Pattern 根据如下优先级进行解析：</p>
<ul>
<li>Frontmatter 中的 <code>date</code> 字段。</li>
<li>符合 <code>yyyy-MM-dd-foobar.md</code> 或 <code>yyyy-MM-foobar.md</code> 日期格式的文件名。</li>
<li>符合 <code>yyyy/MM/dd/foobar.md</code> 或 <code>yyyy/MM/foobar.md</code> 日期格式的目录名。</li>
<li>默认值 <code>1970-01-01</code> 。</li>
</ul>
</li>
<li>
<p>示例：</p>
<ul>
<li>
<p>情况 1：</p>
<p>页面文件名是 <code>foo-bar.md</code> 。</p>
<p>页面 Frontmatter 是：</p>
</li>
</ul>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2021-01-03</span>
<span class="token key atrule">permalinkPattern</span><span class="token punctuation">:</span> <span class="token punctuation">:</span>year/<span class="token punctuation">:</span>month/<span class="token punctuation">:</span>day/<span class="token punctuation">:</span>slug.html</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><pre><code>那么页面的永久链接将会是 `2021/01/03/foo-bar.html` 。
</code></pre>
<ul>
<li>
<p>情况 2：</p>
<p>页面文件名是 <code>2021-01-03-bar-baz.md</code>。</p>
<p>页面 Frontmatter 是：</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">permalinkPattern</span><span class="token punctuation">:</span> <span class="token punctuation">:</span>year/<span class="token punctuation">:</span>month/<span class="token punctuation">:</span>day/<span class="token punctuation">:</span>slug.html</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><pre><code>那么页面的永久链接将会是 `2021/01/03/bar-baz.html` 。
</code></pre>
<ul>
<li>参考：
<ul>
<li><a href="#date">Frontmatter &gt; date</a></li>
<li><a href="#permalink">Frontmatter &gt; permalink</a></li>
</ul>
</li>
</ul>
<h2 id="layout"><a class="header-anchor" href="#layout">#</a> layout</h2>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>页面的布局。</p>
</li>
</ul>
</template>