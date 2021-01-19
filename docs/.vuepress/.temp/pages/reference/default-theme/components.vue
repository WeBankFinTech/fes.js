<template><h1 id="built-in-components"><a class="header-anchor" href="#built-in-components">#</a> Built-in Components</h1>
<h2 id="badge"><a class="header-anchor" href="#badge">#</a> Badge <Badge text="badge" /></h2>
<ul>
<li>
<p>Props:</p>
<ul>
<li>type
<ul>
<li>Type: <code>'tip' | 'warning' | 'danger'</code></li>
<li>Default: <code>'tip'</code></li>
</ul>
</li>
<li>text
<ul>
<li>Type: <code>string</code></li>
<li>Default: <code>''</code></li>
</ul>
</li>
<li>vertical
<ul>
<li>Type: <code>'top' | 'middle' | 'bottom' | undefined</code></li>
<li>Default: <code>undefined</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token list punctuation">-</span> VuePress - <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>tip<span class="token punctuation">"</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>v2<span class="token punctuation">"</span></span> <span class="token attr-name">vertical</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>top<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token list punctuation">-</span> VuePress - <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>warning<span class="token punctuation">"</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>v2<span class="token punctuation">"</span></span> <span class="token attr-name">vertical</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>middle<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
<span class="token list punctuation">-</span> VuePress - <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Badge</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>danger<span class="token punctuation">"</span></span> <span class="token attr-name">text</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>v2<span class="token punctuation">"</span></span> <span class="token attr-name">vertical</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>bottom<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>Output</strong></p>
<ul>
<li>VuePress - <Badge type="tip" text="v2" vertical="top" /></li>
<li>VuePress - <Badge type="warning" text="v2" vertical="middle" /></li>
<li>VuePress - <Badge type="danger" text="v2" vertical="bottom" /></li>
</ul>
<h2 id="codegroup"><a class="header-anchor" href="#codegroup">#</a> CodeGroup</h2>
<ul>
<li>
<p>Details:</p>
<p>Wrapper of the <a href="#codegroupitem">CodeGroupItem</a> components.</p>
</li>
</ul>
<h2 id="codegroupitem"><a class="header-anchor" href="#codegroupitem">#</a> CodeGroupItem</h2>
<ul>
<li>
<p>Props:</p>
<ul>
<li>title
<ul>
<li>Type: <code>string</code></li>
<li>Required: <code>true</code></li>
</ul>
</li>
<li>active
<ul>
<li>Type: <code>boolean</code></li>
<li>Default: <code>false</code></li>
</ul>
</li>
</ul>
</li>
<li>
<p>Details:</p>
<p>This component must be placed inside a <a href="#codegroup">CodeGroup</a> component.</p>
<p>Use the <code>active</code> prop to set the initial active item, or the first item will be activated by default.</p>
</li>
<li>
<p>Example:</p>
</li>
</ul>
<p><strong>Input</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CodeGroup</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CodeGroupItem</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>YARN<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token code"><span class="token punctuation">```</span><span class="token code-language">bash:no-line-numbers</span>
<span class="token code-block language-bash"><span class="token function">yarn</span></span>
<span class="token punctuation">```</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CodeGroupItem</span><span class="token punctuation">></span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>CodeGroupItem</span> <span class="token attr-name">title</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>NPM<span class="token punctuation">"</span></span> <span class="token attr-name">active</span><span class="token punctuation">></span></span>

<span class="token code"><span class="token punctuation">```</span><span class="token code-language">bash:no-line-numbers</span>
<span class="token code-block language-bash"><span class="token function">npm</span> <span class="token function">install</span></span>
<span class="token punctuation">```</span></span>

  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CodeGroupItem</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>CodeGroup</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>Output</strong></p>
<CodeGroup>
  <CodeGroupItem title="YARN">
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token function">yarn</span>
</code></pre></div>  </CodeGroupItem>
  <CodeGroupItem title="NPM" active>
<div class="language-bash ext-sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span>
</code></pre></div>  </CodeGroupItem>
</CodeGroup>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>You must add an empty line between the starting tag of <code>&lt;CodeGroupItem&gt;</code> and the code fence, otherwise the code fence will not be parsed correctly by Markdown.</p>
<p>All content must be valid Markdown first, and then a Vue SFC.</p>
<p>Learn more: <RouterLink to="/guide/advanced/markdown.html">Advanced &gt; Markdown and Vue SFC</RouterLink></p>
<p>Alternatively, you can use the <RouterLink to="/reference/default-theme/markdown.html#custom-containers">custom containers</RouterLink>.</p>
</div>
</template>