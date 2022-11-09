# 静态资源

有些内容不需要经过 `webpack` 模块化处理，则可以将这些内容放在 `public` 文件夹，构建后会直接复制到 `dist` 目录，所以你需要通过`BASE_URL`来引入它们。

### 在 HTML 模板中使用

在 `index.html` 中需要设置：

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico" />
```

### 在.vue 和 js 文件中使用

```vue
<template>
    <img :src="`${publicPath}my-image.png`" />
</template>
<script>
export default {
    setup() {
        return {
            publicPath: process.env.BASE_URL,
        };
    },
};
</script>
```
