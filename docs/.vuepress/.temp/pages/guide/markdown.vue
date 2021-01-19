<template><h1 id="markdown"><a class="header-anchor" href="#markdown">#</a> Markdown</h1>
<p>Make sure you have known Markdown well before reading this section. If not, please learn some <a href="https://commonmark.org/help/" target="_blank" rel="noopener noreferrer">Markdown tutorials<OutboundLink/></a> first.</p>
<h2 id="syntax-extensions"><a class="header-anchor" href="#syntax-extensions">#</a> Syntax Extensions</h2>
<p>The Markdown content in VuePress will be parsed by <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it<OutboundLink/></a>, which supports <a href="https://github.com/markdown-it/markdown-it#syntax-extensions" target="_blank" rel="noopener noreferrer">syntax extensions<OutboundLink/></a> via markdown-it plugins.</p>
<p>This section will introduce built-in Markdown syntax extensions of VuePress.</p>
<p>You can also configure those built-in extensions, load more markdown-it plugins and implement your own extensions via <RouterLink to="/reference/config.html#markdown">markdown</RouterLink> option and <RouterLink to="/reference/plugin-api.html#extendsmarkdown">extendsMarkdown</RouterLink> option.</p>
<h3 id="embedded"><a class="header-anchor" href="#embedded">#</a> Embedded</h3>
<p>Embedded by markdown-it:</p>
<ul>
<li><a href="https://help.github.com/articles/organizing-information-with-tables/" target="_blank" rel="noopener noreferrer">Tables<OutboundLink/></a> (GFM)</li>
<li><a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text" target="_blank" rel="noopener noreferrer">Strikethrough<OutboundLink/></a> (GFM)</li>
</ul>
<h3 id="header-anchors"><a class="header-anchor" href="#header-anchors">#</a> Header Anchors</h3>
<p>You might have noticed that, a <code>#</code> anchor is displayed when you hover the mouse on the headers of each section. By clicking the <code>#</code> anchor, you can jump to the section directly.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This header anchors extension is supported by <a href="https://github.com/valeriangalliat/markdown-it-anchor" target="_blank" rel="noopener noreferrer">markdown-it-anchor<OutboundLink/></a>.</p>
<p>Config reference: <RouterLink to="/reference/config.html#markdown-anchor">markdown.anchor</RouterLink></p>
</div>
<h3 id="links"><a class="header-anchor" href="#links">#</a> Links</h3>
<p>When using Markdown <a href="https://spec.commonmark.org/0.29/#link-reference-definitions" target="_blank" rel="noopener noreferrer">link syntax<OutboundLink/></a>, VuePress will implement some conversions for you.</p>
<p>Take our documentation source files as an example:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  ├─ markdown.md    <span class="token comment"># &lt;- Here we are</span>
   │  └─ README.md
   ├─ reference
   │  └─ config.md
   └─ README.md
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>Raw Markdown</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token url">[<span class="token content">Home</span>](<span class="token url">/README.md</span>)</span>  
<span class="token url">[<span class="token content">Guide</span>](<span class="token url">/guide/</span>)</span>  
<span class="token url">[<span class="token content">Getting Started</span>](<span class="token url">./getting-started.md</span>)</span>  
<span class="token url">[<span class="token content">markdown.links</span>](<span class="token url">../reference/config.md#links</span>)</span>  
<span class="token url">[<span class="token content">GitHub</span>](<span class="token url">https://github.com</span>)</span>  
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>Converted to</strong></p>
<div class="language-markup ext-vue line-numbers-mode"><pre v-pre class="language-markup"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Home<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/guide/<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Guide<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/guide/getting-started.html<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Getting Started<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RouterLink</span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/reference/config.html#links<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>markdown.links<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RouterLink</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://github.com<span class="token punctuation">"</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>_blank<span class="token punctuation">"</span></span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>noopener noreferrer<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>GitHub<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>OutboundLink</span><span class="token punctuation">/></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>Rendered as</strong></p>
<p><RouterLink to="/">Home</RouterLink><br>
<RouterLink to="/guide/">Guide</RouterLink><br>
<RouterLink to="/guide/getting-started.html">Getting Started</RouterLink><br>
<RouterLink to="/reference/config.html#links">markdown.links</RouterLink><br>
<a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub<OutboundLink/></a></p>
<p><strong>Explanation</strong></p>
<ul>
<li>Internal links will be converted to <code>&lt;RouterLink&gt;</code> for SPA navigation.</li>
<li>Internal links to <code>.md</code> files will be converted to the <RouterLink to="/guide/page.html#routing">page route path</RouterLink>, and both absolute path and relative path are supported.</li>
<li>External links will get <code>target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot;</code> attrs and a <OutboundLink /> indicator.</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This links extension is supported by our built-in plugin.</p>
<p>Config reference: <RouterLink to="/reference/config.html#markdown-links">markdown.links</RouterLink></p>
<p>Also see: <RouterLink to="/reference/components.html#outboundlink">Built-in Components &gt; OutboundLink</RouterLink></p>
</div>
<h3 id="emoji"><a class="header-anchor" href="#emoji">#</a> Emoji 🎉</h3>
<p>You can add emoji to your Markdown content by typing <code>:EMOJICODE:</code>.</p>
<p>For a full list of available emoji and codes, check out <a href="https://emoji-cheat-sheet.com/" target="_blank" rel="noopener noreferrer">emoji-cheat-sheet.com<OutboundLink/></a>.</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>VuePress 2 is out :tada: !
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>Output</strong></p>
<p>VuePress 2 is out 🎉 !</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This emoji extension is supported by <a href="https://github.com/markdown-it/markdown-it-emoji" target="_blank" rel="noopener noreferrer">markdown-it-emoji<OutboundLink/></a>.</p>
<p>Config reference: <RouterLink to="/reference/config.html#markdown-emoji">markdown.emoji</RouterLink></p>
</div>
<h3 id="table-of-contents"><a class="header-anchor" href="#table-of-contents">#</a> Table of Contents</h3>
<p>If you want to put the table of contents (TOC) of your current page inside your Markdown content, you can use the <code>[[toc]]</code> syntax.</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>[[toc]]
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>Output</strong></p>
<nav class="table-of-contents"><ul><li><RouterLink to="#syntax-extensions">Syntax Extensions</RouterLink><ul><li><RouterLink to="#embedded">Embedded</RouterLink></li><li><RouterLink to="#header-anchors">Header Anchors</RouterLink></li><li><RouterLink to="#links">Links</RouterLink></li><li><RouterLink to="#emoji">Emoji 🎉</RouterLink></li><li><RouterLink to="#table-of-contents">Table of Contents</RouterLink></li><li><RouterLink to="#code-blocks">Code Blocks</RouterLink></li></ul></li><li><RouterLink to="#using-vue-in-markdown">Using Vue in Markdown</RouterLink><ul><li><RouterLink to="#template-syntax">Template Syntax</RouterLink></li><li><RouterLink to="#components">Components</RouterLink></li></ul></li></ul></nav>
<p>The headers in TOC will link to the corresponding <a href="#header-anchors">header anchors</a>, so TOC won't work well if you disable header anchors.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This toc extension is supported by our built-in plugin, which is forked and modified from <a href="https://github.com/nagaozen/markdown-it-toc-done-right" target="_blank" rel="noopener noreferrer">markdown-it-toc-done-right<OutboundLink/></a>.</p>
<p>Config reference: <RouterLink to="/reference/config.html#markdown-toc">markdown.toc</RouterLink></p>
</div>
<h3 id="code-blocks"><a class="header-anchor" href="#code-blocks">#</a> Code Blocks</h3>
<p>Following code blocks extensions are implemented during markdown parsing in Node side. That means, the code blocks won't be processed in client side.</p>
<p>If you want to implement client-side syntax highlighting via <a href="https://prismjs.com/#basic-usage" target="_blank" rel="noopener noreferrer">prism.js<OutboundLink/></a> or <a href="https://highlightjs.org/" target="_blank" rel="noopener noreferrer">highlight.js<OutboundLink/></a>, you could disable our code blocks extensions, and introduce your library manually in client side.</p>
<h4 id="syntax-highlighting"><a class="header-anchor" href="#syntax-highlighting">#</a> Syntax Highlighting</h4>
<p>VuePress uses <a href="https://prismjs.com/" target="_blank" rel="noopener noreferrer">Prism<OutboundLink/></a> to highlight language syntax in Markdown code blocks, using coloured text.</p>
<p>Prism supports a wide variety of programming languages. For a full list of available languages, check out <a href="https://prismjs.com/#supported-languages" target="_blank" rel="noopener noreferrer">Prism supported languages<OutboundLink/></a>.</p>
<p>You can add an optional language identifier to enable syntax highlighting in your fenced code blocks:</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token code"><span class="token punctuation">```</span><span class="token code-language">ts</span>
<span class="token code-block language-ts"><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> UserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/cli'</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> config<span class="token operator">:</span> UserConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">'Hello, VuePress'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span></span>
<span class="token punctuation">```</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>Output</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> UserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/cli'</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> config<span class="token operator">:</span> UserConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">'Hello, VuePress'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This syntax highlighting extension is supported by our built-in plugin.</p>
<p>Config reference: <RouterLink to="/reference/config.html#markdown-code-highlight">markdown.code.highlight</RouterLink></p>
</div>
<h4 id="line-highlighting"><a class="header-anchor" href="#line-highlighting">#</a> Line Highlighting</h4>
<p>You can highlight specified lines of your code blocks by adding line ranges mark in your fenced code blocks:</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token code"><span class="token punctuation">```</span><span class="token code-language">ts{1,6-8}</span>
<span class="token code-block language-ts"><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> UserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/cli'</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> config<span class="token operator">:</span> UserConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">'Hello, VuePress'</span><span class="token punctuation">,</span>

  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    logo<span class="token operator">:</span> <span class="token string">'https://vuejs.org/images/logo.png'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span></span>
<span class="token punctuation">```</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>Output</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> UserConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/cli'</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> config<span class="token operator">:</span> UserConfig <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> <span class="token string">'Hello, VuePress'</span><span class="token punctuation">,</span>

  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    logo<span class="token operator">:</span> <span class="token string">'https://vuejs.org/images/logo.png'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><div class="highlight-line">&nbsp;</div><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br></div><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Examples for line ranges mark:</p>
<ul>
<li>Line ranges: <code>{5-8}</code></li>
<li>Multiple single lines: <code>{4,7,9}</code></li>
<li>Combined: <code>{4,7-13,16,23-27,40}</code></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This line highlighting extension is supported by our built-in plugin, which is forked and modified from <a href="https://github.com/egoist/markdown-it-highlight-lines" target="_blank" rel="noopener noreferrer">markdown-it-highlight-lines<OutboundLink/></a>.</p>
<p>Config reference: <RouterLink to="/reference/config.html#markdown-code-highlightlines">markdown.code.highlightLines</RouterLink></p>
</div>
<h4 id="line-numbers"><a class="header-anchor" href="#line-numbers">#</a> Line Numbers</h4>
<p>You must have noticed that the number of lines is displayed on the left side of code blocks. This is enabled by default and you can disable it in config.</p>
<p>You can add <code>:line-numbers</code> / <code>:no-line-numbers</code> mark in your fenced code blocks to override the value set in config.</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token code"><span class="token punctuation">```</span><span class="token code-language">ts</span>
<span class="token code-block language-ts"><span class="token comment">// line-numbers is enabled by default</span>
<span class="token keyword">const</span> line2 <span class="token operator">=</span> <span class="token string">'This is line 2'</span>
<span class="token keyword">const</span> line3 <span class="token operator">=</span> <span class="token string">'This is line 3'</span></span>
<span class="token punctuation">```</span></span>

<span class="token code"><span class="token punctuation">```</span><span class="token code-language">ts:no-line-numbers</span>
<span class="token code-block language-ts"><span class="token comment">// line-numbers is disabled</span>
<span class="token keyword">const</span> line2 <span class="token operator">=</span> <span class="token string">'This is line 2'</span>
<span class="token keyword">const</span> line3 <span class="token operator">=</span> <span class="token string">'This is line 3'</span></span>
<span class="token punctuation">```</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>Output</strong></p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// line-numbers is enabled by default</span>
<span class="token keyword">const</span> line2 <span class="token operator">=</span> <span class="token string">'This is line 2'</span>
<span class="token keyword">const</span> line3 <span class="token operator">=</span> <span class="token string">'This is line 3'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-typescript ext-ts"><pre v-pre class="language-typescript"><code><span class="token comment">// line-numbers is disabled</span>
<span class="token keyword">const</span> line2 <span class="token operator">=</span> <span class="token string">'This is line 2'</span>
<span class="token keyword">const</span> line3 <span class="token operator">=</span> <span class="token string">'This is line 3'</span>
</code></pre></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This line numbers extension is supported by our built-in plugin.</p>
<p>Config reference: <RouterLink to="/reference/config.html#markdown-code-linenumbers">markdown.code.lineNumbers</RouterLink></p>
</div>
<h4 id="wrap-with-v-pre"><a class="header-anchor" href="#wrap-with-v-pre">#</a> Wrap with v-pre</h4>
<p>As <a href="#template-syntax">template syntax is allowed in Markdown</a>, it would also work in code blocks, too.</p>
<p>To avoid your code blocks being compiled by Vue, VuePress will add <a href="https://v3.vuejs.org/api/directives.html#v-pre" target="_blank" rel="noopener noreferrer">v-pre<OutboundLink/></a> directive to your code blocks by default, which can be disabled in config.</p>
<p>You can add <code>:v-pre</code> / <code>:no-v-pre</code> mark in your fenced code blocks to override the value set in config.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>The template syntax characters, for example, the &quot;Mustache&quot; syntax (double curly braces) might be parsed by the syntax highlighter. Thus, as the following example, <code>:no-v-pre</code> might not work well in some languages.</p>
<p>If you want to make Vue syntax work in those languages anyway, try to disable the default syntax highlighting and implement your own syntax highlighting in client side.</p>
</div>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token code"><span class="token punctuation">```</span><span class="token code-language">md</span>
<span class="token code-block language-md"><span class="token comment">&lt;!-- This will be kept as is by default --></span>
1 + 2 + 3 = {{ 1 + 2 + 3 }}</span>
<span class="token punctuation">```</span></span>

<span class="token code"><span class="token punctuation">```</span><span class="token code-language">md:no-v-pre</span>
<span class="token code-block language-md"><span class="token comment">&lt;!-- This will be compiled by Vue --></span>
1 + 2 + 3 = {{ 1 + 2 + 3 }}</span>
<span class="token punctuation">```</span></span>

<span class="token code"><span class="token punctuation">```</span><span class="token code-language">js:no-v-pre</span>
<span class="token code-block language-js"><span class="token comment">// This won't be compiled correctly because of js syntax highlighting</span>
<span class="token keyword">const</span> onePlusTwoPlusThree <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span>
<span class="token punctuation">```</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>Output</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token comment">&lt;!-- This will be kept as is --></span>
1 + 2 + 3 = {{ 1 + 2 + 3 }}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-markdown ext-md line-numbers-mode"><pre class="language-markdown"><code><span class="token comment">&lt;!-- This will be compiled by Vue --></span>
1 + 2 + 3 = {{ 1 + 2 + 3 }}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// This won't be compiled correctly because of js syntax highlighting</span>
<span class="token keyword">const</span> onePlusTwoPlusThree <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token number">1</span> <span class="token operator">+</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token number">3</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>This v-pre extension is supported by our built-in plugin.</p>
<p>Config reference: <RouterLink to="/reference/config.html#markdown-vpre">markdown.code.vPre</RouterLink></p>
</div>
<h2 id="using-vue-in-markdown"><a class="header-anchor" href="#using-vue-in-markdown">#</a> Using Vue in Markdown</h2>
<p>This section will introduce some basic usage of Vue in Markdown.</p>
<p>Check out <RouterLink to="/guide/advanced/markdown.html">Advanced &gt; Markdown and Vue SFC</RouterLink> for more details.</p>
<h3 id="template-syntax"><a class="header-anchor" href="#template-syntax">#</a> Template Syntax</h3>
<p>As we know:</p>
<ul>
<li>HTML is allowed in Markdown.</li>
<li>Vue template syntax is compatible with HTML.</li>
</ul>
<p>That means, <a href="https://v3.vuejs.org/guide/template-syntax.html" target="_blank" rel="noopener noreferrer">Vue template syntax<OutboundLink/></a> is allowed in Markdown.</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>One plus one equals: {{ 1 + 1 }}

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>i in 3<span class="token punctuation">"</span></span><span class="token punctuation">></span></span> span: {{ i }} <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>Output</strong></p>
<p>One plus one equals: {{ 1 + 1 }}</p>
<p><span v-for="i in 3"> span: {{ i }} </span></p>
<h3 id="components"><a class="header-anchor" href="#components">#</a> Components</h3>
<p>You can use Vue components directly in Markdown.</p>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>This is default theme built-in <span class="token code keyword">`&lt;Badge />`</span> component <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>demo<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p><strong>Output</strong></p>
<p>This is default theme built-in <code>&lt;Badge /&gt;</code> component <Badge text="demo" /></p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Check out the <RouterLink to="/reference/components.html">Built-in Components</RouterLink> for a full list of built-in components.</p>
<p>Check out the <RouterLink to="/reference/default-theme/components.html">Default Theme &gt; Built-in Components</RouterLink> for a full list of default theme built-in components.</p>
</div>
</template>