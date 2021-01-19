<template><h1 id="markdown-与-vue-sfc"><a class="header-anchor" href="#markdown-与-vue-sfc">#</a> Markdown 与 Vue SFC</h1>
<p>每一个 Markdown 文件，首先都会编译为 HTML ，然后转换为一个 Vue 单文件组件 (SFC) 。换句话说，你可以把 Markdown 作为 Vue SFC 来看待：</p>
<ul>
<li><code>&lt;script&gt;</code> 和 <code>&lt;style&gt;</code> 标签会直接被当作 Vue SFC 中的标签。换句话说，它们是从 <code>&lt;template&gt;</code> 标签中提升到了 SFC 的顶层。</li>
<li>所有 <code>&lt;script&gt;</code> 和 <code>&lt;style&gt;</code> 标签的以外的内容，会先被编译为 HTML ，然后被当作 Vue SFC 的 <code>&lt;template&gt;</code> 标签。</li>
</ul>
<p>我们来看一个例子：</p>
<p><strong>输入</strong></p>
<div class="language-markup ext-vue line-numbers-mode"><pre v-pre class="language-markup"><code>_你好， {{ msg }}_

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>RedDiv</span><span class="token punctuation">></span></span>

_当前计数为： {{ count }}_

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>RedDiv</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>count++<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>点我！<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> <span class="token punctuation">{</span> h<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span>

<span class="token keyword">const</span> <span class="token function-variable function">RedDiv</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> ctx</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">h</span><span class="token punctuation">(</span>
  <span class="token string">'div'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">class</span><span class="token operator">:</span> <span class="token string">'red-div'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  ctx<span class="token punctuation">.</span>slots<span class="token punctuation">.</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  components<span class="token operator">:</span> <span class="token punctuation">{</span>
    RedDiv<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token string">'Markdown 中的 Vue'</span>
    <span class="token keyword">const</span> count <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      msg<span class="token punctuation">,</span>
      count<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
<span class="token selector">.red-div</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p><strong>输出</strong></p>
<p><em>你好， {{ msg }}</em></p>
<RedDiv>
<p><em>当前计数为： {{ count }}</em></p>
</RedDiv>
<p><button @click="count++">点我！</button></p>
</template>

<script>
import { h, ref } from 'vue'

const RedDiv = (_, ctx) => h(
  'div',
  {
    class: 'red-div',
  },
  ctx.slots.default()
)

export default {
  components: {
    RedDiv,
  },

  setup() {
    const msg = 'Markdown 中的 Vue'
    const count = ref(0)

    return {
      msg,
      count,
    }
  }
}
</script>


<style>
.red-div {
  color: red;
}
</style>
