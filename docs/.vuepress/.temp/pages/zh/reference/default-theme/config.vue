<template><h1 id="配置"><a class="header-anchor" href="#配置">#</a> 配置</h1>
<p>默认主题配置的参考文档，可以通过 <RouterLink to="/zh/reference/config.html#themeconfig">themeConfig</RouterLink> 来设置这些配置。</p>
<h2 id="基础配置"><a class="header-anchor" href="#基础配置">#</a> 基础配置</h2>
<h3 id="locales"><a class="header-anchor" href="#locales">#</a> locales</h3>
<ul>
<li>
<p>类型： <code>{ [path: string]: Partial&lt;DefaultThemeLocaleData&gt; }</code></p>
</li>
<li>
<p>默认值： <code>{}</code></p>
</li>
<li>
<p>详情：</p>
<p>多语言支持的各个语言 locales 。</p>
<p>所有在 <a href="#locale-%E9%85%8D%E7%BD%AE">Locale 配置</a> 章节内的配置项都可以在 locales 中使用。</p>
<p>该配置项仅能在默认主题内生效，注意不要和 <RouterLink to="/zh/reference/config.html#locales">站点配置</RouterLink> 中的 <code>locales</code> 混淆。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/guide/i18n.html">指南 &gt; 多语言支持</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="locale-配置"><a class="header-anchor" href="#locale-配置">#</a> Locale 配置</h2>
<p>该章节内的配置项可以作为一般配置使用，也可以使用在 <a href="#locales">locales</a> 内。</p>
<h3 id="home"><a class="header-anchor" href="#home">#</a> home</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>/</code></p>
</li>
<li>
<p>详情：</p>
<p>首页的路径。</p>
<p>它将被用于：</p>
<ul>
<li>导航栏中 Logo 的链接</li>
<li>404 页面的 <em>返回首页</em> 链接</li>
</ul>
</li>
</ul>
<h3 id="navbar"><a class="header-anchor" href="#navbar">#</a> navbar</h3>
<ul>
<li>
<p>类型： <code>false | (NavbarItem | NavbarGroup | string)[]</code></p>
</li>
<li>
<p>默认值： <code>[]</code></p>
</li>
<li>
<p>详情：</p>
<p>导航栏配置。</p>
<p>设置为 <code>false</code> 可以禁用导航栏。</p>
<p>为了配置导航栏元素，你可以将其设置为 <em>导航栏数组</em> ，其中的每个元素是 <code>NavbarItem</code> 对象、 <code>NavbarGroup</code> 对象、或者字符串：</p>
<ul>
<li><code>NavbarItem</code> 对象应该有一个 <code>text</code> 字段和一个 <code>link</code> 字段。</li>
<li><code>NavbarGroup</code> 对象应该有一个 <code>text</code> 字段和一个 <code>children</code> 字段。 <code>children</code> 字段同样是一个 <em>导航栏数组</em> 。</li>
<li>字符串应为目标页面文件的路径。它将会被转换为 <code>NavbarItem</code> 对象，将页面标题作为 <code>text</code> ，将页面路由路径作为 <code>link</code> 。</li>
</ul>
</li>
<li>
<p>示例 1：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    navbar<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// NavbarItem</span>
      <span class="token punctuation">{</span>
        text<span class="token operator">:</span> <span class="token string">'Foo'</span><span class="token punctuation">,</span>
        link<span class="token operator">:</span> <span class="token string">'/foo/'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// NavbarGroup</span>
      <span class="token punctuation">{</span>
        text<span class="token operator">:</span> <span class="token string">'Group'</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'/group/foo.md'</span><span class="token punctuation">,</span> <span class="token string">'/group/bar.md'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 字符串 - 页面文件路径</span>
      <span class="token string">'/bar/README.md'</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><ul>
<li>示例 2：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    navbar<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// 嵌套 Group - 最大深度为 2</span>
      <span class="token punctuation">{</span>
        text<span class="token operator">:</span> <span class="token string">'Group'</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            text<span class="token operator">:</span> <span class="token string">'SubGroup'</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'/group/sub/foo.md'</span><span class="token punctuation">,</span> <span class="token string">'/group/sub/bar.md'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="logo"><a class="header-anchor" href="#logo">#</a> logo</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>Logo 图片的 URL。</p>
<p>Logo 图片将会显示在导航栏的左端。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// Public 文件路径</span>
    logo<span class="token operator">:</span> <span class="token string">'/hero.png'</span><span class="token punctuation">,</span>
    <span class="token comment">// URL</span>
    logo<span class="token operator">:</span> <span class="token string">'https://vuejs.org/images/logo.png'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul>
<li>参考：
<ul>
<li><RouterLink to="/zh/guide/assets.html#public-%E6%96%87%E4%BB%B6">指南 &gt; 静态资源 &gt; Public 文件</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="repo"><a class="header-anchor" href="#repo">#</a> repo</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>项目仓库的 URL。</p>
<p>它将被用作 <em>仓库链接</em> 的链接。<em>仓库链接</em> 将会显示为导航栏的最后一个元素。</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果你按照 `organization/repository` 的格式设置它</span>
    <span class="token comment">// 我们会将它作为一个 GitHub 仓库</span>
    repo<span class="token operator">:</span> <span class="token string">'vuejs/vuepress'</span><span class="token punctuation">,</span>
    <span class="token comment">// 如果你使用的不是 GitHub ，可以直接使用 URL</span>
    repo<span class="token operator">:</span> <span class="token string">'https://gitlab.com/foo/bar'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="repolabel"><a class="header-anchor" href="#repolabel">#</a> repoLabel</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>项目仓库的标签。</p>
<p>它将被用作 <em>仓库链接</em> 的文字。<em>仓库链接</em> 将会显示为导航栏的最后一个元素。</p>
<p>如果你不明确指定该配置项，它将会根据 <a href="#repo">repo</a> 配置项自动推断。</p>
</li>
</ul>
<h3 id="selectlanguagetext"><a class="header-anchor" href="#selectlanguagetext">#</a> selectLanguageText</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p><em>选择语言菜单</em> 的文字。</p>
<p>如果你在站点配置中设置了多个 <RouterLink to="/zh/reference/config.html#locales">locales</RouterLink> ，那么 <em>选择语言菜单</em> 就会显示在导航栏中仓库按钮的旁边。</p>
</li>
</ul>
<h3 id="selectlanguagearialabel"><a class="header-anchor" href="#selectlanguagearialabel">#</a> selectLanguageAriaLabel</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p><em>选择语言菜单</em> 的 <code>aria-label</code> 属性。</p>
<p>它主要是为了站点的可访问性 (a11y) 。</p>
</li>
</ul>
<h3 id="selectlanguagename"><a class="header-anchor" href="#selectlanguagename">#</a> selectLanguageName</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>Locale 的语言名称。</p>
<p>该配置项 <strong>仅能在主题配置的 <a href="#locales">locales</a> 的内部生效</strong> 。它将被用作 locale 的语言名称，展示在 <em>选择语言菜单</em> 内。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  locales<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">'/'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      lang<span class="token operator">:</span> <span class="token string">'en-US'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token string">'/zh/'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      lang<span class="token operator">:</span> <span class="token string">'zh-CN'</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    locales<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string">'/'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        selectLanguageName<span class="token operator">:</span> <span class="token string">'English'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string">'/zh/'</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        selectLanguageName<span class="token operator">:</span> <span class="token string">'简体中文'</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="sidebar"><a class="header-anchor" href="#sidebar">#</a> sidebar</h3>
<ul>
<li>
<p>类型： <code>false | 'auto' | SidebarConfigArray | SidebarConfigObject</code></p>
</li>
<li>
<p>默认值： <code>'auto'</code></p>
</li>
<li>
<p>详情：</p>
<p>侧边栏配置。</p>
<p>你可以通过页面的 <RouterLink to="/zh/reference/default-theme/frontmatter.html#sidebar">sidebar</RouterLink> frontmatter 来覆盖这个全局配置。</p>
<p>设置为 <code>false</code> 可以禁用侧边栏。</p>
<p>如果你设置为 <code>'auto'</code>，侧边栏会根据页面标题自动生成。</p>
<p>为了手动配置侧边栏元素，你可以将其设置为 <em>侧边栏数组</em> ，其中的每个元素是 <code>SidebarItem</code> 对象、 <code>SidebarGroup</code> 对象、或者字符串：</p>
<ul>
<li><code>SidebarItem</code> 对象应该有一个 <code>text</code> 字段、一个 <code>link</code> 字段和一个 <code>children</code> 字段。 <code>children</code> 字段是一个由 <code>SidebarItem</code> 或者字符串组成的数组。</li>
<li><code>SidebarGroup</code> 对象应将 <code>isGroup</code> 字段设为 <code>true</code> ，并且应该有一个 <code>text</code> 字段和一个<code>children</code> 字段。 <code>children</code> 字段是一个由 <code>SidebarItem</code> 或者字符串组成的数组。</li>
<li>字符串应为目标页面文件的路径。它将会被转换为 <code>SidebarItem</code> 对象，将页面标题作为 <code>text</code> ，将页面路由路径作为 <code>link</code> ，并根据页面标题自动生成 <code>children</code> 。</li>
</ul>
<p>如果你想在不同子路径中使用不同的侧边栏，你可以将该配置项设置为 <em>侧边栏对象</em> ：</p>
<ul>
<li>Key 为路径前缀。</li>
<li>Value 为 <em>侧边栏数组</em> 。</li>
</ul>
</li>
<li>
<p>示例 1：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 侧边栏数组</span>
    <span class="token comment">// 所有页面会使用相同的侧边栏</span>
    sidebar<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// SidebarItem</span>
      <span class="token punctuation">{</span>
        text<span class="token operator">:</span> <span class="token string">'Foo'</span><span class="token punctuation">,</span>
        link<span class="token operator">:</span> <span class="token string">'/foo/'</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token comment">// SidebarItem</span>
          <span class="token punctuation">{</span>
            text<span class="token operator">:</span> <span class="token string">'github'</span><span class="token punctuation">,</span>
            link<span class="token operator">:</span> <span class="token string">'https://github.com'</span><span class="token punctuation">,</span>
            children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token comment">// 字符串 - 页面文件路径</span>
          <span class="token string">'/foo/bar.md'</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// SidebarGroup</span>
      <span class="token punctuation">{</span>
        isGroup<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        text<span class="token operator">:</span> <span class="token string">'Group'</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'/group/foo.md'</span><span class="token punctuation">,</span> <span class="token string">'/group/bar.md'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 字符串 - 页面文件路径</span>
      <span class="token string">'/bar/README.md'</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><ul>
<li>示例 2：</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 侧边栏对象</span>
    <span class="token comment">// 不同子路径下的页面会使用不同的侧边栏</span>
    sidebar<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string">'/guide/'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          isGroup<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          text<span class="token operator">:</span> <span class="token string">'Guide'</span><span class="token punctuation">,</span>
          children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'/guide/README.md'</span><span class="token punctuation">,</span> <span class="token string">'/guide/getting-started.md'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token string">'/reference/'</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
          isGroup<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
          text<span class="token operator">:</span> <span class="token string">'Reference'</span><span class="token punctuation">,</span>
          children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'/reference/cli.md'</span><span class="token punctuation">,</span> <span class="token string">'/reference/config.md'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="editlink"><a class="header-anchor" href="#editlink">#</a> editLink</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <em>编辑此页</em> 链接。</p>
<p>你可以通过页面的 <RouterLink to="/zh/reference/default-theme/frontmatter.html#editlink">editLink</RouterLink> frontmatter 来覆盖这个全局配置。</p>
</li>
</ul>
<h3 id="editlinktext"><a class="header-anchor" href="#editlinktext">#</a> editLinkText</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'Edit this page'</code></p>
</li>
<li>
<p>详情：</p>
<p><em>编辑此页</em> 链接的文字。</p>
</li>
</ul>
<h3 id="editlinkpattern"><a class="header-anchor" href="#editlinkpattern">#</a> editLinkPattern</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p><em>编辑此页</em> 链接的 Pattern 。</p>
<p>它将会用于生成 <em>编辑此页</em> 的链接。</p>
<p>如果你不设置该选项，则会根据 <a href="#docsrepo">docsRepo</a> 配置项来推断 Pattern 。但是如果你的文档仓库没有托管在常用的平台上，比如 GitHub 、 GitLab 、 Bitbucket 等，那么你必须设置该选项才能使 <em>编辑此页</em> 链接正常工作。</p>
</li>
<li>
<p>用法：</p>
<table>
<thead>
<tr>
<th>Pattern</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>:repo</code></td>
<td>文档仓库 URL ，即 <a href="#docsrepo">docsRepo</a></td>
</tr>
<tr>
<td><code>:branch</code></td>
<td>文档仓库分支 ，即 <a href="#docsbranch">docsBranch</a></td>
</tr>
<tr>
<td><code>:path</code></td>
<td>页面源文件的路径，即 <a href="#docsdir">docsDir</a> 拼接上页面文件的相对路径</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    docsRepo<span class="token operator">:</span> <span class="token string">'https://gitlab.com/owner/name'</span><span class="token punctuation">,</span>
    docsBranch<span class="token operator">:</span> <span class="token string">'master'</span><span class="token punctuation">,</span>
    docsDir<span class="token operator">:</span> <span class="token string">'docs'</span><span class="token punctuation">,</span>
    editLinkPattern<span class="token operator">:</span> <span class="token string">':repo/-/edit/:branch/:path'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>则会生成类似于 <code>'https://gitlab.com/owner/name/-/edit/master/docs/path/to/file.md'</code> 的链接。</p>
<h3 id="docsrepo"><a class="header-anchor" href="#docsrepo">#</a> docsRepo</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>文档源文件的仓库 URL 。</p>
<p>它将会用于生成 <em>编辑此页</em> 的链接。</p>
<p>如果你不设置该选项，则默认会使用 <a href="#repo">repo</a> 配置项。但是如果你的文档源文件是在一个不同的仓库内，你就需要设置该配置项了。</p>
</li>
</ul>
<h3 id="docsbranch"><a class="header-anchor" href="#docsbranch">#</a> docsBranch</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'main'</code></p>
</li>
<li>
<p>详情：</p>
<p>文档源文件的仓库分支。</p>
<p>它将会用于生成 <em>编辑此页</em> 的链接。</p>
</li>
</ul>
<h3 id="docsdir"><a class="header-anchor" href="#docsdir">#</a> docsDir</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>''</code></p>
</li>
<li>
<p>详情：</p>
<p>文档源文件存放在仓库中的目录名。</p>
<p>它将会用于生成 <em>编辑此页</em> 的链接。</p>
</li>
</ul>
<h3 id="lastupdated"><a class="header-anchor" href="#lastupdated">#</a> lastUpdated</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <em>最近更新时间戳</em> 。</p>
<p>你可以通过页面的 <RouterLink to="/zh/reference/default-theme/frontmatter.html#lastupdated">lastUpdated</RouterLink> frontmatter 来覆盖这个全局配置。</p>
<p>要注意的是，如果你将 <code>themeConfig.lastUpdated</code> 设为了 <code>false</code> ，那么这个功能会被完全禁用，并且无法在 locales 或页面 frontmatter 中启用。</p>
</li>
</ul>
<h3 id="lastupdatedtext"><a class="header-anchor" href="#lastupdatedtext">#</a> lastUpdatedText</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'Last Updated'</code></p>
</li>
<li>
<p>详情：</p>
<p><em>最近更新时间戳</em> 标签的文字。</p>
</li>
</ul>
<h3 id="contributors"><a class="header-anchor" href="#contributors">#</a> contributors</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <em>贡献者列表</em> 。</p>
<p>你可以通过页面的 <RouterLink to="/zh/reference/default-theme/frontmatter.html#contributors">contributors</RouterLink> frontmatter 来覆盖这个全局配置。</p>
<p>要注意的是，如果你将 <code>themeConfig.contributors</code> 设为了 <code>false</code> ，那么这个功能会被完全禁用，并且无法在 locales 或页面 frontmatter 中启用。</p>
</li>
</ul>
<h3 id="contributorstext"><a class="header-anchor" href="#contributorstext">#</a> contributorsText</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'Contributors'</code></p>
</li>
<li>
<p>详情：</p>
<p><em>贡献者列表</em> 标签的文字。</p>
</li>
</ul>
<h3 id="tip"><a class="header-anchor" href="#tip">#</a> tip</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'TIP'</code></p>
</li>
<li>
<p>详情：</p>
<p>Tip <RouterLink to="/zh/reference/default-theme/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8">自定义容器</RouterLink> 的默认标题。</p>
</li>
</ul>
<h3 id="warning"><a class="header-anchor" href="#warning">#</a> warning</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'WARNING'</code></p>
</li>
<li>
<p>详情：</p>
<p>Warning <RouterLink to="/zh/reference/default-theme/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8">自定义容器</RouterLink> 的默认标题。</p>
</li>
</ul>
<h3 id="danger"><a class="header-anchor" href="#danger">#</a> danger</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'WARNING'</code></p>
</li>
<li>
<p>详情：</p>
<p>Danger <RouterLink to="/zh/reference/default-theme/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8">自定义容器</RouterLink> 的默认标题。</p>
</li>
</ul>
<h3 id="notfound"><a class="header-anchor" href="#notfound">#</a> notFound</h3>
<ul>
<li>
<p>类型： <code>string[]</code></p>
</li>
<li>
<p>默认值： <code>['Not Found']</code></p>
</li>
<li>
<p>详情：</p>
<p>404 页面的提示信息。</p>
<p>当用户进入 404 页面时，会从数组中随机选取一条信息进行展示。</p>
</li>
</ul>
<h3 id="backtohome"><a class="header-anchor" href="#backtohome">#</a> backToHome</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'Back to home'</code></p>
</li>
<li>
<p>详情：</p>
<p>404 页面中 <em>返回首页</em> 链接的文字。</p>
</li>
</ul>
<h3 id="openinnewwindow"><a class="header-anchor" href="#openinnewwindow">#</a> openInNewWindow</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>默认值： <code>'open in new window'</code></p>
</li>
<li>
<p>详情：</p>
<p><RouterLink to="/zh/reference/components.html#outboundlink">OutboundLink</RouterLink> 链接内的 <code>sr-only</code> 文字。</p>
<p>它主要是为了站点的可访问性 (a11y) 。</p>
</li>
</ul>
<h2 id="插件"><a class="header-anchor" href="#插件">#</a> 插件</h2>
<h3 id="themeplugins"><a class="header-anchor" href="#themeplugins">#</a> themePlugins</h3>
<ul>
<li>
<p>详情：</p>
<p>设置默认主题使用的插件。</p>
<p>默认主题使用了一些插件，如果你确实不需要该插件，你可以选择禁用它。在禁用插件之前，请确保你已了解它的用途。</p>
</li>
</ul>
<h4 id="themeplugins-activeheaderlinks"><a class="header-anchor" href="#themeplugins-activeheaderlinks">#</a> themePlugins.activeHeaderLinks</h4>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <RouterLink to="/zh/reference/plugin/active-header-links.html">@vuepress/plugin-active-header-links</RouterLink> 。</p>
</li>
</ul>
<h4 id="themeplugins-backtotop"><a class="header-anchor" href="#themeplugins-backtotop">#</a> themePlugins.backToTop</h4>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <RouterLink to="/zh/reference/plugin/back-to-top.html">@vuepress/plugin-back-to-top</RouterLink> 。</p>
</li>
</ul>
<h4 id="themeplugins-container"><a class="header-anchor" href="#themeplugins-container">#</a> themePlugins.container</h4>
<ul>
<li>
<p>类型： <code>Record&lt;ContainerType, boolean&gt;</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用由 <RouterLink to="/zh/reference/plugin/container.html">@vuepress/plugin-container</RouterLink> 支持的自定义容器。</p>
<p><code>ContainerType</code> 类型为：</p>
<ul>
<li><code>tip</code></li>
<li><code>warning</code></li>
<li><code>danger</code></li>
<li><code>details</code></li>
<li><code>codeGroup</code></li>
<li><code>codeGroupItem</code></li>
</ul>
</li>
<li>
<p>参考：</p>
<ul>
<li><RouterLink to="/zh/reference/default-theme/markdown.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AE%B9%E5%99%A8">默认主题 &gt; Markdown &gt; 自定义容器</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="themeplugins-debug"><a class="header-anchor" href="#themeplugins-debug">#</a> themePlugins.debug</h4>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <RouterLink to="/zh/reference/plugin/debug.html">@vuepress/plugin-debug</RouterLink> 。</p>
</li>
</ul>
<h4 id="themeplugins-git"><a class="header-anchor" href="#themeplugins-git">#</a> themePlugins.git</h4>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <RouterLink to="/zh/reference/plugin/git.html">@vuepress/plugin-git</RouterLink> 。</p>
</li>
</ul>
<h4 id="themeplugins-mediumzoom"><a class="header-anchor" href="#themeplugins-mediumzoom">#</a> themePlugins.mediumZoom</h4>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <RouterLink to="/zh/reference/plugin/medium-zoom.html">@vuepress/plugin-medium-zoom</RouterLink> 。</p>
</li>
</ul>
<h4 id="themeplugins-nprogress"><a class="header-anchor" href="#themeplugins-nprogress">#</a> themePlugins.nprogress</h4>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>true</code></p>
</li>
<li>
<p>详情：</p>
<p>是否启用 <RouterLink to="/zh/reference/plugin/nprogress.html">@vuepress/plugin-nprogress</RouterLink> 。</p>
</li>
</ul>
</template>