import{_ as r,r as t,o as p,c as o,b as a,d as e,a as s,w as c,f as i}from"./app.0e52fd78.js";const d={},u=a("h1",{id:"命令行接口",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#命令行接口","aria-hidden":"true"},"#"),e(" 命令行接口")],-1),v={href:"https://www.npmjs.com/package/@vuepress/cli",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.npmjs.com/package/vuepress",target:"_blank",rel:"noopener noreferrer"},b=i(`<p>执行 <code>vuepress --help</code> 来获取下列帮助信息：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Usage:
  $ vuepress <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span>

Commands:
  dev <span class="token punctuation">[</span>sourceDir<span class="token punctuation">]</span>    Start development server
  build <span class="token punctuation">[</span>sourceDir<span class="token punctuation">]</span>  Build to static site
  info               Display environment information

For <span class="token function">more</span> info, run any <span class="token builtin class-name">command</span> with the <span class="token variable"><span class="token variable">\`</span><span class="token parameter variable">--help</span><span class="token variable">\`</span></span> flag:
  $ vuepress dev <span class="token parameter variable">--help</span>
  $ vuepress build <span class="token parameter variable">--help</span>
  $ vuepress info <span class="token parameter variable">--help</span>

Options:
  -v, <span class="token parameter variable">--version</span>  Display version number
  -h, <span class="token parameter variable">--help</span>     Display this message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dev" tabindex="-1"><a class="header-anchor" href="#dev" aria-hidden="true">#</a> dev</h2><p>启动一个开发服务器，在本地开发你的 VuePress 站点。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Usage:
  $ vuepress dev <span class="token punctuation">[</span>sourceDir<span class="token punctuation">]</span>

Options:
  -c, <span class="token parameter variable">--config</span> <span class="token operator">&lt;</span>config<span class="token operator">&gt;</span>  Set path to config <span class="token function">file</span>
  -p, <span class="token parameter variable">--port</span> <span class="token operator">&lt;</span>port<span class="token operator">&gt;</span>      Use specified port <span class="token punctuation">(</span>default: <span class="token number">8000</span><span class="token punctuation">)</span>
  -t, <span class="token parameter variable">--temp</span> <span class="token operator">&lt;</span>temp<span class="token operator">&gt;</span>      Set the directory of the temporary files
  <span class="token parameter variable">--host</span> <span class="token operator">&lt;</span>host<span class="token operator">&gt;</span>          Use specified <span class="token function">host</span> <span class="token punctuation">(</span>default: <span class="token number">0.0</span>.0.0<span class="token punctuation">)</span>
  <span class="token parameter variable">--cache</span> <span class="token operator">&lt;</span>cache<span class="token operator">&gt;</span>        Set the directory of the cache files
  --clean-temp           Clean the temporary files before dev
  --clean-cache          Clean the cache files before dev
  <span class="token parameter variable">--open</span>                 Open browser when ready
  <span class="token parameter variable">--debug</span>                Enable debug mode
  --no-watch             Disable watching page and config files <span class="token punctuation">(</span>default: <span class="token boolean">true</span><span class="token punctuation">)</span>
  -v, <span class="token parameter variable">--version</span>          Display version number
  -h, <span class="token parameter variable">--help</span>             Display this message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>通过命令行设置的配置项，会覆盖你配置文件中的同名配置项。</p></div><h2 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> build</h2>`,7),h=i(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Usage:
  $ vuepress build <span class="token punctuation">[</span>sourceDir<span class="token punctuation">]</span>

Options:
  -c, <span class="token parameter variable">--config</span> <span class="token operator">&lt;</span>config<span class="token operator">&gt;</span>  Set path to config <span class="token function">file</span>
  -d, <span class="token parameter variable">--dest</span> <span class="token operator">&lt;</span>dest<span class="token operator">&gt;</span>      Set the directory build output <span class="token punctuation">(</span>default: .vuepress/dist<span class="token punctuation">)</span>
  -t, <span class="token parameter variable">--temp</span> <span class="token operator">&lt;</span>temp<span class="token operator">&gt;</span>      Set the directory of the temporary files
  <span class="token parameter variable">--cache</span> <span class="token operator">&lt;</span>cache<span class="token operator">&gt;</span>        Set the directory of the cache files
  --clean-temp           Clean the temporary files before build
  --clean-cache          Clean the cache files before build
  <span class="token parameter variable">--debug</span>                Enable debug mode
  -v, <span class="token parameter variable">--version</span>          Display version number
  -h, <span class="token parameter variable">--help</span>             Display this message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>通过命令行设置的配置项，会覆盖你配置文件中的同名配置项。</p></div><h2 id="info" tabindex="-1"><a class="header-anchor" href="#info" aria-hidden="true">#</a> info</h2><p>输出当前系统和依赖相关的信息。</p><p>在你想要检查你的环境，或者提交 Issue 时候，可以使用该命令。</p>`,5);function k(f,g){const n=t("ExternalLinkIcon"),l=t("RouterLink");return p(),o("div",null,[u,a("p",null,[e("VuePress 命令行接口是由 "),a("a",v,[e("@vuepress/cli"),s(n)]),e(" 包提供的。它是 "),a("a",m,[e("vuepress"),s(n)]),e(" 包的依赖之一，当然你也可以单独安装它。")]),b,a("p",null,[e("将你的 VuePress 站点构建成静态文件，以便你进行后续"),s(l,{to:"/guide/deployment.html"},{default:c(()=>[e("部署")]),_:1}),e("。")]),h])}const y=r(d,[["render",k],["__file","cli.html.vue"]]);export{y as default};
