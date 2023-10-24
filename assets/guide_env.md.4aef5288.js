import{_ as a,o as s,c as e,V as o}from"./chunks/framework.6405946a.js";const y=JSON.parse('{"title":"环境变量","description":"","frontmatter":{},"headers":[],"relativePath":"guide/env.md"}'),n={name:"guide/env.md"},l=o(`<h1 id="环境变量" tabindex="-1">环境变量 <a class="header-anchor" href="#环境变量" aria-label="Permalink to &quot;环境变量&quot;">​</a></h1><p>在构建或者代码在端上运行中需要一些跟区分于环境的变量，用于配置构建流程或者运行时过程，这时候我们可以配置环境变量。</p><h2 id="配置环境变量" tabindex="-1">配置环境变量 <a class="header-anchor" href="#配置环境变量" aria-label="Permalink to &quot;配置环境变量&quot;">​</a></h2><h3 id="命令行添加" tabindex="-1">命令行添加 <a class="header-anchor" href="#命令行添加" aria-label="Permalink to &quot;命令行添加&quot;">​</a></h3><p>比如：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># OS X, Linux</span></span>
<span class="line"><span style="color:#BABED8;">PORT</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">3000</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">fes</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dev</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Windows (cmd.exe)</span></span>
<span class="line"><span style="color:#82AAFF;">set</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">PORT=</span><span style="color:#F78C6C;">3000</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">fes</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dev</span></span></code></pre></div><p>如果要同时考虑 OS X 和 Windows，可借助三方工具 <a href="https://github.com/kentcdodds/cross-env" target="_blank" rel="noreferrer">cross-env</a></p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-puLek" id="tab-bDXzqLX" checked="checked"><label for="tab-bDXzqLX">pnpm</label><input type="radio" name="group-puLek" id="tab-3QjifRA"><label for="tab-3QjifRA">npm</label></div><div class="blocks"><div class="language-sh active"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">add</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">cross-env</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--dev</span></span>
<span class="line"><span style="color:#FFCB6B;">cross-env</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">PORT=</span><span style="color:#F78C6C;">3000</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">fes</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dev</span></span></code></pre></div><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">i</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">cross-env</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--save-dev</span></span>
<span class="line"><span style="color:#FFCB6B;">cross-env</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">PORT=</span><span style="color:#F78C6C;">3000</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">fes</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dev</span></span></code></pre></div></div></div><h3 id="env-文件配置" tabindex="-1"><code>.env</code> 文件配置 <a class="header-anchor" href="#env-文件配置" aria-label="Permalink to &quot;\`.env\` 文件配置&quot;">​</a></h3><p>Fes.js 中约定根目录下以 <code>.env</code> 开头的文件为环境变量配置文件。</p><p>比如：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">PORT</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">3000</span></span></code></pre></div><p>然后执行</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">fes</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dev</span></span></code></pre></div><p>会以 3000 端口启动 dev server。</p><h4 id="本地临时配置" tabindex="-1">本地临时配置 <a class="header-anchor" href="#本地临时配置" aria-label="Permalink to &quot;本地临时配置&quot;">​</a></h4><p>可以新建 <code>.env.local</code>，这份配置会和 <code>.env</code> 做合并后形成最终配置。</p><h4 id="环境配置" tabindex="-1">环境配置 <a class="header-anchor" href="#环境配置" aria-label="Permalink to &quot;环境配置&quot;">​</a></h4><p>可以通过环境变量 <code>FES_ENV</code> 区分不同环境来指定配置，这时候必须在执行命令前添加 <code>FES_ENV</code> 保证执行加载环境变量配置文件逻辑前 <code>FES_ENV</code> 已设置。</p><p>举个 🌰 ：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">FES_ENV</span><span style="color:#89DDFF;">=</span><span style="color:#C3E88D;">sit</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">fes</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">dev</span></span></code></pre></div><p>如果存在 <code>.env.sit</code> 文件，则会将 <code>.env.sit</code> 的配置和 <code>.env</code> 做合并后形成最终配置。</p><h4 id="配置优先级" tabindex="-1">配置优先级 <a class="header-anchor" href="#配置优先级" aria-label="Permalink to &quot;配置优先级&quot;">​</a></h4><p>本地临时配置 &gt; 环境配置 &gt; 基础配置</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>如果多份配置中存在相同的配置项，<strong>则优先级高的会覆盖优先级低的</strong>。</p></div><h2 id="编译时配置列表" tabindex="-1">编译时配置列表 <a class="header-anchor" href="#编译时配置列表" aria-label="Permalink to &quot;编译时配置列表&quot;">​</a></h2><p>编译时配置是在构建过程需要的变量，开放给用户配置。</p><h3 id="fes-env" tabindex="-1">FES_ENV <a class="header-anchor" href="#fes-env" aria-label="Permalink to &quot;FES_ENV&quot;">​</a></h3><p>指定当前的环境，不同环境各自的配置文件。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>FES_ENV</code> 在会在加载<code>.env</code>前使用，所以只能用命令行方式配置。</p></div><h3 id="fes-presets" tabindex="-1">FES_PRESETS <a class="header-anchor" href="#fes-presets" aria-label="Permalink to &quot;FES_PRESETS&quot;">​</a></h3><p>添加额外的插件集入口</p><h3 id="fes-plugins" tabindex="-1">FES_PLUGINS <a class="header-anchor" href="#fes-plugins" aria-label="Permalink to &quot;FES_PLUGINS&quot;">​</a></h3><p>添加额外的插件入口</p><h3 id="port" tabindex="-1">PORT <a class="header-anchor" href="#port" aria-label="Permalink to &quot;PORT&quot;">​</a></h3><p><code>fes dev</code> 时服务指定的端口号，默认是 <code>8000</code></p><h3 id="host" tabindex="-1">HOST <a class="header-anchor" href="#host" aria-label="Permalink to &quot;HOST&quot;">​</a></h3><p>默认是 <code>localhost</code>。</p><h3 id="https" tabindex="-1">HTTPS <a class="header-anchor" href="#https" aria-label="Permalink to &quot;HTTPS&quot;">​</a></h3><p>默认是 <code>false</code>。</p><h3 id="watch" tabindex="-1">WATCH <a class="header-anchor" href="#watch" aria-label="Permalink to &quot;WATCH&quot;">​</a></h3><p>设为 none 时不监听文件变更。比如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">WATCH=none fes dev</span></span></code></pre></div><h3 id="babel-cache" tabindex="-1">BABEL_CACHE <a class="header-anchor" href="#babel-cache" aria-label="Permalink to &quot;BABEL_CACHE&quot;">​</a></h3><p>默认开启 Babel 编译缓存，值为 none 时禁用缓存。</p><h3 id="analyze" tabindex="-1">ANALYZE <a class="header-anchor" href="#analyze" aria-label="Permalink to &quot;ANALYZE&quot;">​</a></h3><p>用于分析 bundle 构成，默认关闭。</p><p>比如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ANALYZE=1 fes build</span></span></code></pre></div><h3 id="analyze-mode" tabindex="-1">ANALYZE_MODE <a class="header-anchor" href="#analyze-mode" aria-label="Permalink to &quot;ANALYZE_MODE&quot;">​</a></h3><p>默认是<code>server</code></p><h3 id="analyze-port" tabindex="-1">ANALYZE_PORT <a class="header-anchor" href="#analyze-port" aria-label="Permalink to &quot;ANALYZE_PORT&quot;">​</a></h3><p>默认是<code>8888</code></p><h3 id="clear-output" tabindex="-1">CLEAR_OUTPUT <a class="header-anchor" href="#clear-output" aria-label="Permalink to &quot;CLEAR_OUTPUT&quot;">​</a></h3><p>仅仅在 <code>build</code> 时生效。如果设置为 <code>none</code>，就不会在构建前清除 <code>Output</code> 文件内容。</p><h3 id="rm-tmpdir" tabindex="-1">RM_TMPDIR <a class="header-anchor" href="#rm-tmpdir" aria-label="Permalink to &quot;RM_TMPDIR&quot;">​</a></h3><p>仅仅在 <code>build</code> 时生效。如果设置为 <code>none</code>，就不会在构建后清除 <code>.fes</code> 临时文件内容。</p><h2 id="process-env" tabindex="-1">p<wbr>rocess.env <a class="header-anchor" href="#process-env" aria-label="Permalink to &quot;p&lt;wbr&gt;rocess.env&quot;">​</a></h2><p>运行时配置需要以 <code>FES_APP_</code> 开头，比如在 <code>.env</code> 中配置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">FES_APP_KEY=123456789</span></span></code></pre></div><p>在代码中使用：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#BABED8;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#BABED8;">(process</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">env</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">FES_APP_KEY)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 输出 123456789</span></span></code></pre></div><p>除了用户自定义的以<code>FES_APP_</code>开头的变量，还提供如下配置：</p><ul><li><p><strong>NODE_ENV</strong>：Node 环境变量</p></li><li><p><strong>FES_ENV</strong>：Fes.js 环境变量</p></li><li><p><strong>BASE_URL</strong>：等同于 publicPath</p></li></ul>`,64),p=[l];function t(c,r,i,d,h,u){return s(),e("div",null,p)}const E=a(n,[["render",t]]);export{y as __pageData,E as default};
