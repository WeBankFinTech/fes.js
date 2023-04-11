import{_ as r,r as d,o as t,c as u,a as s,w as a,f as c,b as e,d as n}from"./app.0e52fd78.js";const o={},v=c(`<h1 id="命令行工具" tabindex="-1"><a class="header-anchor" href="#命令行工具" aria-hidden="true">#</a> 命令行工具</h1><h2 id="create-fes-app" tabindex="-1"><a class="header-anchor" href="#create-fes-app" aria-hidden="true">#</a> create-fes-app</h2><p>通过 <code>create-fes-app</code> 命令创建项目模板，输入<code>create-fes-app -h</code>则可以看到如下信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: create-fes-app &lt;name&gt;

Options:
    -v, --version            Output the current version
    -h, --help               Display help for command
    -f, --force              Overwrite target directory if it exists
    -m, --merge              Merge target directory if it exists
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以在本机安装后使用：</p>`,5),p=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 全局安装"),n(`
`),e("span",{class:"token function"},"pnpm"),n(" global "),e("span",{class:"token function"},"add"),n(` @fesjs/create-fes-app

`),e("span",{class:"token comment"},"# 创建模板"),n(`
create-fes-app fes-app
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),m=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 全局安装"),n(`
`),e("span",{class:"token function"},"npm"),n(" i "),e("span",{class:"token parameter variable"},"-g"),n(` @fesjs/create-fes-app

`),e("span",{class:"token comment"},"# 创建模板"),n(`
create-fes-app fes-app
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),b=e("p",null,[n("推荐使用 "),e("code",null,"pnpm create"),n(" 和 "),e("code",null,"npx"),n(" 方式创建模板，一直使用最新的模板：")],-1),h=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 创建模板"),n(`
`),e("span",{class:"token function"},"pnpm"),n(` create @fesjs/fes-app myapp

`),e("span",{class:"token comment"},"# 安装依赖"),n(`
`),e("span",{class:"token function"},"pnpm"),n(` i

`),e("span",{class:"token comment"},"# 运行"),n(`
`),e("span",{class:"token function"},"pnpm"),n(` dev
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),f=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 创建模板"),n(`
npx @fesjs/create-fes-app myapp

`),e("span",{class:"token comment"},"# 安装依赖"),n(`
`),e("span",{class:"token function"},"npm"),n(),e("span",{class:"token function"},"install"),n(`

`),e("span",{class:"token comment"},"# 运行"),n(`
`),e("span",{class:"token function"},"npm"),n(` run dev
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),g=c(`<h2 id="fes" tabindex="-1"><a class="header-anchor" href="#fes" aria-hidden="true">#</a> fes</h2><p>需要在项目根目录执行 <code>fes</code> 命令，输入<code>fes -h</code>则可以看到如下信息：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: fes &lt;command&gt; [options]

一个好用的前端应用解决方案

Options:
  -v, --vers         output the current version
  -h, --help         display help for command

Commands:
  build              build application for production
  dev [options]      start a local http service for development
  help               show command helps
  info               print debugging information about your environment
  webpack [options]  inspect webpack configurations

  Run fes &lt;command&gt; --help for detailed usage of given command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fes-dev" tabindex="-1"><a class="header-anchor" href="#fes-dev" aria-hidden="true">#</a> fes dev</h3><p>启动本地开发服务器进行项目的开发调试。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: fes dev [options]

start a local http service for development

Options:
  --port      http service port, like 8000
  --https     whether to turn on the https service
  -h, --help  display help for command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>fes dev <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="fes-build" tabindex="-1"><a class="header-anchor" href="#fes-build" aria-hidden="true">#</a> fes build</h3><p>编译构建 web 产物。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: fes build [options]

build application for production

Options:
  -h, --help  display help for command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>fes build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="fes-help" tabindex="-1"><a class="header-anchor" href="#fes-help" aria-hidden="true">#</a> fes help</h3><p>打印帮助文档。 比如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>fes <span class="token builtin class-name">help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="fes-info" tabindex="-1"><a class="header-anchor" href="#fes-info" aria-hidden="true">#</a> fes info</h3><p>打印当前项目的有用的环境信息，用来帮助定位问题。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: fes info [options]

print debugging information about your environment

Options:
  -h, --help  display help for command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>fes info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="fes-webpack" tabindex="-1"><a class="header-anchor" href="#fes-webpack" aria-hidden="true">#</a> fes webpack</h3><p>查看项目使用的 webpack 配置。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Usage: fes webpack [options]

inspect webpack configurations

Options:
  --rule &lt;ruleName&gt;      inspect a specific module rule
  --plugin &lt;pluginName&gt;  inspect a specific plugin
  --rules                list all module rule names
  --plugins              list all plugin names
  --verbose              show full function definitions in output
  -h, --help             display help for command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>fes webpack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,26);function x(k,_){const i=d("CodeGroupItem"),l=d("CodeGroup");return t(),u("div",null,[v,s(l,null,{default:a(()=>[s(i,{title:"PNPM",active:""},{default:a(()=>[p]),_:1}),s(i,{title:"NPM"},{default:a(()=>[m]),_:1})]),_:1}),b,s(l,null,{default:a(()=>[s(i,{title:"PNPM",active:""},{default:a(()=>[h]),_:1}),s(i,{title:"NPM"},{default:a(()=>[f]),_:1})]),_:1}),g])}const y=r(o,[["render",x],["__file","index.html.vue"]]);export{y as default};
