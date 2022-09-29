"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[938],{1362:(n,a,s)=>{s.r(a),s.d(a,{data:()=>t});const t={key:"v-7b48519a",path:"/guide/template.html",title:"HTML 模板",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"自定义模板",slug:"自定义模板",children:[]},{level:2,title:"模板配置",slug:"模板配置",children:[]},{level:2,title:"模板变量",slug:"模板变量",children:[]}],filePathRelative:"guide/template.md",git:{updatedTime:1664436338e3,contributors:[{name:"winixt",email:"haizekuo@gmail.com",commits:1}]}}},5213:(n,a,s)=>{s.r(a),s.d(a,{default:()=>w});var t=s(6252);const p=(0,t._)("h1",{id:"html-模板",tabindex:"-1"},[(0,t._)("a",{class:"header-anchor",href:"#html-模板","aria-hidden":"true"},"#"),(0,t.Uk)(" HTML 模板")],-1),e=(0,t.Uk)("Fes.js 基于 "),l={href:"https://github.com/jantimon/html-webpack-plugin",target:"_blank",rel:"noopener noreferrer"},o=(0,t.Uk)("html-webpack-plugin"),c=(0,t.Uk)(" 实现的模板功能，默认模板内容是："),u=(0,t.uE)('<div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>utf-8<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>X-UA-Compatible<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>IE=edge<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>viewport<span class="token punctuation">&quot;</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>width=device-width,initial-scale=1.0<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">&gt;</span></span>&lt;%= htmlWebpackPlugin.options.title %&gt;<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>app<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="自定义模板" tabindex="-1"><a class="header-anchor" href="#自定义模板" aria-hidden="true">#</a> 自定义模板</h2><p>在 <code>src/public</code> 文件夹中创建<code>index.html</code>，Fes.js 约定如果这个文件存在，则会替换默认模板。</p><h2 id="模板配置" tabindex="-1"><a class="header-anchor" href="#模板配置" aria-hidden="true">#</a> 模板配置</h2>',4),i=(0,t.Uk)("在配置文件（"),r=(0,t._)("code",null,".fes.js",-1),k=(0,t.Uk)("）中配置 "),d=(0,t._)("code",null,"html",-1),g=(0,t.Uk)("，把"),m={href:"https://github.com/jantimon/html-webpack-plugin#options",target:"_blank",rel:"noopener noreferrer"},b=(0,t.Uk)("配置"),h=(0,t.Uk)("的对象作为参数传入 "),v=(0,t._)("code",null,"html-webpack-plugin",-1),q=(0,t.Uk)(" 实例。"),f=(0,t.uE)('<p>举个 🌰 ：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">html</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&#39;海贼王&#39;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>页面的标题会设置成&#39;海贼王&#39;。</p><h2 id="模板变量" tabindex="-1"><a class="header-anchor" href="#模板变量" aria-hidden="true">#</a> 模板变量</h2><p>当然我们也可以手动编写模板，在模板中添加<code>link</code>、<code>link</code>、<code>meta</code>等标签。在我们手动配置模板时，有时候需要用到一些环境变量，模板里可以获取到的变量如下：</p><ul><li><strong>htmlWebpackPlugin</strong>，特定于此插件的数据</li><li><strong>webpackConfig</strong>，用于此编译的webpack配置。例如，它可用于获取publicPath（webpackConfig.output.publicPath）。</li><li><strong>compilation</strong>，webpack编译对象。例如，可以使用它来获取已处理资产的内容，并将其直接内联到页面中compilation.assets[...].source()</li></ul><p>举个 🌰 ：</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>image/x-icon<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>&lt;%= webpackConfig.output.publicPath %&gt;favicon.png<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>除上述 <code>html-webpack-plugin</code> 插件提供的变量外，Fes.js 还把 <code>process.env</code> 中的环境变量添加到模板作用域内：</p><ul><li><code>NODE_ENV</code></li><li><code>FES_ENV</code></li><li><code>.env</code> 文件中以 <code>FES_APP_</code> 开头的变量</li></ul><p>举个 🌰 ：</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icon<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>&lt;%= BASE_URL %&gt;favicon.ico<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div>',12),_={},w=(0,s(3744).Z)(_,[["render",function(n,a){const s=(0,t.up)("OutboundLink");return(0,t.wg)(),(0,t.iD)(t.HY,null,[p,(0,t._)("p",null,[e,(0,t._)("a",l,[o,(0,t.Wm)(s)]),c]),u,(0,t._)("p",null,[i,r,k,d,g,(0,t._)("a",m,[b,(0,t.Wm)(s)]),h,v,q]),f],64)}]])},3744:(n,a)=>{a.Z=(n,a)=>{const s=n.__vccOpts||n;for(const[n,t]of a)s[n]=t;return s}}}]);