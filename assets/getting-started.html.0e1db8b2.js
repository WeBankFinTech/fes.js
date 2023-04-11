import{_ as o,r as t,o as u,c as m,b as e,d as n,a as s,w as a,f as r}from"./app.ae6ada9d.js";const p={},h=e("h1",{id:"快速上手",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#快速上手","aria-hidden":"true"},"#"),n(" 快速上手")],-1),b=e("h2",{id:"依赖环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#依赖环境","aria-hidden":"true"},"#"),n(" 依赖环境")],-1),v={href:"https://nodejs.org/",target:"_blank",rel:"noopener noreferrer"},_=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打印 node 版本</span>
<span class="token function">node</span> <span class="token parameter variable">-v</span>
v12.13.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),k={href:"https://pnpm.io/installation",target:"_blank",rel:"noopener noreferrer"},g=r(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 全局安装 pnpm</span>
<span class="token function">npm</span> i <span class="token function">pnpm</span> <span class="token parameter variable">-g</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2><p>这一章节会帮助你从头搭建一个简单的 Fes.js 前端应用。</p><h5 id="步骤-1-创建工作空间" tabindex="-1"><a class="header-anchor" href="#步骤-1-创建工作空间" aria-hidden="true">#</a> 步骤 1 创建工作空间</h5><p>如果工作空间不存在，则先创建：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建目录 workspace</span>
<span class="token function">mkdir</span> workspace
<span class="token comment"># 进入目录 workspace</span>
<span class="token builtin class-name">cd</span> workspace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果工作空间已存在，则直接进入</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 进入目录 workspace</span>
<span class="token builtin class-name">cd</span> workspace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="步骤-2-在工作空间创建项目" tabindex="-1"><a class="header-anchor" href="#步骤-2-在工作空间创建项目" aria-hidden="true">#</a> 步骤 2 在工作空间创建项目</h5>`,9),f=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 创建模板"),n(`
`),e("span",{class:"token function"},"pnpm"),n(` create @fesjs/fes-app myapp
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),x=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 创建模板"),n(`
npx @fesjs/create-fes-app myapp
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),w=e("p",null,[n("如果项目文件夹 "),e("code",null,"workspace/myapp"),n(" 已经存在，会提示目录已存在：")],-1),y=["src"],N=e("p",null,"你可以选择：",-1),C=e("ul",null,[e("li",null,[e("code",null,"Overwrite"),n(" 删除项目文件夹，重新创建项目。")]),e("li",null,[e("code",null,"Merge"),n(" 保留原项目文件夹，存在相同文件则用模板文件覆盖当前目录文件。")])],-1),P=e("code",null,"Overwrite",-1),M=e("code",null,"Merge",-1),j=e("code",null,"workspace/myapp",-1),B=e("code",null,"template",-1),E=["src"],$=e("p",null,[n("你可以选默认适用于中后台前端应用的 "),e("code",null,"PC"),n(" 类型，也可以选适用于移动端的 "),e("code",null,"H5"),n(" 类型。")],-1),G=e("h5",{id:"步骤-3-安装依赖",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#步骤-3-安装依赖","aria-hidden":"true"},"#"),n(" 步骤 3 安装依赖")],-1),I=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 进入项目目录"),n(`
`),e("span",{class:"token builtin class-name"},"cd"),n(` myapp
`),e("span",{class:"token comment"},"# 安装依赖"),n(`
`),e("span",{class:"token function"},"pnpm"),n(` i
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),O=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 进入项目目录"),n(`
`),e("span",{class:"token builtin class-name"},"cd"),n(` myapp
`),e("span",{class:"token comment"},"# 安装依赖"),n(`
`),e("span",{class:"token function"},"npm"),n(` i
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),S=e("h2",{id:"启动项目",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#启动项目","aria-hidden":"true"},"#"),n(" 启动项目")],-1),T=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 开发调试"),n(`
`),e("span",{class:"token function"},"pnpm"),n(` dev

`),e("span",{class:"token function"},"pnpm"),n(` run v1.22.4
$ fes dev
Starting the development server http://localhost:8000 `),e("span",{class:"token punctuation"},".."),n(`.

✔ Webpack
  Compiled successfully `),e("span",{class:"token keyword"},"in"),n(),e("span",{class:"token number"},"15"),n(`.91s

 DONE  Compiled successfully `),e("span",{class:"token keyword"},"in"),n(" 15917ms                               "),e("span",{class:"token number"},"11"),n(`:17:08 AM
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),V=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 开发调试"),n(`
`),e("span",{class:"token function"},"npm"),n(` run dev

`),e("span",{class:"token operator"},">"),n(` fes dev
Starting the development server http://localhost:8000 `),e("span",{class:"token punctuation"},".."),n(`.

✔ Webpack
  Compiled successfully `),e("span",{class:"token keyword"},"in"),n(),e("span",{class:"token number"},"3"),n(`.66s

 DONE  Compiled successfully `),e("span",{class:"token keyword"},"in"),n(" 3662ms                                "),e("span",{class:"token number"},"11"),n(`:17:46 AM
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),W={href:"http://localhost:8000",target:"_blank",rel:"noopener noreferrer"},D=["src"],A=e("h2",{id:"部署发布",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#部署发布","aria-hidden":"true"},"#"),n(" 部署发布")],-1),F=e("h3",{id:"构建",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#构建","aria-hidden":"true"},"#"),n(" 构建")],-1),L=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 构建"),n(`
`),e("span",{class:"token function"},"pnpm"),n(` build

`),e("span",{class:"token function"},"pnpm"),n(` run v1.22.4
$ fes build

✔ Webpack
  Compiled successfully `),e("span",{class:"token keyword"},"in"),n(),e("span",{class:"token number"},"45"),n(`.37s

✨  Done `),e("span",{class:"token keyword"},"in"),n(),e("span",{class:"token number"},"48"),n(`.87s.
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),H=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token comment"},"# 构建"),n(`
`),e("span",{class:"token function"},"npm"),n(` run build

`),e("span",{class:"token operator"},">"),n(` fes build

✔ Webpack
  Compiled successfully `),e("span",{class:"token keyword"},"in"),n(),e("span",{class:"token number"},"45"),n(`.37s
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),q=r(`<p>构建产物默认生成到 ./dist 下，然后通过 tree 命令查看。</p><div class="language-base line-numbers-mode" data-ext="base"><pre class="language-base"><code>tree ./dist

dist
├── chunk-vendors.27cd4686.js
├── chunk-vendors.a5f5de67.css
├── index.11411d43.css
├── index.d72f1ba2.js
├── index.html
├── logo.png
└── static
    └── logo.0f85bba0.png
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="本地验证" tabindex="-1"><a class="header-anchor" href="#本地验证" aria-hidden="true">#</a> 本地验证</h3>`,3),z={href:"https://github.com/vercel/serve",target:"_blank",rel:"noopener noreferrer"},J=e("code",null,"fes dev",-1),K=e("h3",{id:"部署",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#部署","aria-hidden":"true"},"#"),n(" 部署")],-1),Q=e("p",null,"本地验证完，就可以部署了。你需要把 dist 目录部署到服务器上。",-1);function R(c,U){const i=t("ExternalLinkIcon"),l=t("CodeGroupItem"),d=t("CodeGroup");return u(),m("div",null,[h,b,e("p",null,[n("首先得有 "),e("a",v,[n("Node.js"),s(i)]),n("，并确保 node 版本是 12.13 或以上。")]),_,e("p",null,[n("推荐使用 "),e("a",k,[n("pnpm"),s(i)]),n(" 管理 npm 依赖")]),g,s(d,null,{default:a(()=>[s(l,{title:"PNPM",active:""},{default:a(()=>[f]),_:1}),s(l,{title:"NPM"},{default:a(()=>[x]),_:1})]),_:1}),w,e("img",{src:c.$withBase("pickTemplateTip.png"),alt:"目录已存在提示"},null,8,y),N,C,e("p",null,[n("当选择 "),P,n(" 或者 "),M,n(" 或者项目目录 "),j,n(" 不存在，会提示选取一个 "),B,n("： "),e("img",{src:c.$withBase("pickTemplate.png"),alt:"选择模板类型"},null,8,E)]),$,G,s(d,null,{default:a(()=>[s(l,{title:"PNPM",active:""},{default:a(()=>[I]),_:1}),s(l,{title:"NPM"},{default:a(()=>[O]),_:1})]),_:1}),S,s(d,null,{default:a(()=>[s(l,{title:"PNPM",active:""},{default:a(()=>[T]),_:1}),s(l,{title:"NPM"},{default:a(()=>[V]),_:1})]),_:1}),e("p",null,[n("Fes.js 会在 "),e("a",W,[n("http://localhost:8000"),s(i)]),n(" 启动一个热重载的开发服务器。当你修改你的 .vue 文件时，浏览器中的内容也会自动更新。")]),e("img",{src:c.$withBase("home.png"),alt:"home"},null,8,D),A,F,s(d,null,{default:a(()=>[s(l,{title:"PNPM",active:""},{default:a(()=>[L]),_:1}),s(l,{title:"NPM"},{default:a(()=>[H]),_:1})]),_:1}),q,e("p",null,[n("发布之前，可以通过 "),e("a",z,[n("serve"),s(i)]),n(" 做本地验证，验证结果应该跟执行 "),J,n(" 的结果一样。")]),K,Q])}const Y=o(p,[["render",R],["__file","getting-started.html.vue"]]);export{Y as default};
