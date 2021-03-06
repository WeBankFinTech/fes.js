## 架构

<!-- ![架构](/framework.png "架构") -->
<img :src="$withBase('framework.png')" alt="架构">

Fes.js 把大家常用的技术栈封装成一个个插件进行整理，收敛到一起，让大家只用 Fes.js 就可以完成 80% 的日常工作。

## 插件和插件集
<p>
    <img :src="$withBase('plugins.png')" alt="插件" title="插件" style="width: 500px" class="medium-zoom-image">
</p>
Fes.js 支持插件和插件集，通过这张图应该很好理解到他们的关系，通过插件集我们把插件收敛依赖然后支持不同的业务类型。