<template><h1 id="page"><a class="header-anchor" href="#page">#</a> Page</h1>
<p>VuePress is markdown-centered. Each markdown file inside your project is a standalone page.</p>
<h2 id="routing"><a class="header-anchor" href="#routing">#</a> Routing</h2>
<p>By default, the route path of a page is determined by the relative path of your markdown file.</p>
<p>Assuming this is the directory structure of your markdown files:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  └─ README.md
   ├─ contributing.md
   └─ README.md
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>Take the <code>docs</code> directory as your <RouterLink to="/reference/cli.html">sourceDir</RouterLink>, e.g. your are running <code>vuepress dev docs</code> command. Then the route paths of your markdown files would be:</p>
<table>
<thead>
<tr>
<th>Relative Path</th>
<th>Route Path</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>/README.md</code></td>
<td><code>/</code></td>
</tr>
<tr>
<td><code>/contributing.md</code></td>
<td><code>/contributing.html</code></td>
</tr>
<tr>
<td><code>/guide/README.md</code></td>
<td><code>/guide/</code></td>
</tr>
<tr>
<td><code>/guide/page.md</code></td>
<td><code>/guide/page.html</code></td>
</tr>
</tbody>
</table>
<h2 id="frontmatter"><a class="header-anchor" href="#frontmatter">#</a> Frontmatter</h2>
<p>A markdown file could contain a <a href="https://yaml.org/" target="_blank" rel="noopener noreferrer">YAML<OutboundLink/></a> frontmatter. The frontmatter must be at the top of the Markdown file and must be wrapped with a couple of triple-dashed lines. Here is a basic example:</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token font-matter yaml language-yaml"><span class="token key atrule">lang</span><span class="token punctuation">:</span> en<span class="token punctuation">-</span>US
<span class="token key atrule">title</span><span class="token punctuation">:</span> Title of this page
<span class="token key atrule">description</span><span class="token punctuation">:</span> Description of this page</span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>You must have noticed that those fields are similar with the <RouterLink to="/guide/configuration.html#site-config">Site Config</RouterLink> of in the <RouterLink to="/guide/configuration.html#config-file">Config File</RouterLink>. You can override <code>lang</code>, <code>title</code>, <code>description</code>, etc., of current page via frontmatter. So you can take frontmatter as page scope config.</p>
<p>Also, VuePress has built-in support for some frontmatter fields, and your theme may have its own special frontmatter, too.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Check out the <RouterLink to="/reference/frontmatter.html">Frontmatter Reference</RouterLink> for a full list of VuePress built-in frontmatter.</p>
<p>Check out the <RouterLink to="/reference/default-theme/frontmatter.html">Default Theme &gt; Frontmatter Reference</RouterLink> for the frontmatter of default theme.</p>
</div>
<h2 id="content"><a class="header-anchor" href="#content">#</a> Content</h2>
<p>The main content of your page is written in Markdown. VuePress will firstly transform your Markdown to HTML code, then treat the HTML code as <code>&lt;template&gt;</code> of Vue SFC.</p>
<p>With the power of <a href="https://github.com/markdown-it/markdown-it" target="_blank" rel="noopener noreferrer">markdown-it<OutboundLink/></a> and Vue template syntax, the basic Markdown can be extended a lot. Next, check out the <RouterLink to="/guide/markdown.html">Markdown</RouterLink> guide for all the extensions of Markdown in VuePress.</p>
</template>