<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>操作Storage，包含cookie、sessionStorage、localStorage。 category值SESSION对应sessionStorage，LOCAL对应localStorage，COOKIE对应cookie</p>

        <h2>函数</h2>
        <ul>
            <li>
                <p>set(key, value, category = SESSION, expired)</p>
                <p>
                    往Storage中存入一个值
                </p>
            </li>
            <li>
                <p>get(key, category = SESSION)</p>
                <p>
                    从Storage中取得值
                </p>
            </li>
            <li>
                <p>clear(category = SESSION)</p>
                <p>
                    清除所有值
                </p>
            </li>
            <li>
                <p>remove(key, category = SESSION)</p>
                <p>
                    删除key对应的值
                </p>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
};
</script>
