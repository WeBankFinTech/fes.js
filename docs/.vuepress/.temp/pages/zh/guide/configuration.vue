<template><h1 id="配置"><a class="header-anchor" href="#配置">#</a> 配置</h1>
<h2 id="配置文件"><a class="header-anchor" href="#配置文件">#</a> 配置文件</h2>
<p>如果没有任何配置，你的 VuePress 站点仅有一些最基础的功能。为了更好地自定义你的网站，让我们首先在你的文档目录下创建一个 <code>.vuepress</code> 目录，所有 VuePress 相关的文件都将会被放在这里。你的项目结构可能是这样：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>VuePress 站点必要的配置文件是 <code>.vuepress/config.js</code>，它应该导出一个 JavaScript 对象。如果你使用 TypeScript ，你可以将其替换为 <code>.vuepress/config.ts</code> ，以便让 VuePress 配置得到更好的类型提示。</p>
<CodeGroup>
  <CodeGroupItem title="JS" active>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  lang<span class="token operator">:</span> <span class="token string">'zh-CN'</span><span class="token punctuation">,</span>
  title<span class="token operator">:</span> <span class="token string">'你好， VuePress ！'</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">'这是我的第一个 VuePress 站点'</span><span class="token punctuation">,</span>

  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    logo<span class="token operator">:</span> <span class="token string">'https://vuejs.org/images/logo.png'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="TS">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> UserConfig<span class="token punctuation">,</span> DefaultThemeOptions <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vuepress'</span>

<span class="token keyword">const</span> config<span class="token operator">:</span> UserConfig<span class="token operator">&lt;</span>DefaultThemeOptions<span class="token operator">></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  lang<span class="token operator">:</span> <span class="token string">'zh-CN'</span><span class="token punctuation">,</span>
  title<span class="token operator">:</span> <span class="token string">'你好， VuePress ！'</span><span class="token punctuation">,</span>
  description<span class="token operator">:</span> <span class="token string">'这是我的第一个 VuePress 站点'</span><span class="token punctuation">,</span>

  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    logo<span class="token operator">:</span> <span class="token string">'https://vuejs.org/images/logo.png'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token operator">=</span> config
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>我们接下来会把这个配置对象称为 <strong>VuePress 配置</strong>.</p>
</div>
<h2 id="配置作用域"><a class="header-anchor" href="#配置作用域">#</a> 配置作用域</h2>
<p>你可能已经注意到了，在 VuePress 配置中有一项 <code>themeConfig</code> 配置项。</p>
<p>在 <code>themeConfig</code> 外部的配置项属于 <strong>站点配置</strong> ，而在 <code>themeConfig</code> 内部的配置项则属于 <strong>主题配置</strong>。</p>
<h3 id="站点配置"><a class="header-anchor" href="#站点配置">#</a> 站点配置</h3>
<p>站点配置的意思是，无论你使用什么主题，这些配置项都可以生效。</p>
<p>我们知道，每一个站点都应该有它的 <code>lang</code>, <code>title</code> 和 <code>description</code> 等属性，因此 VuePress 内置支持了这些属性的配置。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>前往 <RouterLink to="/zh/reference/config.html">配置参考</RouterLink> 查看所有站点配置。</p>
</div>
<h3 id="主题配置"><a class="header-anchor" href="#主题配置">#</a> 主题配置</h3>
<p>主题配置将会被 VuePress 主题来处理，所以它取决于你使用的主题是什么。</p>
<p>如果你没有设置 VuePress 配置的 <code>theme</code> 配置项，则代表使用的是默认主题。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>前往 <RouterLink to="/zh/reference/default-theme/config.html">默认主题 &gt; 配置参考</RouterLink> 查看默认主题的配置。</p>
</div>
</template>