# 使用图片

## 使用图片

假设在 `src/images` 目录下有 `logo.png`。

### Vue 里使用图片

```vue
<template>
  <img src="@/images/logo.png`">
</template>
```

### JS 里使用图片
```js
import imageUrl from '@/images/logo.png`'
```

### CSS 里使用图片
```css
.logo {
    background: url('@/images/logo.png')
}
```
注意：

1. 这是 `webpack` 的规则，如果切到其他打包工具，可能会有变化
2. `less` 中同样适用


## `public` 文件夹 

有些内容不需要经过 `webpack` 模块化处理，则可以将这些内容放在 `public` 文件夹，构建后会直接复制到 `dist` 目录，所以你需要通过`BASE_URL`来引入它们。

### 在HTML模板中使用


在 `public/index.html` 中需要设置：

```html
<link rel="icon" href="<%= BASE_URL %>favicon.ico">
```

### 在.vue 文件中使用

```vue
<template>
  <img :src="`${publicPath}my-image.png`">
</template>
<script>
export default {
  setup() {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}
</script>
```

