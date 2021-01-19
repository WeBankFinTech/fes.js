<template><h1 id="plugin-api"><a class="header-anchor" href="#plugin-api">#</a> Plugin API</h1>
<p>Plugins should be used before initialization. The basic options will be handled once the plugin is used:</p>
<ul>
<li><a href="#name">name</a></li>
<li><a href="#multiple">multiple</a></li>
<li><a href="#plugins">plugins</a></li>
</ul>
<p>The following hooks will be processed when initializing app:</p>
<ul>
<li><a href="#extendsmarkdown">extendsMarkdown</a></li>
<li><a href="#oninitialized">onInitialized</a></li>
</ul>
<p>The following hooks will be processed when preparing files:</p>
<ul>
<li><a href="#extendspagedata">extendsPageData</a></li>
<li><a href="#clientappenhancefiles">clientAppEnhanceFiles</a></li>
<li><a href="#clientapprootcomponentfiles">clientAppRootComponentFiles</a></li>
<li><a href="#clientappsetupfiles">clientAppSetupFiles</a></li>
<li><a href="#onprepared">onPrepared</a></li>
</ul>
<p>The following hooks will be processed in dev / build:</p>
<ul>
<li><a href="#alias">alias</a></li>
<li><a href="#define">define</a></li>
<li><a href="#ongenerated">onGenerated</a></li>
</ul>
<h2 id="basic-options"><a class="header-anchor" href="#basic-options">#</a> Basic Options</h2>
<h3 id="name"><a class="header-anchor" href="#name">#</a> name</h3>
<ul>
<li>
<p>Type: <code>string</code></p>
</li>
<li>
<p>Details:</p>
<p>Name of the plugin.</p>
<p>It will be used for identifying plugins to avoid using a same plugin multiple times, so make sure to use a unique plugin name.</p>
<p>It is recommended to use following format:</p>
<ul>
<li>Non-scoped: <code>vuepress-plugin-foo</code></li>
<li>Scoped: <code>@org/vuepress-plugin-foo</code></li>
</ul>
</li>
<li>
<p>Also see:</p>
<ul>
<li><a href="#multiple">Plugin API &gt; multiple</a></li>
</ul>
</li>
</ul>
<h3 id="multiple"><a class="header-anchor" href="#multiple">#</a> multiple</h3>
<ul>
<li>
<p>Type: <code>boolean</code></p>
</li>
<li>
<p>Default: <code>false</code></p>
</li>
<li>
<p>Details:</p>
<p>Declare whether the plugin can be used multiple times.</p>
<p>If set to <code>false</code>, when using plugins with the same name, the one used previously will be replaced by the one used later.</p>
<p>If set to <code>true</code>, plugins with the same name could be used multiple times and won't be replaced.</p>
</li>
<li>
<p>Also see:</p>
<ul>
<li><a href="#name">Plugin API &gt; name</a></li>
</ul>
</li>
</ul>
<h3 id="plugins"><a class="header-anchor" href="#plugins">#</a> plugins</h3>
<ul>
<li>
<p>Type: <code>PluginConfig[]</code></p>
</li>
<li>
<p>Details:</p>
<p>Plugins to use.</p>
<p>A plugin can use other plugins via this option.</p>
<p>This option accepts an array, each item of which is a two-element tuple:</p>
<ul>
<li>The first element is the plugin name or the plugin itself. It accepts plugin name, plugin name shorthand, absolute path to plugin, or the plugin object.</li>
<li>The second element is the plugin options. It accepts boolean or object. Set it to <code>false</code> to disable the plugin. Set it to <code>true</code> to enable the plugin without any options. Use object to enable the plugin with options.</li>
</ul>
<p>For simplicity, you can use the first element of the tuple that described above as the array item, which equals enabling the plugin without any options.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token comment">// two-element tuple</span>
    <span class="token punctuation">[</span><span class="token string">'vuepress-plugin-foo'</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'bar'</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">'/path/to/local/plugin'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token comment">/* options */</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vuepress-plugin-baz'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// only use the first element</span>
    <span class="token string">'foobar'</span><span class="token punctuation">,</span> <span class="token comment">// equals to ['foobar', true]</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ul>
<li>Also see:
<ul>
<li><RouterLink to="/guide/plugin.html">Guide &gt; Plugin</RouterLink></li>
</ul>
</li>
</ul>
<h2 id="development-hooks"><a class="header-anchor" href="#development-hooks">#</a> Development Hooks</h2>
<h3 id="alias"><a class="header-anchor" href="#alias">#</a> alias</h3>
<ul>
<li>
<p>Type: <code>Record&lt;string, any&gt; | ((app: App) =&gt; Record&lt;string, any&gt;)</code></p>
</li>
<li>
<p>Details:</p>
<p>Path aliases definition.</p>
<p>This hook accepts an object or a function that returns an object.</p>
</li>
<li>
<p>Example:</p>
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
<p>Type: <code>Record&lt;string, any&gt; | ((app: App) =&gt; Record&lt;string, any&gt;)</code></p>
</li>
<li>
<p>Details:</p>
<p>Define global constants replacements.</p>
<p>This hook accepts an object or a function that returns an object.</p>
<p>This can be useful for passing variables to client files. Note that the values will be automatically processed by <code>JSON.stringify()</code>.</p>
</li>
<li>
<p>Example:</p>
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
<p>Type: <code>(md: Markdown, app: App) =&gt; void</code></p>
</li>
<li>
<p>Details:</p>
<p>Markdown enhancement.</p>
<p>This hook accepts a function that will receive an instance of <code>Markdown</code> powered by <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it<OutboundLink/></a> in its arguments.</p>
<p>This can be used for using extra markdown-it plugins and implementing customizations.</p>
</li>
<li>
<p>Example:</p>
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
<p>Type: <code>(page: Page, app: App) =&gt; Record&lt;string, any&gt; | Promise&lt;Record&lt;string, any&gt;&gt;</code></p>
</li>
<li>
<p>Details:</p>
<p>Page data extension.</p>
<p>This hook accepts a function that will receive an instance of <code>Page</code>. The returned object will be merged into page data, which can be used in client side code.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">extendsPageData</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">page</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> meta <span class="token operator">=</span> <span class="token string">'foobar'</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span> meta <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>In client component:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> usePageData <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@vuepress/client'</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> page <span class="token operator">=</span> <span class="token function">usePageData</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>page<span class="token punctuation">.</span>value<span class="token punctuation">.</span>meta<span class="token punctuation">)</span> <span class="token comment">// foobar</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="client-files-hooks"><a class="header-anchor" href="#client-files-hooks">#</a> Client Files Hooks</h2>
<h3 id="clientappenhancefiles"><a class="header-anchor" href="#clientappenhancefiles">#</a> clientAppEnhanceFiles</h3>
<ul>
<li>
<p>Type: <code>string | string[] | ((app: App) =&gt; string | string[] | Promise&lt;string | string[]&gt;)</code></p>
</li>
<li>
<p>Details:</p>
<p>Paths of client app enhancement files.</p>
<p>This hook accepts absolute file paths, or a function that returns the paths.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  clientAppEnhanceFiles<span class="token operator">:</span> <span class="token string">'/path/to/clientAppEnhance.js'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="clientapprootcomponentfiles"><a class="header-anchor" href="#clientapprootcomponentfiles">#</a> clientAppRootComponentFiles</h3>
<ul>
<li>
<p>Type: <code>string | string[] | ((app: App) =&gt; string | string[] | Promise&lt;string | string[]&gt;)</code></p>
</li>
<li>
<p>Details:</p>
<p>Paths of client app root component files.</p>
<p>This hook accepts absolute file paths, or a function that returns the paths.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  clientAppRootComponentFiles<span class="token operator">:</span> <span class="token string">'/path/to/RootComponent.vue'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="clientappsetupfiles"><a class="header-anchor" href="#clientappsetupfiles">#</a> clientAppSetupFiles</h3>
<ul>
<li>
<p>Type: <code>string | string[] | ((app: App) =&gt; string | string[] | Promise&lt;string | string[]&gt;)</code></p>
</li>
<li>
<p>Details:</p>
<p>Paths of client app setup files.</p>
<p>This hook accepts absolute file paths, or a function that returns the paths.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  clientAppSetupFiles<span class="token operator">:</span> <span class="token string">'/path/to/clientAppSetup.js'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="lifecycle-hooks"><a class="header-anchor" href="#lifecycle-hooks">#</a> Lifecycle Hooks</h2>
<h3 id="oninitialized"><a class="header-anchor" href="#oninitialized">#</a> onInitialized</h3>
<ul>
<li>
<p>Type: <code>(app: App) =&gt; void | Promise&lt;void&gt;</code></p>
</li>
<li>
<p>Details:</p>
<p>This hook will be invoked once VuePress app has been initialized.</p>
</li>
</ul>
<h3 id="onprepared"><a class="header-anchor" href="#onprepared">#</a> onPrepared</h3>
<ul>
<li>
<p>Type: <code>(app: App) =&gt; void | Promise&lt;void&gt;</code></p>
</li>
<li>
<p>Details:</p>
<p>This hook will be invoked once VuePress app has finished preparation.</p>
</li>
</ul>
<h3 id="ongenerated"><a class="header-anchor" href="#ongenerated">#</a> onGenerated</h3>
<ul>
<li>
<p>Type: <code>(app: App) =&gt; void | Promise&lt;void&gt;</code></p>
</li>
<li>
<p>Details:</p>
<p>This hook will be invoked once VuePress app has generated static files.</p>
</li>
</ul>
</template>