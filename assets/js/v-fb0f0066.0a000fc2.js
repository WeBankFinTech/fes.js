"use strict";(self.webpackChunkfes_js=self.webpackChunkfes_js||[]).push([[170],{3866:(n,s,e)=>{e.r(s),e.d(s,{data:()=>a});const a={key:"v-fb0f0066",path:"/guide/getting-started.html",title:"快速上手",lang:"zh-CN",frontmatter:{},excerpt:"",headers:[{level:2,title:"依赖环境",slug:"依赖环境",children:[]},{level:2,title:"创建项目",slug:"创建项目",children:[]},{level:2,title:"启动项目",slug:"启动项目",children:[]},{level:2,title:"部署发布",slug:"部署发布",children:[{level:3,title:"构建",slug:"构建",children:[]},{level:3,title:"本地验证",slug:"本地验证",children:[]},{level:3,title:"部署",slug:"部署",children:[]}]}],filePathRelative:"guide/getting-started.md",git:{updatedTime:1653450562e3,contributors:[{name:"wanchun",email:"445436867@qq.com",commits:1}]}}},7217:(n,s,e)=>{e.r(s),e.d(s,{default:()=>X});var a=e(6252);const l=(0,a._)("h1",{id:"快速上手",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#快速上手","aria-hidden":"true"},"#"),(0,a.Uk)(" 快速上手")],-1),r=(0,a._)("h2",{id:"依赖环境",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#依赖环境","aria-hidden":"true"},"#"),(0,a.Uk)(" 依赖环境")],-1),c=(0,a.Uk)("首先得有 "),i={href:"https://nodejs.org/",target:"_blank",rel:"noopener noreferrer"},p=(0,a.Uk)("Node.js"),u=(0,a.Uk)("，并确保 node 版本是 10.13 或以上。"),t=(0,a.uE)('<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 打印 node 版本</span>\n<span class="token function">node</span> -v\nv10.13.0\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>推荐使用 yarn 管理 npm 依赖</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 全局安装 yarn</span>\n<span class="token function">npm</span> i <span class="token function">yarn</span> -g\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2><p>这一章节会帮助你从头搭建一个简单的 Fes.js 前端应用。</p><h5 id="步骤1-创建工作空间" tabindex="-1"><a class="header-anchor" href="#步骤1-创建工作空间" aria-hidden="true">#</a> 步骤1 创建工作空间</h5><p>如果工作空间不存在，则先创建：</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 创建目录 workspace</span>\n<span class="token function">mkdir</span> workspace\n<span class="token comment"># 进入目录 workspace</span>\n<span class="token builtin class-name">cd</span> workspace\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>如果工作空间已存在，则直接进入</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 进入目录 workspace</span>\n<span class="token builtin class-name">cd</span> workspace\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="步骤2-在工作空间创建项目" tabindex="-1"><a class="header-anchor" href="#步骤2-在工作空间创建项目" aria-hidden="true">#</a> 步骤2 在工作空间创建项目</h5>',11),b=(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,[(0,a._)("span",{class:"token comment"},"# 创建模板"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token function"},"yarn"),(0,a.Uk)(" create @fesjs/fes-app myapp\n")])]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"2"),(0,a._)("br")])],-1),_=(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,[(0,a._)("span",{class:"token comment"},"# 创建模板"),(0,a.Uk)("\nnpx @fesjs/create-fes-app myapp\n")])]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"2"),(0,a._)("br")])],-1),d=(0,a._)("p",null,[(0,a.Uk)("如果项目文件夹 "),(0,a._)("code",null,"workspace/myapp"),(0,a.Uk)(" 已经存在，会提示目录已存在：")],-1),o=["src"],m=(0,a._)("p",null,"你可以选择：",-1),k=(0,a._)("ul",null,[(0,a._)("li",null,[(0,a._)("code",null,"Overwrite"),(0,a.Uk)(" 删除项目文件夹，重新创建项目。")]),(0,a._)("li",null,[(0,a._)("code",null,"Merge"),(0,a.Uk)(" 保留原项目文件夹，存在相同文件则用模板文件覆盖当前目录文件。")])],-1),h=(0,a.Uk)("当选择 "),g=(0,a._)("code",null,"Overwrite",-1),f=(0,a.Uk)(" 或者 "),v=(0,a._)("code",null,"Merge",-1),U=(0,a.Uk)(" 或者项目目录 "),w=(0,a._)("code",null,"workspace/myapp",-1),x=(0,a.Uk)(" 不存在，会提示选取一个 "),y=(0,a._)("code",null,"template",-1),W=(0,a.Uk)("： "),C=["src"],N=(0,a._)("p",null,[(0,a.Uk)("你可以选默认适用于中后台前端应用的 "),(0,a._)("code",null,"PC"),(0,a.Uk)(" 类型，也可以选适用于移动端的 "),(0,a._)("code",null,"H5"),(0,a.Uk)(" 类型。")],-1),j=(0,a._)("h5",{id:"步骤3-安装依赖",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#步骤3-安装依赖","aria-hidden":"true"},"#"),(0,a.Uk)(" 步骤3 安装依赖")],-1),M=(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,[(0,a._)("span",{class:"token comment"},"# 进入项目目录"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token builtin class-name"},"cd"),(0,a.Uk)(" myapp\n"),(0,a._)("span",{class:"token comment"},"# 安装依赖"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token function"},"yarn"),(0,a.Uk)(" \n")])]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"2"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"3"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"4"),(0,a._)("br")])],-1),A=(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,[(0,a._)("span",{class:"token comment"},"# 进入项目目录"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token builtin class-name"},"cd"),(0,a.Uk)(" myapp\n"),(0,a._)("span",{class:"token comment"},"# 安装依赖"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token function"},"npm"),(0,a.Uk)(" i \n")])]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"2"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"3"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"4"),(0,a._)("br")])],-1),O=(0,a._)("h2",{id:"启动项目",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#启动项目","aria-hidden":"true"},"#"),(0,a.Uk)(" 启动项目")],-1),P=(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,[(0,a._)("span",{class:"token comment"},"# 开发调试"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token function"},"yarn"),(0,a.Uk)(" dev\n\n"),(0,a._)("span",{class:"token function"},"yarn"),(0,a.Uk)(" run v1.22.4\n$ fes dev\nStarting the development server http://localhost:8080 "),(0,a._)("span",{class:"token punctuation"},".."),(0,a.Uk)(".\n\n✔ Webpack\n  Compiled successfully "),(0,a._)("span",{class:"token keyword"},"in"),(0,a.Uk)(),(0,a._)("span",{class:"token number"},"15"),(0,a.Uk)(".91s\n\n DONE  Compiled successfully "),(0,a._)("span",{class:"token keyword"},"in"),(0,a.Uk)(" 15917ms                               "),(0,a._)("span",{class:"token number"},"11"),(0,a.Uk)(":17:08 AM\n")])]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"2"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"3"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"4"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"5"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"6"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"7"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"8"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"9"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"10"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"11"),(0,a._)("br")])],-1),R=(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,[(0,a._)("span",{class:"token comment"},"# 开发调试"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token function"},"npm"),(0,a.Uk)(" run dev\n\n"),(0,a._)("span",{class:"token operator"},">"),(0,a.Uk)(" fes dev\nStarting the development server http://localhost:8080 "),(0,a._)("span",{class:"token punctuation"},".."),(0,a.Uk)(".\n\n✔ Webpack\n  Compiled successfully "),(0,a._)("span",{class:"token keyword"},"in"),(0,a.Uk)(),(0,a._)("span",{class:"token number"},"3"),(0,a.Uk)(".66s\n\n DONE  Compiled successfully "),(0,a._)("span",{class:"token keyword"},"in"),(0,a.Uk)(" 3662ms                                "),(0,a._)("span",{class:"token number"},"11"),(0,a.Uk)(":17:46 AM\n")])]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"2"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"3"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"4"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"5"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"6"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"7"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"8"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"9"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"10"),(0,a._)("br")])],-1),Y=(0,a.Uk)("Fes.js 会在 "),$={href:"http://localhost:8080",target:"_blank",rel:"noopener noreferrer"},D=(0,a.Uk)("http://localhost:8080"),E=(0,a.Uk)(" 启动一个热重载的开发服务器。当你修改你的 .vue 文件时，浏览器中的内容也会自动更新。"),T=["src"],B=(0,a._)("h2",{id:"部署发布",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#部署发布","aria-hidden":"true"},"#"),(0,a.Uk)(" 部署发布")],-1),q=(0,a._)("h3",{id:"构建",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#构建","aria-hidden":"true"},"#"),(0,a.Uk)(" 构建")],-1),F=(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,[(0,a._)("span",{class:"token comment"},"# 构建"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token function"},"yarn"),(0,a.Uk)(" build\n\n"),(0,a._)("span",{class:"token function"},"yarn"),(0,a.Uk)(" run v1.22.4\n$ fes build\n\n✔ Webpack\n  Compiled successfully "),(0,a._)("span",{class:"token keyword"},"in"),(0,a.Uk)(),(0,a._)("span",{class:"token number"},"45"),(0,a.Uk)(".37s\n\n✨  Done "),(0,a._)("span",{class:"token keyword"},"in"),(0,a.Uk)(),(0,a._)("span",{class:"token number"},"48"),(0,a.Uk)(".87s.\n")])]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"2"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"3"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"4"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"5"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"6"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"7"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"8"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"9"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"10"),(0,a._)("br")])],-1),G=(0,a._)("div",{class:"language-bash ext-sh line-numbers-mode"},[(0,a._)("pre",{class:"language-bash"},[(0,a._)("code",null,[(0,a._)("span",{class:"token comment"},"# 构建"),(0,a.Uk)("\n"),(0,a._)("span",{class:"token function"},"npm"),(0,a.Uk)(" run build\n\n"),(0,a._)("span",{class:"token operator"},">"),(0,a.Uk)(" fes build\n\n✔ Webpack\n  Compiled successfully "),(0,a._)("span",{class:"token keyword"},"in"),(0,a.Uk)(),(0,a._)("span",{class:"token number"},"45"),(0,a.Uk)(".37s\n")])]),(0,a._)("div",{class:"line-numbers"},[(0,a._)("span",{class:"line-number"},"1"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"2"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"3"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"4"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"5"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"6"),(0,a._)("br"),(0,a._)("span",{class:"line-number"},"7"),(0,a._)("br")])],-1),H=(0,a.uE)('<p>构建产物默认生成到 ./dist 下，然后通过 tree 命令查看。</p><div class="language-base ext-base line-numbers-mode"><pre class="language-base"><code>tree ./dist\n\ndist\n├── chunk-vendors.27cd4686.js\n├── chunk-vendors.a5f5de67.css\n├── index.11411d43.css\n├── index.d72f1ba2.js\n├── index.html\n├── logo.png\n└── static\n    └── logo.0f85bba0.png\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="本地验证" tabindex="-1"><a class="header-anchor" href="#本地验证" aria-hidden="true">#</a> 本地验证</h3>',3),S=(0,a.Uk)("发布之前，可以通过 "),Z={href:"https://github.com/vercel/serve",target:"_blank",rel:"noopener noreferrer"},z=(0,a.Uk)("serve"),I=(0,a.Uk)(" 做本地验证，验证结果应该跟执行 "),L=(0,a._)("code",null,"fes dev",-1),J=(0,a.Uk)(" 的结果一样。"),K=(0,a._)("h3",{id:"部署",tabindex:"-1"},[(0,a._)("a",{class:"header-anchor",href:"#部署","aria-hidden":"true"},"#"),(0,a.Uk)(" 部署")],-1),Q=(0,a._)("p",null,"本地验证完，就可以部署了。你需要把 dist 目录部署到服务器上。",-1),V={},X=(0,e(3744).Z)(V,[["render",function(n,s){const e=(0,a.up)("OutboundLink"),V=(0,a.up)("CodeGroupItem"),X=(0,a.up)("CodeGroup");return(0,a.wg)(),(0,a.iD)(a.HY,null,[l,r,(0,a._)("p",null,[c,(0,a._)("a",i,[p,(0,a.Wm)(e)]),u]),t,(0,a.Wm)(X,null,{default:(0,a.w5)((()=>[(0,a.Wm)(V,{title:"YARN",active:""},{default:(0,a.w5)((()=>[b])),_:1}),(0,a.Wm)(V,{title:"NPM"},{default:(0,a.w5)((()=>[_])),_:1})])),_:1}),d,(0,a._)("img",{src:n.$withBase("pickTemplateTip.png"),alt:"目录已存在提示"},null,8,o),m,k,(0,a._)("p",null,[h,g,f,v,U,w,x,y,W,(0,a._)("img",{src:n.$withBase("pickTemplate.png"),alt:"选择模板类型"},null,8,C)]),N,j,(0,a.Wm)(X,null,{default:(0,a.w5)((()=>[(0,a.Wm)(V,{title:"YARN",active:""},{default:(0,a.w5)((()=>[M])),_:1}),(0,a.Wm)(V,{title:"NPM"},{default:(0,a.w5)((()=>[A])),_:1})])),_:1}),O,(0,a.Wm)(X,null,{default:(0,a.w5)((()=>[(0,a.Wm)(V,{title:"YARN",active:""},{default:(0,a.w5)((()=>[P])),_:1}),(0,a.Wm)(V,{title:"NPM"},{default:(0,a.w5)((()=>[R])),_:1})])),_:1}),(0,a._)("p",null,[Y,(0,a._)("a",$,[D,(0,a.Wm)(e)]),E]),(0,a._)("img",{src:n.$withBase("home.png"),alt:"home"},null,8,T),B,q,(0,a.Wm)(X,null,{default:(0,a.w5)((()=>[(0,a.Wm)(V,{title:"YARN",active:""},{default:(0,a.w5)((()=>[F])),_:1}),(0,a.Wm)(V,{title:"NPM"},{default:(0,a.w5)((()=>[G])),_:1})])),_:1}),H,(0,a._)("p",null,[S,(0,a._)("a",Z,[z,(0,a.Wm)(e)]),I,L,J]),K,Q],64)}]])},3744:(n,s)=>{s.Z=(n,s)=>{const e=n.__vccOpts||n;for(const[n,a]of s)e[n]=a;return e}}}]);