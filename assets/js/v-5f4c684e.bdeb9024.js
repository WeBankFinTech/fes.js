"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[132],{8462:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-5f4c684e",path:"/reference/plugin/plugins/vuex.html",title:"@fesjs/plugin-vuex",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"介绍",slug:"介绍",children:[]},{level:2,title:"启用方式",slug:"启用方式",children:[]},{level:2,title:"配置",slug:"配置",children:[]},{level:2,title:"场景使用",slug:"场景使用",children:[]},{level:2,title:"vuex插件",slug:"vuex插件",children:[]},{level:2,title:"API",slug:"api",children:[{level:3,title:"store",slug:"store",children:[]},{level:3,title:"MUTATION_TYPES",slug:"mutation-types",children:[]},{level:3,title:"GETTER_TYPES",slug:"getter-types",children:[]},{level:3,title:"ACTION_TYPES",slug:"action-types",children:[]}]}],filePathRelative:"reference/plugin/plugins/vuex.md",git:{updatedTime:1656323604e3,contributors:[{name:"harrywan",email:"445436867@qq.com",commits:1}]}}},4565:(n,s,a)=>{a.r(s),a.d(s,{default:()=>r});var p=a(6252);const t=(0,p.uE)('<h1 id="fesjs-plugin-vuex" tabindex="-1"><a class="header-anchor" href="#fesjs-plugin-vuex" aria-hidden="true">#</a> @fesjs/plugin-vuex</h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>集成vuex插件</p><p>增强vuex，导出所有的<code>mutations</code>、<code>actions</code>和<code>getter</code>的事件类型，编辑器提示</p><p>约定模式，module和plugin定义放在stores目录下，文件名包含plugin被解析为插件，无需额外配置，定义即可用。</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>└── src\n    ├── pages\n    │    └── index.vue\n    └── stores \n    │    └── foo\n    │    │    └── bar.js\n    │    ├── counter.js\n    │    ├── plugin-logger.js       \n    │    ├── user.js\n    └── app.js\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>为了防止<code>fesjs</code>与<code>vuex</code>的export冲突，fesjs不提供导出vuex的任何api。你可以直接使用vuex的api</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></div><h2 id="启用方式" tabindex="-1"><a class="header-anchor" href="#启用方式" aria-hidden="true">#</a> 启用方式</h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">&quot;@fesjs/fes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;@fesjs/plugin-vuex&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><p>在 <code>.fes.js</code> 中配置：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">vuex</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">strict</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 开启严格模式</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="场景使用" tabindex="-1"><a class="header-anchor" href="#场景使用" aria-hidden="true">#</a> 场景使用</h2><p>先定义在stores下定义user模块，包含嵌套模块</p><p>stores/user.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">namespaced</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;aring&#39;</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">20</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">reslove</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;login&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                    <span class="token function">reslove</span><span class="token punctuation">(</span><span class="token string">&#39;OK&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n                <span class="token literal-property property">province</span><span class="token operator">:</span> <span class="token string">&#39;广东省&#39;</span><span class="token punctuation">,</span>\n                <span class="token literal-property property">city</span><span class="token operator">:</span> <span class="token string">&#39;深圳市&#39;</span><span class="token punctuation">,</span>\n                <span class="token literal-property property">zone</span><span class="token operator">:</span> <span class="token string">&#39;南山区&#39;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            <span class="token literal-property property">getters</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n                <span class="token function">address</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                    <span class="token keyword">return</span> state<span class="token punctuation">.</span>province <span class="token operator">+</span> state<span class="token punctuation">.</span>city <span class="token operator">+</span> state<span class="token punctuation">.</span>zone<span class="token punctuation">;</span>\n                <span class="token punctuation">}</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>stores/foo/bar.js</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">namespaced</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">state</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n        <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">mutations</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token function">increment</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            state<span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">getters</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token function">doubleCount</span><span class="token punctuation">(</span><span class="token parameter">state</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">return</span> state<span class="token punctuation">.</span>count <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">actions</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token function">asyncIncrement</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> commit <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                <span class="token function">commit</span><span class="token punctuation">(</span><span class="token string">&#39;increment&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>导出的<code>mutations</code>、<code>actions</code>和<code>getter</code>的事件类型，将会按文件命名；</p><p>如<code>ACTION_TYPES.user.login</code>指向user模块中actions的login方法</p><p>如<code>GETTER_TYPES.user.address</code>指向user模块中嵌套的address getter</p><p>如<code>MUTATION_TYPES.fooBar.increment</code>指向foo/bar模块中mutations的increment方法</p></div><p>在vue文件中使用store</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">&gt;</span></span>Vuex<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">:disabled</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>disabled<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>login<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>async login<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>fooBarIncrement<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>foo/bar：{{fooBarDoubleCount}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>{{address}}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>config</span><span class="token punctuation">&gt;</span></span>\n{\n    &quot;name&quot;: &quot;store&quot;,\n    &quot;title&quot;: &quot;vuex测试&quot;\n}\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>config</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> computed<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> useStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vuex&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">MUTATION_TYPES</span><span class="token punctuation">,</span> <span class="token constant">GETTER_TYPES</span><span class="token punctuation">,</span> <span class="token constant">ACTION_TYPES</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">useStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;store==&gt;&#39;</span><span class="token punctuation">,</span> store<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">const</span> disabled <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token comment">// 可以利用导出的事件类型，不再通过字符传入（store.getters[&#39;user/address&#39;]）</span>\n        <span class="token keyword">return</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">address</span><span class="token operator">:</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span>getters<span class="token punctuation">[</span><span class="token constant">GETTER_TYPES</span><span class="token punctuation">.</span>user<span class="token punctuation">.</span>address<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n            disabled<span class="token punctuation">,</span>\n            <span class="token function-variable function">login</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                disabled<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n                store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token constant">ACTION_TYPES</span><span class="token punctuation">.</span>user<span class="token punctuation">.</span>login<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                    window<span class="token punctuation">.</span><span class="token function">alert</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span>\n                    disabled<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token function-variable function">fooBarIncrement</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token constant">MUTATION_TYPES</span><span class="token punctuation">.</span>fooBar<span class="token punctuation">.</span>increment<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// foo/bar目录会解析成驼峰fooBar</span>\n            <span class="token literal-property property">fooBarDoubleCount</span><span class="token operator">:</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span>getters<span class="token punctuation">[</span><span class="token constant">GETTER_TYPES</span><span class="token punctuation">.</span>fooBar<span class="token punctuation">.</span>doubleCount<span class="token punctuation">]</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>由于该插件注册在onAppCreated中，如果在onAppCreated及之前使用useStore时，获取不到vuex实例</p><p><code>fesjs</code>导出了vuex实例<code>store</code>，如在app.js文件中</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> store<span class="token punctuation">,</span> <span class="token constant">GETTER_TYPES</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>store<span class="token punctuation">.</span>getters<span class="token punctuation">[</span><span class="token constant">GETTER_TYPES</span><span class="token punctuation">.</span>user<span class="token punctuation">.</span>address<span class="token punctuation">]</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></div><h2 id="vuex插件" tabindex="-1"><a class="header-anchor" href="#vuex插件" aria-hidden="true">#</a> vuex插件</h2>',24),e=(0,p.Uk)("stores文件夹下的文件名包含plugin被解析为插件，vuex插件写法参考"),o={href:"https://next.vuex.vuejs.org/guide/plugins.html",target:"_blank",rel:"noopener noreferrer"},c=(0,p.Uk)("官方文档"),l=(0,p.uE)('<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2><h3 id="store" tabindex="-1"><a class="header-anchor" href="#store" aria-hidden="true">#</a> store</h3><ul><li>类型 <code>Object</code></li><li>vuex实例</li></ul><h3 id="mutation-types" tabindex="-1"><a class="header-anchor" href="#mutation-types" aria-hidden="true">#</a> MUTATION_TYPES</h3><ul><li>类型 <code>Object</code></li><li>mutation的所有事件类型</li></ul><h3 id="getter-types" tabindex="-1"><a class="header-anchor" href="#getter-types" aria-hidden="true">#</a> GETTER_TYPES</h3><ul><li>类型 <code>Object</code></li><li>getter的所有方法名</li></ul><h3 id="action-types" tabindex="-1"><a class="header-anchor" href="#action-types" aria-hidden="true">#</a> ACTION_TYPES</h3><ul><li>类型 <code>Object</code></li><li>action的所有事件类型</li></ul>',9),u={},r=(0,a(3744).Z)(u,[["render",function(n,s){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.iD)(p.HY,null,[t,(0,p._)("p",null,[e,(0,p._)("a",o,[c,(0,p.Wm)(a)])]),l],64)}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,p]of s)a[n]=p;return a}}}]);