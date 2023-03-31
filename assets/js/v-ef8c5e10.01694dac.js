"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[276],{9812:(e,a,s)=>{s.r(a),s.d(a,{data:()=>n});const n={key:"v-ef8c5e10",path:"/guide/env.html",title:"环境变量",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"配置环境变量",slug:"配置环境变量",children:[{level:3,title:"命令行添加",slug:"命令行添加",children:[]},{level:3,title:".env 文件配置",slug:"env-文件配置",children:[]}]},{level:2,title:"编译时配置列表",slug:"编译时配置列表",children:[{level:3,title:"FES_ENV",slug:"fes-env",children:[]},{level:3,title:"FES_PRESETS",slug:"fes-presets",children:[]},{level:3,title:"FES_PLUGINS",slug:"fes-plugins",children:[]},{level:3,title:"PORT",slug:"port",children:[]},{level:3,title:"HOST",slug:"host",children:[]},{level:3,title:"HTTPS",slug:"https",children:[]},{level:3,title:"WATCH",slug:"watch",children:[]},{level:3,title:"BABEL_CACHE",slug:"babel-cache",children:[]},{level:3,title:"ANALYZE",slug:"analyze",children:[]},{level:3,title:"ANALYZE_MODE",slug:"analyze-mode",children:[]},{level:3,title:"ANALYZE_PORT",slug:"analyze-port",children:[]},{level:3,title:"CLEAR_OUTPUT",slug:"clear-output",children:[]},{level:3,title:"RM_TMPDIR",slug:"rm-tmpdir",children:[]}]},{level:2,title:"process.env",slug:"process-env",children:[]}],filePathRelative:"guide/env.md",git:{updatedTime:1680249231e3,contributors:[{name:"wanchun",email:"445436867@qq.com",commits:1}]}}},3125:(e,a,s)=>{s.r(a),s.d(a,{default:()=>o});var n=s(6252);const l=(0,n.uE)('<h1 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h1><p>在构建或者代码在端上运行中需要一些跟区分于环境的变量，用于配置构建流程或者运行时过程，这时候我们可以配置环境变量。</p><h2 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a> 配置环境变量</h2><h3 id="命令行添加" tabindex="-1"><a class="header-anchor" href="#命令行添加" aria-hidden="true">#</a> 命令行添加</h3><p>比如：</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># OS X, Linux</span>\n<span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">3000</span> fes dev\n\n<span class="token comment"># Windows (cmd.exe)</span>\n<span class="token builtin class-name">set</span> <span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">3000</span> <span class="token operator">&amp;&amp;</span> fes dev\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div>',6),r={href:"https://github.com/kentcdodds/cross-env",target:"_blank",rel:"noopener noreferrer"},d=(0,n._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,n._)("pre",{class:"language-bash"},[(0,n._)("code",null,[(0,n._)("span",{class:"token function"},"yarn"),(0,n.Uk)(),(0,n._)("span",{class:"token function"},"add"),(0,n.Uk)(" cross-env "),(0,n._)("span",{class:"token parameter variable"},"--dev"),(0,n.Uk)("\ncross-env "),(0,n._)("span",{class:"token assign-left variable"},"PORT"),(0,n._)("span",{class:"token operator"},"="),(0,n._)("span",{class:"token number"},"3000"),(0,n.Uk)(" fes dev\n")])]),(0,n._)("div",{class:"line-numbers"},[(0,n._)("span",{class:"line-number"},"1"),(0,n._)("br"),(0,n._)("span",{class:"line-number"},"2"),(0,n._)("br")])],-1),c=(0,n._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,n._)("pre",{class:"language-bash"},[(0,n._)("code",null,[(0,n._)("span",{class:"token function"},"npm"),(0,n.Uk)(" i cross-env --save-dev\ncross-env "),(0,n._)("span",{class:"token assign-left variable"},"PORT"),(0,n._)("span",{class:"token operator"},"="),(0,n._)("span",{class:"token number"},"3000"),(0,n.Uk)(" fes dev\n")])]),(0,n._)("div",{class:"line-numbers"},[(0,n._)("span",{class:"line-number"},"1"),(0,n._)("br"),(0,n._)("span",{class:"line-number"},"2"),(0,n._)("br")])],-1),t=(0,n.uE)('<h3 id="env-文件配置" tabindex="-1"><a class="header-anchor" href="#env-文件配置" aria-hidden="true">#</a> <code>.env</code> 文件配置</h3><p>Fes.js 中约定根目录下以 <code>.env</code> 开头的文件为环境变量配置文件。</p><p>比如：</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">PORT</span><span class="token operator">=</span><span class="token number">3000</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>然后执行</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>fes dev\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>会以 3000 端口启动 dev server。</p><h4 id="本地临时配置" tabindex="-1"><a class="header-anchor" href="#本地临时配置" aria-hidden="true">#</a> 本地临时配置</h4><p>可以新建 <code>.env.local</code>，这份配置会和 <code>.env</code> 做合并后形成最终配置。</p><h4 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h4><p>可以通过环境变量 <code>FES_ENV</code> 区分不同环境来指定配置，这时候必须在执行命令前添加 <code>FES_ENV</code> 保证执行加载环境变量配置文件逻辑前 <code>FES_ENV</code> 已设置。</p><p>举个 🌰 ：</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">FES_ENV</span><span class="token operator">=</span>sit fes dev\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>如果存在 <code>.env.sit</code> 文件，则会将 <code>.env.sit</code> 的配置和 <code>.env</code> 做合并后形成最终配置。</p><h4 id="配置优先级" tabindex="-1"><a class="header-anchor" href="#配置优先级" aria-hidden="true">#</a> 配置优先级</h4><p>本地临时配置 &gt; 环境配置 &gt; 基础配置</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p>如果多份配置中存在相同的配置项，<strong>则优先级高的会覆盖优先级低的</strong>。</p></div><h2 id="编译时配置列表" tabindex="-1"><a class="header-anchor" href="#编译时配置列表" aria-hidden="true">#</a> 编译时配置列表</h2><p>编译时配置是在构建过程需要的变量，开放给用户配置。</p><h3 id="fes-env" tabindex="-1"><a class="header-anchor" href="#fes-env" aria-hidden="true">#</a> FES_ENV</h3><p>指定当前的环境，不同环境各自的配置文件。</p><div class="custom-container tip"><p class="custom-container-title">提示</p><p><code>FES_ENV</code> 在会在加载<code>.env</code>前使用，所以只能用命令行方式配置。</p></div><h3 id="fes-presets" tabindex="-1"><a class="header-anchor" href="#fes-presets" aria-hidden="true">#</a> FES_PRESETS</h3><p>添加额外的插件集入口</p><h3 id="fes-plugins" tabindex="-1"><a class="header-anchor" href="#fes-plugins" aria-hidden="true">#</a> FES_PLUGINS</h3><p>添加额外的插件入口</p><h3 id="port" tabindex="-1"><a class="header-anchor" href="#port" aria-hidden="true">#</a> PORT</h3><p><code>fes dev</code> 时服务指定的端口号，默认是 <code>8080</code></p><h3 id="host" tabindex="-1"><a class="header-anchor" href="#host" aria-hidden="true">#</a> HOST</h3><p>默认是 <code>localhost</code>。</p><h3 id="https" tabindex="-1"><a class="header-anchor" href="#https" aria-hidden="true">#</a> HTTPS</h3><p>默认是 <code>false</code>。</p><h3 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> WATCH</h3><p>设为 none 时不监听文件变更。比如：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>WATCH=none fes dev\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="babel-cache" tabindex="-1"><a class="header-anchor" href="#babel-cache" aria-hidden="true">#</a> BABEL_CACHE</h3><p>默认开启 Babel 编译缓存，值为 none 时禁用缓存。</p><h3 id="analyze" tabindex="-1"><a class="header-anchor" href="#analyze" aria-hidden="true">#</a> ANALYZE</h3><p>用于分析 bundle 构成，默认关闭。</p><p>比如：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ANALYZE=1 fes build\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="analyze-mode" tabindex="-1"><a class="header-anchor" href="#analyze-mode" aria-hidden="true">#</a> ANALYZE_MODE</h3><p>默认是<code>server</code></p><h3 id="analyze-port" tabindex="-1"><a class="header-anchor" href="#analyze-port" aria-hidden="true">#</a> ANALYZE_PORT</h3><p>默认是<code>8888</code></p><h3 id="clear-output" tabindex="-1"><a class="header-anchor" href="#clear-output" aria-hidden="true">#</a> CLEAR_OUTPUT</h3><p>仅仅在 <code>build</code> 时生效。如果设置为 <code>none</code>，就不会在构建前清除 <code>Output</code> 文件内容。</p><h3 id="rm-tmpdir" tabindex="-1"><a class="header-anchor" href="#rm-tmpdir" aria-hidden="true">#</a> RM_TMPDIR</h3><p>仅仅在 <code>build</code> 时生效。如果设置为 <code>none</code>，就不会在构建后清除 <code>.fes</code> 临时文件内容。</p><h2 id="process-env" tabindex="-1"><a class="header-anchor" href="#process-env" aria-hidden="true">#</a> process.env</h2><p>运行时配置需要以 <code>FES_APP_</code> 开头，比如在 <code>.env</code> 中配置：</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>FES_APP_KEY=123456789\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>在代码中使用：</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">FES_APP_KEY</span><span class="token punctuation">)</span>\n<span class="token comment">// 输出 123456789</span>\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>除了用户自定义的以<code>FES_APP_</code>开头的变量，还提供如下配置：</p><ul><li><p><strong>NODE_ENV</strong>：Node 环境变量</p></li><li><p><strong>FES_ENV</strong>：Fes.js 环境变量</p></li><li><p><strong>BASE_URL</strong>：等同于 publicPath</p></li></ul>',56),i={},o=(0,s(3744).Z)(i,[["render",function(e,a){const s=(0,n.up)("OutboundLink"),i=(0,n.up)("CodeGroupItem"),o=(0,n.up)("CodeGroup");return(0,n.wg)(),(0,n.iD)(n.HY,null,[l,(0,n._)("p",null,[(0,n.Uk)("如果要同时考虑 OS X 和 Windows，可借助三方工具 "),(0,n._)("a",r,[(0,n.Uk)("cross-env"),(0,n.Wm)(s)])]),(0,n.Wm)(o,null,{default:(0,n.w5)((()=>[(0,n.Wm)(i,{title:"YARN",active:""},{default:(0,n.w5)((()=>[d])),_:1}),(0,n.Wm)(i,{title:"NPM"},{default:(0,n.w5)((()=>[c])),_:1})])),_:1}),t],64)}]])},3744:(e,a)=>{a.Z=(e,a)=>{const s=e.__vccOpts||e;for(const[e,n]of a)s[e]=n;return s}}}]);