<template><h3 id="as-easy-as-1-2-3"><a class="header-anchor" href="#as-easy-as-1-2-3">#</a> As Easy as 1, 2, 3</h3>
<CodeGroup>
  <CodeGroupItem title="YARN" active>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># install in your project</span>
<span class="token function">yarn</span> <span class="token function">add</span> -D vuepress@next

<span class="token comment"># create a markdown file</span>
<span class="token builtin class-name">echo</span> <span class="token string">'# Hello VuePress'</span> <span class="token operator">></span> README.md

<span class="token comment"># start writing</span>
<span class="token function">yarn</span> vuepress dev

<span class="token comment"># build to static files</span>
<span class="token function">yarn</span> vuepress build
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>  </CodeGroupItem>
  <CodeGroupItem title="NPM">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># install in your project</span>
<span class="token function">npm</span> <span class="token function">install</span> -D vuepress@next

<span class="token comment"># create a markdown file</span>
<span class="token builtin class-name">echo</span> <span class="token string">'# Hello VuePress'</span> <span class="token operator">></span> README.md

<span class="token comment"># start writing</span>
npx vuepress dev

<span class="token comment"># build to static files</span>
npx vuepress build
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>  </CodeGroupItem>
</CodeGroup>
</template>