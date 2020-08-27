<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>对Vue做了一层封装。给Vue添加了一些属性，方便使用。</p>

        <h2>属性</h2>
        <ul>
            <li><router-link to="/api/fesApp">this.FesApp App实例</router-link></li>
            <li><router-link to="/api/fesUtil">this.FesUtil 工具函数</router-link></li>
            <li><router-link to="/api/fesStorage">this.FesStorage 操作存储: cookie、sessionStorage、localStorage</router-link></li>
            <li><router-link to="/api/fesApi">this.FesApi 操作Ajax</router-link></li>
        </ul>

        <h2>响应式数据FesData</h2>
        <ul>
            <li>
                <p>双向绑定的值，类似绑定到ng里面scope的值</p>
                <p>
                    <input v-model="data1">  {{data1}}
                </p>
            </li>
            <li>
                <p><router-link to="/api/fesMap"><strong>数据字典FesMap</strong></router-link></p>
                <p>FesMap会自动挂载到FesData</p>
                <p>FesMap: {{FesMap}}</p>
            </li>
            <li>
                <p><router-link to="/api/fesFesx"><strong>全局状态FesFesx</strong></router-link></p>
                <p>FesFesx会自动挂载到FesData </p>
                <p>FesFesx: {{FesFesx}}</p>
            </li>
        </ul>


        <h2>异步响应数据FesSyncData</h2>
        <p>进入路由时根据接口查询到的值，并且设置成响应数据</p>
        <p>
            <input v-model="data2">
        </p>
        <p>
            data2: {{data2}}
        </p>


        <h2>过滤器</h2>
        <p>日期: {{date}} => {{date | date}}</p>
        <p>日期（带参数）: {{date}} => {{date | date('yyyy-MM-dd')}}</p>
        <p>金钱: {{money}} => {{money | money}}</p>
        <p>银行卡: {{card}} => {{card | card}}</p>
        <p>加密: {{safety}} => {{safety | safety(4,3)}}</p>
        <p>数据字典: {{map}} => {{map | map(FesMap.status)}}</p>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
    FesData: {
        data1: '1',
        money: 100000,
        card: '11122233242323',
        safety: '42222991018719191',
        map: '1',
        date: new Date().getTime()
    },
    FesSyncData: {
        data2: ['/getNumber', {
            max: 100,
            min: 1
        }]
    },
    FesReady() {
        // do something
    }
};
</script>
