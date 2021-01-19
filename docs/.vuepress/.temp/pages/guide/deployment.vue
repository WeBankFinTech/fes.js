<template><h1 id="deployment"><a class="header-anchor" href="#deployment">#</a> Deployment</h1>
<p>The following guides are based on some shared assumptions:</p>
<ul>
<li>You are placing your Markdown source files inside the <code>docs</code> directory of your project;</li>
<li>You are using the default build output location (<code>.vuepress/dist</code>);</li>
<li>You are using <a href="https://classic.yarnpkg.com/en/" target="_blank" rel="noopener noreferrer">yarn classic<OutboundLink/></a> as package manager, while npm is also supported;</li>
<li>VuePress is installed as a local dependency in your project, and you have setup the following script in <code>package.json</code>:</li>
</ul>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"scripts"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"docs:build"</span><span class="token operator">:</span> <span class="token string">"vuepress build docs"</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="github-pages"><a class="header-anchor" href="#github-pages">#</a> GitHub Pages</h2>
<ol>
<li>
<p>Set the correct <RouterLink to="/reference/config.html#base">base</RouterLink> config.</p>
<p>If you are deploying to <code>https://&lt;USERNAME&gt;.github.io/</code>, you can omit this step as <code>base</code> defaults to <code>&quot;/&quot;</code>.</p>
<p>If you are deploying to <code>https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/</code>, for example your repository is at <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code>, then set <code>base</code> to <code>&quot;/&lt;REPO&gt;/&quot;</code>.</p>
</li>
<li>
<p>Choose your preferred CI tools. Here we take <a href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer">GitHub Actions<OutboundLink/></a> as an example.</p>
<p>Create <code>.github/workflows/docs.yml</code> to set up the workflow.</p>
</li>
</ol>
<details class="custom-container details"><summary>Click to expand sample config</summary>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docs

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token comment"># trigger deployment on every push to main branch</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span>
  <span class="token comment"># trigger deployment manually</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">docs</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># fetch all commits to get last updated time or other git log info</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Node.js
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># choose node.js version to use</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token string">'14'</span>

      <span class="token comment"># cache node_modules</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache dependencies
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v2
        <span class="token key atrule">id</span><span class="token punctuation">:</span> yarn<span class="token punctuation">-</span>cache
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            **/node_modules</span>
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>yarn<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles('<span class="token important">**/yarn.lock')</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            ${{ runner.os }}-yarn-</span>

      <span class="token comment"># install dependencies if the cache did not hit</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">if</span><span class="token punctuation">:</span> steps.yarn<span class="token punctuation">-</span>cache.outputs.cache<span class="token punctuation">-</span>hit <span class="token tag">!=</span> 'true'
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile

      <span class="token comment"># run build script</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build VuePress site
        <span class="token key atrule">run</span><span class="token punctuation">:</span> yarn docs<span class="token punctuation">:</span>build

      <span class="token comment"># please check out the docs of the workflow for more details</span>
      <span class="token comment"># @see https://github.com/crazy-max/ghaction-github-pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy to GitHub Pages
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> crazy<span class="token punctuation">-</span>max/ghaction<span class="token punctuation">-</span>github<span class="token punctuation">-</span>pages@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># deploy to gh-pages branch</span>
          <span class="token key atrule">target_branch</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token comment"># deploy the default output dir of VuePress</span>
          <span class="token key atrule">build_dir</span><span class="token punctuation">:</span> docs/.vuepress/dist
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br></div></div></details>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Please refer to <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages official guide<OutboundLink/></a> for more details.</p>
</div>
<h2 id="gitlab-pages"><a class="header-anchor" href="#gitlab-pages">#</a> GitLab Pages</h2>
<ol>
<li>
<p>Set the correct <RouterLink to="/reference/config.html#base">base</RouterLink> config.</p>
<p>If you are deploying to <code>https://&lt;USERNAME&gt;.gitlab.io/</code>, you can omit <code>base</code> as it defaults to <code>&quot;/&quot;</code>.</p>
<p>If you are deploying to <code>https://&lt;USERNAME&gt;.gitlab.io/&lt;REPO&gt;/</code>, for example your repository is at <code>https://gitlab.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code>, then set <code>base</code> to <code>&quot;/&lt;REPO&gt;/&quot;</code>.</p>
</li>
<li>
<p>Create <code>.gitlab-ci.yml</code> to set up <a href="https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/" target="_blank" rel="noopener noreferrer">GitLab CI<OutboundLink/></a> workflow.</p>
</li>
</ol>
<details class="custom-container details"><summary>Click to expand sample config</summary>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># choose a docker image to use</span>
<span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>14<span class="token punctuation">-</span>buster

<span class="token key atrule">pages</span><span class="token punctuation">:</span>
  <span class="token comment"># trigger deployment on every push to main branch</span>
  <span class="token key atrule">only</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> main

  <span class="token comment"># cache node_modules</span>
  <span class="token key atrule">cache</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> node_modules/

  <span class="token comment"># install dependencies and run build script</span>
  <span class="token key atrule">script</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> yarn <span class="token punctuation">-</span><span class="token punctuation">-</span>frozen<span class="token punctuation">-</span>lockfile
  <span class="token punctuation">-</span> yarn docs<span class="token punctuation">:</span>build <span class="token punctuation">-</span><span class="token punctuation">-</span>dest public

  <span class="token key atrule">artifacts</span><span class="token punctuation">:</span>
    <span class="token key atrule">paths</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> public
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div></details>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Please refer to <a href="https://docs.gitlab.com/ce/user/project/pages/#getting-started" target="_blank" rel="noopener noreferrer">GitLab Pages official guide<OutboundLink/></a> for more details.</p>
</div>
<h2 id="google-firebase"><a class="header-anchor" href="#google-firebase">#</a> Google Firebase</h2>
<ol>
<li>
<p>Make sure you have <a href="https://www.npmjs.com/package/firebase-tools" target="_blank" rel="noopener noreferrer">firebase-tools<OutboundLink/></a> installed.</p>
</li>
<li>
<p>Create <code>firebase.json</code> and <code>.firebaserc</code> at the root of your project with the following content:</p>
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
<li>After running <code>yarn docs:build</code>, deploy using the command <code>firebase deploy</code>.</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Please refer to <a href="https://firebase.google.com/docs/cli" target="_blank" rel="noopener noreferrer">Firebase CLI official guide<OutboundLink/></a> for more details.</p>
</div>
<h2 id="heroku"><a class="header-anchor" href="#heroku">#</a> Heroku</h2>
<ol>
<li>
<p>Install <a href="https://devcenter.heroku.com/articles/heroku-cli" target="_blank" rel="noopener noreferrer">Heroku CLI<OutboundLink/></a>.</p>
</li>
<li>
<p>Create a Heroku account by <a href="https://signup.heroku.com" target="_blank" rel="noopener noreferrer">signing up<OutboundLink/></a>.</p>
</li>
<li>
<p>Run <code>heroku login</code> and fill in your Heroku credentials:</p>
</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>heroku login
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><ol start="4">
<li>Create a file called <code>static.json</code> in the root of your project with the below content:</li>
</ol>
<p><code>static.json</code>:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"root"</span><span class="token operator">:</span> <span class="token string">"./docs/.vuepress/dist"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>This is the configuration of your site; read more at <a href="https://github.com/heroku/heroku-buildpack-static" target="_blank" rel="noopener noreferrer">heroku-buildpack-static<OutboundLink/></a>.</p>
<h2 id="netlify"><a class="header-anchor" href="#netlify">#</a> Netlify</h2>
<ol>
<li>
<p>On <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">Netlify<OutboundLink/></a>, set up a new project from GitHub with the following settings:</p>
<ul>
<li><strong>Build Command:</strong> <code>yarn docs:build</code></li>
<li><strong>Publish directory:</strong> <code>docs/.vuepress/dist</code></li>
</ul>
</li>
<li>
<p>Set <a href="https://docs.netlify.com/configure-builds/environment-variables" target="_blank" rel="noopener noreferrer">Environment variables<OutboundLink/></a> to choose node version:</p>
<ul>
<li><code>NODE_VERSION</code>: 14</li>
</ul>
</li>
<li>
<p>Hit the deploy button.</p>
</li>
</ol>
<h2 id="vercel"><a class="header-anchor" href="#vercel">#</a> Vercel</h2>
<p>See <a href="https://vercel.com/guides/deploying-vuepress-to-vercel" target="_blank" rel="noopener noreferrer">Creating and Deploying a VuePress App with Vercel<OutboundLink/></a>.</p>
</template>