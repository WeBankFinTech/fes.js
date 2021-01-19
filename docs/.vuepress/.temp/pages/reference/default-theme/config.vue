<template><h1 id="config"><a class="header-anchor" href="#config">#</a> Config</h1>
<p>Reference of default theme config, which can be set via <RouterLink to="/reference/config.html#themeconfig">themeConfig</RouterLink>.</p>
<h2 id="basic-config"><a class="header-anchor" href="#basic-config">#</a> Basic Config</h2>
<h3 id="locales"><a class="header-anchor" href="#locales">#</a> locales</h3>
<ul>
<li>
<p>Type: <code>{ [path: string]: Partial&lt;DefaultThemeLocaleData&gt; }</code></p>
</li>
<li>
<p>Default: <code>{}</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify locales for i18n support.</p>
<p>All the options inside the <a href="#locale-config">Locale Config</a> section can be used in locales.</p>
<p>This options will only take effect in default theme, so don't confuse with <code>locales</code> in <RouterLink to="/reference/config.html#locales">Site Config</RouterLink>.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><RouterLink to="/guide/i18n.html">Guide &gt; I18n</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="locale-config"><a class="header-anchor" href="#locale-config">#</a> Locale Config</h2>
<p>Config of this section can be used as normal config, and can also be used in the <a href="#locales">locales</a> option.</p>
<h3 id="home"><a class="header-anchor" href="#home">#</a> home</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>/</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the path of the homepage.</p>
<p>This will be used for:</p>
<ul>
<li>the logo link of the navbar</li>
<li>the <em>back to home</em> link of the 404 page</li>
</ul>
</li>
</ul>
<h3 id="navbar"><a class="header-anchor" href="#navbar">#</a> navbar</h3>
<ul>
<li>
<p>Type: <code>false | (NavbarItem | NavbarGroup | string)[]</code></p>
</li>
<li>
<p>Default: <code>[]</code></p>
</li>
<li>
<p>Details:</p>
<p>Configuration of navbar.</p>
<p>Set to <code>false</code> to disable navbar.</p>
<p>To configure the navbar items, you can set it to a <em>navbar array</em>, each item of which could be a <code>NavbarItem</code> object, a <code>NavbarGroup</code> object, or a string:</p>
<ul>
<li>A <code>NavbarItem</code> object should have a <code>text</code> field and a <code>link</code> field.</li>
<li>A <code>NavbarGroup</code> object should have a <code>text</code> field and a <code>children</code> field. The <code>children</code> field should be a <em>navbar array</em>, too.</li>
<li>A string should be the path to the target page file. It will be converted to a <code>NavbarItem</code> object, using the page title as <code>text</code>, and the page route path as <code>link</code>.</li>
</ul>
</li>
<li>
<p>Example 1:</p>
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
      <span class="token comment">// string - page file path</span>
      <span class="token string">'/bar/README.md'</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><ul>
<li>Example 2:</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    navbar<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token comment">// nested group - max depth is 2</span>
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
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the url of logo image.</p>
<p>The logo image will be displayed at the left end of the navbar.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// public file path</span>
    logo<span class="token operator">:</span> <span class="token string">'/hero.png'</span><span class="token punctuation">,</span>
    <span class="token comment">// url</span>
    logo<span class="token operator">:</span> <span class="token string">'https://vuejs.org/images/logo.png'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul>
<li>Also see:
<ul>
<li><RouterLink to="/guide/assets.html#public-files">Guide &gt; Assets &gt; Public Files</RouterLink></li>
</ul>
</li>
</ul>
<h3 id="repo"><a class="header-anchor" href="#repo">#</a> repo</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the repository url of your project.</p>
<p>This will be used as the link of the <em>repository link</em>, which will be displayed as the last item of the navbar.</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// If you set it in the form of `organization/repository`</span>
    <span class="token comment">// we will take it as a GitHub repo</span>
    repo<span class="token operator">:</span> <span class="token string">'vuejs/vuepress'</span><span class="token punctuation">,</span>
    <span class="token comment">// Use url directly if you are not using GitHub</span>
    repo<span class="token operator">:</span> <span class="token string">'https://gitlab.com/foo/bar'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="repolabel"><a class="header-anchor" href="#repolabel">#</a> repoLabel</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the repository label of your project.</p>
<p>This will be used as the text of the <em>repository link</em>, which will be displayed as the last item of the navbar.</p>
<p>If you don't set this option explicitly, it will be automatically inferred from the <a href="#repo">repo</a> option.</p>
</li>
</ul>
<h3 id="selectlanguagetext"><a class="header-anchor" href="#selectlanguagetext">#</a> selectLanguageText</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the text of the <em>select language menu</em>.</p>
<p>The <em>select language menu</em> will appear next to the repository button in the navbar when you set multiple <RouterLink to="/reference/config.html#locales">locales</RouterLink> in your site config.</p>
</li>
</ul>
<h3 id="selectlanguagearialabel"><a class="header-anchor" href="#selectlanguagearialabel">#</a> selectLanguageAriaLabel</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the <code>aria-label</code> attribute of the <em>select language menu</em>.</p>
<p>This is mainly for a11y purpose.</p>
</li>
</ul>
<h3 id="selectlanguagename"><a class="header-anchor" href="#selectlanguagename">#</a> selectLanguageName</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the name of the language of a locale.</p>
<p>This option will <strong>only take effect inside</strong> the <a href="#locales">locales</a> of your theme config. It will be used as the language name of the locale, which will be displayed in the <em>select language menu</em>.</p>
</li>
<li>
<p>Example:</p>
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
<p>Type: <code>false | 'auto' | SidebarConfigArray | SidebarConfigObject</code></p>
</li>
<li>
<p>Default: <code>'auto'</code></p>
</li>
<li>
<p>Details:</p>
<p>Configuration of sidebar.</p>
<p>You can override this global option via <RouterLink to="/reference/default-theme/frontmatter.html#sidebar">sidebar</RouterLink> frontmatter in your pages.</p>
<p>Set to <code>false</code> to disable sidebar.</p>
<p>If you set it to <code>'auto'</code>, the sidebar will be automatically generated from the page headers.</p>
<p>To configure the sidebar items manually, you can set this option to a <em>sidebar array</em>, each item of which could be a <code>SidebarItem</code> object, a <code>SidebarGroup</code> object, or a string:</p>
<ul>
<li>A <code>SidebarItem</code> object should have a <code>text</code> field, a <code>link</code> field, and a <code>children</code> field. The <code>children</code> field should be an array of <code>SidebarItem</code> or string.</li>
<li>A <code>SidebarGroup</code> object should set <code>isGroup</code> field to <code>true</code>, and should have a <code>text</code> field and a <code>children</code> field. The <code>children</code> field should be an array of <code>SidebarItem</code> or string.</li>
<li>A string should be the path to the target page file. It will be converted to a <code>SidebarItem</code> object, whose <code>text</code> is the page title, <code>link</code> is the page route path, and <code>children</code> is automatically generated from the page headers.</li>
</ul>
<p>If you want to set different sidebar for different sub paths, you can set this option to a <em>sidebar object</em>:</p>
<ul>
<li>The key should be the path prefix.</li>
<li>The value should be a <em>sidebar array</em>.</li>
</ul>
</li>
<li>
<p>Example 1:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// sidebar array</span>
    <span class="token comment">// all pages will use the same sidebar</span>
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
          <span class="token comment">// string - page file path</span>
          <span class="token string">'/foo/bar.md'</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// SidebarGroup</span>
      <span class="token punctuation">{</span>
        isGroup<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        text<span class="token operator">:</span> <span class="token string">'Group'</span><span class="token punctuation">,</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'/group/foo.md'</span><span class="token punctuation">,</span> <span class="token string">'/group/bar.md'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// string - page file path</span>
      <span class="token string">'/bar/README.md'</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><ul>
<li>Example 2:</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// sidebar object</span>
    <span class="token comment">// pages under different sub paths will use different sidebar</span>
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
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable the <em>edit this page</em> link or not.</p>
<p>You can override this global option via <RouterLink to="/reference/default-theme/frontmatter.html#editlink">editLink</RouterLink> frontmatter in your pages.</p>
</li>
</ul>
<h3 id="editlinktext"><a class="header-anchor" href="#editlinktext">#</a> editLinkText</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'Edit this page'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the text of the <em>edit this page</em> link.</p>
</li>
</ul>
<h3 id="editlinkpattern"><a class="header-anchor" href="#editlinkpattern">#</a> editLinkPattern</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the pattern of the <em>edit this page</em> link.</p>
<p>This will be used for generating the <em>edit this page</em> link.</p>
<p>If you don't set this option, the pattern will be inferred from the <a href="#docsrepo">docsRepo</a> option. But if your documentation repository is not hosted on a common platform, for example, GitHub, GitLab, Bitbucket, etc., you have to set this option explicitly to make the <em>edit this page</em> link work.</p>
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
<td><code>:repo</code></td>
<td>The docs repo url, i.e. <a href="#docsrepo">docsRepo</a></td>
</tr>
<tr>
<td><code>:branch</code></td>
<td>The docs repo branch, i.e. <a href="#docsbranch">docsBranch</a></td>
</tr>
<tr>
<td><code>:path</code></td>
<td>The path of the page source file, i.e. <a href="#docsdir">docsDir</a> joins the relative path of the page file</td>
</tr>
</tbody>
</table>
</li>
<li>
<p>Example:</p>
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
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>The generated link will look like <code>'https://gitlab.com/owner/name/-/edit/master/docs/path/to/file.md'</code>.</p>
<h3 id="docsrepo"><a class="header-anchor" href="#docsrepo">#</a> docsRepo</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the repository url of your documentation source files.</p>
<p>This will be used for generating the <em>edit this page</em> link.</p>
<p>If you don't set this option, it will use the <a href="#repo">repo</a> option by default. But if your documentation source files are in a different repository, you will need to set this option.</p>
</li>
</ul>
<h3 id="docsbranch"><a class="header-anchor" href="#docsbranch">#</a> docsBranch</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'main'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the repository branch of your documentation source files.</p>
<p>This will be used for generating the <em>edit this page</em> link.</p>
</li>
</ul>
<h3 id="docsdir"><a class="header-anchor" href="#docsdir">#</a> docsDir</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>''</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the directory of your documentation source files in the repository.</p>
<p>This will be used for generating the <em>edit this page</em> link.</p>
</li>
</ul>
<h3 id="lastupdated"><a class="header-anchor" href="#lastupdated">#</a> lastUpdated</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable the <em>last updated timestamp</em> or not.</p>
<p>You can override this global option via <RouterLink to="/reference/default-theme/frontmatter.html#lastupdated">lastUpdated</RouterLink> frontmatter in your pages.</p>
<p>Notice that if you set <code>themeConfig.lastUpdated</code> to <code>false</code>, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.</p>
</li>
</ul>
<h3 id="lastupdatedtext"><a class="header-anchor" href="#lastupdatedtext">#</a> lastUpdatedText</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'Last Updated'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the text of the <em>last updated timestamp</em> label.</p>
</li>
</ul>
<h3 id="contributors"><a class="header-anchor" href="#contributors">#</a> contributors</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable the <em>contributors list</em> or not.</p>
<p>You can override this global option via <RouterLink to="/reference/default-theme/frontmatter.html#contributors">contributors</RouterLink> frontmatter in your pages.</p>
<p>Notice that if you set <code>themeConfig.contributors</code> to <code>false</code>, this feature will be disabled totally and could not be enabled in locales nor page frontmatter.</p>
</li>
</ul>
<h3 id="contributorstext"><a class="header-anchor" href="#contributorstext">#</a> contributorsText</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'Contributors'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the text of the <em>contributors list</em> label.</p>
</li>
</ul>
<h3 id="tip"><a class="header-anchor" href="#tip">#</a> tip</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'TIP'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the default title of the tip <RouterLink to="/reference/default-theme/markdown.html#custom-containers">custom containers</RouterLink>.</p>
</li>
</ul>
<h3 id="warning"><a class="header-anchor" href="#warning">#</a> warning</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'WARNING'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the default title of the warning <RouterLink to="/reference/default-theme/markdown.html#custom-containers">custom containers</RouterLink>.</p>
</li>
</ul>
<h3 id="danger"><a class="header-anchor" href="#danger">#</a> danger</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'WARNING'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the default title of the danger <RouterLink to="/reference/default-theme/markdown.html#custom-containers">custom containers</RouterLink>.</p>
</li>
</ul>
<h3 id="notfound"><a class="header-anchor" href="#notfound">#</a> notFound</h3>
<ul>
<li>
<p>Type: <code>string[]</code></p>
</li>
<li>
<p>Default: <code>['Not Found']</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the messages of the 404 page.</p>
<p>The message will be randomly picked from the array when user enter the 404 page.</p>
</li>
</ul>
<h3 id="backtohome"><a class="header-anchor" href="#backtohome">#</a> backToHome</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'Back to home'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the text of the <em>back to home</em> link in the 404 page.</p>
</li>
</ul>
<h3 id="openinnewwindow"><a class="header-anchor" href="#openinnewwindow">#</a> openInNewWindow</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Default: <code>'open in new window'</code></p>
</li>
<li>
<p>Details:</p>
<p>Specify the <code>sr-only</code> text of the <RouterLink to="/reference/components.html#outboundlink">OutboundLink</RouterLink>.</p>
<p>This is mainly for a11y purpose.</p>
</li>
</ul>
<h2 id="plugins"><a class="header-anchor" href="#plugins">#</a> Plugins</h2>
<h3 id="themeplugins"><a class="header-anchor" href="#themeplugins">#</a> themePlugins</h3>
<ul>
<li>
<p>Details:</p>
<p>Configure the plugins that used by default theme.</p>
<p>Default theme is using some plugins by default. You can disable a plugin if you really do not want to use it. Make sure you understand what the plugin is for before disabling it.</p>
</li>
</ul>
<h4 id="themeplugins-activeheaderlinks"><a class="header-anchor" href="#themeplugins-activeheaderlinks">#</a> themePlugins.activeHeaderLinks</h4>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable <RouterLink to="/reference/plugin/active-header-links.html">@vuepress/plugin-active-header-links</RouterLink> or not.</p>
</li>
</ul>
<h4 id="themeplugins-backtotop"><a class="header-anchor" href="#themeplugins-backtotop">#</a> themePlugins.backToTop</h4>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable <RouterLink to="/reference/plugin/back-to-top.html">@vuepress/plugin-back-to-top</RouterLink> or not.</p>
</li>
</ul>
<h4 id="themeplugins-container"><a class="header-anchor" href="#themeplugins-container">#</a> themePlugins.container</h4>
<ul>
<li>
<p>Type: <code>Record&lt;ContainerType, boolean&gt;</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable custom containers that powered by <RouterLink to="/reference/plugin/container.html">@vuepress/plugin-container</RouterLink> or not.</p>
<p><code>ContainerType</code> type is:</p>
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
<p>Also see:</p>
<ul>
<li><RouterLink to="/reference/default-theme/markdown.html#custom-containers">Default Theme &gt; Markdown &gt; Custom Containers</RouterLink></li>
</ul>
</li>
</ul>
<h4 id="themeplugins-debug"><a class="header-anchor" href="#themeplugins-debug">#</a> themePlugins.debug</h4>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable <RouterLink to="/reference/plugin/debug.html">@vuepress/plugin-debug</RouterLink> or not.</p>
</li>
</ul>
<h4 id="themeplugins-git"><a class="header-anchor" href="#themeplugins-git">#</a> themePlugins.git</h4>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable <RouterLink to="/reference/plugin/git.html">@vuepress/plugin-git</RouterLink> or not.</p>
</li>
</ul>
<h4 id="themeplugins-mediumzoom"><a class="header-anchor" href="#themeplugins-mediumzoom">#</a> themePlugins.mediumZoom</h4>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable <RouterLink to="/reference/plugin/medium-zoom.html">@vuepress/plugin-medium-zoom</RouterLink> or not.</p>
</li>
</ul>
<h4 id="themeplugins-nprogress"><a class="header-anchor" href="#themeplugins-nprogress">#</a> themePlugins.nprogress</h4>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>true</code></p>
</li>
<li>
<p>Details:</p>
<p>Enable <RouterLink to="/reference/plugin/nprogress.html">@vuepress/plugin-nprogress</RouterLink> or not.</p>
</li>
</ul>
</template>