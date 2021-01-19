<template><h1 id="命令行接口"><a class="header-anchor" href="#命令行接口">#</a> 命令行接口</h1>
<p>VuePress 命令行接口是由 <a href="https://www.npmjs.com/package/@vuepress/cli" target="_blank" rel="noopener noreferrer">@vuepress/cli<OutboundLink/></a> 包提供的。它是 <a href="https://www.npmjs.com/package/vuepress" target="_blank" rel="noopener noreferrer">vuepress<OutboundLink/></a> 包的依赖之一，当然你也可以单独安装它。</p>
<p>执行 <code>vuepress --help</code> 来获取下列帮助信息：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:
  $ vuepress <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span>

Commands:
  dev <span class="token punctuation">[</span>sourceDir<span class="token punctuation">]</span>    Start development server
  build <span class="token punctuation">[</span>sourceDir<span class="token punctuation">]</span>  Build to static site
  info               Display environment information

For <span class="token function">more</span> info, run any <span class="token builtin class-name">command</span> with the <span class="token variable"><span class="token variable">`</span>--help<span class="token variable">`</span></span> flag:
  $ vuepress dev --help
  $ vuepress build --help
  $ vuepress info --help

Options:
  -v, --version  Display version number 
  -h, --help     Display this message 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="dev"><a class="header-anchor" href="#dev">#</a> dev</h2>
<p>启动一个开发服务器，在本地开发你的 VuePress 站点。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:
  $ vuepress dev <span class="token punctuation">[</span>sourceDir<span class="token punctuation">]</span>

Options:
  -c, --config <span class="token operator">&lt;</span>config<span class="token operator">></span>  Set path to config <span class="token function">file</span> 
  -p, --port <span class="token operator">&lt;</span>port<span class="token operator">></span>      Use specified port <span class="token punctuation">(</span>default: <span class="token number">8080</span><span class="token punctuation">)</span> 
  -t, --temp <span class="token operator">&lt;</span>temp<span class="token operator">></span>      Set the directory of the temporary files 
  --host <span class="token operator">&lt;</span>host<span class="token operator">></span>          Use specified <span class="token function">host</span> <span class="token punctuation">(</span>default: <span class="token number">0.0</span>.0.0<span class="token punctuation">)</span> 
  --cache <span class="token operator">&lt;</span>cache<span class="token operator">></span>        Set the directory of the cache files 
  --clean-temp           Clean the temporary files before dev 
  --clean-cache          Clean the cache files before dev 
  --open                 Open browser when ready 
  --debug                Enable debug mode 
  --no-watch             Disable watching page and config files <span class="token punctuation">(</span>default: <span class="token boolean">true</span><span class="token punctuation">)</span>
  -v, --version          Display version number 
  -h, --help             Display this message
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>通过命令行设置的配置项，会覆盖你配置文件中的同名配置项。</p>
</div>
<h2 id="build"><a class="header-anchor" href="#build">#</a> build</h2>
<p>将你的 VuePress 站点构建成静态文件，以便你进行后续<RouterLink to="/zh/guide/deployment.html">部署</RouterLink>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:
  $ vuepress build <span class="token punctuation">[</span>sourceDir<span class="token punctuation">]</span>

Options:
  -c, --config <span class="token operator">&lt;</span>config<span class="token operator">></span>  Set path to config <span class="token function">file</span> 
  -d, --dest <span class="token operator">&lt;</span>dest<span class="token operator">></span>      Set the directory build output <span class="token punctuation">(</span>default: .vuepress/dist<span class="token punctuation">)</span> 
  -t, --temp <span class="token operator">&lt;</span>temp<span class="token operator">></span>      Set the directory of the temporary files 
  --cache <span class="token operator">&lt;</span>cache<span class="token operator">></span>        Set the directory of the cache files 
  --clean-temp           Clean the temporary files before build 
  --clean-cache          Clean the cache files before build 
  --debug                Enable debug mode 
  -v, --version          Display version number 
  -h, --help             Display this message
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>通过命令行设置的配置项，会覆盖你配置文件中的同名配置项。</p>
</div>
<h2 id="info"><a class="header-anchor" href="#info">#</a> info</h2>
<p>输出当前系统和依赖相关的信息。</p>
<p>在你想要检查你的环境，或者提交 Issue 时候，可以使用该命令。</p>
</template>