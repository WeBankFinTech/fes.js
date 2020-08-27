<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>全局的状态管理容器</p>

        <h2>函数</h2>
        <ul>
            <li>
                <p>get(prop)</p>
                <p>
                    根据prop获取值
                </p>
            </li>
            <li>
                <p>set(prop, value)</p>
                <p>
                    设置一个全局的状态
                </p>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
};
</script>
