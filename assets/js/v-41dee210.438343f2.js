"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[919],{2121:(n,s,a)=>{a.r(s),a.d(s,{data:()=>p});const p={key:"v-41dee210",path:"/reference/plugin/plugins/request.html",title:"@fesjs/plugin-request",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"启用方式",slug:"启用方式",children:[]},{level:2,title:"配置",slug:"配置",children:[{level:3,title:"构建时配置",slug:"构建时配置",children:[]},{level:3,title:"运行时配置",slug:"运行时配置",children:[]}]},{level:2,title:"使用",slug:"使用",children:[{level:3,title:"发起一个普通 post 请求",slug:"发起一个普通-post-请求",children:[]},{level:3,title:"merge 重复请求",slug:"merge-重复请求",children:[]},{level:3,title:"请求节流(即将废弃)",slug:"请求节流-即将废弃",children:[]},{level:3,title:"请求缓存",slug:"请求缓存",children:[]},{level:3,title:"结合 use 使用",slug:"结合-use-使用",children:[]},{level:3,title:"配置拦截器",slug:"配置拦截器",children:[]}]},{level:2,title:"API",slug:"api",children:[{level:3,title:"request",slug:"request",children:[]},{level:3,title:"useRequest",slug:"userequest",children:[]}]}],filePathRelative:"reference/plugin/plugins/request.md",git:{updatedTime:1668740775e3,contributors:[{name:"听海",email:"445436867@qq.com",commits:1}]}}},2434:(n,s,a)=>{a.r(s),a.d(s,{default:()=>f});var p=a(6252);const e=(0,p.uE)('<h1 id="fesjs-plugin-request" tabindex="-1"><a class="header-anchor" href="#fesjs-plugin-request" aria-hidden="true">#</a> @fesjs/plugin-request</h1><p>基于 axios 封装的 request，内置防止重复请求、请求节流、错误处理等功能。</p><h2 id="启用方式" tabindex="-1"><a class="header-anchor" href="#启用方式" aria-hidden="true">#</a> 启用方式</h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">&quot;@fesjs/fes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;@fesjs/plugin-request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2><h3 id="构建时配置" tabindex="-1"><a class="header-anchor" href="#构建时配置" aria-hidden="true">#</a> 构建时配置</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">request</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">dataField</span><span class="token operator">:</span> <span class="token string">&#39;result&#39;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="datafield" tabindex="-1"><a class="header-anchor" href="#datafield" aria-hidden="true">#</a> dataField</h4><ul><li><p>类型： <code>string</code></p></li><li><p>默认值： <code>&#39;&#39;</code></p></li><li><p>详情：</p><p><code>dataField</code> 对应接口统一格式中的数据字段，比如接口如果统一的规范是 <code>{ success: boolean, result: any}</code> ，那么就不需要配置，这样你通过 <code>useRequest</code> 消费的时候会生成一个默认的 <code>formatResult</code>，直接返回 <code>result</code> 中的数据，方便使用。如果你的后端接口不符合这个规范，可以自行配置 <code>dataField</code>。配置为 <code>&#39;&#39;</code>（空字符串）的时候不做处理。</p></li></ul><h4 id="base-即将废弃" tabindex="-1"><a class="header-anchor" href="#base-即将废弃" aria-hidden="true">#</a> base(即将废弃)</h4><ul><li><p>类型： <code>string</code></p></li><li><p>默认值： <code>&#39;&#39;</code></p></li><li><p>详情：</p><p><code>base</code> 接口前缀。</p></li></ul>',12),t={class:"custom-container warning"},o=(0,p._)("p",{class:"custom-container-title"},"即将废弃",-1),c=(0,p.Uk)("这个字段将在下个版本废弃，推荐使用 "),l={href:"https://github.com/axios/axios",target:"_blank",rel:"noopener noreferrer"},r=(0,p.Uk)("axios baseURL"),u=(0,p.Uk)("。"),i=(0,p.uE)('<h3 id="运行时配置" tabindex="-1"><a class="header-anchor" href="#运行时配置" aria-hidden="true">#</a> 运行时配置</h3><p>在 <code>app.js</code> 中进行运行时配置。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token comment">// 格式化 response.data (只有 response.data 类型为 object 才会调用)</span>\n    <span class="token function-variable function">responseDataAdaptor</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        data<span class="token punctuation">.</span>code <span class="token operator">=</span> data<span class="token punctuation">.</span>code <span class="token operator">===</span> <span class="token string">&#39;200&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;0&#39;</span> <span class="token operator">:</span> data<span class="token punctuation">.</span>code<span class="token punctuation">;</span>\n        <span class="token keyword">return</span> data<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token comment">// 关闭 response data 校验（只判断 xhr status）</span>\n    <span class="token literal-property property">closeResDataCheck</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n    <span class="token comment">// 请求拦截器 http://axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8</span>\n    <span class="token literal-property property">requestInterceptors</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token comment">// 响应拦截器</span>\n    <span class="token literal-property property">responseInterceptors</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token comment">// 错误处理</span>\n    <span class="token comment">// 内部以 reponse.data.code === &#39;0&#39; 判断请求是否成功</span>\n    <span class="token comment">// 若使用其他字段判断，可以使用 responseDataAdaptor 对响应数据进行格式</span>\n    <span class="token literal-property property">errorHandler</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token number">11199</span><span class="token punctuation">(</span>response<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// 特殊 code 处理逻辑</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token number">404</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token keyword">default</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// 异常统一处理</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token comment">// 其他 axios 配置</span>\n    <span class="token operator">...</span>otherConfigs\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h4 id="skiperrorhandler" tabindex="-1"><a class="header-anchor" href="#skiperrorhandler" aria-hidden="true">#</a> skipErrorHandler</h4><ul><li><p>类型： <code>boolean | string | number | array&lt;string | number&gt;</code></p></li><li><p>默认值： ``</p></li><li><p>详情：</p><p>指定当前请求的某些错误状态不走 <code>errorHandler</code>，单独进行处理。如果设置为 <code>true</code>，当前请求的错误处理都不走 <code>errorHandler</code>。</p></li><li><p>示列：</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\n\n<span class="token function">request</span><span class="token punctuation">(</span><span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">skipErrorHandler</span><span class="token operator">:</span> <span class="token string">&#39;110&#39;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token comment">// do something</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token comment">// \b这里处理 code 为 110 的异常</span>\n        <span class="token comment">// 此时 errorHandler[110] 函数不会生效，也不会执行 errorHandler.default</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2><h3 id="发起一个普通-post-请求" tabindex="-1"><a class="header-anchor" href="#发起一个普通-post-请求" aria-hidden="true">#</a> 发起一个普通 post 请求</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\n\n<span class="token function">request</span><span class="token punctuation">(</span><span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;robby&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123456&#39;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token comment">// do something</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 处理异常</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="merge-重复请求" tabindex="-1"><a class="header-anchor" href="#merge-重复请求" aria-hidden="true">#</a> merge 重复请求</h3><p>连续发送多个请求，会被合并成一个请求，不会报 <code>REPEAT</code> 接口错误。</p><p>当发生 <code>REPEAT</code> 请求异常，并且确保自身代码合理的情况下，可以使用该配置。</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\n\n<span class="token function">request</span><span class="token punctuation">(</span>\n    <span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n        <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;robby&#39;</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123456&#39;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n        <span class="token literal-property property">mergeRequest</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 在一个请求没有回来前，重复发送的请求会合并成一个请求</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token comment">// do something</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 处理异常</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="请求节流-即将废弃" tabindex="-1"><a class="header-anchor" href="#请求节流-即将废弃" aria-hidden="true">#</a> 请求节流(即将废弃)</h3><div class="custom-container warning"><p class="custom-container-title">即将废弃</p><p>因为 request 的请求总会有一个 promise 结果，要么成功，要么失败，和防抖、节流的语义不一致，防抖、节流只是函数的不执行</p></div><h3 id="请求缓存" tabindex="-1"><a class="header-anchor" href="#请求缓存" aria-hidden="true">#</a> 请求缓存</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\n\n<span class="token function">request</span><span class="token punctuation">(</span>\n    <span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n        <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;robby&#39;</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123456&#39;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n        <span class="token literal-property property">cache</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">cacheType</span><span class="token operator">:</span> <span class="token string">&#39;ram&#39;</span><span class="token punctuation">,</span> <span class="token comment">// ram: 内存，session: sessionStorage，local：localStorage</span>\n            <span class="token literal-property property">cacheTime</span><span class="token operator">:</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">3</span> <span class="token comment">// 缓存时间：默认3min</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token comment">// do something</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 处理异常</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>若 <code>cache</code> 传 <code>true</code>，则默认使用 <code>ram</code> 缓存类型，缓存时间 3min。</p><h3 id="结合-use-使用" tabindex="-1"><a class="header-anchor" href="#结合-use-使用" aria-hidden="true">#</a> 结合 use 使用</h3><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useRequest <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> <span class="token punctuation">{</span> loading<span class="token punctuation">,</span> data<span class="token punctuation">,</span> error <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useRequest</span><span class="token punctuation">(</span><span class="token string">&#39;/api/login&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;robby&#39;</span><span class="token punctuation">,</span>\n            <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">&#39;123456&#39;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n        <span class="token keyword">return</span> <span class="token punctuation">{</span>\n            loading<span class="token punctuation">,</span>\n            data<span class="token punctuation">,</span>\n            error\n        <span class="token punctuation">}</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="配置拦截器" tabindex="-1"><a class="header-anchor" href="#配置拦截器" aria-hidden="true">#</a> 配置拦截器</h3>',21),k=(0,p.Uk)("函数的参数格式："),b={href:"http://axios-js.com/zh-cn/docs/#%E6%8B%A6%E6%88%AA%E5%99%A8",target:"_blank",rel:"noopener noreferrer"},d=(0,p.Uk)("传送门"),m=(0,p.Uk)(";"),h=(0,p.uE)('<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> request <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">requestInterceptors</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// 在发送请求之前做些什么</span>\n            <span class="token keyword">return</span> config<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>\n            <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token comment">// 在发送请求之前做些什么</span>\n                <span class="token keyword">return</span> config<span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token comment">// 对请求错误做些什么</span>\n                <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token comment">// 响应拦截器</span>\n    <span class="token literal-property property">responseInterceptors</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token comment">// 对响应数据做点什么</span>\n            <span class="token keyword">return</span> response<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>\n            <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token comment">// 对响应数据做点什么</span>\n                <span class="token keyword">return</span> response<span class="token punctuation">;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">,</span>\n            <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n                <span class="token comment">// 对响应错误做点什么</span>\n                <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token punctuation">}</span>\n        <span class="token punctuation">]</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2><h3 id="request" tabindex="-1"><a class="header-anchor" href="#request" aria-hidden="true">#</a> request</h3><ul><li><p><strong>类型</strong>：函数</p></li><li><p><strong>详情</strong>：请求后端接口</p></li><li><p><strong>参数</strong>：</p><ul><li>url: 后端接口 url</li><li>data: 参数</li><li>options: \b 配置（ 支持 axios 所有配置）</li></ul></li><li><p><strong>返回值</strong>: Promise</p></li></ul><h3 id="userequest" tabindex="-1"><a class="header-anchor" href="#userequest" aria-hidden="true">#</a> useRequest</h3><p>request 的封装，返回响应式 <code>loading</code>、<code>error</code>、 <code>data</code></p>',6),g={},f=(0,a(3744).Z)(g,[["render",function(n,s){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.iD)(p.HY,null,[e,(0,p._)("div",t,[o,(0,p._)("p",null,[c,(0,p._)("a",l,[r,(0,p.Wm)(a)]),u])]),i,(0,p._)("p",null,[k,(0,p._)("a",b,[d,(0,p.Wm)(a)]),m]),h],64)}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,p]of s)a[n]=p;return a}}}]);