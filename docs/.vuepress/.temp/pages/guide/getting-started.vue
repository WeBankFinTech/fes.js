<template><h1 id="getting-started"><a class="header-anchor" href="#getting-started">#</a> Getting Started</h1>
<h2 id="prerequisites"><a class="header-anchor" href="#prerequisites">#</a> Prerequisites</h2>
<ul>
<li><a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">Node.js v12+<OutboundLink/></a></li>
<li><a href="https://classic.yarnpkg.com/en/" target="_blank" rel="noopener noreferrer">Yarn v1 classic<OutboundLink/></a> (Optional)</li>
</ul>
<h2 id="manual-installation"><a class="header-anchor" href="#manual-installation">#</a> Manual Installation</h2>
<p>This section will help you build a basic VuePress documentation site from ground up. If you already have an existing project and would like to keep documentation inside the project, start from Step 3.</p>
<ul>
<li><strong>Step 1</strong>: Create and change into a new directory</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> vuepress-starter
<span class="token builtin class-name">cd</span> vuepress-starter
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li><strong>Step 2</strong>: Initialize your project</li>
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
<li><strong>Step 3</strong>: Install VuePress locally</li>
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
<li><strong>Step 4</strong>: Add some <a href="https://classic.yarnpkg.com/en/docs/package-json#toc-scripts" target="_blank" rel="noopener noreferrer">scripts<OutboundLink/></a> to <code>package.json</code></li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"docs:dev"</span><span class="token operator">:</span> <span class="token string">"vuepress dev docs"</span><span class="token punctuation">,</span>
    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ul>
<li><strong>Step 5</strong>: Add the default temp and cache directory to <code>.gitignore</code> file</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'node_modules<span class="token entity" title="\n">\n</span>.temp<span class="token entity" title="\n">\n</span>.cache'</span> <span class="token operator">>></span> .gitignore
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ul>
<li><strong>Step 6</strong>: Create your first document</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> docs
<span class="token builtin class-name">echo</span> <span class="token string">'# Hello VuePress'</span> <span class="token operator">></span> docs/README.md
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li><strong>Step 7</strong>: Serve the documentation site in the local server</li>
</ul>
<CodeGroup>
  <CodeGroupItem title="YARN" active>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> docs:dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="NPM">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> run docs:dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
<p>VuePress will start a hot-reloading development server at <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer">http://localhost:8080<OutboundLink/></a>. When you modify your markdown files, the content in the browser will be auto updated.</p>
<p>By now, you should have a basic but functional VuePress documentation site. Next, learn about the basics of <RouterLink to="/guide/configuration.html">configuration</RouterLink> in VuePress.</p>
</template>