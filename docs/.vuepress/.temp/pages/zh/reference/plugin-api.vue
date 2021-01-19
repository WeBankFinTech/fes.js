<template><h1 id="插件-api"><a class="header-anchor" href="#插件-api">#</a> 插件 API</h1>
<p>插件需要在初始化之前使用。基础配置项会在使用插件时立即被处理：</p>
<ul>
<li><a href="#name">name</a></li>
<li><a href="#multiple">multiple</a></li>
<li><a href="#plugins">plugins</a></li>
</ul>
<p>下列 Hooks 会在初始化 App 时处理：</p>
<ul>
<li><a href="#extendsmarkdown">extendsMarkdown</a></li>
<li><a href="#oninitialized">onInitialized</a></li>
</ul>
<p>下列 Hooks 会在准备文件时处理：</p>
<ul>
<li><a href="#extendspagedata">extendsPageData</a></li>
<li><a href="#clientappenhancefiles">clientAppEnhanceFiles</a></li>
<li><a href="#clientapprootcomponentfiles">clientAppRootComponentFiles</a></li>
<li><a href="#clientappsetupfiles">clientAppSetupFiles</a></li>
<li><a href="#onprepared">onPrepared</a></li>
</ul>
<p>下列 Hooks 会在 dev / build 时处理：</p>
<ul>
<li><a href="#alias">alias</a></li>
<li><a href="#define">define</a></li>
<li><a href="#ongenerated">onGenerated</a></li>
</ul>
<h2 id="基础配置项"><a class="header-anchor" href="#基础配置项">#</a> 基础配置项</h2>
<h3 id="name"><a class="header-anchor" href="#name">#</a> name</h3>
<ul>
<li>
<p>类型： <code>string</code></p>
</li>
<li>
<p>详情：</p>
<p>插件的名称。</p>
<p>它会被用来识别插件，以避免多次使用同一个插件，因此应确保你的插件名称是独一无二的。</p>
<p>建议使用以下命名格式：</p>
<ul>
<li>非 Scoped: <code>vuepress-plugin-foo</code></li>
<li>Scoped: <code>@org/vuepress-plugin-foo</code></li>
</ul>
</li>
<li>
<p>参考：</p>
<ul>
<li><a href="#multiple">插件 API &gt; multiple</a></li>
</ul>
</li>
</ul>
<h3 id="multiple"><a class="header-anchor" href="#multiple">#</a> multiple</h3>
<ul>
<li>
<p>类型： <code>boolean</code></p>
</li>
<li>
<p>默认值： <code>false</code></p>
</li>
<li>
<p>详情：</p>
<p>插件是否能够被多次使用。</p>
<p>如果设置为 <code>false</code> ，当有相同名称的插件被使用时，先使用的会被后使用的替换掉。</p>
<p>如果设置为 <code>true</code> ，相同名称的插件可以被多次使用且不会被替换。</p>
</li>
<li>
<p>参考：</p>
<ul>
<li><a href="#name">插件 API &gt; name</a></li>
</ul>
</li>
</ul>
<h3 id="plugins"><a class="header-anchor" href="#plugins">#</a> plugins</h3>
<ul>
<li>
<p>类型： <code>PluginConfig[]</code></p>
</li>
<li>
<p>详情：</p>
<p>要使用的插件。</p>
<p>一个插件可以通过该选项来使用其他的插件。</p>
<p>该配置项接收一个数组，其中的每一个数组项是一个包含两个元素的元组：</p>
<ul>
<li>第一个元素是插件名称或插件本身。它可以接收插件名称、插件简称、插件的绝对路径或插件对象。</li>
<li>第二个元素是插件选项。它可以接收布尔值或一个对象。设置为 <code>false</code> 可以禁用该插件。设置为 <code>true</code> 可以启用该插件但不设置任何选项。使用对象可以启用该插件并且传入选项。</li>
</ul>
<p>为了简便起见，你可以将上述元组的第一个元素直接作为数组项，它等价于启用该插件但不设置任何选项。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// 包含两个元素的元组</span>
    <span class="token punctuation">[</span><span class="token string">'vuepress-plugin-foo'</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'/path/to/local/plugin'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">/* 选项 */</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vuepress-plugin-baz'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// 只使用第一个元素</span>
    <span class="token string">'foobar'</span><span class="token punctuation">,</span> <span class="token comment">// 等价于 ['foobar', true]</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ul>
<li>参考：
<ul>
<li><RouterLink to="/zh/guide/plugin.html">指南 &gt; 插件</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="开发-hooks"><a class="header-anchor" href="#开发-hooks">#</a> 开发 Hooks</h2>
<h3 id="alias"><a class="header-anchor" href="#alias">#</a> alias</h3>
<ul>
<li>
<p>类型： <code>Record&lt;string, any&gt; | ((app: App) =&gt; Record&lt;string, any&gt;)</code></p>
</li>
<li>
<p>详情：</p>
<p>定义路径别名。</p>
<p>该 Hook 接收一个对象，或者一个返回对象的函数。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  alias<span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string">'@alias'</span><span class="token operator">:</span> <span class="token string">'/path/to/alias'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="define"><a class="header-anchor" href="#define">#</a> define</h3>
<ul>
<li>
<p>类型： <code>Record&lt;string, any&gt; | ((app: App) =&gt; Record&lt;string, any&gt;)</code></p>
</li>
<li>
<p>详情：</p>
<p>定义全局常量。</p>
<p>该 Hook 接收一个对象，或者一个返回对象的函数。</p>
<p>它可以被用于向客户端文件传递变量。注意这里的值都会自动被 <code>JSON.stringify()</code> 处理。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  define<span class="token operator">:</span> <span class="token punctuation">{</span>
    __GLOBAL_BOOLEAN__<span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    __GLOBAL_STRING__<span class="token operator">:</span> <span class="token string">'foobar'</span><span class="token punctuation">,</span>
    __GLOBAL_OBJECT__<span class="token operator">:</span> <span class="token punctuation">{</span> foo<span class="token operator">:</span> <span class="token string">'bar'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="extendsmarkdown"><a class="header-anchor" href="#extendsmarkdown">#</a> extendsMarkdown</h3>
<ul>
<li>
<p>类型： <code>(md: Markdown, app: App) =&gt; void</code></p>
</li>
<li>
<p>详情：</p>
<p>Markdown 增强。</p>
<p>该 Hook 接收一个函数，在参数中会收到一个由 <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it<OutboundLink/></a> 提供的 <code>Markdown</code> 实例。</p>
<p>它可以用来添加额外的 markdown-it 插件、应用额外的自定义功能。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">extendsMarkdown</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">md</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>plugin1<span class="token punctuation">)</span>
    md<span class="token punctuation">.</span>linkify<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token punctuation">{</span> fuzzyEmail<span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="extendspagedata"><a class="header-anchor" href="#extendspagedata">#</a> extendsPageData</h3>
<ul>
<li>
<p>类型： <code>(page: Page, app: App) =&gt; Record&lt;string, any&gt; | Promise&lt;Record&lt;string, any&gt;&gt;</code></p>
</li>
<li>
<p>详情：</p>
<p>页面数据扩展。</p>
<p>该 Hook 接收一个函数，在参数中会收到一个 <code>Page</code> 实例。返回的对象会被合并到页面数据中，可以在客户端代码中使用。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">extendsPageData</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">page</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> meta <span class="token operator">=</span> <span class="token string">'foobar'</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> meta <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>在客户端组件中：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> usePageData <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/client'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> page <span class="token operator">=</span> <span class="token function">usePageData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>page<span class="token punctuation">.</span>value<span class="token punctuation">.</span>meta<span class="token punctuation">)</span> <span class="token comment">// foobar</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="客户端文件-hooks"><a class="header-anchor" href="#客户端文件-hooks">#</a> 客户端文件 Hooks</h2>
<h3 id="clientappenhancefiles"><a class="header-anchor" href="#clientappenhancefiles">#</a> clientAppEnhanceFiles</h3>
<ul>
<li>
<p>类型： <code>string | string[] | ((app: App) =&gt; string | string[] | Promise&lt;string | string[]&gt;)</code></p>
</li>
<li>
<p>详情：</p>
<p>Client App Enhancement 文件路径。</p>
<p>该 Hook 接收文件绝对路径，或者一个返回路径的函数。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  clientAppEnhanceFiles<span class="token operator">:</span> <span class="token string">'/path/to/clientAppEnhance.js'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="clientapprootcomponentfiles"><a class="header-anchor" href="#clientapprootcomponentfiles">#</a> clientAppRootComponentFiles</h3>
<ul>
<li>
<p>类型： <code>string | string[] | ((app: App) =&gt; string | string[] | Promise&lt;string | string[]&gt;)</code></p>
</li>
<li>
<p>详情：</p>
<p>Client Root Component 文件路径。</p>
<p>该 Hook 接收文件绝对路径，或者一个返回路径的函数。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  clientAppRootComponentFiles<span class="token operator">:</span> <span class="token string">'/path/to/RootComponent.vue'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="clientappsetupfiles"><a class="header-anchor" href="#clientappsetupfiles">#</a> clientAppSetupFiles</h3>
<ul>
<li>
<p>类型： <code>string | string[] | ((app: App) =&gt; string | string[] | Promise&lt;string | string[]&gt;)</code></p>
</li>
<li>
<p>详情：</p>
<p>Client App Setup 文件路径。</p>
<p>该 Hook 接收文件绝对路径，或者一个返回路径的函数。</p>
</li>
<li>
<p>示例：</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  clientAppSetupFiles<span class="token operator">:</span> <span class="token string">'/path/to/clientAppSetup.js'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="生命周期-hooks"><a class="header-anchor" href="#生命周期-hooks">#</a> 生命周期 Hooks</h2>
<h3 id="oninitialized"><a class="header-anchor" href="#oninitialized">#</a> onInitialized</h3>
<ul>
<li>
<p>类型： <code>(app: App) =&gt; void | Promise&lt;void&gt;</code></p>
</li>
<li>
<p>详情：</p>
<p>该 Hook 会在 VuePress App 初始化后被立即调用。</p>
</li>
</ul>
<h3 id="onprepared"><a class="header-anchor" href="#onprepared">#</a> onPrepared</h3>
<ul>
<li>
<p>类型： <code>(app: App) =&gt; void | Promise&lt;void&gt;</code></p>
</li>
<li>
<p>详情：</p>
<p>该 Hook 会在 VuePress App 完成文件准备后被立即调用。</p>
</li>
</ul>
<h3 id="ongenerated"><a class="header-anchor" href="#ongenerated">#</a> onGenerated</h3>
<ul>
<li>
<p>类型： <code>(app: App) =&gt; void | Promise&lt;void&gt;</code></p>
</li>
<li>
<p>详情：</p>
<p>该 Hook 会在 VuePress App 完成静态文件生成后被立即调用。</p>
</li>
</ul>
</template>