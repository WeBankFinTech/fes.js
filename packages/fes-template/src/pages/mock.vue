<template>
    <div>
        mock and proxy
    </div>
</template>
<config>
{
    "name": "mock",
    "title": "$mock"
}
</config>
<script setup>
import { request } from '@fesjs/fes';

console.log('测试 mock!!');

request('/v2/file')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

request('/v2/movie/in_theaters_mock', { a: 1 }, 'get')
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });

console.log('测试 proxy!!');

request(
    '/v2/movie/in_theaters_proxy',
    { a: 1 },
    {
        method: 'get',
        headers: { Accept: '*/*' }
    }
)
    .then((resp) => {
        console.log(resp);
    })
    .catch((err) => {
        console.log(err);
    });
</script>
