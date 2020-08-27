<template>
    <div class="article">
        <h2>{{$t('overview')}}</h2>
        <p>对vue-resource的封装。公共的异常处理，响应处理等。</p>

        <h2>函数</h2>
        <ul>
            <li>
                <p>get(url, data, option)</p>
                <p>
                    发起一个get请求，返回值是promise对象
                </p>
            </li>
            <li>
                <p>post(url, data, option)</p>
                <p>
                    发起一个post请求，返回值是promise对象
                </p>
            </li>
            <li>
                <p>fetch(url, data, option)</p>
                <p>
                    默认调用post请求，返回值是promise对象
                </p>
            </li>
            <li>
                <p>option(option)</p>
                <p>
                    设置ajax的公共配置，比如root（根路径）、timeout（超时时间）、xhr（xhr对象）
                </p>
            </li>
            <li>
                <p>setError(errors)</p>
                <p>
                    设置当响应状态是非200时触发的事件钩子，比如401啊等
                </p>
            </li>
            <li>
                <p>setResponse(constructionOfResponse)</p>
                <p>
                    设置响应结构。响应一般会由状态码、错误消息、数据组成。通过此函数设置一个路径，当响应回来是来解析响应。
                </p>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
};
</script>
