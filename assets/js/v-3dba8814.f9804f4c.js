"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[448],{1427:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-3dba8814",path:"/guide/runtime-config.html",title:"运行时配置",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"运行时为啥需要配置？",slug:"运行时为啥需要配置",children:[]},{level:2,title:"配置项",slug:"配置项",children:[{level:3,title:"beforeRender",slug:"beforerender",children:[]},{level:3,title:"patchRoutes",slug:"patchroutes",children:[]},{level:3,title:"modifyClientRenderOpts",slug:"modifyclientrenderopts",children:[]},{level:3,title:"rootContainer",slug:"rootcontainer",children:[]},{level:3,title:"onAppCreated",slug:"onappcreated",children:[]},{level:3,title:"render",slug:"render",children:[]},{level:3,title:"onRouterCreated",slug:"onroutercreated",children:[]}]},{level:2,title:"更多配置项",slug:"更多配置项",children:[]}],filePathRelative:"guide/runtime-config.md",git:{updatedTime:1654594164e3,contributors:[{name:"harrywan",email:"445436867@qq.com",commits:1}]}}},74:(n,s,a)=>{a.r(s),a.d(s,{default:()=>t});const p=(0,a(6252).uE)('<h1 id="运行时配置" tabindex="-1"><a class="header-anchor" href="#运行时配置" aria-hidden="true">#</a> 运行时配置</h1><p>Fes.js 约定 <code>src/app.js</code> 为运行时配置文件。运行时配置和配置的区别是他跑在浏览器端，因此我们可以在这里写函数、引入浏览器端依赖项等等，注意不要引入 node 端依赖项。</p><h2 id="运行时为啥需要配置" tabindex="-1"><a class="header-anchor" href="#运行时为啥需要配置" aria-hidden="true">#</a> 运行时为啥需要配置？</h2><p>Fes.js 框架跟传统开发模式不一样。传统开发模式中用户编写 entry 文件，而 Fes.js 中 entry 文件由框架生成，用户就不必要编写胶水代码。内置插件和其他插件提供的一些运行时功能提供用户或者其他插件自定义。</p><p>例如：</p><p>plugin-acess插件定义运行时配置项：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>api<span class="token punctuation">.</span><span class="token function">addRuntimePluginKey</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&#39;access&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>plugin-acess插件读取配置项：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> runtimeConfig <span class="token operator">=</span> plugin<span class="token punctuation">.</span><span class="token function">applyPlugins</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token string">&#39;access&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">type</span><span class="token operator">:</span> ApplyPluginsType<span class="token punctuation">.</span>modify<span class="token punctuation">,</span>\n    <span class="token literal-property property">initialValue</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>而用户则只需要配置：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// app.js</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">access</span> <span class="token operator">=</span> <span class="token parameter">memo</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token operator">...</span>memo\n    <span class="token function">unAccessHandler</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>\n        router<span class="token punctuation">,</span> to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next\n    <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 处理逻辑</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">noFoundHandler</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>\n        router<span class="token punctuation">,</span> to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next\n    <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 处理逻辑</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="配置项" tabindex="-1"><a class="header-anchor" href="#配置项" aria-hidden="true">#</a> 配置项</h2><h3 id="beforerender" tabindex="-1"><a class="header-anchor" href="#beforerender" aria-hidden="true">#</a> beforeRender</h3><p>beforeRender(lastOpts)</p><p>在渲染之前执行，执行<code>action</code>过程中显示 <code>loading</code> 配置的组件，执行结果作为参数 <code>initialState</code> 传给 <code>modifyClientRenderOpts</code>。</p><p>示例：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// app.js</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> access <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> PageLoading <span class="token keyword">from</span> <span class="token string">&#39;@/components/PageLoading&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">import</span> UserCenter <span class="token keyword">from</span> <span class="token string">&#39;@/components/UserCenter&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">beforeRender</span><span class="token punctuation">(</span><span class="token parameter">lastOpts</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n        <span class="token operator">...</span>lastOpts<span class="token punctuation">,</span>\n        <span class="token literal-property property">loading</span><span class="token operator">:</span> <span class="token operator">&lt;</span>PageLoading <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>\n        <span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">const</span> <span class="token punctuation">{</span> setRole <span class="token punctuation">}</span> <span class="token operator">=</span> access<span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n                    <span class="token function">setRole</span><span class="token punctuation">(</span><span class="token string">&#39;admin&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                    <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n                        <span class="token literal-property property">userName</span><span class="token operator">:</span> <span class="token string">&#39;harrywan&#39;</span>\n                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n                <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="patchroutes" tabindex="-1"><a class="header-anchor" href="#patchroutes" aria-hidden="true">#</a> patchRoutes</h3><p>patchRoutes({routes })</p><p>修改路由。</p><p>比如在最前面添加一个 /foo 路由：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export function patchRoutes({ routes }) {\n  routes.unshift({\n    path: &#39;/foo&#39;,\n    component: require(&#39;@/extraRoutes/foo&#39;).default,\n  });\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p><p>直接修改 <code>routes</code>, 不需要返回</p></div><h3 id="modifyclientrenderopts" tabindex="-1"><a class="header-anchor" href="#modifyclientrenderopts" aria-hidden="true">#</a> modifyClientRenderOpts</h3><p>modifyClientRenderOpts(lastOpts)</p><p>修改 <code>clientRender</code> 参数。参数是一个对象：</p><ul><li>routes，路由配置信息</li><li>rootElement， 渲染的根节点，默认是 <code>#app</code>，可通过配置 <code>mountElementId</code> 修改。</li><li>initialState， 初始化数据，<code>beforeRender</code> 运行得到的数据。</li></ul><p>比如在微前端里动态修改渲染根节点：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">let</span> isSubApp <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">modifyClientRenderOpts</span><span class="token punctuation">(</span><span class="token parameter">lastOpts</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">return</span> <span class="token punctuation">{</span>\n    <span class="token operator">...</span>lastOpts<span class="token punctuation">,</span>\n    <span class="token literal-property property">rootElement</span><span class="token operator">:</span> isSubApp <span class="token operator">?</span> <span class="token string">&#39;sub-root&#39;</span> <span class="token operator">:</span> lastOpts<span class="token punctuation">.</span>rootElement<span class="token punctuation">,</span>    \n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="rootcontainer" tabindex="-1"><a class="header-anchor" href="#rootcontainer" aria-hidden="true">#</a> rootContainer</h3><p>rootContainer(LastRootContainer, args)</p><p>修改交给 Vue 渲染时的根组件，默认是 <code>&lt;RouterView&gt;&lt;/RouterView&gt;</code>。</p><ul><li>LastRootContainer，上一个插件修改后的结果。</li><li>args，包含： <ul><li>routes，全量路由配置</li><li>plugin，运行时插件机制</li></ul></li></ul><p>比如在可以包一层DIV：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">rootContainer</span><span class="token punctuation">(</span><span class="token parameter">container</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">(</span>\n            <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>\n                <span class="token operator">&lt;</span>RouterView<span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>RouterView<span class="token operator">&gt;</span>\n            <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>\n        <span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="onappcreated" tabindex="-1"><a class="header-anchor" href="#onappcreated" aria-hidden="true">#</a> onAppCreated</h3><p>onAppCreated({app})</p><p>创建 app 实例后触发。</p><p>比如用于安装 Vue 插件：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createRouter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vue-router&quot;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">onAppCreated</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> app <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">createRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>router<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="render" tabindex="-1"><a class="header-anchor" href="#render" aria-hidden="true">#</a> render</h3><p>render(oldRender: Function)</p><p>覆写 render。</p><p>比如用于渲染之前做权限校验。</p><h3 id="onroutercreated" tabindex="-1"><a class="header-anchor" href="#onroutercreated" aria-hidden="true">#</a> onRouterCreated</h3><p>onRouterCreated({router})</p><p>生成router时触发。</p><p>比如用于收集切换路由的记录：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">onRouterCreated</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> router <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    router<span class="token punctuation">.</span><span class="token function">afterEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> <span class="token keyword">from</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>to<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="更多配置项" tabindex="-1"><a class="header-anchor" href="#更多配置项" aria-hidden="true">#</a> 更多配置项</h2><p>Fes.js 允许插件注册运行时配置，如果你使用插件，肯定会在插件里找到更多运行时的配置项。</p>',51),e={},t=(0,a(3744).Z)(e,[["render",function(n,s){return p}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,p]of s)a[n]=p;return a}}}]);