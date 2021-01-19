<template><h1 id="frontmatter"><a class="header-anchor" href="#frontmatter">#</a> Frontmatter</h1>
<h2 id="lang"><a class="header-anchor" href="#lang">#</a> lang</h2>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Language for the page.</p>
<p>This will override the <code>lang</code> option in your site config.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/reference/config.html#lang">Config &gt; lang</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="title"><a class="header-anchor" href="#title">#</a> title</h2>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Title for the page.</p>
<p>If you don't specify <code>title</code> in frontmatter, content of the first level-one header (i.e. <code># title</code>) will be used as the title.</p>
</li>
</ul>
<h2 id="description"><a class="header-anchor" href="#description">#</a> description</h2>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Description for the page.</p>
<p>This will override the <code>description</code> option in your site config.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/reference/config.html#description">Config &gt; description</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="head"><a class="header-anchor" href="#head">#</a> head</h2>
<ul>
<li>
<p>Type: <code>HeadConfig[]</code></p>
</li>
<li>
<p>Details:</p>
<p>Extra tags in <code>&lt;head&gt;</code> tag for the page.</p>
</li>
<li>
<p>Example:</p>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Rendered as:</p>
<div class="language-markup ext-html line-numbers-mode"><pre v-pre class="language-markup"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>foo<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bar<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>canonical<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>foobar<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul>
<li>Also see:
<ul>
<li><RouterLink to="/reference/config.html#head">Config &gt; head</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="date"><a class="header-anchor" href="#date">#</a> date</h2>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Created date for the page.</p>
<p>You should specify the date in the form of <code>yyyy-MM-dd</code>, or follow the <a href="https://yaml.org/type/timestamp.html" target="_blank" rel="noopener noreferrer">YAML Timestamp Type<OutboundLink/></a>.</p>
</li>
</ul>
<h2 id="permalink"><a class="header-anchor" href="#permalink">#</a> permalink</h2>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Permalink for the page.</p>
<p>This will override the default route path that determined by the file path of the page.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><a href="#permalinkpattern">Frontmatter &gt; permalinkPattern</a></li>
<li><RouterLink to="/guide/page.html#routing">Guide &gt; Page &gt; Routing</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="permalinkpattern"><a class="header-anchor" href="#permalinkpattern">#</a> permalinkPattern</h2>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Pattern to generate permalink for the page.</p>
<p>This won't take effect if the <code>permalink</code> frontmatter has been set.</p>
</li>
<li>
<p>Usage:</p>
<table>
<thead>
<tr>
<th>Pattern</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>:year</code></td>
<td>Year part of created date</td>
</tr>
<tr>
<td><code>:month</code></td>
<td>Month part of created date</td>
</tr>
<tr>
<td><code>:day</code></td>
<td>Day part of created date</td>
</tr>
<tr>
<td><code>:slug</code></td>
<td>Slug of page filename</td>
</tr>
<tr>
<td><code>:raw</code></td>
<td>Raw route path</td>
</tr>
</tbody>
</table>
<p>The <code>:year</code>, <code>:month</code> and <code>:day</code> patterns are resolved according to the following priority:</p>
<ul>
<li>The <code>date</code> frontmatter.</li>
<li>The filename that matches the date pattern <code>yyyy-MM-dd-foobar.md</code> or <code>yyyy-MM-foobar.md</code>.</li>
<li>The dirname that matches the date pattern <code>yyyy/MM/dd/foobar.md</code> or <code>yyyy/MM/foobar.md</code>.</li>
<li>Fallback to <code>1970-01-01</code>.</li>
</ul>
</li>
<li>
<p>Example:</p>
<ul>
<li>
<p>Case 1:</p>
<p>The page filename is <code>foo-bar.md</code>.</p>
<p>The page frontmatter is:</p>
</li>
</ul>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2021-01-03</span>
<span class="token key atrule">permalinkPattern</span><span class="token punctuation">:</span> <span class="token punctuation">:</span>year/<span class="token punctuation">:</span>month/<span class="token punctuation">:</span>day/<span class="token punctuation">:</span>slug.html</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><pre><code>Then the permalink of the page would be `2021/01/03/foo-bar.html`.
</code></pre>
<ul>
<li>
<p>Case 2:</p>
<p>The page filename is <code>2021-01-03-bar-baz.md</code>.</p>
<p>The page frontmatter is:</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">permalinkPattern</span><span class="token punctuation">:</span> <span class="token punctuation">:</span>year/<span class="token punctuation">:</span>month/<span class="token punctuation">:</span>day/<span class="token punctuation">:</span>slug.html</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><pre><code>Then the permalink of the page would be `2021/01/03/bar-baz.html`.
</code></pre>
<ul>
<li>Also see:
<ul>
<li><a href="#date">Frontmatter &gt; date</a></li>
<li><a href="#permalink">Frontmatter &gt; permalink</a></li>
</ul>
</li>
</ul>
<h2 id="layout"><a class="header-anchor" href="#layout">#</a> layout</h2>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Layout for the page.</p>
</li>
</ul>
</template>