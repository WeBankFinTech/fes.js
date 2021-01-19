<template><h1 id="贡献指南"><a class="header-anchor" href="#贡献指南">#</a> 贡献指南</h1>
<h2 id="概览"><a class="header-anchor" href="#概览">#</a> 概览</h2>
<p>项目仓库借助于 <a href="https://classic.yarnpkg.com/zh-Hans/docs/workspaces" target="_blank" rel="noopener noreferrer">Yarn Classic 工作区<OutboundLink/></a> 来实现 <a href="https://en.wikipedia.org/wiki/Monorepo" target="_blank" rel="noopener noreferrer">Monorepo<OutboundLink/></a> ，在 <code>packages</code> 目录下存放了多个互相关联的独立 Package 。</p>
<ul>
<li>
<p><code>@vuepress/core</code>: Core 模块。提供 Node API 来创建 VuePress App ，包括页面逻辑、插件系统、数据准备等功能。</p>
</li>
<li>
<p><code>@vuepress/client</code>: Client 模块。包含客户端页面入口，并提供了客户端开发时可以用到的类型和工具函数。</p>
</li>
<li>
<p><code>@vuepress/bundler-webpack</code>: 基于 Webpack 的 Bundler 模块。使用 Webpack 对 VuePress App 执行 <code>dev</code> 和 <code>build</code> 操作。</p>
</li>
<li>
<p><code>@vuepress/cli</code>: 命令行接口 (CLI) 模块。包含解析用户配置文件、调用 <code>@vuepress/core</code> 创建 VuePress App 、调用 <code>@vuepress/bundler-${name}</code> 来执行对应命令等功能。</p>
</li>
<li>
<p><code>@vuepress/theme-default</code>: 默认主题。</p>
</li>
<li>
<p><code>@vuepress/plugin-${name}</code>: 官方插件。</p>
</li>
<li>
<p><code>@vuepress/shared</code>: 既可以在 Node 端使用、也可以在客户端使用的工具函数模块。</p>
</li>
<li>
<p><code>@vuepress/utils</code>: 仅可以在 Node 端使用的工具函数模块。</p>
</li>
<li>
<p><code>vuepress</code>: 是 <code>@vuepress/cli</code> + <code>@vuepress/bundler-webpack</code> + <code>@vuepress/theme-default</code> 的简单封装。如果用户想使用 默认主题 + Webpack ，仅安装这个 Package 就可以了。</p>
</li>
</ul>
<h2 id="开发配置"><a class="header-anchor" href="#开发配置">#</a> 开发配置</h2>
<p>开发要求：</p>
<ul>
<li><a href="http://nodejs.org" target="_blank" rel="noopener noreferrer">Node.js<OutboundLink/></a> <strong>version 12+</strong></li>
<li><a href="https://classic.yarnpkg.com/zh-Hans/docs/install" target="_blank" rel="noopener noreferrer">Yarn v1 classic<OutboundLink/></a></li>
</ul>
<p>克隆代码仓库，并安装依赖：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>监听源文件修改：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>打开另一个终端，开始开发项目文档网站：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> docs:dev
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>本项目开发使用的一些主要工具：</p>
<ul>
<li><a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript<OutboundLink/></a> 作为开发语言</li>
<li><a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer">Jest<OutboundLink/></a> 用于单元测试</li>
<li><a href="https://eslint.org/" target="_blank" rel="noopener noreferrer">ESLint<OutboundLink/></a> + <a href="https://prettier.io/" target="_blank" rel="noopener noreferrer">Prettier<OutboundLink/></a> 用于代码检查和格式化</li>
</ul>
<h2 id="开发脚本"><a class="header-anchor" href="#开发脚本">#</a> 开发脚本</h2>
<h3 id="yarn-build"><a class="header-anchor" href="#yarn-build">#</a> <code>yarn build</code></h3>
<p><code>build</code> 命令会使用 <code>tsc</code> 将 TS 源文件编译为 JS 文件。</p>
<p>你在克隆代码仓库后，可能需要先执行该命令来确保项目代码可以顺利运行，因为编译后的 JS 文件被 <code>.gitignore</code> 排除在仓库以外了。</p>
<h3 id="yarn-copy"><a class="header-anchor" href="#yarn-copy">#</a> <code>yarn copy</code></h3>
<p><code>copy</code> 命令会执行所有子 Package 中的 <code>copy</code> 命令，将一些资源文件从源代码目录复制到输出目录。</p>
<p>一些资源文件（如 <code>.vue</code>, <code>.styl</code> 文件等）不能被 <code>build</code> 命令处理，但是同样需要将他们放置到输出目录中。</p>
<p>你在克隆代码仓库后，可能也需要先执行该命令来确保项目代码可以顺利运行。</p>
<h3 id="yarn-dev"><a class="header-anchor" href="#yarn-dev">#</a> <code>yarn dev</code></h3>
<p><code>dev</code> 命令使用监听 (watch) 模式执行 <code>copy</code> 和 <code>build</code> 命令。</p>
<h3 id="yarn-clean"><a class="header-anchor" href="#yarn-clean">#</a> <code>yarn clean</code></h3>
<p><code>clean</code> 命令会执行所有子 Package 中的 <code>clean</code> 命令，清除所有的输出文件目录和缓存文件。换言之，它将移除所有通过 <code>build</code> 和 <code>copy</code> 命令生成的文件。</p>
<p>当你想要从最初状态重新构建源代码时，你可以执行该命令。</p>
<h3 id="yarn-docs"><a class="header-anchor" href="#yarn-docs">#</a> <code>yarn docs:*</code></h3>
<h4 id="yarn-docs-build-yarn-docs-dev-yarn-docs-clean"><a class="header-anchor" href="#yarn-docs-build-yarn-docs-dev-yarn-docs-clean">#</a> <code>yarn docs:build</code>, <code>yarn docs:dev</code>, <code>yarn docs:clean</code></h4>
<p><code>docs:</code> 前缀表明，这些命令是针对文档 (documentation) 进行操作的，即 <code>docs</code> 目录。</p>
<p>VuePress 使用它自己来构建自己的文档网站。</p>
<p>你需要先执行 <code>yarn build &amp;&amp; yarn copy</code> 来构建 VuePress 源代码，然后再运行这些 <code>docs:</code> 开头的命令来开发或构建文档。</p>
<h4 id="yarn-docs-serve"><a class="header-anchor" href="#yarn-docs-serve">#</a> <code>yarn docs:serve</code></h4>
<p>在本地启动文档网站服务器。</p>
<p>你需要先运行 <code>yarn docs:build</code> 来生成文档网站的输出文件，然后再通过该命令来启动文档网站。</p>
<h3 id="yarn-lint"><a class="header-anchor" href="#yarn-lint">#</a> <code>yarn lint</code></h3>
<p><code>lint</code> 命令使用 ESLint 来检查所有源文件。</p>
<h3 id="yarn-test"><a class="header-anchor" href="#yarn-test">#</a> <code>yarn test</code></h3>
<p><code>test</code> 命令使用 Jest 来运行单元测试。</p>
</template>