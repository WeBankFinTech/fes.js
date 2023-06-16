import{_ as s,o as a,c as n,V as e}from"./chunks/framework.c1e1f082.js";const h=JSON.parse('{"title":"命令行工具","description":"","frontmatter":{"aside":"left","outline":[2,3]},"headers":[],"relativePath":"reference/cli/index.md"}'),l={name:"reference/cli/index.md"},p=e(`<h1 id="命令行工具" tabindex="-1">命令行工具 <a class="header-anchor" href="#命令行工具" aria-label="Permalink to &quot;命令行工具&quot;">​</a></h1><h2 id="create-fes-app" tabindex="-1">create-fes-app <a class="header-anchor" href="#create-fes-app" aria-label="Permalink to &quot;create-fes-app&quot;">​</a></h2><p>通过 <code>create-fes-app</code> 命令创建项目模板，输入<code>create-fes-app -h</code>则可以看到如下信息：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Usage: create-fes-app &lt;name&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">    -v, --version            Output the current version</span></span>
<span class="line"><span style="color:#A6ACCD;">    -h, --help               Display help for command</span></span>
<span class="line"><span style="color:#A6ACCD;">    -f, --force              Overwrite target directory if it exists</span></span>
<span class="line"><span style="color:#A6ACCD;">    -m, --merge              Merge target directory if it exists</span></span></code></pre></div><p>可以在本机安装后使用：</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-fXoe6" id="tab-ho3rQip" checked="checked"><label for="tab-ho3rQip">pnpm</label><input type="radio" name="group-fXoe6" id="tab--lAtotP"><label for="tab--lAtotP">npm</label></div><div class="blocks"><div class="language-bash active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 全局安装</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">global</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">add</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@fesjs/create-fes-app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 创建模板</span></span>
<span class="line"><span style="color:#FFCB6B;">create-fes-app</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">fes-app</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 全局安装</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-g</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@fesjs/create-fes-app</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 创建模板</span></span>
<span class="line"><span style="color:#FFCB6B;">create-fes-app</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">fes-app</span></span></code></pre></div></div></div><p>推荐使用 <code>pnpm create</code> 和 <code>npx</code> 方式创建模板，一直使用最新的模板：</p><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-gTpoo" id="tab-R9SfMng" checked="checked"><label for="tab-R9SfMng">pnpm</label><input type="radio" name="group-gTpoo" id="tab-Gz8ONx8"><label for="tab-Gz8ONx8">npm</label></div><div class="blocks"><div class="language-bash active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 创建模板</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@fesjs/fes-app</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">myapp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装依赖</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">i</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 运行</span></span>
<span class="line"><span style="color:#FFCB6B;">pnpm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dev</span></span></code></pre></div><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># 创建模板</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">@fesjs/create-fes-app</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">myapp</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 安装依赖</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># 运行</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">run</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dev</span></span></code></pre></div></div></div><h2 id="fes" tabindex="-1">fes <a class="header-anchor" href="#fes" aria-label="Permalink to &quot;fes&quot;">​</a></h2><p>需要在项目根目录执行 <code>fes</code> 命令，输入<code>fes -h</code>则可以看到如下信息：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Usage: fes &lt;command&gt; [options]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">一个好用的前端应用解决方案</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">  -v, --vers         output the current version</span></span>
<span class="line"><span style="color:#A6ACCD;">  -h, --help         display help for command</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Commands:</span></span>
<span class="line"><span style="color:#A6ACCD;">  build              build application for production</span></span>
<span class="line"><span style="color:#A6ACCD;">  dev [options]      start a local http service for development</span></span>
<span class="line"><span style="color:#A6ACCD;">  help               show command helps</span></span>
<span class="line"><span style="color:#A6ACCD;">  info               print debugging information about your environment</span></span>
<span class="line"><span style="color:#A6ACCD;">  webpack [options]  inspect webpack configurations</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  Run fes &lt;command&gt; --help for detailed usage of given command.</span></span></code></pre></div><h3 id="fes-dev" tabindex="-1">fes dev <a class="header-anchor" href="#fes-dev" aria-label="Permalink to &quot;fes dev&quot;">​</a></h3><p>启动本地开发服务器进行项目的开发调试。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Usage: fes dev [options]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">start a local http service for development</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">  --port      http service port, like 8000</span></span>
<span class="line"><span style="color:#A6ACCD;">  --https     whether to turn on the https service</span></span>
<span class="line"><span style="color:#A6ACCD;">  -h, --help  display help for command</span></span></code></pre></div><p>比如：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">fes</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dev</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--port=8000</span></span></code></pre></div><h3 id="fes-build" tabindex="-1">fes build <a class="header-anchor" href="#fes-build" aria-label="Permalink to &quot;fes build&quot;">​</a></h3><p>编译构建 web 产物。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Usage: fes build [options]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">build application for production</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">  -h, --help  display help for command</span></span></code></pre></div><p>比如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">fes build</span></span></code></pre></div><h3 id="fes-help" tabindex="-1">fes help <a class="header-anchor" href="#fes-help" aria-label="Permalink to &quot;fes help&quot;">​</a></h3><p>打印帮助文档。 比如：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">fes</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">help</span></span></code></pre></div><h3 id="fes-info" tabindex="-1">fes info <a class="header-anchor" href="#fes-info" aria-label="Permalink to &quot;fes info&quot;">​</a></h3><p>打印当前项目的有用的环境信息，用来帮助定位问题。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Usage: fes info [options]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">print debugging information about your environment</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">  -h, --help  display help for command</span></span></code></pre></div><p>比如：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">fes</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">info</span></span></code></pre></div><h3 id="fes-webpack" tabindex="-1">fes webpack <a class="header-anchor" href="#fes-webpack" aria-label="Permalink to &quot;fes webpack&quot;">​</a></h3><p>查看项目使用的 webpack 配置。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Usage: fes webpack [options]</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">inspect webpack configurations</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">Options:</span></span>
<span class="line"><span style="color:#A6ACCD;">  --rule &lt;ruleName&gt;      inspect a specific module rule</span></span>
<span class="line"><span style="color:#A6ACCD;">  --plugin &lt;pluginName&gt;  inspect a specific plugin</span></span>
<span class="line"><span style="color:#A6ACCD;">  --rules                list all module rule names</span></span>
<span class="line"><span style="color:#A6ACCD;">  --plugins              list all plugin names</span></span>
<span class="line"><span style="color:#A6ACCD;">  --verbose              show full function definitions in output</span></span>
<span class="line"><span style="color:#A6ACCD;">  -h, --help             display help for command</span></span></code></pre></div><p>比如：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">fes</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">webpack</span></span></code></pre></div>`,34),o=[p];function t(c,i,r,C,d,y){return a(),n("div",null,o)}const f=s(l,[["render",t]]);export{h as __pageData,f as default};
