<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>
            Fes的路由是根据src/pages目录自动生成的<br>
        </p>
        <h2>生成规则</h2>
        <pre>
   pages
    ├── index.fes         # 根路由页面 路径 http://localhost:5000/index.html#!/
    ├── a.fes             # 路径 /a
    ├── b
    │   ├── index.fes     # 路径 /b
    │   ├── @id.fes       # 动态路由 /b/:id
    │   └── c.fes         # 路径 /b/c(优先于/b/:id进行匹配)
    └── layout.fes        # 根路由下所有page共用的外层
        </pre>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    FesData() {
        return {
            value: +new Date()
        };
    }
};
</script>
