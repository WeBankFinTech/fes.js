<template><h1 id="markdown"><a class="header-anchor" href="#markdown">#</a> Markdown</h1>
<h2 id="自定义容器"><a class="header-anchor" href="#自定义容器">#</a> 自定义容器</h2>
<ul>
<li>
<p>使用：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>::: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">></span></span> [title]
[content]
:::
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>type</code> 是必需的， <code>title</code> 和 <code>content</code> 是可选的。</p>
<p>支持的 <code>type</code> 有：</p>
<ul>
<li><code>tip</code></li>
<li><code>warning</code></li>
<li><code>danger</code></li>
<li><code>details</code></li>
<li><RouterLink to="/zh/reference/default-theme/components.html#codegroup">CodeGroup</RouterLink> 和 <RouterLink to="/zh/reference/default-theme/components.html#codegroupitem">CodeGroupItem</RouterLink> 的别名：
<ul>
<li><code>code-group</code></li>
<li><code>code-group-item</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p>示例 1 （默认标题）：</p>
</li>
</ul>
<p><strong>输入</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签，在 IE / Edge 中不生效
:::
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>输出</strong></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>这是一个提示</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>这是一个警告</p>
</div>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>这是一个危险警告</p>
</div>
<details class="custom-container details">
<p>这是一个 details 标签，在 IE / Edge 中不生效</p>
</details>
<ul>
<li>示例 2 （自定义标题）：</li>
</ul>
<p><strong>输入</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
<span class="token code"><span class="token punctuation">```</span><span class="token code-language">js</span>
<span class="token code-block language-js">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'你好，VuePress！'</span><span class="token punctuation">)</span></span>
<span class="token punctuation">```</span></span>
:::
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>输出</strong></p>
<div class="custom-container danger"><p class="custom-container-title">STOP</p>
<p>危险区域，禁止通行</p>
</div>
<details class="custom-container details"><summary>点击查看代码</summary>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'你好，VuePress！'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></details>
<ul>
<li>示例 3 （Code Group 别名）：</li>
</ul>
<p><strong>输入</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>:::: code-group
::: code-group-item FOO
<span class="token code"><span class="token punctuation">```</span><span class="token code-language">js</span>
<span class="token code-block language-js"><span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token string">'foo'</span></span>
<span class="token punctuation">```</span></span>
:::
::: code-group-item BAR
<span class="token code"><span class="token punctuation">```</span><span class="token code-language">js</span>
<span class="token code-block language-js"><span class="token keyword">const</span> bar <span class="token operator">=</span> <span class="token string">'bar'</span></span>
<span class="token punctuation">```</span></span>
:::
::::
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>输出</strong></p>
<CodeGroup>
<CodeGroupItem title="FOO">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> foo <span class="token operator">=</span> <span class="token string">'foo'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="BAR">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> bar <span class="token operator">=</span> <span class="token string">'bar'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></CodeGroupItem>
</CodeGroup>
</template>