<template><h1 id="介绍"><a class="header-anchor" href="#介绍">#</a> 介绍</h1>
<p>VuePress 是一个以 Markdown 为中心的静态网站生成器。你可以使用 <a href="https://zh.wikipedia.org/wiki/Markdown" target="_blank" rel="noopener noreferrer">Markdown<OutboundLink/></a> 来书写内容（如文档、博客等），然后 VuePress 会帮助你生成一个静态网站来展示它们。</p>
<p>VuePress 诞生的初衷是为了支持 Vue.js 及其子项目的文档需求，但是现在它已经在帮助大量用户构建他们的文档、博客和其他静态网站。</p>
<h2 id="它是如何工作的"><a class="header-anchor" href="#它是如何工作的">#</a> 它是如何工作的？</h2>
<p>一个 VuePress 站点本质上是一个由 <a href="https://v3.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue<OutboundLink/></a> 和 <a href="https://next.router.vuejs.org" target="_blank" rel="noopener noreferrer">Vue Router<OutboundLink/></a> 驱动的单页面应用 (SPA)。</p>
<p>路由会根据你的 Markdown 文件的相对路径来自动生成。每个 Markdown 文件都通过 <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it<OutboundLink/></a> 编译为 HTML ，然后将其作为 Vue 组件的模板。因此，你可以在 Markdown 文件中直接使用 Vue 语法，便于你嵌入一些动态内容。</p>
<p>在开发过程中，我们启动一个常规的开发服务器 (dev-server) ，并将 VuePress 站点作为一个常规的 SPA。如果你以前使用过 Vue 的话，你在使用时会感受到非常熟悉的开发体验。</p>
<p>在构建过程中，我们会为  VuePress 站点创建一个服务端渲染 (SSR) 的版本，然后通过虚拟访问每一条路径来渲染对应的 HTML 。这种做法的灵感来源于 <a href="https://nuxtjs.org/" target="_blank" rel="noopener noreferrer">Nuxt<OutboundLink/></a> 的 <code>nuxt generate</code> 命令，以及其他的一些项目，比如 <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby<OutboundLink/></a>。</p>
<h2 id="为什么不是"><a class="header-anchor" href="#为什么不是">#</a> 为什么不是 ...?</h2>
<h3 id="nuxt"><a class="header-anchor" href="#nuxt">#</a> Nuxt</h3>
<p>Nuxt 是一套出色的 Vue SSR 框架， VuePress 能做的事情，Nuxt 实际上也同样能够胜任。但 Nuxt 是为构建应用程序而生的，而 VuePress 则更为轻量化并且专注在以内容为中心的静态网站上。</p>
<h3 id="vitepress"><a class="header-anchor" href="#vitepress">#</a> VitePress</h3>
<p>VitePress 是 VuePress 的孪生兄弟，它同样由 Vue.js 团队创建和维护。 VitePress 甚至比 VuePress 要更轻更快，但它在灵活性和可配置性上作出了一些让步，比如它不支持插件系统。当然，如果你没有进阶的定制化需求， VitePress 已经足够支持你将你的内容部署到线上。</p>
<p>这个比喻可能不是很恰当，但是你可以把 VuePress 和 VitePress 的关系看作 Laravel 和 Lumen 。</p>
<h3 id="docsify-docute"><a class="header-anchor" href="#docsify-docute">#</a> Docsify / Docute</h3>
<p>这两个项目同样都是基于 Vue，然而它们都是完全的运行时驱动，因此对 SEO 不够友好。如果你并不关注 SEO，同时也不想安装大量依赖，它们仍然是非常好的选择！</p>
<h3 id="hexo"><a class="header-anchor" href="#hexo">#</a> Hexo</h3>
<p>Hexo 一直驱动着 Vue 2.x 的文档。Hexo 最大的问题在于他的主题系统太过于静态以及过度地依赖纯字符串，而我们十分希望能够好好地利用 Vue 来处理我们的布局和交互。同时，Hexo 在配置 Markdown 渲染方面的灵活性也不是最佳的。</p>
<h3 id="gitbook"><a class="header-anchor" href="#gitbook">#</a> GitBook</h3>
<p>过去我们的子项目文档一直都在使用 GitBook 。 GitBook 最大的问题在于当文件很多时，每次编辑后的重新加载时间长得令人无法忍受。它的默认主题导航结构也比较有限制性，并且，主题系统也不是 Vue 驱动的。GitBook 背后的团队如今也更专注于将其打造为一个商业产品而不是开源工具。</p>
</template>