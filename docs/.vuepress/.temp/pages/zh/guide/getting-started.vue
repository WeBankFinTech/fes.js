<template><h1 id="快速上手"><a class="header-anchor" href="#快速上手">#</a> 快速上手</h1>
<h2 id="依赖环境"><a class="header-anchor" href="#依赖环境">#</a> 依赖环境</h2>
<ul>
<li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js v12+<OutboundLink/></a></li>
<li><a href="https://classic.yarnpkg.com/zh-Hans/" target="_blank" rel="noopener noreferrer">Yarn v1 classic<OutboundLink/></a> （可选）</li>
</ul>
<h2 id="手动安装"><a class="header-anchor" href="#手动安装">#</a> 手动安装</h2>
<p>这一章节会帮助你从头搭建一个简单的 VuePress 文档网站。如果你想在一个现有项目中使用 VuePress 管理文档，从步骤 3 开始。</p>
<ul>
<li><strong>步骤1</strong>: 创建并进入一个新目录</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> vuepress-starter
<span class="token builtin class-name">cd</span> vuepress-starter
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li><strong>步骤2</strong>: 初始化项目</li>
</ul>
<CodeGroup>
  <CodeGroupItem title="YARN" active>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
<span class="token function">yarn</span> init
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="NPM">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
<span class="token function">npm</span> init
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<ul>
<li><strong>步骤3</strong>: 将 VuePress 安装为本地依赖</li>
</ul>
<CodeGroup>
  <CodeGroupItem title="YARN" active>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> -D vuepress@next
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="NPM">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -D vuepress@next
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<ul>
<li><strong>步骤4</strong>: 在 <code>package.json</code> 中添加一些 <a href="https://classic.yarnpkg.com/zh-Hans/docs/package-json#toc-scripts" target="_blank" rel="noopener noreferrer">scripts<OutboundLink/></a></li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"docs:dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span>
    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li><strong>步骤5</strong>: 将默认的临时目录和缓存目录添加到 <code>.gitignore</code> 文件中</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'node_modules<span class="token entity" title="\n">\n</span>.temp<span class="token entity" title="\n">\n</span>.cache'</span> <span class="token operator">>></span> .gitignore
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li><strong>步骤6</strong>: 创建你的第一篇文档</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> docs
<span class="token builtin class-name">echo</span> <span class="token string">'# Hello VuePress'</span> <span class="token operator">></span> docs/README.md
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li><strong>步骤7</strong>: 在本地启动服务器来开发你的文档网站</li>
</ul>
<CodeGroup>
  <CodeGroupItem title="YARN" active>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> docs:dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="NPM">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run docs:dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<p>VuePress 会在 <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080<OutboundLink/></a> 启动一个热重载的开发服务器。当你修改你的 Markdown 文件时，浏览器中的内容也会自动更新。</p>
<p>现在，你应该已经有了一个简单可用的 VuePress 文档网站。接下来，了解一下 VuePress <RouterLink to="/zh/guide/configuration.html">配置</RouterLink> 相关的内容。</p>
</template>