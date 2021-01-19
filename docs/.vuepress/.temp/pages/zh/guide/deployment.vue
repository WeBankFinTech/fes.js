<template><h1 id="部署"><a class="header-anchor" href="#部署">#</a> 部署</h1>
<p>下述的指南基于以下条件：</p>
<ul>
<li>Markdown 源文件放置在你项目的 <code>docs</code> 目录；</li>
<li>使用的是默认的构建输出目录 (<code>.vuepress/dist</code>) ；</li>
<li>使用 <a href="https://classic.yarnpkg.com/zh-Hans/" target="_blank" rel="noopener noreferrer">Yarn classic<OutboundLink/></a> 作为包管理器，当然也可以使用 NPM 。</li>
<li>VuePress 作为项目依赖安装，并在 <code>package.json</code> 中配置了如下脚本：</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="github-pages"><a class="header-anchor" href="#github-pages">#</a> GitHub Pages</h2>
<ol>
<li>
<p>设置正确的 <RouterLink to="/zh/reference/config.html#base">base</RouterLink> 选项。</p>
<p>如果你准备发布到 <code>https://&lt;USERNAME&gt;.github.io/</code> ，你可以省略这一步，因为 <code>base</code> 默认就是 <code>&quot;/&quot;</code> 。</p>
<p>如果你准备发布到 <code>https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/</code> ，也就是说你的仓库地址是 <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code> ，则将 <code>base</code> 设置为 <code>&quot;/&lt;REPO&gt;/&quot;</code>。</p>
</li>
<li>
<p>选项你想要使用的 CI 工具。这里我们以 <a href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer">GitHub Actions<OutboundLink/></a> 为例。</p>
<p>创建 <code>.github/workflows/docs.yml</code> 文件来配置工作流。</p>
</li>
</ol>
<details class="custom-container details"><summary>点击展开配置样例</summary>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># 每当 push 到 main 分支时触发部署</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
  <span class="token comment"># 手动触发部署</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 选择要使用的 node 版本</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">'14'</span>

      <span class="token comment"># 缓存 node_modules</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache dependencies
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v2
        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            **/node_modules</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>yarn<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles('<span class="token important">**/yarn.lock')</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            ${{ runner.os }}-yarn-</span>

      <span class="token comment"># 如果缓存没有命中，安装依赖</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.yarn<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> 'true'
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile

      <span class="token comment"># 运行构建脚本</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn docs<span class="token punctuation">:</span>build

      <span class="token comment"># 查看 workflow 的文档来获取更多信息</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># 部署到 gh-pages 分支</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># 部署目录为 VuePress 的默认输出目录</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div></details>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>请参考 <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages 官方指南<OutboundLink/></a> 来获取更多信息。</p>
</div>
<h2 id="gitlab-pages"><a class="header-anchor" href="#gitlab-pages">#</a> GitLab Pages</h2>
<ol>
<li>
<p>设置正确的 <RouterLink to="/zh/reference/config.html#base">base</RouterLink> 选项。</p>
<p>如果你准备发布到 <code>https://&lt;USERNAME&gt;.gitlab.io/</code> ，你可以省略这一步，因此 <code>base</code> 默认就是 <code>&quot;/&quot;</code> 。</p>
<p>如果你准备发布到 <code>https://&lt;USERNAME&gt;.gitlab.io/&lt;REPO&gt;/</code> ，也就是说你的仓库地址是 <code>https://gitlab.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code> ，则将 <code>base</code> 设置为 <code>&quot;/&lt;REPO&gt;/&quot;</code>。</p>
</li>
<li>
<p>创建 <code>.gitlab-ci.yml</code> 文件来配置 <a href="https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/" target="_blank" rel="noopener noreferrer">GitLab CI<OutboundLink/></a> 工作流。</p>
</li>
</ol>
<details class="custom-container details"><summary>点击展开配置样例</summary>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 选择你要使用的 docker 镜像</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>14<span class="token punctuation">-</span>buster

<span class="token key atrule">pages</span><span class="token punctuation">:</span>
  <span class="token comment"># 每当 push 到 main 分支时触发部署</span>
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> main

  <span class="token comment"># 缓存 node_modules</span>
  <span class="token key atrule">cache</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> node_modules/

  <span class="token comment"># 安装依赖并运行构建脚本</span>
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile
  <span class="token punctuation">-</span> yarn docs<span class="token punctuation">:</span>build <span class="token punctuation">-</span><span class="token punctuation">-</span>dest public

  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> public
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div></details>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>请参考 <a href="https://docs.gitlab.com/ce/user/project/pages/#getting-started" target="_blank" rel="noopener noreferrer">GitLab Pages 官方指南<OutboundLink/></a> 来获取更多信息。</p>
</div>
<h2 id="google-firebase"><a class="header-anchor" href="#google-firebase">#</a> Google Firebase</h2>
<ol>
<li>
<p>请确保你已经安装了 <a href="https://www.npmjs.com/package/firebase-tools" target="_blank" rel="noopener noreferrer">firebase-tools<OutboundLink/></a>。</p>
</li>
<li>
<p>在你项目的根目录下创建 <code>firebase.json</code> 和 <code>.firebaserc</code>，并包含以下内容：</p>
</li>
</ol>
<p><code>firebase.json</code>:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"hosting"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"public"</span><span class="token operator">:</span> <span class="token string">"./docs/.vuepress/dist"</span><span class="token punctuation">,</span>
    <span class="token property">"ignore"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><code>.firebaserc</code>:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"projects"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"default"</span><span class="token operator">:</span> <span class="token string">"&lt;YOUR_FIREBASE_ID>"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ol start="3">
<li>在执行了 <code>yarn docs:build</code> 或 <code>npm run docs:build</code> 后, 使用 <code>firebase deploy</code> 指令来部署。</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>请参考 <a href="https://firebase.google.com/docs/cli" target="_blank" rel="noopener noreferrer">Firebase CLI 官方指南<OutboundLink/></a> 来获取更多信息。</p>
</div>
<h2 id="heroku"><a class="header-anchor" href="#heroku">#</a> Heroku</h2>
<ol>
<li>
<p>首先安装 <a href="https://devcenter.heroku.com/articles/heroku-cli" target="_blank" rel="noopener noreferrer">Heroku CLI<OutboundLink/></a>；</p>
</li>
<li>
<p><a href="https://signup.heroku.com" target="_blank" rel="noopener noreferrer">在这里<OutboundLink/></a> 注册一个 Heroku 账号；</p>
</li>
<li>
<p>运行 <code>heroku login</code> 并填写你的 Heroku 认证信息：</p>
</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>heroku login
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="4">
<li>在你的项目根目录中，创建一个名为 <code>static.json</code> 的文件，并包含下述内容：</li>
</ol>
<p><code>static.json</code>:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"root"</span><span class="token operator">:</span> <span class="token string">"./docs/.vuepress/dist"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这里是你项目的配置，请参考 <a href="https://github.com/heroku/heroku-buildpack-static" target="_blank" rel="noopener noreferrer">heroku-buildpack-static<OutboundLink/></a> 来获取更多信息。</p>
<h2 id="netlify"><a class="header-anchor" href="#netlify">#</a> Netlify</h2>
<ol>
<li>
<p>前往 <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">Netlify<OutboundLink/></a> ，从 GitHub 创建一个新项目，并进行如下配置：</p>
<ul>
<li><strong>Build Command:</strong> <code>yarn docs:build</code></li>
<li><strong>Publish directory:</strong> <code>docs/.vuepress/dist</code></li>
</ul>
</li>
<li>
<p>设置 <a href="https://docs.netlify.com/configure-builds/environment-variables" target="_blank" rel="noopener noreferrer">Environment variables<OutboundLink/></a> 来选择 Node 版本：</p>
<ul>
<li><code>NODE_VERSION</code>: 14</li>
</ul>
</li>
<li>
<p>点击 deploy 按钮。</p>
</li>
</ol>
<h2 id="vercel"><a class="header-anchor" href="#vercel">#</a> Vercel</h2>
<p>请查看 <a href="https://vercel.com/guides/deploying-vuepress-to-vercel" target="_blank" rel="noopener noreferrer">Creating and Deploying a VuePress App with Vercel<OutboundLink/></a>.</p>
<!-- 下列平台是中文文档特有的，放在最下方 -->
<h2 id="云开发-cloudbase"><a class="header-anchor" href="#云开发-cloudbase">#</a> 云开发 CloudBase</h2>
<p><a href="https://cloudbase.net/?site=vuepress" target="_blank" rel="noopener noreferrer">云开发 CloudBase<OutboundLink/></a> 是一个云原生一体化的 Serverless 云平台，支持静态网站、容器等多种托管能力，并提供简便的部署工具 <a href="https://cloudbase.net/framework.html?site=vuepress" target="_blank" rel="noopener noreferrer">CloudBase Framework<OutboundLink/></a> 来一键部署应用。</p>
<ol>
<li>全局安装 CloudBase CLI ：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> -g @cloudbase/cli
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="2">
<li>在项目根目录运行以下命令一键部署 VuePress 应用，在部署之前可以先 <a href="https://console.cloud.tencent.com/tcb/env/index?tdl_anchor=ad&amp;tdl_site=vuejs" target="_blank" rel="noopener noreferrer">开通环境<OutboundLink/></a>：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cloudbase init --without-template
cloudbase framework:deploy
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>CloudBase CLI 首先会跳转到控制台进行登录授权，然后将会交互式进行确认。</p>
<p>确认信息后会立即进行部署，部署完成后，可以获得一个自动 SSL，CDN 加速的网站应用，你也可以搭配使用 GitHub Action 来持续部署 GitHub 上的 VuePress 应用。</p>
<p>也可以使用 <code>cloudbase init --template vuepress</code> 快速创建和部署一个新的 VuePress 应用。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>更多详细信息请查看 CloudBase Framework 的<a href="https://github.com/TencentCloudBase/cloudbase-framework?site=vuepress#%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B" target="_blank" rel="noopener noreferrer">部署项目示例<OutboundLink/></a></p>
</div>
<h2 id="_21-云盒子"><a class="header-anchor" href="#_21-云盒子">#</a> 21 云盒子</h2>
<p>请查看 <a href="https://www.21yunbox.com/docs/#/deploy-vuepress" target="_blank" rel="noopener noreferrer">21 云盒子 - 部署一个 VuePress 静态网页<OutboundLink/></a>。</p>
</template>