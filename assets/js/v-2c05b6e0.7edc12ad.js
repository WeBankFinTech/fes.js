"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[960],{5822:(n,s,a)=>{a.r(s),a.d(s,{data:()=>e});const e={key:"v-2c05b6e0",path:"/reference/config/",title:"配置",lang:"zh-CN",frontmatter:{sidebar:"auto"},excerpt:"",headers:[{level:2,title:"alias",slug:"alias",children:[]},{level:2,title:"analyze",slug:"analyze",children:[]},{level:2,title:"autoprefixer",slug:"autoprefixer",children:[]},{level:2,title:"base",slug:"base",children:[]},{level:2,title:"chainWebpack",slug:"chainwebpack",children:[]},{level:2,title:"cssLoader",slug:"cssloader",children:[]},{level:2,title:"copy",slug:"copy",children:[]},{level:2,title:"define",slug:"define",children:[]},{level:2,title:"devServer",slug:"devserver",children:[]},{level:2,title:"devtool",slug:"devtool",children:[]},{level:2,title:"dynamicImport",slug:"dynamicimport",children:[]},{level:2,title:"exportStatic",slug:"exportstatic",children:[]},{level:2,title:"externals",slug:"externals",children:[]},{level:2,title:"extraBabelPlugins",slug:"extrababelplugins",children:[]},{level:2,title:"extraBabelPresets",slug:"extrababelpresets",children:[]},{level:2,title:"extraPostCSSPlugins",slug:"extrapostcssplugins",children:[]},{level:2,title:"html",slug:"html",children:[]},{level:2,title:"inlineLimit",slug:"inlinelimit",children:[]},{level:2,title:"lessLoader",slug:"lessloader",children:[]},{level:2,title:"mock",slug:"mock",children:[]},{level:2,title:"mountElementId",slug:"mountelementid",children:[]},{level:2,title:"nodeModulesTransform",slug:"nodemodulestransform",children:[]},{level:2,title:"outputPath",slug:"outputpath",children:[]},{level:2,title:"plugins",slug:"plugins",children:[]},{level:2,title:"postcssLoader",slug:"postcssloader",children:[]},{level:2,title:"proxy",slug:"proxy",children:[]},{level:2,title:"publicPath",slug:"publicpath",children:[]},{level:2,title:"router",slug:"router",children:[]},{level:2,title:"singular",slug:"singular",children:[]},{level:2,title:"targets",slug:"targets",children:[]},{level:2,title:"terserOptions",slug:"terseroptions",children:[]},{level:2,title:"vueLoader",slug:"vueloader",children:[]},{level:2,title:"更多配置项",slug:"更多配置项",children:[]}],filePathRelative:"reference/config/README.md",git:{updatedTime:1680249231e3,contributors:[{name:"wanchun",email:"445436867@qq.com",commits:1}]}}},502:(n,s,a)=>{a.r(s),a.d(s,{default:()=>an});var e=a(6252);const p=(0,e.uE)('<h1 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h1><p>以下配置项通过字母排序。</p><h2 id="alias" tabindex="-1"><a class="header-anchor" href="#alias" aria-hidden="true">#</a> alias</h2><ul><li><p>类型： <code>object</code></p></li><li><p>默认值： <code>{}</code></p></li><li><p>详情：</p><p>配置别名，对引用路径进行映射。</p></li><li><p>示例：</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n       <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token string">&#39;src/assets/styles/main&#39;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后 <code>import(&#39;main&#39;)</code>，实际上是 <code>import(&#39;src/assets/styles/main&#39;)</code>。</p><h2 id="analyze" tabindex="-1"><a class="header-anchor" href="#analyze" aria-hidden="true">#</a> analyze</h2><ul><li>类型： <code>object</code></li><li>默认值：</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n    <span class="token literal-property property">analyzerMode</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">ANALYZE_MODE</span> <span class="token operator">||</span> <span class="token string">&#39;server&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">analyzerPort</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">ANALYZE_PORT</span> <span class="token operator">||</span> <span class="token number">8888</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">openAnalyzer</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">ANALYZE_OPEN</span> <span class="token operator">!==</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>\n    <span class="token comment">// generate stats file while ANALYZE_DUMP exist</span>\n    <span class="token literal-property property">generateStatsFile</span><span class="token operator">:</span> <span class="token operator">!</span><span class="token operator">!</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">ANALYZE_DUMP</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">statsFilename</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">ANALYZE_DUMP</span> <span class="token operator">||</span> <span class="token string">&#39;stats.json&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">logLevel</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">ANALYZE_LOG_LEVEL</span> <span class="token operator">||</span> <span class="token string">&#39;info&#39;</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">defaultSizes</span><span class="token operator">:</span> <span class="token string">&#39;parsed&#39;</span> <span class="token comment">// stat  // gzip</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul><li><p>详情：</p><p>构建结果分析，当配置 <code>process.env.ANALYZE</code> 时开启，例如执行<code>ANALYZE=1 fes build</code></p></li></ul><h2 id="autoprefixer" tabindex="-1"><a class="header-anchor" href="#autoprefixer" aria-hidden="true">#</a> autoprefixer</h2><ul><li>类型： <code>object</code></li><li>默认值：</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">{</span>\n    <span class="token literal-property property">flexbox</span><span class="token operator">:</span> <span class="token string">&#39;no-2009&#39;</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>',13),l=(0,e._)("p",null,"详情：",-1),t={href:"https://github.com/postcss/autoprefixer#options",target:"_blank",rel:"noopener noreferrer"},o=(0,e.uE)('<h2 id="base" tabindex="-1"><a class="header-anchor" href="#base" aria-hidden="true">#</a> base</h2><ul><li><p>类型： <code>string</code></p></li><li><p>默认值： <code>&#39;&#39;</code></p></li><li><p>详情：</p><p>设置路由前缀，通常用于部署到非根目录。比如你有路由 <code>/pageA</code>、<code>/pageB</code>，然后设置了 <code>base</code> 为 <code>/manage/</code>，那么就可以通过 <code>/manage/pageA</code>、<code>/manage/pageB</code> 访问到它们。</p></li></ul><h2 id="chainwebpack" tabindex="-1"><a class="header-anchor" href="#chainwebpack" aria-hidden="true">#</a> chainWebpack</h2>',3),r=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("类型："),(0,e._)("code",null,"function")])],-1),c=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("默认值："),(0,e._)("code",null,"null")])],-1),i=(0,e._)("p",null,"详情：",-1),u={href:"https://github.com/neutrinojs/webpack-chain",target:"_blank",rel:"noopener noreferrer"},d=(0,e.uE)('<p>示例：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token function">chainWebpack</span><span class="token punctuation">(</span><span class="token parameter">memo<span class="token punctuation">,</span> <span class="token punctuation">{</span> env<span class="token punctuation">,</span> webpack <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token comment">// 删除 fes 内置插件</span>\n        memo<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&#39;copy&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="cssloader" tabindex="-1"><a class="header-anchor" href="#cssloader" aria-hidden="true">#</a> cssLoader</h2>',3),k=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("类型： "),(0,e._)("code",null,"object")])],-1),b=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("默认值： "),(0,e._)("code",null,"''")])],-1),h=(0,e._)("p",null,"详情：",-1),m={href:"https://github.com/webpack-contrib/css-loader#options",target:"_blank",rel:"noopener noreferrer"},g=(0,e.uE)('<h2 id="copy" tabindex="-1"><a class="header-anchor" href="#copy" aria-hidden="true">#</a> copy</h2><ul><li><p>类型： <code>Array(string) || Array(object)</code></p></li><li><p>默认值： <code>[]</code></p></li><li><p>详情：</p><p>设置要复制到输出目录的文件、文件夹。</p><p>配置约定 <code>from-to</code> 规则， 其中 <code>from</code> 是相对于 <code>cwd</code> 的路径，<code>to</code> 是相对于输出路径的路径。</p></li><li><p>示例：</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">copy</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">from</span><span class="token operator">:</span> <span class="token string">&#39;/src/assets/images&#39;</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">to</span><span class="token operator">:</span> <span class="token string">&#39;assets/images&#39;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>上面示例中，实现了将 <code>cwd</code> 路径中的 <code>/src/assets/images</code> 文件夹，在编译完成后，<code>copy</code> 到输出路径下的 <code>assets/images</code> 文件夹。</p><h2 id="define" tabindex="-1"><a class="header-anchor" href="#define" aria-hidden="true">#</a> define</h2><ul><li><p>类型： <code>object</code></p></li><li><p>默认值： <code>{}</code></p></li><li><p>详情：</p><p>用于提供给代码中可用的变量。</p></li><li><p>示例：</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">define</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">__DEV__</span><span class="token operator">:</span> <span class="token string">&#39;development&#39;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后你代码里写 <code>console.log(__DEV__)</code>，会被编译成 <code>console.log(&#39;development&#39;)</code>。</p><h2 id="devserver" tabindex="-1"><a class="header-anchor" href="#devserver" aria-hidden="true">#</a> devServer</h2><ul><li><p>类型： <code>object</code></p></li><li><p>默认值： <code>{}</code></p></li><li><p>详情：</p><p>配置开发服务器。支持以下子配置项：</p><ul><li>port，端口号，默认 <code>8000</code></li><li>host，默认 <code>localhost</code></li><li>https，是否启用 https server，同时也会开启 HTTP/2</li></ul><p>启用 port 和 host 也可以通过环境变量 <code>PORT</code> 和 <code>HOST</code> 临时指定。</p></li></ul><h2 id="devtool" tabindex="-1"><a class="header-anchor" href="#devtool" aria-hidden="true">#</a> devtool</h2>',11),v=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("类型： "),(0,e._)("code",null,"string")])],-1),y=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("默认值： "),(0,e._)("code",null,"cheap-module-source-map"),(0,e.Uk)(" in dev, "),(0,e._)("code",null,"undefined"),(0,e.Uk)(" in build")])],-1),_=(0,e._)("p",null,"详情：",-1),f={href:"https://webpack.js.org/configuration/devtool/#devtool",target:"_blank",rel:"noopener noreferrer"},x=(0,e.uE)('<h2 id="dynamicimport" tabindex="-1"><a class="header-anchor" href="#dynamicimport" aria-hidden="true">#</a> dynamicImport</h2><ul><li><p>类型： <code>boolean</code></p></li><li><p>默认值： false</p></li><li><p>详情：</p><p>路由是否按需加载</p></li></ul><h2 id="exportstatic" tabindex="-1"><a class="header-anchor" href="#exportstatic" aria-hidden="true">#</a> exportStatic</h2><ul><li>类型： <code>object</code></li><li>默认值： <code>{}</code></li><li>详情：</li></ul><p>配置 <code>html</code> 的输出形式，默认只输出 <code>index.html</code>。</p><p>如果开启 <code>exportStatic</code>，则会针对每个路由输出 <code>html</code> 文件。</p><p>比如以下路由，</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/\n/users\n/list\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>不开启 <code>exportStatic</code> 时，输出，</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>- index.html\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>设置 <code>exportStatic: {}</code> 后，输出，</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>- index.html\n- users.html\n- list.html\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="externals" tabindex="-1"><a class="header-anchor" href="#externals" aria-hidden="true">#</a> externals</h2><ul><li><p>类型：<code>object</code></p></li><li><p>默认值：<code>{}</code></p></li><li><p>详情：</p><p>设置哪些模块可以不被打包，通过 <code>&lt;script&gt;</code> 或其他方式引入。</p></li></ul><p>示例：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">externals</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n      <span class="token literal-property property">vue</span><span class="token operator">:</span> <span class="token string">&#39;window.Vue&#39;</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="extrababelplugins" tabindex="-1"><a class="header-anchor" href="#extrababelplugins" aria-hidden="true">#</a> extraBabelPlugins</h2><ul><li>类型： <code>array</code></li><li>默认值： <code>[]</code></li><li>详情：</li></ul><p>配置额外的 <code>babel</code> 插件。</p><ul><li>示例：</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">extraBabelPlugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token punctuation">[</span><span class="token string">&#39;import&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">libraryName</span><span class="token operator">:</span> <span class="token string">&#39;ant-design-vue&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">libraryDirectory</span><span class="token operator">:</span> <span class="token string">&#39;es&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">style</span><span class="token operator">:</span> <span class="token string">&#39;css&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="extrababelpresets" tabindex="-1"><a class="header-anchor" href="#extrababelpresets" aria-hidden="true">#</a> extraBabelPresets</h2><ul><li>类型： <code>array</code></li><li>默认值： <code>[]</code></li><li>详情：</li></ul><p>配置额外的 <code>babel</code> 插件集。</p><h2 id="extrapostcssplugins" tabindex="-1"><a class="header-anchor" href="#extrapostcssplugins" aria-hidden="true">#</a> extraPostCSSPlugins</h2>',25),j=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("类型： "),(0,e._)("code",null,"array")])],-1),U=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("默认值： "),(0,e._)("code",null,"[]")])],-1),w=(0,e._)("p",null,"详情：",-1),E={href:"https://github.com/postcss/postcss/blob/master/docs/plugins.md",target:"_blank",rel:"noopener noreferrer"},A=(0,e._)("h2",{id:"html",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#html","aria-hidden":"true"},"#"),(0,e.Uk)(" html")],-1),L=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("类型： "),(0,e._)("code",null,"object")])],-1),P=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("默认值： "),(0,e._)("code",null,"{}")])],-1),N=(0,e._)("p",null,"详情：",-1),S={href:"https://github.com/jantimon/html-webpack-plugin#options",target:"_blank",rel:"noopener noreferrer"},W=(0,e.uE)('<h2 id="inlinelimit" tabindex="-1"><a class="header-anchor" href="#inlinelimit" aria-hidden="true">#</a> inlineLimit</h2><ul><li><p>类型： <code>number</code></p></li><li><p>默认值： <code>8192</code>(8k)</p></li><li><p>详情：</p><p>配置图片文件是否走 base64 编译的阈值。默认是 <code>8192</code> 字节，小于它会被编译为 base64 编码，否则会生成单独的文件。</p></li></ul><h2 id="lessloader" tabindex="-1"><a class="header-anchor" href="#lessloader" aria-hidden="true">#</a> lessLoader</h2>',3),z=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("类型： "),(0,e._)("code",null,"object")])],-1),O=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("默认值： "),(0,e._)("code",null,"{}")])],-1),D=(0,e._)("p",null,"详情：",-1),Z={href:"https://github.com/webpack-contrib/less-loader",target:"_blank",rel:"noopener noreferrer"},T=(0,e.uE)('<h2 id="mock" tabindex="-1"><a class="header-anchor" href="#mock" aria-hidden="true">#</a> mock</h2><ul><li><p>类型： <code>object || boolean</code></p></li><li><p>默认值： <code>{}</code></p></li><li><p>详情：</p><p>配置 mock 属性。</p><ul><li>当 mock 为 <code>boolean</code> 类型时，<code>true</code> 表示打开 mock，<code>false</code> 表示关闭 mock。</li><li>当 mock 为 <code>object</code> 类型时，默认打开 mock。也可以通过子属性 <code>prefix</code> 添加过滤条件，满足条件的走 mock 文件。</li></ul></li><li><p>示例：</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">mock</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">prefix</span><span class="token operator">:</span> <span class="token string">&#39;/api/auth&#39;</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>然后所有以 <code>/api/users</code> 开始的请求，就能进入 mock.js 文件处理。</p><h2 id="mountelementid" tabindex="-1"><a class="header-anchor" href="#mountelementid" aria-hidden="true">#</a> mountElementId</h2><ul><li><p>类型： <code>string</code></p></li><li><p>默认值： <code>app</code></p></li><li><p>详情：</p><p>指定渲染到的 HTML 元素 id。</p></li></ul><h2 id="nodemodulestransform" tabindex="-1"><a class="header-anchor" href="#nodemodulestransform" aria-hidden="true">#</a> nodeModulesTransform</h2><ul><li><p>类型： <code>object</code></p></li><li><p>默认值： <code>{ exclude: [] }</code></p></li><li><p>详情：</p><p>默认编译所有 <code>node_modules</code> 下的包，可以通过配置 <code>exclude</code> 来跳过某些包，以提高编译速度。</p></li></ul><h2 id="outputpath" tabindex="-1"><a class="header-anchor" href="#outputpath" aria-hidden="true">#</a> outputPath</h2><ul><li><p>类型： <code>string</code></p></li><li><p>默认值： <code>dist</code></p></li><li><p>详情：</p><p>指定输出路径。</p></li></ul><div class="custom-container tip"><p class="custom-container-title">提示</p><p>不允许设定为 <code>src</code>、<code>public</code>、<code>pages</code> 等约定目录。</p></div><h2 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins" aria-hidden="true">#</a> plugins</h2><ul><li><p>类型： <code>Array(string)</code></p></li><li><p>默认值： <code>[]</code></p></li><li><p>详情：</p><p>配置额外的 <code>fes</code> 插件。 数组项为指向插件的路径，可以是 npm 依赖、相对路径或绝对路径。如果是相对路径，则会从项目根目录开始找。</p></li><li><p>示例：</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>\n    <span class="token comment">// npm 依赖</span>\n    <span class="token string">&#39;fes-plugin-hello&#39;</span><span class="token punctuation">,</span>\n    <span class="token comment">// 相对路径</span>\n    <span class="token string">&#39;./plugin&#39;</span><span class="token punctuation">,</span>\n    <span class="token comment">// 绝对路径</span>\n    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>__dirname<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/plugin.js</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span>\n  <span class="token punctuation">]</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="postcssloader" tabindex="-1"><a class="header-anchor" href="#postcssloader" aria-hidden="true">#</a> postcssLoader</h2>',15),Y=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("类型： "),(0,e._)("code",null,"object")])],-1),M=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("默认值： "),(0,e._)("code",null,"{}")])],-1),B=(0,e._)("p",null,"详情：",-1),C={href:"https://github.com/postcss/postcss-loader#options",target:"_blank",rel:"noopener noreferrer"},I=(0,e.uE)('<h2 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> proxy</h2><ul><li><p>类型： <code>object</code></p></li><li><p>默认值： <code>{}</code></p></li><li><p>详情：</p><p>配置代理能力。</p></li><li><p>示例：</p></li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token string-property property">&#39;/v2&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n            <span class="token string-property property">&#39;target&#39;</span><span class="token operator">:</span> <span class="token string">&#39;https://api.douban.com/&#39;</span><span class="token punctuation">,</span>\n            <span class="token string-property property">&#39;changeOrigin&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> \n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div>',3),V=(0,e._)("code",null,"/v2/movie/in_theaters_proxy",-1),q={href:"http://api.douban.com/v2/movie/in_theaters_proxy",target:"_blank",rel:"noopener noreferrer"},H=(0,e.uE)('<h2 id="publicpath" tabindex="-1"><a class="header-anchor" href="#publicpath" aria-hidden="true">#</a> publicPath</h2><ul><li><p>类型： <code>string</code></p></li><li><p>默认值： <code>/</code></p></li><li><p>详情：</p><p>配置 webpack 的 publicPath。当打包的时候，webpack 会在静态文件路径前面添加 <code>publicPath</code> 的值，当你需要修改静态文件地址时，比如使用 CDN 部署，把 <code>publicPath</code> 的值设为 CDN 的值就可以。</p></li></ul><h2 id="router" tabindex="-1"><a class="header-anchor" href="#router" aria-hidden="true">#</a> router</h2><ul><li><p>类型： <code>object</code></p></li><li><p>默认值： <code>{ mode: &#39;hash&#39; }</code></p></li><li><p>详情：</p><p>配置路由，具体请查看指南中关于路由的介绍</p></li></ul><h2 id="singular" tabindex="-1"><a class="header-anchor" href="#singular" aria-hidden="true">#</a> singular</h2><ul><li><p>类型： <code>boolean</code></p></li><li><p>默认值： <code>false</code></p></li><li><p>详情：</p><p>配置是否启用单数模式的目录。 比如 <code>src/pages</code> 的约定在开启后为 <code>src/page</code> 目录，@fesjs/fes-plugins 插件也遵照此配置的约定。</p></li></ul><h2 id="targets" tabindex="-1"><a class="header-anchor" href="#targets" aria-hidden="true">#</a> targets</h2><ul><li><p>类型： <code>object</code></p></li><li><p>默认值： <code>{}</code></p></li><li><p>详情：</p><p>配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。</p></li></ul><h2 id="terseroptions" tabindex="-1"><a class="header-anchor" href="#terseroptions" aria-hidden="true">#</a> terserOptions</h2><ul><li>类型： <code>object</code></li><li>默认值：</li></ul><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token keyword">const</span> defaultTerserOptions <span class="token operator">=</span> <span class="token punctuation">{</span>\n    <span class="token literal-property property">compress</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token comment">// turn off flags with small gains to speed up minification</span>\n        <span class="token literal-property property">arrows</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">collapse_vars</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 0.3kb</span>\n        <span class="token literal-property property">comparisons</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">computed_props</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">hoist_funs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">hoist_props</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">hoist_vars</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">inline</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">loops</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">negate_iife</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">properties</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">reduce_funcs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">reduce_vars</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">switches</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">toplevel</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">typeofs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>\n\n        <span class="token comment">// a few flags with noticeable gains/speed ratio</span>\n        <span class="token comment">// numbers based on out of the box vendor bundle</span>\n        <span class="token literal-property property">booleans</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 0.7kb</span>\n        <span class="token literal-property property">if_return</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 0.4kb</span>\n        <span class="token literal-property property">sequences</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 0.7kb</span>\n        <span class="token literal-property property">unused</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 2.3kb</span>\n\n        <span class="token comment">// required features to drop conditional branches</span>\n        <span class="token literal-property property">conditionals</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">dead_code</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>\n        <span class="token literal-property property">evaluate</span><span class="token operator">:</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token literal-property property">mangle</span><span class="token operator">:</span> <span class="token punctuation">{</span>\n        <span class="token literal-property property">safari10</span><span class="token operator">:</span> <span class="token boolean">true</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div>',11),R=(0,e._)("p",null,"详情：",-1),F={href:"https://github.com/terser/terser#minify-options",target:"_blank",rel:"noopener noreferrer"},G=(0,e._)("h2",{id:"vueloader",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#vueloader","aria-hidden":"true"},"#"),(0,e.Uk)(" vueLoader")],-1),$=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("类型： "),(0,e._)("code",null,"object")])],-1),J=(0,e._)("li",null,[(0,e._)("p",null,[(0,e.Uk)("默认值："),(0,e._)("code",null,"{}")])],-1),K=(0,e._)("p",null,"详情：",-1),Q={href:"https://vue-loader.vuejs.org/zh/options.html",target:"_blank",rel:"noopener noreferrer"},X=(0,e._)("h2",{id:"更多配置项",tabindex:"-1"},[(0,e._)("a",{class:"header-anchor",href:"#更多配置项","aria-hidden":"true"},"#"),(0,e.Uk)(" 更多配置项")],-1),nn=(0,e._)("p",null,"Fes.js 允许插件注册配置，如果你使用插件，肯定会在插件里找到更多配置项。",-1),sn={},an=(0,a(3744).Z)(sn,[["render",function(n,s){const a=(0,e.up)("OutboundLink");return(0,e.wg)(),(0,e.iD)(e.HY,null,[p,(0,e._)("ul",null,[(0,e._)("li",null,[l,(0,e._)("p",null,[(0,e._)("a",t,[(0,e.Uk)("postcss autoprefixer 插件"),(0,e.Wm)(a)]),(0,e.Uk)(" 配置。")])])]),o,(0,e._)("ul",null,[r,c,(0,e._)("li",null,[i,(0,e._)("p",null,[(0,e.Uk)("通过 "),(0,e._)("a",u,[(0,e.Uk)("webpack-chain"),(0,e.Wm)(a)]),(0,e.Uk)(" 的 API 修改 webpack 配置。")])])]),d,(0,e._)("ul",null,[k,b,(0,e._)("li",null,[h,(0,e._)("p",null,[(0,e.Uk)("设置 "),(0,e._)("a",m,[(0,e.Uk)("css-loader 配置项"),(0,e.Wm)(a)]),(0,e.Uk)("。")])])]),g,(0,e._)("ul",null,[v,y,(0,e._)("li",null,[_,(0,e._)("p",null,[(0,e.Uk)("用户配置 sourcemap 类型。详见 "),(0,e._)("a",f,[(0,e.Uk)(" webpack#devtool 配置"),(0,e.Wm)(a)]),(0,e.Uk)("。")])])]),x,(0,e._)("ul",null,[j,U,(0,e._)("li",null,[w,(0,e._)("p",null,[(0,e.Uk)("设置额外的 "),(0,e._)("a",E,[(0,e.Uk)("postcss 插件"),(0,e.Wm)(a)]),(0,e.Uk)("。")])])]),A,(0,e._)("ul",null,[L,P,(0,e._)("li",null,[N,(0,e._)("p",null,[(0,e.Uk)("设置"),(0,e._)("a",S,[(0,e.Uk)("html-webpack-plugin"),(0,e.Wm)(a)]),(0,e.Uk)("。")])])]),W,(0,e._)("ul",null,[z,O,(0,e._)("li",null,[D,(0,e._)("p",null,[(0,e.Uk)("设置 "),(0,e._)("a",Z,[(0,e.Uk)("less-loader 配置项"),(0,e.Wm)(a)]),(0,e.Uk)("。")])])]),T,(0,e._)("ul",null,[Y,M,(0,e._)("li",null,[B,(0,e._)("p",null,[(0,e.Uk)("设置 "),(0,e._)("a",C,[(0,e.Uk)("postcss-loader 配置项"),(0,e.Wm)(a)]),(0,e.Uk)("。")])])]),I,(0,e._)("p",null,[(0,e.Uk)("然后访问 "),V,(0,e.Uk)(" 就能访问到 "),(0,e._)("a",q,[(0,e.Uk)("http://api.douban.com/v2/movie/in_theaters_proxy"),(0,e.Wm)(a)]),(0,e.Uk)(" 的数据。")]),H,(0,e._)("ul",null,[(0,e._)("li",null,[R,(0,e._)("p",null,[(0,e.Uk)("配置 "),(0,e._)("a",F,[(0,e.Uk)("压缩器 terser 的配置项"),(0,e.Wm)(a)])])])]),G,(0,e._)("ul",null,[$,J,(0,e._)("li",null,[K,(0,e._)("p",null,[(0,e.Uk)("配置 "),(0,e._)("a",Q,[(0,e.Uk)("Vue Loader"),(0,e.Wm)(a)])])])]),X,nn],64)}]])},3744:(n,s)=>{s.Z=(n,s)=>{const a=n.__vccOpts||n;for(const[n,e]of s)a[n]=e;return a}}}]);