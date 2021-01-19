<template><h1 id="frontmatter"><a class="header-anchor" href="#frontmatter">#</a> Frontmatter</h1>
<h2 id="home-page"><a class="header-anchor" href="#home-page">#</a> Home Page</h2>
<p>Frontmatter in this section will only take effect in home pages.</p>
<h3 id="home"><a class="header-anchor" href="#home">#</a> home</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify whether the page is homepage or a normal page.</p>
<p>If you don't set this frontmatter or set it to <code>false</code>, the page would be a <a href="#normal-page">normal page</a>.</p>
</li>
<li>
<p>Example:</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">home</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ul>
<h3 id="heroimage"><a class="header-anchor" href="#heroimage">#</a> heroImage</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the url of the hero image.</p>
</li>
<li>
<p>Example:</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token comment"># public file path</span>
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> /hero.png
<span class="token comment"># url</span>
<span class="token key atrule">heroImage</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//vuejs.org/images/logo.png</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/assets.html#public-files">Guide &gt; Assets &gt; Public Files</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="heroalt"><a class="header-anchor" href="#heroalt">#</a> heroAlt</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the <code>alt</code> attribute of the hero image.</p>
<p>This will fallback to the <a href="#heroText">heroText</a>.</p>
</li>
</ul>
<h3 id="herotext"><a class="header-anchor" href="#herotext">#</a> heroText</h3>
<ul>
<li>
<p>Type: <code>string | null</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the the hero text.</p>
<p>This will fallback to the site <RouterLink to="/reference/config.html#title">title</RouterLink>.</p>
<p>Set to <code>null</code> to disable hero text.</p>
</li>
</ul>
<h3 id="tagline"><a class="header-anchor" href="#tagline">#</a> tagline</h3>
<ul>
<li>
<p>Type: <code>string | null</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the the tagline.</p>
<p>This will fallback to the site <RouterLink to="/reference/config.html#description">description</RouterLink>.</p>
<p>Set to <code>null</code> to disable tagline.</p>
</li>
</ul>
<h3 id="actions"><a class="header-anchor" href="#actions">#</a> actions</h3>
<ul>
<li>Type:</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token punctuation">{</span>
  text<span class="token operator">:</span> <span class="token builtin">string</span>
  link<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token keyword">type</span><span class="token operator">?</span><span class="token operator">:</span> <span class="token string">'primary'</span> <span class="token operator">|</span> <span class="token string">'secondary'</span>
<span class="token punctuation">}</span><span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>
<p>Details:</p>
<p>Configuration of the action buttons.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">actions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">text</span><span class="token punctuation">:</span> Get Started
    <span class="token key atrule">link</span><span class="token punctuation">:</span> /guide/getting<span class="token punctuation">-</span>started.html
    <span class="token key atrule">type</span><span class="token punctuation">:</span> primary
  <span class="token punctuation">-</span> <span class="token key atrule">text</span><span class="token punctuation">:</span> Introduction
    <span class="token key atrule">link</span><span class="token punctuation">:</span> /guide/
    <span class="token key atrule">type</span><span class="token punctuation">:</span> secondary</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="features"><a class="header-anchor" href="#features">#</a> features</h3>
<ul>
<li>Type:</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token builtin">string</span>
  details<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span><span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul>
<li>
<p>Details:</p>
<p>Configuration of the features list.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">features</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Simplicity First
    <span class="token key atrule">details</span><span class="token punctuation">:</span> Minimal setup with markdown<span class="token punctuation">-</span>centered project structure helps you focus on writing.
  <span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Vue<span class="token punctuation">-</span>Powered
    <span class="token key atrule">details</span><span class="token punctuation">:</span> Enjoy the dev experience of Vue<span class="token punctuation">,</span> use Vue components in markdown<span class="token punctuation">,</span> and develop custom themes with Vue.
  <span class="token punctuation">-</span> <span class="token key atrule">title</span><span class="token punctuation">:</span> Performant
    <span class="token key atrule">details</span><span class="token punctuation">:</span> VuePress generates pre<span class="token punctuation">-</span>rendered static HTML for each page<span class="token punctuation">,</span> and runs as an SPA once a page is loaded.</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="footer"><a class="header-anchor" href="#footer">#</a> footer</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the content of the footer.</p>
</li>
</ul>
<h3 id="footerhtml"><a class="header-anchor" href="#footerhtml">#</a> footerHtml</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Details:</p>
<p>Allow HTML in footer or not.</p>
<p>If you set it to <code>true</code>, the <a href="#footer">footer</a> will be treated as HTML code.</p>
</li>
</ul>
<h2 id="normal-page"><a class="header-anchor" href="#normal-page">#</a> Normal Page</h2>
<p>Frontmatter in this section will only take effect in normal pages.</p>
<h3 id="editlink"><a class="header-anchor" href="#editlink">#</a> editLink</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable the <em>edit this page</em> link in this page or not.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/reference/default-theme/config.html#editlink">Default Theme &gt; Config &gt; editLink</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="lastupdated"><a class="header-anchor" href="#lastupdated">#</a> lastUpdated</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable the <em>last updated timestamp</em> in this page or not.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/reference/default-theme/config.html#lastupdated">Default Theme &gt; Config &gt; lastUpdated</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="contributors"><a class="header-anchor" href="#contributors">#</a> contributors</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable the <em>contributors list</em> in this page or not.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/reference/default-theme/config.html#contributors">Default Theme &gt; Config &gt; contributors</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="sidebar"><a class="header-anchor" href="#sidebar">#</a> sidebar</h3>
<ul>
<li>
<p>Type: <code>false | 'auto' | SidebarConfigArray | SidebarConfigObject</code></p>
</li>
<li>
<p>Details:</p>
<p>Configure the sidebar of this page.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/reference/default-theme/config.html#sidebar">Default Theme &gt; Config &gt; sidebar</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="prev"><a class="header-anchor" href="#prev">#</a> prev</h3>
<ul>
<li>
<p>Type: <code>NavLink | string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the link of the previous page.</p>
<p>If you don't set this frontmatter, the link will be inferred from the sidebar config.</p>
<p>To configure the prev link manually, you can set this frontmatter to a <code>NavLink</code> object or a string:</p>
<ul>
<li>A <code>NavLink</code> object should have a <code>text</code> field and a <code>link</code> field.</li>
<li>A string should be the path to the target page file. It will be converted to a <code>NavLink</code> object, whose <code>text</code> is the page title, and <code>link</code> is the page route path.</li>
</ul>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token comment"># NavLink</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span>
  <span class="token key atrule">text</span><span class="token punctuation">:</span> Get Started
  <span class="token key atrule">link</span><span class="token punctuation">:</span> /guide/getting<span class="token punctuation">-</span>started.html

<span class="token comment"># NavLink - external url</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span>
  <span class="token key atrule">text</span><span class="token punctuation">:</span> GitHub
  <span class="token key atrule">link</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com

<span class="token comment"># string - page file path</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span> /guide/getting<span class="token punctuation">-</span>started.md

<span class="token comment"># string - page file relative path</span>
<span class="token key atrule">prev</span><span class="token punctuation">:</span> ../../guide/getting<span class="token punctuation">-</span>started.md</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="next"><a class="header-anchor" href="#next">#</a> next</h3>
<ul>
<li>
<p>Type: <code>NavLink | string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the link of the next page.</p>
<p>If you don't set this frontmatter, the link will be inferred from the sidebar config.</p>
<p>The type is the same as <a href="#prev">prev</a> frontmatter.</p>
</li>
</ul>
</template>