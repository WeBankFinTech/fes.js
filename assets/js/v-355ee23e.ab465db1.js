"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[475],{1783:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-355ee23e",path:"/reference/plugin/plugins/layout.html",title:"@fesjs/plugin-layout",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"介绍",slug:"介绍",children:[]},{level:2,title:"启用方式",slug:"启用方式",children:[]},{level:2,title:"布局类型",slug:"布局类型",children:[{level:3,title:"side",slug:"side",children:[]},{level:3,title:"top",slug:"top",children:[]},{level:3,title:"mixin",slug:"mixin",children:[]},{level:3,title:"页面禁用布局",slug:"页面禁用布局",children:[]}]},{level:2,title:"keep-alive",slug:"keep-alive",children:[]},{level:2,title:"编译时配置",slug:"编译时配置",children:[{level:3,title:"footer",slug:"footer",children:[]},{level:3,title:"theme",slug:"theme",children:[]},{level:3,title:"navigation",slug:"navigation",children:[]},{level:3,title:"fixedHeader",slug:"fixedheader",children:[]},{level:3,title:"fixedSideBar",slug:"fixedsidebar",children:[]},{level:3,title:"title",slug:"title",children:[]},{level:3,title:"logo",slug:"logo",children:[]},{level:3,title:"multiTabs",slug:"multitabs",children:[]},{level:3,title:"menus",slug:"menus",children:[]},{level:3,title:"menusConfig",slug:"menusconfig",children:[]}]},{level:2,title:"运行时配置",slug:"运行时配置",children:[{level:3,title:"menus",slug:"menus-1",children:[]},{level:3,title:"header",slug:"header",children:[]},{level:3,title:"sidebar",slug:"sidebar",children:[]},{level:3,title:"logo",slug:"logo-1",children:[]},{level:3,title:"customHeader",slug:"customheader",children:[]},{level:3,title:"unAccessHandler",slug:"unaccesshandler",children:[]},{level:3,title:"noFoundHandler",slug:"nofoundhandler",children:[]},{level:3,title:"logoUrl",slug:"logourl",children:[]},{level:3,title:"其他运行时配置 (> 4.1.0)",slug:"其他运行时配置-4-1-0",children:[]}]}],filePathRelative:"reference/plugin/plugins/layout.md",git:{updatedTime:1653450562e3,contributors:[{name:"wanchun",email:"445436867@qq.com",commits:1}]}}},2891:(n,s,a)=>{a.r(s),a.d(s,{default:()=>wn});var e=a(6252);const p=(0,e._)("h1",{id:"fesjs-plugin-layout",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#fesjs-plugin-layout","aria-hidden":"true"},"#"),(0,e.Uk)(" @fesjs/plugin-layout")],-1),t=(0,e._)("h2",{id:"介绍",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#介绍","aria-hidden":"true"},"#"),(0,e.Uk)(" 介绍")],-1),l=(0,e._)("p",null,"为了进一步降低研发成本，我们尝试将布局通过 fes 插件的方式内置，只需通过简单的配置即可拥有布局，包括导航以及侧边栏。从而做到用户无需关心布局。",-1),o=(0,e.uE)("<li><p>侧边栏菜单数据根据路由中的配置自动生成。</p></li><li><p>布局，提供 <code>side</code>、 <code>top</code>、<code>mixin</code> 三种布局。</p></li><li><p>主题，提供 <code>light</code>、<code>dark</code> 两种主题。</p></li><li><p>默认实现对路由的 404、403 处理。</p></li>",4),c=(0,e.Uk)("搭配 "),r=(0,e.Uk)("@fesjs/plugin-access"),i=(0,e.Uk)(" 插件使用，可以完成对路由的权限控制。"),u=(0,e.Uk)("搭配 "),d=(0,e.Uk)("@fesjs/plugin-locale"),k=(0,e.Uk)(" 插件使用，提供切换语言的能力。"),g=(0,e._)("li",null,[(0,e._)("p",null,"支持自定义头部区域。")],-1),b=(0,e._)("li",null,[(0,e._)("p",null,"菜单支持配置icon")],-1),m=(0,e._)("li",null,[(0,e._)("p",null,"菜单标题支持国际化")],-1),h=(0,e._)("li",null,[(0,e._)("p",null,"可配置页面是否需要 layout。")],-1),f=(0,e.uE)('<h2 id="启用方式" tabindex="-1"><a class="header-anchor" href="#启用方式" aria-hidden="true">#</a> 启用方式</h2><p>在 <code>package.json</code> 中引入依赖：</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>\n    <span class="token property">&quot;dependencies&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token property">&quot;@fesjs/fes&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^2.0.0&quot;</span><span class="token punctuation">,</span>\n        <span class="token property">&quot;@fesjs/plugin-layout&quot;</span><span class="token operator">:</span> <span class="token string">&quot;^4.0.0&quot;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="布局类型" tabindex="-1"><a class="header-anchor" href="#布局类型" aria-hidden="true">#</a> 布局类型</h2><p>配置参数是 <code>navigation</code>, 布局有三种类型 <code>side</code>、<code>mixin</code> 和 <code>top</code>， 默认是 <code>side</code>：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">layout</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">navigation</span><span class="token operator">:</span> <span class="token string">&#39;side&#39;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="side" tabindex="-1"><a class="header-anchor" href="#side" aria-hidden="true">#</a> side</h3>',7),v=["src"],y=(0,e._)("h3",{id:"top",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#top","aria-hidden":"true"},"#"),(0,e.Uk)(" top")],-1),x=["src"],_=(0,e._)("h3",{id:"mixin",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#mixin","aria-hidden":"true"},"#"),(0,e.Uk)(" mixin")],-1),j=["src"],U=(0,e.uE)('<h3 id="页面禁用布局" tabindex="-1"><a class="header-anchor" href="#页面禁用布局" aria-hidden="true">#</a> 页面禁用布局</h3><p>布局是默认开启的，但是可能某些页面不需要展示布局样式，比如登录页面。我们只需要在页面的<code>.vue</code>中添加如下配置：</p><div class="language-vue ext-vue line-numbers-mode"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>config</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>json<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n{\n    &quot;layout&quot;: false\n}\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>config</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>如果只是不想展示<code>sidebar</code>，则：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;config lang=&quot;json&quot;&gt;\n{\n    &quot;layout&quot;: {\n        &quot;sidebar&quot;: false\n    }\n}\n&lt;/config&gt;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><code>layout</code>的可选配置有：</p><ul><li><p><strong>sidebar</strong>： 左侧区域，从v4.0.0开始，之前名称叫<code>side</code></p></li><li><p><strong>header</strong>： 头部区域，从v4.0.0开始，之前名称叫<code>top</code></p></li><li><p><strong>logo</strong>：logo和标题区域。</p></li></ul><h2 id="keep-alive" tabindex="-1"><a class="header-anchor" href="#keep-alive" aria-hidden="true">#</a> keep-alive</h2><p>从 4.0.7 开始支持配置路由页面缓存：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;config lang=&quot;json&quot;&gt;\n{\n    &quot;keep-alive&quot;: true\n}\n&lt;/config&gt;\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="编译时配置" tabindex="-1"><a class="header-anchor" href="#编译时配置" aria-hidden="true">#</a> 编译时配置</h2><p>在 <code>.fes.js</code> 中配置：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">layout</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 标题</span>\n        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&quot;Fes.js&quot;</span><span class="token punctuation">,</span>\n        <span class="token comment">// 底部文字</span>\n        <span class="token literal-property property">footer</span><span class="token operator">:</span> <span class="token string">&#39;Created by MumbleFE&#39;</span><span class="token punctuation">,</span>\n        <span class="token comment">// 主题light</span>\n        <span class="token literal-property property">theme</span><span class="token operator">:</span> <span class="token string">&#39;dark&#39;</span>\n        <span class="token comment">// 是否开启 tabs</span>\n        <span class="token literal-property property">multiTabs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token comment">// 布局类型</span>\n        <span class="token literal-property property">navigation</span><span class="token operator">:</span> <span class="token string">&#39;side&#39;</span><span class="token punctuation">,</span>\n        <span class="token comment">// 是否固定头部</span>\n        <span class="token literal-property property">fixedHeader</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token comment">// 是否固定sidebar</span>\n        <span class="token literal-property property">fixedSideBar</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        <span class="token comment">// sidebar的宽度</span>\n        <span class="token literal-property property">sideWidth</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">menus</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;index&#39;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;onepiece&#39;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;store&#39;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;simpleList&#39;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">menuConfig</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token literal-property property">defaultExpandAll</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n            <span class="token literal-property property">expandedKeys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n            <span class="token literal-property property">accordion</span><span class="token operator">:</span> <span class="token boolean">false</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h3 id="footer" tabindex="-1"><a class="header-anchor" href="#footer" aria-hidden="true">#</a> footer</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：<code>null</code></p></li><li><p><strong>详情</strong>：页面底部的文字。</p></li></ul><h3 id="theme" tabindex="-1"><a class="header-anchor" href="#theme" aria-hidden="true">#</a> theme</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：<code>dark</code></p></li><li><p><strong>详情</strong>：主题，可选有 <code>dark</code>、<code>light</code></p></li></ul><h3 id="navigation" tabindex="-1"><a class="header-anchor" href="#navigation" aria-hidden="true">#</a> navigation</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：<code>side</code></p></li><li><p><strong>详情</strong>：页面布局类型，可选有 <code>side</code>、 <code>top</code>、 <code>mixin</code></p></li></ul><h3 id="fixedheader" tabindex="-1"><a class="header-anchor" href="#fixedheader" aria-hidden="true">#</a> fixedHeader</h3><ul><li><p><strong>类型</strong>：<code>Boolean</code></p></li><li><p><strong>默认值</strong>：<code>false</code></p></li><li><p><strong>详情</strong>：是否固定头部，不跟随页面滚动。</p></li></ul><h3 id="fixedsidebar" tabindex="-1"><a class="header-anchor" href="#fixedsidebar" aria-hidden="true">#</a> fixedSideBar</h3><ul><li><p><strong>类型</strong>：<code>Boolean</code></p></li><li><p><strong>默认值</strong>：<code>true</code></p></li><li><p><strong>详情</strong>：是否固定sidebar，不跟随页面滚动。</p></li></ul><h3 id="title" tabindex="-1"><a class="header-anchor" href="#title" aria-hidden="true">#</a> title</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：<code>name</code> in package.json</p></li><li><p><strong>详情</strong>：产品名，会显示在 Logo 旁边。</p></li></ul><h3 id="logo" tabindex="-1"><a class="header-anchor" href="#logo" aria-hidden="true">#</a> logo</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：默认提供 fes.js 的 Logo</p></li><li><p><strong>详情</strong>：Logo的链接</p></li></ul><h3 id="multitabs" tabindex="-1"><a class="header-anchor" href="#multitabs" aria-hidden="true">#</a> multiTabs</h3><ul><li><p><strong>类型</strong>：<code>boolean</code></p></li><li><p><strong>默认值</strong>：<code>false</code></p></li><li><p><strong>详情</strong>：是否开启多页。</p></li></ul><h3 id="menus" tabindex="-1"><a class="header-anchor" href="#menus" aria-hidden="true">#</a> menus</h3>',30),w=(0,e._)("li",null,[(0,e._)("p",null,[(0,e._)("strong",null,"类型"),(0,e.Uk)("："),(0,e._)("code",null,"Array")])],-1),E=(0,e._)("li",null,[(0,e._)("p",null,[(0,e._)("strong",null,"默认值"),(0,e.Uk)("："),(0,e._)("code",null,"[]")])],-1),A=(0,e._)("p",null,[(0,e._)("strong",null,"详情"),(0,e.Uk)("：菜单配置，子项具体配置如下：")],-1),q=(0,e._)("strong",null,"name",-1),C=(0,e.Uk)("：菜单的名称。通过匹配 "),B=(0,e._)("code",null,"name",-1),F=(0,e.Uk)(" 和路由元信息 "),H=(0,e.Uk)("meta"),S=(0,e.Uk)(" 中的 "),R=(0,e._)("code",null,"name",-1),L=(0,e.Uk)("，把菜单和路由关联起来，\b然后使用路由元信息补充菜单配置，比如 "),W=(0,e._)("code",null,"title",-1),I=(0,e.Uk)("、"),O=(0,e._)("code",null,"path",-1),$=(0,e.Uk)(" \b等。"),z=(0,e._)("li",null,[(0,e._)("p",null,[(0,e._)("strong",null,"path"),(0,e.Uk)("：菜单的路径，可配置第三方地址。")])],-1),M=(0,e._)("li",null,[(0,e._)("p",null,[(0,e._)("strong",null,"match"),(0,e.Uk)("：额外匹配的路径，当前路由命中匹配规则时，此菜单高亮。 (v4.0.0+）")])],-1),T=(0,e.uE)('<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{\n    path: &#39;/product&#39;,\n    match: [&#39;/product/*&#39;, &#39;/product/create&#39;]\n}\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>',1),D=(0,e._)("strong",null,"title",-1),K=(0,e.Uk)("：菜单的标题，如果同时使用"),N=(0,e.Uk)("国际化插件"),Z=(0,e.Uk)("，而且"),P=(0,e._)("code",null,"title",-1),V=(0,e.Uk)("的值以"),Y=(0,e._)("code",null,"$",-1),G=(0,e.Uk)("开头，则使用"),J=(0,e._)("code",null,"$",-1),Q=(0,e.Uk)("后面的内容去匹配语言设置。"),X=(0,e._)("p",null,[(0,e._)("strong",null,"icon"),(0,e.Uk)(": 菜单的图标，只有一级标题展示图标。")],-1),nn=(0,e.Uk)("图标使用"),sn={href:"https://fes-design-4gvn317r3b6bfe17-1254145788.ap-shanghai.app.tcloudbase.com/zh/components/icon.html",target:"_blank",rel:"noopener noreferrer"},an=(0,e.Uk)("fes-design icon"),en=(0,e.Uk)("，在这里使用组件名称。"),pn=(0,e.uE)('<div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;AppstoreOutlined&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><pre><code>- 图标使用本地或者远程svg图片。\n</code></pre><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n    <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token string">&quot;/wine-outline.svg&quot;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li><strong>children</strong>：子菜单配置。</li></ul><h3 id="menusconfig" tabindex="-1"><a class="header-anchor" href="#menusconfig" aria-hidden="true">#</a> menusConfig</h3><ul><li><p><strong>类型</strong>：<code>Object</code></p></li><li><p><strong>默认值</strong>：<code>{}</code></p></li><li><p><strong>详情</strong>：菜单的配置：</p><ul><li><p><strong>defaultExpandAll</strong>：是否默认展开全部菜单。</p></li><li><p><strong>expandedKeys</strong>：配置默认展开的菜单，需要传子项是菜单路径的数组。</p></li><li><p><strong>accordion</strong>：是否只保持一个子菜单的展开。</p></li></ul></li></ul><h2 id="运行时配置" tabindex="-1"><a class="header-anchor" href="#运行时配置" aria-hidden="true">#</a> 运行时配置</h2><p>在 <code>app.js</code> 中配置：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> UserCenter <span class="token keyword">from</span> <span class="token string">&#39;@/components/UserCenter&#39;</span><span class="token punctuation">;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> layout <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">customHeader</span><span class="token operator">:</span> <span class="token operator">&lt;</span>UserCenter <span class="token operator">/</span><span class="token operator">&gt;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="menus-1" tabindex="-1"><a class="header-anchor" href="#menus-1" aria-hidden="true">#</a> menus</h3><ul><li><p><strong>类型</strong>：<code>(defaultMenus: [] )=&gt; Ref | []</code></p></li><li><p><strong>详情</strong>：运行时修改菜单，入参是默认菜单配置（.fes.js中的menu配置），需要返回一个<code>Ref</code>或者数组。</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> ClusterOutlined <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@fesjs/fes-design/icon&#39;</span>\n<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">layout</span> <span class="token operator">=</span> <span class="token parameter">layoutConfig</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    <span class="token operator">...</span>layoutConfig<span class="token punctuation">,</span>\n    <span class="token literal-property property">customHeader</span><span class="token operator">:</span> <span class="token operator">&lt;</span>UserCenter <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>\n    <span class="token function-variable function">menus</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">defaultMenuData</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> menusRef <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>defaultMenuData<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token function">watch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> layoutConfig<span class="token punctuation">.</span>initialState<span class="token punctuation">.</span>userName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n            menusRef<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">{</span>\n                <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;store&#39;</span><span class="token punctuation">,</span>\n                <span class="token literal-property property">icon</span><span class="token operator">:</span> <span class="token operator">&lt;</span>ClusterOutlined <span class="token operator">/</span><span class="token operator">&gt;</span>\n            <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">return</span> menusRef<span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><code>layoutConfig.initialState</code> 是 <code>beforeRender.action</code>执行后创建的应用初始状态数据。</p><p>如果菜单需要根据某些状态动态改变，则返回<code>Ref</code>，否则只需要返回数组。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>在运行时配置菜单中的icon，需要传组件本身，而不是组件的名称。</p></div><h3 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> header</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：<code>true</code></p></li><li><p><strong>详情</strong>：是否显示 header 区域。</p></li></ul><h3 id="sidebar" tabindex="-1"><a class="header-anchor" href="#sidebar" aria-hidden="true">#</a> sidebar</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：<code>true</code></p></li><li><p><strong>详情</strong>：是否显示 sidebar 区域。</p></li></ul><h3 id="logo-1" tabindex="-1"><a class="header-anchor" href="#logo-1" aria-hidden="true">#</a> logo</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：<code>true</code></p></li><li><p><strong>详情</strong>：是否显示 logo 区域。</p></li></ul><h3 id="customheader" tabindex="-1"><a class="header-anchor" href="#customheader" aria-hidden="true">#</a> customHeader</h3><ul><li><p><strong>类型</strong>：Vue Component</p></li><li><p><strong>默认值</strong>：<code>null</code></p></li><li><p><strong>详情</strong>：top的区域部分位置提供组件自定义功能。</p></li></ul><h3 id="unaccesshandler" tabindex="-1"><a class="header-anchor" href="#unaccesshandler" aria-hidden="true">#</a> unAccessHandler</h3>',24),tn=(0,e.uE)("<li><p><strong>类型</strong>：<code>Function</code></p></li><li><p><strong>默认值</strong>：<code>null</code></p></li><li><p><strong>详情</strong>：</p><p>当进入某个路由时，如果路由对应的页面不属于可见资源列表，则会暂停进入，调用 <code>unAccessHandler</code> 函数。</p></li>",3),ln=(0,e._)("p",null,[(0,e._)("strong",null,"参数")],-1),on=(0,e._)("li",null,"router：createRouter 创建的路由实例",-1),cn=(0,e._)("li",null,"to： 准备进入的路由",-1),rn=(0,e._)("li",null,"from：离开的路由",-1),un=(0,e.Uk)("next： "),dn={href:"https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%8F%AF%E9%80%89%E7%9A%84%E7%AC%AC%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0-next",target:"_blank",rel:"noopener noreferrer"},kn=(0,e.Uk)("next函数"),gn=(0,e.uE)('<p>比如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> access <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token function">unAccessHandler</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> to<span class="token punctuation">,</span> next <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> accesssIds <span class="token operator">=</span> accessApi<span class="token punctuation">.</span><span class="token function">getAccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>path <span class="token operator">===</span> <span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            accessApi<span class="token punctuation">.</span><span class="token function">setAccess</span><span class="token punctuation">(</span>accesssIds<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n            <span class="token keyword">return</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>accesssIds<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;/403&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            accessApi<span class="token punctuation">.</span><span class="token function">setAccess</span><span class="token punctuation">(</span>accesssIds<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/403&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/403&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="nofoundhandler" tabindex="-1"><a class="header-anchor" href="#nofoundhandler" aria-hidden="true">#</a> noFoundHandler</h3>',3),bn=(0,e.uE)("<li><p><strong>类型</strong>：函数</p></li><li><p><strong>默认值</strong>：null</p></li><li><p><strong>详情</strong>：</p><p>当进入某个路由时，如果路由对应的页面不存在，则会调用 <code>noFoundHandler</code> 函数。</p></li>",3),mn=(0,e._)("p",null,[(0,e._)("strong",null,"参数")],-1),hn=(0,e._)("li",null,"router：createRouter 创建的路由实例",-1),fn=(0,e._)("li",null,"to： 准备进入的路由",-1),vn=(0,e._)("li",null,"from：离开的路由",-1),yn=(0,e.Uk)("next： "),xn={href:"https://next.router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%8F%AF%E9%80%89%E7%9A%84%E7%AC%AC%E4%B8%89%E4%B8%AA%E5%8F%82%E6%95%B0-next",target:"_blank",rel:"noopener noreferrer"},_n=(0,e.Uk)("next函数"),jn=(0,e.uE)('<p>比如：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> access <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token function">noFoundHandler</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> next <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">const</span> accesssIds <span class="token operator">=</span> accessApi<span class="token punctuation">.</span><span class="token function">getAccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>accesssIds<span class="token punctuation">.</span><span class="token function">includes</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            accessApi<span class="token punctuation">.</span><span class="token function">setAccess</span><span class="token punctuation">(</span>accesssIds<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n        <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&#39;/404&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="logourl" tabindex="-1"><a class="header-anchor" href="#logourl" aria-hidden="true">#</a> logoUrl</h3><ul><li><p><strong>类型</strong>：<code>String</code></p></li><li><p><strong>默认值</strong>：默认提供 fes.js 的 Logo</p></li><li><p><strong>详情</strong>：Logo的链接。</p></li></ul><h3 id="其他运行时配置-4-1-0" tabindex="-1"><a class="header-anchor" href="#其他运行时配置-4-1-0" aria-hidden="true">#</a> 其他运行时配置 (&gt; 4.1.0)</h3><p>编译时配置的内容同样支持在运行时配置，但是<code>logo</code>除外，用<code>logoUrl</code>替代。</p>',6),Un={},wn=(0,a(3744).Z)(Un,[["render",function(n,s){const a=(0,e.up)("RouterLink"),Un=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[p,t,l,(0,e._)("ul",null,[o,(0,e._)("li",null,[(0,e._)("p",null,[c,(0,e.Wm)(a,{to:"/reference/plugin/plugins/access.html"},{default:(0,e.w5)((()=>[r])),_:1}),i])]),(0,e._)("li",null,[(0,e._)("p",null,[u,(0,e.Wm)(a,{to:"/reference/plugin/plugins/locale.html"},{default:(0,e.w5)((()=>[d])),_:1}),k])]),g,b,m,h]),f,(0,e._)("img",{src:n.$withBase("side.png"),alt:"side"},null,8,v),y,(0,e._)("img",{src:n.$withBase("top.png"),alt:"top"},null,8,x),_,(0,e._)("img",{src:n.$withBase("mixin.png"),alt:"mixin"},null,8,j),U,(0,e._)("ul",null,[w,E,(0,e._)("li",null,[A,(0,e._)("ul",null,[(0,e._)("li",null,[(0,e._)("p",null,[q,C,B,F,(0,e.Wm)(a,{to:"/guide/route.html#%E6%89%A9%E5%B1%95%E8%B7%AF%E7%94%B1%E5%85%83%E4%BF%A1%E6%81%AF"},{default:(0,e.w5)((()=>[H])),_:1}),S,R,L,W,I,O,$])]),z,M])])]),T,(0,e._)("ul",null,[(0,e._)("li",null,[(0,e._)("p",null,[D,K,(0,e.Wm)(a,{to:"/reference/plugin/plugins/locale.html"},{default:(0,e.w5)((()=>[N])),_:1}),Z,P,V,Y,G,J,Q])]),(0,e._)("li",null,[X,(0,e._)("ul",null,[(0,e._)("li",null,[nn,(0,e._)("a",sn,[an,(0,e.Wm)(Un)]),en])])])]),pn,(0,e._)("ul",null,[tn,(0,e._)("li",null,[ln,(0,e._)("ul",null,[on,cn,rn,(0,e._)("li",null,[un,(0,e._)("a",dn,[kn,(0,e.Wm)(Un)])])])])]),gn,(0,e._)("ul",null,[bn,(0,e._)("li",null,[mn,(0,e._)("ul",null,[hn,fn,vn,(0,e._)("li",null,[yn,(0,e._)("a",xn,[_n,(0,e.Wm)(Un)])])])])]),jn],64)}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);