"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[507],{494:(s,e,n)=>{n.r(e),n.d(e,{data:()=>a});const a={key:"v-1d14d5cc",path:"/guide/plugin.html",title:"插件",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"插件的 id 和 key",slug:"插件的-id-和-key",children:[]},{level:2,title:"启动插件",slug:"启动插件",children:[{level:3,title:"package.json 依赖",slug:"package-json-依赖",children:[]},{level:3,title:"配置",slug:"配置",children:[]},{level:3,title:"环境变量",slug:"环境变量",children:[]}]},{level:2,title:"禁用插件",slug:"禁用插件",children:[]},{level:2,title:"配置插件",slug:"配置插件",children:[]}],filePathRelative:"guide/plugin.md",git:{updatedTime:1655278609e3,contributors:[{name:"wanchun",email:"445436867@qq.com",commits:1}]}}},9959:(s,e,n)=>{n.r(e),n.d(e,{default:()=>o});const a=(0,n(6252).uE)('<h1 id="插件" tabindex="-1"><a class="header-anchor" href="#插件" aria-hidden="true">#</a> 插件</h1><h2 id="插件的-id-和-key" tabindex="-1"><a class="header-anchor" href="#插件的-id-和-key" aria-hidden="true">#</a> 插件的 id 和 key</h2><p>每个插件都会对应一个 <code>id</code> 和一个 <code>key</code>，<strong><code>id</code> 是路径的简写，<code>key</code> 是进一步简化后用于配置的唯一值</strong>。</p><p>比如插件 <code>/node_modules/@fesjs/plugin-foo/index.js</code>，通常来说，其 <code>id</code> 为 <code>@fesjs/plugin-foo</code>，<code>key</code> 为 <code>foo</code>。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>id 一般用不上，对于普通开发者 key 用来配置插件，而插件开发者可以使用 key 判断是否安装某个插件。</p></div><h2 id="启动插件" tabindex="-1"><a class="header-anchor" href="#启动插件" aria-hidden="true">#</a> 启动插件</h2><p>有多种方式引入插件</p><h3 id="package-json-依赖" tabindex="-1"><a class="header-anchor" href="#package-json-依赖" aria-hidden="true">#</a> package.json 依赖</h3><p>Fes.js 会自动检测 <code>dependencies</code> 和 <code>devDependencies</code> 里的 fes 插件，比如：</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n  <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n    <span class="token property">&quot;@fesjs/plugin-request&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>那么 <code>@fesjs/plugin-request</code> 会自动被注册，无需在配置里重复声明。</p><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3><p>在配置里可通过 <code>presets</code> 和 <code>plugins</code> 配置插件，比如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;./preset&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;foo/presets&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;./plugin&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>通常用于几种情况：</p><ol><li>项目相对路径的插件</li><li>非 npm 包入口文件的插件</li></ol><div class="custom-container warning"><p class="custom-container-title">注意</p><p>请不要配置 npm 包的插件，否则会报重复注册的错误</p></div><h3 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h3><p>还可通过环境变量 <code>FES_PRESETS</code> 和 <code>FES_PLUGINS</code> 注册额外插件。</p><p>比如：</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">FES_PRESETS</span><span class="token operator">=</span>/a/b/preset.js fes dev\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="禁用插件" tabindex="-1"><a class="header-anchor" href="#禁用插件" aria-hidden="true">#</a> 禁用插件</h2><p>通过配置插件的 <code>key</code> 为 <code>false</code>，比如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">mock</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Mock 插件的 <code>key</code> 是 <code>mock</code>，我们在配置文件中配置 <code>mock</code> 为 <code>false</code>，则会禁用 Mock 插件及其功能。</p><h2 id="配置插件" tabindex="-1"><a class="header-anchor" href="#配置插件" aria-hidden="true">#</a> 配置插件</h2><p>通过插件的 <code>key</code> 来配置插件，比如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">mock</span><span class="token operator">:</span> <span class="token punctuation">{</span> \n        <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">&#39;/v2&#39;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>这里的 <code>mock</code> 是 Mock插件 的 key。</p>',29),p={},o=(0,n(3744).Z)(p,[["render",function(s,e){return a}]])},3744:(s,e)=>{e.Z=(s,e)=>{const n=s.__vccOpts||s;for(const[s,a]of e)n[s]=a;return n}}}]);