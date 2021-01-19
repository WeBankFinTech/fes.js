<template><h1 id="config"><a class="header-anchor" href="#config">#</a> Config</h1>
<p>Reference of VuePress config, which can be set via config file. The conventional config files are (in order of precedence):</p>
<ul>
<li>In current working directory <code>cwd</code>:
<ul>
<li><code>vuepress.config.ts</code></li>
<li><code>vuepress.config.js</code></li>
</ul>
</li>
<li>In source directory <code>sourceDir</code>:
<ul>
<li><code>.vuepress/config.ts</code></li>
<li><code>.vuepress/config.js</code></li>
</ul>
</li>
</ul>
<p>You can also specify the config file via <code>--config</code> option of <RouterLink to="/reference/cli.html">CLI</RouterLink>.</p>
<h2 id="site-config"><a class="header-anchor" href="#site-config">#</a> Site Config</h2>
<h3 id="base"><a class="header-anchor" href="#base">#</a> base</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>/</code></p>
</li>
<li>
<p>Details:</p>
<p>The base URL the site will be deployed at.</p>
<p>You will need to set this if you plan to deploy your site under a sub path. It should always start and end with a slash. For example, if you plan to deploy your site to GitHub pages at <code>https://foo.github.io/bar/</code>, then you should set <code>base</code> to <code>&quot;/bar/&quot;</code>.</p>
<p>The <code>base</code> is automatically prepended to all the URLs that start with <code>/</code> in other options, so you only need to specify it once.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/assets.html#base-helper">Guide &gt; Assets &gt; Base Helper</RouterLink></li>
<li><RouterLink to="/guide/deployment.html">Guide &gt; Deployment</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="lang"><a class="header-anchor" href="#lang">#</a> lang</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>en-US</code></p>
</li>
<li>
<p>Details:</p>
<p>Language for the site.</p>
<p>This will be the <code>lang</code> attribute of the <code>&lt;html&gt;</code> tag in the rendered HTML.</p>
<p>This can be specified in different locales.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><a href="#locales">Config &gt; locales</a></li>
<li><RouterLink to="/reference/frontmatter.html#lang">Frontmatter &gt; lang</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="title"><a class="header-anchor" href="#title">#</a> title</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>''</code></p>
</li>
<li>
<p>Details:</p>
<p>Title for the site.</p>
<p>This will be the suffix for all page titles, and displayed in the navbar in the default theme.</p>
<p>This can be specified in different locales.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><a href="#locales">Config &gt; locales</a></li>
</ul>
</li>
</ul>
<h3 id="description"><a class="header-anchor" href="#description">#</a> description</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>''</code></p>
</li>
<li>
<p>Details:</p>
<p>Description for the site.</p>
<p>This will be the <code>content</code> attribute of <code>&lt;meta name=&quot;description&quot; /&gt;</code> tag in the rendered HTML, which will be overrode by the <code>description</code> field of page frontmatter.</p>
<p>This can be specified in different locales.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><a href="#locales">Config &gt; locales</a></li>
<li><RouterLink to="/reference/frontmatter.html#description">Frontmatter &gt; description</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="head"><a class="header-anchor" href="#head">#</a> head</h3>
<ul>
<li>
<p>Type: <code>HeadConfig[]</code></p>
</li>
<li>
<p>Default: <code>[]</code></p>
</li>
<li>
<p>Details:</p>
<p>Extra tags to inject into the <code>&lt;head&gt;</code> tag in the rendered HTML.</p>
<p>You can specify each tag in the form of <code>[tagName, { attrName: attrValue }, innerHTML?]</code>.</p>
<p>This can be specified in different locales.</p>
</li>
<li>
<p>Example:</p>
<p>To add a custom favicon:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  head<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> rel<span class="token operator">:</span> <span class="token string">'icon'</span><span class="token punctuation">,</span> href<span class="token operator">:</span> <span class="token string">'/logo.png'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Rendered as：</p>
<div class="language-markup ext-html line-numbers-mode"><pre v-pre class="language-markup"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/logo.png<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>Also see:
<ul>
<li><a href="#locales">Config &gt; locales</a></li>
<li><RouterLink to="/reference/frontmatter.html#head">Frontmatter &gt; head</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="locales"><a class="header-anchor" href="#locales">#</a> locales</h3>
<ul>
<li>
<p>Type: <code>{ [path: string]: Partial&lt;SiteLocaleData&gt; }</code></p>
</li>
<li>
<p>Default: <code>{}</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify locales for i18n support.</p>
<p>Acceptable fields:</p>
<ul>
<li><a href="#lang">lang</a></li>
<li><a href="#title">title</a></li>
<li><a href="#description">description</a></li>
<li><a href="#head">head</a></li>
</ul>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/i18n.html">Guide &gt; I18n</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="theme-config"><a class="header-anchor" href="#theme-config">#</a> Theme Config</h2>
<h3 id="theme"><a class="header-anchor" href="#theme">#</a> theme</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'@vuepress/default'</code></p>
</li>
<li>
<p>Details:</p>
<p>Name or absolute path of theme your want to use.</p>
<p>This option accepts theme name, theme name shorthand, or absolute path to theme.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'vuepress-theme-foo'</span><span class="token punctuation">,</span>
  theme<span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span>
  theme<span class="token operator">:</span> <span class="token string">'/path/to/local/theme'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>Also see:
<ul>
<li><RouterLink to="/guide/theme.html">Guide &gt; Theme</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="themeconfig"><a class="header-anchor" href="#themeconfig">#</a> themeConfig</h3>
<ul>
<li>
<p>Type: <code>ThemeConfig</code></p>
</li>
<li>
<p>Default: <code>{}</code></p>
</li>
<li>
<p>Details:</p>
<p>Provide config options to the used theme. The options will vary depending on the theme you are using.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/reference/default-theme/config.html">Default Theme &gt; Config</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="bundler-config"><a class="header-anchor" href="#bundler-config">#</a> Bundler Config</h2>
<h3 id="bundler"><a class="header-anchor" href="#bundler">#</a> bundler</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'@vuepress/webpack'</code></p>
</li>
<li>
<p>Details:</p>
<p>Name of bundler your want to use.</p>
<p>Bundler name shorthand is acceptable.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/bundler.html">Guide &gt; Bundler</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="bundlerconfig"><a class="header-anchor" href="#bundlerconfig">#</a> bundlerConfig</h3>
<ul>
<li>
<p>Type: <code>BundlerConfig</code></p>
</li>
<li>
<p>Default: <code>{}</code></p>
</li>
<li>
<p>Details:</p>
<p>Provide config options to the used bundler. The options will vary depending on the bundler you are using.</p>
</li>
</ul>
<h2 id="directory-config"><a class="header-anchor" href="#directory-config">#</a> Directory Config</h2>
<h3 id="dest"><a class="header-anchor" href="#dest">#</a> dest</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>`${sourceDir}/.vuepress/dist`</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the output directory for <code>vuepress build</code> command.</p>
</li>
</ul>
<h3 id="temp"><a class="header-anchor" href="#temp">#</a> temp</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>`${sourceDir}/.vuepress/.temp`</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the directory for temporary files.</p>
</li>
</ul>
<h3 id="cache"><a class="header-anchor" href="#cache">#</a> cache</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>`${sourceDir}/.vuepress/.cache`</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the directory for cache .</p>
</li>
</ul>
<h3 id="public"><a class="header-anchor" href="#public">#</a> public</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>`${sourceDir}/.vuepress/public`</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the directory for public files.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/assets.html#public-files">Guide &gt; Assets &gt; Public Files</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="markdown-config"><a class="header-anchor" href="#markdown-config">#</a> Markdown Config</h2>
<h3 id="markdown"><a class="header-anchor" href="#markdown">#</a> markdown</h3>
<ul>
<li>
<p>Type: <code>MarkdownOptions</code></p>
</li>
<li>
<p>Default: <code>{}</code></p>
</li>
<li>
<p>Details:</p>
<p>Configure VuePress built-in Markdown syntax extensions.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#syntax-extensions">Guide &gt; Markdown &gt; Syntax Extensions</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-anchor"><a class="header-anchor" href="#markdown-anchor">#</a> markdown.anchor</h4>
<ul>
<li>
<p>Type: <code>AnchorPluginOptions | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for <a href="https://github.com/valeriangalliat/markdown-it-anchor" target="_blank" rel="noopener noreferrer">markdown-it-anchor<OutboundLink/></a>.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#header-anchors">Guide &gt; Markdown &gt; Syntax Extensions &gt; Header Anchors</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-assets"><a class="header-anchor" href="#markdown-assets">#</a> markdown.assets</h4>
<ul>
<li>
<p>Type: <code>AssetsPluginOptions | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for VuePress built-in markdown-it assets plugin.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">WARNING</p>
<p>You should not configure it unless you understand what it is for.</p>
</div>
<h4 id="markdown-code"><a class="header-anchor" href="#markdown-code">#</a> markdown.code</h4>
<ul>
<li>
<p>Type: <code>CodePluginOptions | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for VuePress built-in markdown-it code plugin.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#code-blocks">Guide &gt; Markdown &gt; Syntax Extensions &gt; Code Blocks</RouterLink></li>
</ul>
</li>
</ul>
<h5 id="markdown-code-highlight"><a class="header-anchor" href="#markdown-code-highlight">#</a> markdown.code.highlight</h5>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable code syntax highlighting or not.</p>
<p>You can disable it if you want to implement client side highlighting by yourself. For example, <a href="https://prismjs.com/" target="_blank" rel="noopener noreferrer">Prismjs<OutboundLink/></a> or <a href="https://highlightjs.org/" target="_blank" rel="noopener noreferrer">highlight.js<OutboundLink/></a>.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#syntax-highlighting">Guide &gt; Markdown &gt; Syntax Extensions &gt; Code Blocks &gt; Syntax Highlighting</RouterLink></li>
</ul>
</li>
</ul>
<h5 id="markdown-code-highlightlines"><a class="header-anchor" href="#markdown-code-highlightlines">#</a> markdown.code.highlightLines</h5>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable code line highlighting or not.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#line-highlighting">Guide &gt; Markdown &gt; Syntax Extensions &gt; Code Blocks &gt; Line Highlighting</RouterLink></li>
</ul>
</li>
</ul>
<h5 id="markdown-code-linenumbers"><a class="header-anchor" href="#markdown-code-linenumbers">#</a> markdown.code.lineNumbers</h5>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable code line numbers or not.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#line-numbers">Guide &gt; Markdown &gt; Syntax Extensions &gt; Code Blocks &gt; Line Numbers</RouterLink></li>
</ul>
</li>
</ul>
<h5 id="markdown-code-prewrapper"><a class="header-anchor" href="#markdown-code-prewrapper">#</a> markdown.code.preWrapper</h5>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable the extra wrapper of the <code>&lt;pre&gt;</code> tag or not.</p>
<p>The wrapper is required by the <code>highlightLines</code> and <code>lineNumbers</code>. That means, if you disable <code>preWrapper</code>, the line highlighting and line numbers will also be disabled.</p>
<p>You can disable it if you want to implement them in client side. For example, <a href="https://prismjs.com/plugins/line-highlight/" target="_blank" rel="noopener noreferrer">Prismjs Line Highlight<OutboundLink/></a> or <a href="https://prismjs.com/plugins/line-numbers/" target="_blank" rel="noopener noreferrer">Prismjs Line Numbers<OutboundLink/></a>.</p>
</li>
</ul>
<h5 id="markdown-code-vpre"><a class="header-anchor" href="#markdown-code-vpre">#</a> markdown.code.vPre</h5>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable the <code>v-pre</code> directive on <code>&lt;pre&gt;</code> tag or not.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#wrap-with-v-pre">Guide &gt; Markdown &gt; Syntax Extensions &gt; Code Blocks &gt; Wrap with v-pre</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-customcomponent"><a class="header-anchor" href="#markdown-customcomponent">#</a> markdown.customComponent</h4>
<ul>
<li>
<p>Type: <code>undefined | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for VuePress built-in markdown-it custom-component plugin.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">WARNING</p>
<p>You should not configure it unless you understand what it is for.</p>
</div>
<h4 id="markdown-emoji"><a class="header-anchor" href="#markdown-emoji">#</a> markdown.emoji</h4>
<ul>
<li>
<p>Type: <code>EmojiPluginOptions | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for <a href="https://github.com/markdown-it/markdown-it-emoji" target="_blank" rel="noopener noreferrer">markdown-it-emoji<OutboundLink/></a>.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#emoji">Guide &gt; Markdown &gt; Syntax Extensions &gt; Emoji</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-extractheaders"><a class="header-anchor" href="#markdown-extractheaders">#</a> markdown.extractHeaders</h4>
<ul>
<li>
<p>Type: <code>ExtractHeadersPluginOptions | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for VuePress built-in markdown-it extract-headers plugin.</p>
<p>It will extract page headers to page data, which will be used for generating sidebar, table of contents, etc. For example, the sidebar of current page is auto generated from the headers that extracted by this plugin.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
</ul>
<h4 id="markdown-hoisttags"><a class="header-anchor" href="#markdown-hoisttags">#</a> markdown.hoistTags</h4>
<ul>
<li>
<p>Type: <code>HoistTagsPluginOptions | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for VuePress built-in markdown-it hoist-tags plugin.</p>
<p>It will hoist specific HTML tags in your Markdown to the top-level of SFC. By default, only <code>&lt;script&gt;</code> and <code>&lt;style&gt;</code> tags will be hoisted. You can set this option to support SFC custom blocks in Markdown.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/advanced/markdown.html">Advanced &gt; Markdown and Vue SFC</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-links"><a class="header-anchor" href="#markdown-links">#</a> markdown.links</h4>
<ul>
<li>
<p>Type: <code>LinksPluginOptions | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for VuePress built-in markdown-it links plugin.</p>
<p>It will convert internal links to <code>&lt;RouterLink&gt;</code>, and add extra attributes to external links.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#links">Guide &gt; Markdown &gt; Syntax Extensions &gt; Links</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-toc"><a class="header-anchor" href="#markdown-toc">#</a> markdown.toc</h4>
<ul>
<li>
<p>Type: <code>TocPluginOptions | false</code></p>
</li>
<li>
<p>Details:</p>
<p>Options for VuePress built-in markdown-it table-of-contents plugin.</p>
<p>Set to <code>false</code> to disable this plugin.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/markdown.html#table-of-contents">Guide &gt; Markdown &gt; Syntax Extensions &gt; Table of Contents</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="development-config"><a class="header-anchor" href="#development-config">#</a> Development Config</h2>
<h3 id="debug"><a class="header-anchor" href="#debug">#</a> debug</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>false</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable debug mode or not.</p>
<p>This would be helpful for developers. Also, we are using <a href="https://github.com/visionmedia/debug" target="_blank" rel="noopener noreferrer">debug<OutboundLink/></a> package for debug logging, which can be enabled via <code>DEBUG=vuepress*</code> environment variable.</p>
</li>
</ul>
<h3 id="host"><a class="header-anchor" href="#host">#</a> host</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'0.0.0.0'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the host to use for the dev server.</p>
</li>
</ul>
<h3 id="port"><a class="header-anchor" href="#port">#</a> port</h3>
<ul>
<li>
<p>Type: <code>number</code></p>
</li>
<li>
<p>Default: <code>8080</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the port to use for the dev server.</p>
</li>
</ul>
<h3 id="open"><a class="header-anchor" href="#open">#</a> open</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>false</code></p>
</li>
<li>
<p>Details:</p>
<p>Whether to open the browser after dev-server had been started.</p>
</li>
</ul>
<h3 id="evergreen"><a class="header-anchor" href="#evergreen">#</a> evergreen</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Set to <code>true</code> if you are only targeting evergreen browsers. This will disable some transpilation and polyfills, and result in faster builds and smaller files.</p>
</li>
</ul>
<h3 id="pagepatterns"><a class="header-anchor" href="#pagepatterns">#</a> pagePatterns</h3>
<ul>
<li>
<p>Type: <code>string[]</code></p>
</li>
<li>
<p>Default: <code>['**/*.md', '!.vuepress', '!node_modules']</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the patterns of files you want to be resolved as pages. The patterns are relative to the source directory.</p>
</li>
</ul>
<h3 id="templatedev"><a class="header-anchor" href="#templatedev">#</a> templateDev</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'@vuepress/client/templates/index.dev.html'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the HTML template to be used for dev.</p>
</li>
</ul>
<h3 id="templatessr"><a class="header-anchor" href="#templatessr">#</a> templateSSR</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'@vuepress/client/templates/index.ssr.html'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the HTML template to be used for build (SSR).</p>
</li>
</ul>
<h3 id="shouldpreload"><a class="header-anchor" href="#shouldpreload">#</a> shouldPreload</h3>
<ul>
<li>
<p>Type: <code>((file: string, type: string) =&gt; boolean)) | boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>A function to control what files should have <code>&lt;link rel=&quot;preload&quot;&gt;</code> resource hints generated. Set to <code>true</code> or <code>false</code> to enable or disable totally.</p>
<p>By default, only those files that are required by current page will be preloaded. So you can keep it <code>true</code> in most cases.</p>
</li>
</ul>
<h3 id="shouldprefetch"><a class="header-anchor" href="#shouldprefetch">#</a> shouldPrefetch</h3>
<ul>
<li>
<p>Type: <code>((file: string, type: string) =&gt; boolean)) | boolean</code></p>
</li>
<li>
<p>Default: <code>false</code></p>
</li>
<li>
<p>Details:</p>
<p>A function to control what files should have <code>&lt;link rel=&quot;prefetch&quot;&gt;</code> resource hints generated. Set to <code>true</code> or <code>false</code> to enable or disable for all files.</p>
<p>If you set it to <code>true</code>, all files that required by other pages will be prefetched. This is good for small sites, which will speed up the navigation, but it might not be a good idea if you have lots of pages in your site.</p>
</li>
</ul>
<h2 id="plugin-api"><a class="header-anchor" href="#plugin-api">#</a> Plugin API</h2>
<p>User config file also works as a VuePress plugin, so all of the Plugin APIs are available except the <code>name</code> and <code>multiple</code> options.</p>
<p>Please check out <RouterLink to="/reference/plugin-api.html">Plugin API Reference</RouterLink> for a full list of Plugin APIs.</p>
</template>