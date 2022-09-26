"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[484],{2639:(s,n,a)=>{a.r(n),a.d(n,{data:()=>p});const p={key:"v-2fe128e7",path:"/reference/plugin/plugins/access.html",title:"@fesjs/plugin-access",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"介绍",slug:"介绍",children:[{level:3,title:"资源",slug:"资源",children:[]},{level:3,title:"匹配规则",slug:"匹配规则",children:[]},{level:3,title:"角色",slug:"角色",children:[]}]},{level:2,title:"启用方式",slug:"启用方式",children:[]},{level:2,title:"编译时配置",slug:"编译时配置",children:[{level:3,title:"roles",slug:"roles",children:[]}]},{level:2,title:"运行时配置",slug:"运行时配置",children:[{level:3,title:"unAccessHandler",slug:"unaccesshandler",children:[]},{level:3,title:"noFoundHandler",slug:"nofoundhandler",children:[]}]},{level:2,title:"API",slug:"api",children:[{level:3,title:"access",slug:"access",children:[]},{level:3,title:"useAccess",slug:"useaccess",children:[]},{level:3,title:"v-access",slug:"v-access",children:[]},{level:3,title:"组件 Access",slug:"组件-access",children:[]}]}],filePathRelative:"reference/plugin/plugins/access.md",git:{updatedTime:1664185607e3,contributors:[{name:"wanchun",email:"445436867@qq.com",commits:1}]}}},5364:(s,n,a)=>{a.r(n),a.d(n,{default:()=>w});var p=a(6252);const e=(0,p.uE)('<h1 id="fesjs-plugin-access" tabindex="-1"><a class="header-anchor" href="#fesjs-plugin-access" aria-hidden="true">#</a> @fesjs/plugin-access</h1><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2><p>对于前端应用来说，权限就是页面、页面元素是否可见。</p><h3 id="资源" tabindex="-1"><a class="header-anchor" href="#资源" aria-hidden="true">#</a> 资源</h3><p>Fes.js 把页面、页面元素统一叫做资源，用资源 ID 来识别区分他们：</p><ul><li><p>页面的资源 ID 默认是页面的路由 <code>path</code> 。比如页面 <code>pages/a.vue</code> 的路由 <code>path</code> 是 <code>/a</code>。当页面访问 <code>/a</code> 时会渲染当前页面，<code>/a</code> 也就是页面的 <code>accessId</code>。</p></li><li><p>页面元素的资源 ID 没有默认值，需要自定义。</p></li></ul><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>access</span> <span class="token attr-name">:id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accessId<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> accessOnepicess1 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token punctuation">/&gt;</span></span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>access</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-access</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accessId<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> accessOnepicess2 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">accessId</span><span class="token operator">:</span> <span class="token string">&#39;accessOnepicess&#39;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="匹配规则" tabindex="-1"><a class="header-anchor" href="#匹配规则" aria-hidden="true">#</a> 匹配规则</h3><h4 id="全等匹配" tabindex="-1"><a class="header-anchor" href="#全等匹配" aria-hidden="true">#</a> 全等匹配</h4><p>资源的匹配规则默认是使用全等匹配，比如页面 <code>pages/a.vue</code> 对应路由 <code>path</code> 是 <code>/a</code>，则 <code>/a</code> 就是页面的资源ID。如果我们设置：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>access<span class="token punctuation">.</span><span class="token function">setAccess</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/a&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>由于权限列表中包含<code>/a</code>，则表示拥有此页面权限。</p><h4 id="模糊匹配" tabindex="-1"><a class="header-anchor" href="#模糊匹配" aria-hidden="true">#</a> 模糊匹配</h4><p>页面<code>@id.vue</code>会映射为动态路由<code>/:id</code>，想匹配此页面有两种办法：</p><ul><li><strong>access.setAccess([&#39;/:id&#39;])</strong></li><li><strong>access.setAccess([&#39;/*&#39;])</strong></li></ul><p>第二种是模糊匹配，<code>*</code>表示任意路径。比如角色<code>admin</code>需要全部权限，则可以：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">access</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">roles</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">admin</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;*&quot;</span><span class="token punctuation">]</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="角色" tabindex="-1"><a class="header-anchor" href="#角色" aria-hidden="true">#</a> 角色</h3><p>通常我们会用角色来控制权限，相应的Fes.js 用角色定义一组资源。当访问 Fes.js 应用时，使用插件提供的 API 设置用户的角色，角色对应的资源才可见，非角色对应的资源不可见。</p><p>当然有时候业务比较复杂，角色对应的权限是动态的。不要怕！插件提供粒度更细的 API 来设置当前用户能访问的资源。</p><h2 id="启用方式" tabindex="-1"><a class="header-anchor" href="#启用方式" aria-hidden="true">#</a> 启用方式</h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">&quot;@fesjs/fes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;@fesjs/plugin-access&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="编译时配置" tabindex="-1"><a class="header-anchor" href="#编译时配置" aria-hidden="true">#</a> 编译时配置</h2><p>在执行 <code>fes dev</code> 或者 <code>fes build</code> 时，通过此配置生成运行时的代码，在配置文件<code>.fes.js</code> 中配置：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">access</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">roles</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">admin</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/onepiece&quot;</span><span class="token punctuation">,</span> <span class="token string">&#39;/store&#39;</span><span class="token punctuation">]</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="roles" tabindex="-1"><a class="header-anchor" href="#roles" aria-hidden="true">#</a> roles</h3><ul><li><p><strong>类型</strong>：对象</p></li><li><p><strong>默认值</strong>：<code>{}</code></p></li><li><p><strong>详情</strong>：</p><p>角色预定义列表。<code>key</code> 是角色 Id ，<code>value</code>是角色 Id 对应的资源列表。</p></li></ul><h2 id="运行时配置" tabindex="-1"><a class="header-anchor" href="#运行时配置" aria-hidden="true">#</a> 运行时配置</h2><p>在 <code>app.js</code> 中配置</p><h3 id="unaccesshandler" tabindex="-1"><a class="header-anchor" href="#unaccesshandler" aria-hidden="true">#</a> unAccessHandler</h3>',31),t=(0,p.uE)("<li><p><strong>类型</strong>：<code>Function</code></p></li><li><p><strong>默认值</strong>：<code>null</code></p></li><li><p><strong>详情</strong>：</p><p>当进入某个路由时，如果路由对应的页面不属于可见资源列表，则会暂停进入，调用 <code>unAccessHandler</code> 函数。</p></li>",3),c=(0,p._)("p",null,[(0,p._)("strong",null,"参数")],-1),o=(0,p._)("li",null,"router：createRouter 创建的路由实例",-1),l=(0,p._)("li",null,"to： 准备进入的路由",-1),u=(0,p._)("li",null,"from：离开的路由",-1),i=(0,p.Uk)("next： "),r={href:"https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%8F%AF%E9%80%89%E7%9A%84%E7%AC%AC%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0-next",target:"_blank",rel:"noopener noreferrer"},k=(0,p.Uk)("next函数"),d=(0,p.uE)('<p>比如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> access <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token function">unAccessHandler</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> to<span class="token punctuation">,</span> next <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> accesssIds <span class="token operator">=</span> accessApi<span class="token punctuation">.</span><span class="token function">getAccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>path <span class="token operator">===</span> <span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            accessApi<span class="token punctuation">.</span><span class="token function">setAccess</span><span class="token punctuation">(</span>accesssIds<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>accesssIds<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;/403&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            accessApi<span class="token punctuation">.</span><span class="token function">setAccess</span><span class="token punctuation">(</span>accesssIds<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/403&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/403&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="nofoundhandler" tabindex="-1"><a class="header-anchor" href="#nofoundhandler" aria-hidden="true">#</a> noFoundHandler</h3>',3),g=(0,p.uE)("<li><p><strong>类型</strong>：<code>Function</code></p></li><li><p><strong>默认值</strong>：<code>null</code></p></li><li><p><strong>详情</strong>：</p><p>当进入某个路由时，如果路由对应的页面不存在，则会调用 <code>noFoundHandler</code> 函数。</p></li>",3),b=(0,p._)("p",null,[(0,p._)("strong",null,"参数")],-1),m=(0,p._)("li",null,"router：createRouter 创建的路由实例",-1),h=(0,p._)("li",null,"to： 准备进入的路由",-1),v=(0,p._)("li",null,"from：离开的路由",-1),f=(0,p.Uk)("next： "),y={href:"https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%8F%AF%E9%80%89%E7%9A%84%E7%AC%AC%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0-next",target:"_blank",rel:"noopener noreferrer"},j=(0,p.Uk)("next函数"),x=(0,p.uE)('<p>比如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> access <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token function">noFoundHandler</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> next <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> accesssIds <span class="token operator">=</span> accessApi<span class="token punctuation">.</span><span class="token function">getAccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>accesssIds<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            accessApi<span class="token punctuation">.</span><span class="token function">setAccess</span><span class="token punctuation">(</span>accesssIds<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2><h3 id="access" tabindex="-1"><a class="header-anchor" href="#access" aria-hidden="true">#</a> access</h3><p>插件 API 通过 <code>@fesjs/fes</code> 导出：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> access <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="access-hasaccess" tabindex="-1"><a class="header-anchor" href="#access-hasaccess" aria-hidden="true">#</a> access.hasAccess</h4><ul><li><p><strong>类型</strong>：( accessId: string | number ) =&gt; Promise&lt;boolean&gt;</p></li><li><p><strong>详情</strong>: 判断某个资源是否可见。</p></li><li><p><strong>参数</strong>：</p><ul><li>accessId，资源Id</li></ul></li><li><p><strong>返回值</strong>：是否有权限</p></li></ul><h4 id="access-isdataready" tabindex="-1"><a class="header-anchor" href="#access-isdataready" aria-hidden="true">#</a> access.isDataReady</h4><ul><li><p><strong>类型</strong>：() =&gt; boolean</p></li><li><p><strong>详情</strong>：可以用异步数据来设置权限，<code>isDataReady</code> 用来判断异步数据是否已经加载完毕。</p></li><li><p><strong>参数</strong>：null</p></li><li><p><strong>返回值</strong>：Boolean</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> access <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>access<span class="token punctuation">.</span><span class="token function">isDataReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="access-setrole" tabindex="-1"><a class="header-anchor" href="#access-setrole" aria-hidden="true">#</a> access.setRole</h4><ul><li><p><strong>类型</strong>：函数</p></li><li><p><strong>详情</strong>：设置当前的角色。</p></li><li><p><strong>参数</strong>：</p><ul><li>roleId，角色Id，有两种类型： <ul><li>String，对应着 <code>roles</code> 配置对象中的 <code>key</code>。</li><li>Promise，Promise resolve 的结果应对应着 <code>roles</code> 配置对象中的 <code>key</code>。</li></ul></li></ul></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> access <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\naccess<span class="token punctuation">.</span><span class="token function">setRole</span><span class="token punctuation">(</span><span class="token string">&#39;admin&#39;</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="access-setaccess" tabindex="-1"><a class="header-anchor" href="#access-setaccess" aria-hidden="true">#</a> access.setAccess</h4><ul><li><p><strong>类型</strong>：函数</p></li><li><p><strong>详情</strong>：设置当前的角色。</p></li><li><p><strong>参数</strong>：</p><ul><li>accessIds，资源Id数组，有两种类型： <ul><li>Array，数组项对应着 <code>roles</code> 配置对象中的 <code>key</code>。</li><li>Promise，Promise resolve 的结果应该是<code>Array&lt;accessId&gt;</code>。</li></ul></li></ul></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> access <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\naccess<span class="token punctuation">.</span><span class="token function">setAccess</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/a&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/b&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;/c&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="access-getaccess" tabindex="-1"><a class="header-anchor" href="#access-getaccess" aria-hidden="true">#</a> access.getAccess</h4><ul><li><p><strong>类型</strong>：函数</p></li><li><p><strong>详情</strong>：返回当前可见的资源列表。</p></li><li><p><strong>参数</strong>：null</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> access <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\naccess<span class="token punctuation">.</span><span class="token function">getAccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="useaccess" tabindex="-1"><a class="header-anchor" href="#useaccess" aria-hidden="true">#</a> useAccess</h3><ul><li><p><strong>类型</strong>：<a href="(https://v3.cn.vuejs.org/guide/composition-api-introduction.html)">composition</a> 函数</p></li><li><p><strong>详情</strong>：判断某个资源是否可见。</p></li><li><p><strong>参数</strong>：</p><ul><li>accessId，资源Id</li></ul></li><li><p><strong>返回值</strong>：<code>ref</code></p></li></ul><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accessOnepicess<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>accessOnepicess<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> useAccess <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">const</span> accessOnepicess <span class="token operator">=</span> <span class="token function">useAccess</span><span class="token punctuation">(</span><span class="token string">&#39;/onepiece1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> <span class="token punctuation">{</span>\n            accessOnepicess\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="v-access" tabindex="-1"><a class="header-anchor" href="#v-access" aria-hidden="true">#</a> v-access</h3><p>在指令 <code>v-access</code> 中传入 <code>accessId</code>，则当 <code>accessId</code> 拥有权限时显示DOM，当没有权限时隐藏此DOM。</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-access</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accessId<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> accessOnepicess <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">accessId</span><span class="token operator">:</span> <span class="token string">&#39;accessOnepicess&#39;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="组件-access" tabindex="-1"><a class="header-anchor" href="#组件-access" aria-hidden="true">#</a> 组件 Access</h3><p>组件 <code>Access</code> 中传入 <code>accessId</code>，则当 <code>accessId</code> 拥有权限时渲染此组件，当没有权限时隐藏此组件。</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>access</span> <span class="token attr-name">:id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>accessId<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span> accessOnepicess <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>access</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">accessId</span><span class="token operator">:</span> <span class="token string">&#39;accessOnepicess&#39;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div>',29),A={},w=(0,a(3744).Z)(A,[["render",function(s,n){const a=(0,p.up)("OutboundLink");return(0,p.wg)(),(0,p.iD)(p.HY,null,[e,(0,p._)("ul",null,[t,(0,p._)("li",null,[c,(0,p._)("ul",null,[o,l,u,(0,p._)("li",null,[i,(0,p._)("a",r,[k,(0,p.Wm)(a)])])])])]),d,(0,p._)("ul",null,[g,(0,p._)("li",null,[b,(0,p._)("ul",null,[m,h,v,(0,p._)("li",null,[f,(0,p._)("a",y,[j,(0,p.Wm)(a)])])])])]),x],64)}]])},3744:(s,n)=>{n.Z=(s,n)=>{const a=s.__vccOpts||s;for(const[s,p]of n)a[s]=p;return a}}}]);