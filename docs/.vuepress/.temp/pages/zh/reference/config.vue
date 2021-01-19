<template><h1 id="配置"><a class="header-anchor" href="#配置">#</a> 配置</h1>
<p>VuePress 配置的参考文档，可以通过配置文件来设置这些配置。 VuePress 约定的配置文件为（按照优先顺序）：</p>
<ul>
<li>当前工作目录 <code>cwd</code> 下：
<ul>
<li><code>vuepress.config.ts</code></li>
<li><code>vuepress.config.js</code></li>
</ul>
</li>
<li>源文件目录 <code>sourceDir</code> 下：
<ul>
<li><code>.vuepress/config.ts</code></li>
<li><code>.vuepress/config.js</code></li>
</ul>
</li>
</ul>
<p>你也可以通过 <RouterLink to="/zh/reference/cli.html">命令行接口</RouterLink> 的 <code>--config</code> 选项来指定配置文件。</p>
<h2 id="站点配置"><a class="header-anchor" href="#站点配置">#</a> 站点配置</h2>
<h3 id="base"><a class="header-anchor" href="#base">#</a> base</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>/</code></p>
</li>
<li>
<p>详情：</p>
<p>部署站点的基础路径。</p>
<p>如果你想让你的网站部署到一个子路径下，你将需要设置它。它的值应当总是以斜杠开始，并以斜杠结束。举例来说，如果你想将你的网站部署到 <code>https://foo.github.io/bar/</code>，那么 <code>base</code> 应该被设置成 <code>&quot;/bar/&quot;</code>。</p>
<p><code>base</code> 将会作为前缀自动地插入到所有以 <code>/</code> 开始的其他选项的链接中，所以你只需要指定一次。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/assets.html#base-helper">指南 &gt; 静态资源 &gt; Base Helper</RouterLink></li>
<li><RouterLink to="/zh/guide/deployment.html">指南 &gt; 部署</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="lang"><a class="header-anchor" href="#lang">#</a> lang</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>en-US</code></p>
</li>
<li>
<p>详情：</p>
<p>站点的语言。</p>
<p>它将会在最终渲染出的 HTML 中作为 <code>&lt;html&gt;</code> 标签的 <code>lang</code> 属性。</p>
<p>它可以设置在不同语言的 locales 中。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><a href="#locales">配置 &gt; locales</a></li>
</ul>
</li>
</ul>
<h3 id="title"><a class="header-anchor" href="#title">#</a> title</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>''</code></p>
</li>
<li>
<p>详情：</p>
<p>站点的标题。</p>
<p>它将会作为所有页面标题的后缀，并且在默认主题的导航栏中显示。</p>
<p>它可以设置在不同语言的 locales 中。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><a href="#locales">配置 &gt; locales</a></li>
</ul>
</li>
</ul>
<h3 id="description"><a class="header-anchor" href="#description">#</a> description</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>''</code></p>
</li>
<li>
<p>详情：</p>
<p>站点的描述。</p>
<p>它将会在最终渲染出的 HTML 中作为 <code>&lt;meta name=&quot;description&quot; /&gt;</code> 标签的 <code>content</code> 属性。它会被每个页面的 Frontmatter 中的 <code>description</code> 字段覆盖。</p>
<p>它可以设置在不同语言的 locales 中。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><a href="#locales">配置 &gt; locales</a></li>
<li><RouterLink to="/zh/reference/frontmatter.html#description">Frontmatter &gt; description</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="head"><a class="header-anchor" href="#head">#</a> head</h3>
<ul>
<li>
<p>类型： <code>HeadConfig[]</code></p>
</li>
<li>
<p>默认值： <code>[]</code></p>
</li>
<li>
<p>详情：</p>
<p>在最终渲染出的 HTML 的 <code>&lt;head&gt;</code> 标签内加入的额外标签。</p>
<p>你可以通过 <code>[tagName, { attrName: attrValue }, innerHTML?]</code> 的格式来添加标签。</p>
<p>它可以设置在不同语言的 locales 中。</p>
</li>
<li>
<p>示例：</p>
<p>增加一个自定义的 favicon ：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  head<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">'link'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> rel<span class="token operator">:</span> <span class="token string">'icon'</span><span class="token punctuation">,</span> href<span class="token operator">:</span> <span class="token string">'/logo.png'</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>渲染为：</p>
<div class="language-markup ext-html line-numbers-mode"><pre v-pre class="language-markup"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>icon<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/logo.png<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul>
<li>参考：
<ul>
<li><a href="#locales">配置 &gt; locales</a></li>
<li><RouterLink to="/zh/reference/frontmatter.html#head">Frontmatter &gt; head</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="locales"><a class="header-anchor" href="#locales">#</a> locales</h3>
<ul>
<li>
<p>类型： <code>{ [path: string]: Partial&lt;SiteLocaleData&gt; }</code></p>
</li>
<li>
<p>默认值： <code>{}</code></p>
</li>
<li>
<p>详情：</p>
<p>多语言支持的各个语言 locales 。</p>
<p>可以使用的字段有：</p>
<ul>
<li><a href="#lang">lang</a></li>
<li><a href="#title">title</a></li>
<li><a href="#description">description</a></li>
<li><a href="#head">head</a></li>
</ul>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/i18n.html">指南 &gt; I18n</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="主题配置"><a class="header-anchor" href="#主题配置">#</a> 主题配置</h2>
<h3 id="theme"><a class="header-anchor" href="#theme">#</a> theme</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'@vuepress/default'</code></p>
</li>
<li>
<p>详情：</p>
<p>你想要使用的主题的名称或绝对路径。</p>
<p>这个选项可以接收主题名称、主题简称或主题的绝对路径。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  theme<span class="token operator">:</span> <span class="token string">'vuepress-theme-foo'</span><span class="token punctuation">,</span>
  theme<span class="token operator">:</span> <span class="token string">'bar'</span><span class="token punctuation">,</span>
  theme<span class="token operator">:</span> <span class="token string">'/path/to/local/theme'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul>
<li>参考：
<ul>
<li><RouterLink to="/zh/guide/theme.html">指南 &gt; 主题</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="themeconfig"><a class="header-anchor" href="#themeconfig">#</a> themeConfig</h3>
<ul>
<li>
<p>类型： <code>ThemeConfig</code></p>
</li>
<li>
<p>默认值： <code>{}</code></p>
</li>
<li>
<p>详情：</p>
<p>为当前使用的主题提供的配置项。具体的配置项取决于你使用的主题。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/reference/default-theme/config.html">默认主题 &gt; 配置</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="打包工具配置"><a class="header-anchor" href="#打包工具配置">#</a> 打包工具配置</h2>
<h3 id="bundler"><a class="header-anchor" href="#bundler">#</a> bundler</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'@vuepress/webpack'</code></p>
</li>
<li>
<p>详情：</p>
<p>你想要使用的打包工具的名称。</p>
<p>可以使用打包工具名称的简称。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/bundler.html">指南 &gt; 打包工具</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="bundlerconfig"><a class="header-anchor" href="#bundlerconfig">#</a> bundlerConfig</h3>
<ul>
<li>
<p>类型： <code>BundlerConfig</code></p>
</li>
<li>
<p>默认值： <code>{}</code></p>
</li>
<li>
<p>详情：</p>
<p>为当前使用的打包工具提供的配置项。具体的配置项取决于你使用的打包工具。</p>
</li>
</ul>
<h2 id="目录配置"><a class="header-anchor" href="#目录配置">#</a> 目录配置</h2>
<h3 id="dest"><a class="header-anchor" href="#dest">#</a> dest</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>`${sourceDir}/.vuepress/dist`</code></p>
</li>
<li>
<p>详情：</p>
<p>指定 <code>vuepress build</code> 命令的输出目录。</p>
</li>
</ul>
<h3 id="temp"><a class="header-anchor" href="#temp">#</a> temp</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>`${sourceDir}/.vuepress/.temp`</code></p>
</li>
<li>
<p>详情：</p>
<p>指定临时文件目录。</p>
</li>
</ul>
<h3 id="cache"><a class="header-anchor" href="#cache">#</a> cache</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>`${sourceDir}/.vuepress/.cache`</code></p>
</li>
<li>
<p>详情：</p>
<p>指定缓存目录。</p>
</li>
</ul>
<h3 id="public"><a class="header-anchor" href="#public">#</a> public</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>`${sourceDir}/.vuepress/public`</code></p>
</li>
<li>
<p>详情：</p>
<p>指定 Public 文件目录。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/assets.html#public-%E6%96%87%E4%BB%B6">指南 &gt; 静态资源 &gt; Public 文件</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="markdown-配置"><a class="header-anchor" href="#markdown-配置">#</a> Markdown 配置</h2>
<h3 id="markdown"><a class="header-anchor" href="#markdown">#</a> markdown</h3>
<ul>
<li>
<p>类型： <code>MarkdownOptions</code></p>
</li>
<li>
<p>默认值： <code>{}</code></p>
</li>
<li>
<p>详情：</p>
<p>对 VuePress 内置的 Markdown 语法扩展进行配置。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E8%AF%AD%E6%B3%95%E6%89%A9%E5%B1%95">指南 &gt; Markdown &gt; 语法扩展</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-anchor"><a class="header-anchor" href="#markdown-anchor">#</a> markdown.anchor</h4>
<ul>
<li>
<p>类型： <code>AnchorPluginOptions | false</code></p>
</li>
<li>
<p>详情：</p>
<p><a href="https://github.com/valeriangalliat/markdown-it-anchor" target="_blank" rel="noopener noreferrer">markdown-it-anchor<OutboundLink/></a> 的配置项。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E6%A0%87%E9%A2%98%E9%94%9A%E7%82%B9">指南 &gt; Markdown &gt; 语法扩展 &gt; 标题锚点</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-assets"><a class="header-anchor" href="#markdown-assets">#</a> markdown.assets</h4>
<ul>
<li>
<p>类型： <code>AssetsPluginOptions | false</code></p>
</li>
<li>
<p>详情：</p>
<p>VuePress 内置的 markdown-it assets 插件的配置项。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>除非你了解它的用途，否则你不应该设置该配置项。</p>
</div>
<h4 id="markdown-code"><a class="header-anchor" href="#markdown-code">#</a> markdown.code</h4>
<ul>
<li>
<p>类型： <code>CodePluginOptions | false</code></p>
</li>
<li>
<p>详情：</p>
<p>VuePress 内置的 markdown-it code 插件的配置项。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E4%BB%A3%E7%A0%81%E5%9D%97">指南 &gt; Markdown &gt; 语法扩展 &gt; 代码块</RouterLink></li>
</ul>
</li>
</ul>
<h5 id="markdown-code-highlight"><a class="header-anchor" href="#markdown-code-highlight">#</a> markdown.code.highlight</h5>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用代码块语法高亮。</p>
<p>如果你想在客户端进行语法高翔，你可以禁用该配置项。比如使用 <a href="https://prismjs.com/" target="_blank" rel="noopener noreferrer">Prismjs<OutboundLink/></a> 或 <a href="https://highlightjs.org/" target="_blank" rel="noopener noreferrer">highlight.js<OutboundLink/></a> 。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E8%AF%AD%E6%B3%95%E9%AB%98%E4%BA%AE">指南 &gt; Markdown &gt; 语法扩展 &gt; 代码块 &gt; 语法高亮</RouterLink></li>
</ul>
</li>
</ul>
<h5 id="markdown-code-highlightlines"><a class="header-anchor" href="#markdown-code-highlightlines">#</a> markdown.code.highlightLines</h5>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用代码块行高亮。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E8%A1%8C%E9%AB%98%E4%BA%AE">指南 &gt; Markdown &gt; 语法扩展 &gt; 代码块 &gt; 行高亮</RouterLink></li>
</ul>
</li>
</ul>
<h5 id="markdown-code-linenumbers"><a class="header-anchor" href="#markdown-code-linenumbers">#</a> markdown.code.lineNumbers</h5>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用代码块行号。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E8%A1%8C%E5%8F%B7">指南 &gt; Markdown &gt; 语法扩展 &gt; 代码块 &gt; 行号</RouterLink></li>
</ul>
</li>
</ul>
<h5 id="markdown-code-prewrapper"><a class="header-anchor" href="#markdown-code-prewrapper">#</a> markdown.code.preWrapper</h5>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否在 <code>&lt;pre&gt;</code> 标签外额外包裹一层。</p>
<p><code>highlightLines</code> 和 <code>lineNumbers</code> 依赖于这个额外的包裹层。这换句话说，如果你禁用了 <code>preWrapper</code> ，那么行高亮和行号也会被同时禁用。</p>
<p>如果你想要在客户端来实现这些功能时，可以禁用该配置项。比如使用 <a href="https://prismjs.com/plugins/line-highlight/" target="_blank" rel="noopener noreferrer">Prismjs Line Highlight<OutboundLink/></a> 或者 <a href="https://prismjs.com/plugins/line-numbers/" target="_blank" rel="noopener noreferrer">Prismjs Line Numbers<OutboundLink/></a>。</p>
</li>
</ul>
<h5 id="markdown-code-vpre"><a class="header-anchor" href="#markdown-code-vpre">#</a> markdown.code.vPre</h5>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否在 <code>&lt;pre&gt;</code> 标签上添加 <code>v-pre</code> 指令。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E6%B7%BB%E5%8A%A0-v-pre">指南 &gt; Markdown &gt; 语法扩展 &gt; 代码块 &gt; 添加 v-pre</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-customcomponent"><a class="header-anchor" href="#markdown-customcomponent">#</a> markdown.customComponent</h4>
<ul>
<li>
<p>类型： <code>undefined | false</code></p>
</li>
<li>
<p>详情：</p>
<p>VuePress 内置的 markdown-it custom-component 插件的配置项。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>除非你了解它的用途，否则你不应该设置该配置项。</p>
</div>
<h4 id="markdown-emoji"><a class="header-anchor" href="#markdown-emoji">#</a> markdown.emoji</h4>
<ul>
<li>
<p>类型： <code>EmojiPluginOptions | false</code></p>
</li>
<li>
<p>详情：</p>
<p><a href="https://github.com/markdown-it/markdown-it-emoji" target="_blank" rel="noopener noreferrer">markdown-it-emoji<OutboundLink/></a> 的配置项。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#emoji">指南 &gt; Markdown &gt; 语法扩展 &gt; Emoji</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-extractheaders"><a class="header-anchor" href="#markdown-extractheaders">#</a> markdown.extractHeaders</h4>
<ul>
<li>
<p>类型： <code>ExtractHeadersPluginOptions | false</code></p>
</li>
<li>
<p>详情：</p>
<p>VuePress 内置的 markdown-it extract-headers 插件的配置项。</p>
<p>它将会把页面的标题提取到 Page Data 中，可以用于生成侧边栏、目录等。比如当前页面的侧边栏，就是由这个插件提取出的标题来自动生成的。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
</ul>
<h4 id="markdown-hoisttags"><a class="header-anchor" href="#markdown-hoisttags">#</a> markdown.hoistTags</h4>
<ul>
<li>
<p>类型： <code>HoistTagsPluginOptions | false</code></p>
</li>
<li>
<p>详情：</p>
<p>VuePress 内置的 markdown-it hoist-tags 插件的配置项。</p>
<p>它将会把你的 Markdown 中特定的 HTML 标签提升到 SFC 的顶层。默认情况下，只有 <code>&lt;script&gt;</code> 和 <code>&lt;style&gt;</code> 标签会被提升。你可以通过这个配置项，在 Markdown 中使用 SFC 自定义块。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/advanced/markdown.html">深入 &gt; Markdown 与 Vue SFC</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-links"><a class="header-anchor" href="#markdown-links">#</a> markdown.links</h4>
<ul>
<li>
<p>类型： <code>LinksPluginOptions | false</code></p>
</li>
<li>
<p>详情：</p>
<p>VuePress 内置的 markdown-it 链接插件的配置项。</p>
<p>它将会把站内链接转换为 <code>&lt;RouterLink&gt;</code> ，并且会在站外链接上添加额外的属性。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E9%93%BE%E6%8E%A5">指南 &gt; Markdown &gt; 语法扩展 &gt; 链接</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="markdown-toc"><a class="header-anchor" href="#markdown-toc">#</a> markdown.toc</h4>
<ul>
<li>
<p>类型： <code>TocPluginOptions | false</code></p>
</li>
<li>
<p>详情：</p>
<p>VuePress 内置的 markdown-it 目录插件的配置项。</p>
<p>设置为 <code>false</code> 可以禁用该插件。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/markdown.html#%E7%9B%AE%E5%BD%95">指南 &gt; Markdown &gt; 语法扩展 &gt; 目录</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="开发配置项"><a class="header-anchor" href="#开发配置项">#</a> 开发配置项</h2>
<h3 id="debug"><a class="header-anchor" href="#debug">#</a> debug</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>false</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 Debug 模式。</p>
<p>该配置项主要提供给开发者使用。同时，我们使用了 <a href="https://github.com/visionmedia/debug" target="_blank" rel="noopener noreferrer">debug<OutboundLink/></a> 模块打印 Debug 日志，可以通过 <code>DEBUG=vuepress*</code> 环境变量来启用。</p>
</li>
</ul>
<h3 id="host"><a class="header-anchor" href="#host">#</a> host</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'0.0.0.0'</code></p>
</li>
<li>
<p>详情：</p>
<p>指定开发服务器的主机名。</p>
</li>
</ul>
<h3 id="port"><a class="header-anchor" href="#port">#</a> port</h3>
<ul>
<li>
<p>类型： <code>number</code></p>
</li>
<li>
<p>默认值： <code>8080</code></p>
</li>
<li>
<p>详情：</p>
<p>指定开发服务器的端口号。</p>
</li>
</ul>
<h3 id="open"><a class="header-anchor" href="#open">#</a> open</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>false</code></p>
</li>
<li>
<p>详情：</p>
<p>是否在开发服务器启动后打开浏览器。</p>
</li>
</ul>
<h3 id="evergreen"><a class="header-anchor" href="#evergreen">#</a> evergreen</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>如果你的对象只有那些 “常青树” 浏览器，你可以将其设置成 <code>true</code> 。这将会禁用一些转译过程和 Polyfills ，带来更快的构建速度和更小的文件体积。</p>
</li>
</ul>
<h3 id="pagepatterns"><a class="header-anchor" href="#pagepatterns">#</a> pagePatterns</h3>
<ul>
<li>
<p>类型： <code>string[]</code></p>
</li>
<li>
<p>默认值： <code>['**/*.md', '!.vuepress', '!node_modules']</code></p>
</li>
<li>
<p>详情：</p>
<p>指定页面文件的 Patterns 。这些 Patterns 是相对于 Source 目录的。</p>
</li>
</ul>
<h3 id="templatedev"><a class="header-anchor" href="#templatedev">#</a> templateDev</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'@vuepress/client/templates/index.dev.html'</code></p>
</li>
<li>
<p>详情：</p>
<p>指定开发时使用的 HTML 模板。</p>
</li>
</ul>
<h3 id="templatessr"><a class="header-anchor" href="#templatessr">#</a> templateSSR</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'@vuepress/client/templates/index.ssr.html'</code></p>
</li>
<li>
<p>详情：</p>
<p>指定构建时 (SSR) 使用的 HTML 模板。</p>
</li>
</ul>
<h3 id="shouldpreload"><a class="header-anchor" href="#shouldpreload">#</a> shouldPreload</h3>
<ul>
<li>
<p>类型： <code>((file: string, type: string) =&gt; boolean)) | boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>一个函数，用来控制哪些文件是需要生成对应的 <code>&lt;link rel=&quot;preload&quot;&gt;</code> 标签的。设置为 <code>true</code> 或者 <code>false</code> 来完全启用或禁用它。</p>
<p>默认情况下，只有当前页面所需的文件会被预加载。所以在绝大部分情况下，你只需要使用 <code>true</code> 就可以了。</p>
</li>
</ul>
<h3 id="shouldprefetch"><a class="header-anchor" href="#shouldprefetch">#</a> shouldPrefetch</h3>
<ul>
<li>
<p>类型： <code>((file: string, type: string) =&gt; boolean)) | boolean</code></p>
</li>
<li>
<p>默认值： <code>false</code></p>
</li>
<li>
<p>详情：</p>
<p>一个函数，用来控制哪些文件是需要生成对应的 <code>&lt;link rel=&quot;prefetch&quot;&gt;</code> 标签的。设置为 <code>true</code> 或者 <code>false</code> 来完全启用或禁用它。</p>
<p>如果你将它设置为 <code>true</code> ，所有其它页面所需的文件都会被预拉取。这对于小型站点来说是十分有帮助的，因为它会大大提升页面切换的速度。但是在你的网站有很多页面时不建议你这么做。</p>
</li>
</ul>
<h2 id="插件-api"><a class="header-anchor" href="#插件-api">#</a> 插件 API</h2>
<p>用户配置文件同样可以作为一个 VuePress 插件，所以除了 <code>name</code> 和 <code>multiple</code> 配置项以外的所有插件 API 都可以在配置文件中使用。</p>
<p>前往 <RouterLink to="/zh/reference/plugin-api.html">插件 API 参考</RouterLink> 查看所有插件 API 。</p>
</template>