<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>数据字典管理对象。当程序加载时，从common/map.js中读取原始数据，转换成{value: value, text: text}，存入FesMap</p>

        <h2>函数</h2>
        <ul>
            <li>
                <p>getNameByValue(name, value)</p>
                <p>
                    从FesMap[name]中找出值是value的那一条数据
                </p>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
};
</script>
