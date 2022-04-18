# @fesjs/plugin-watermark

## 介绍
给页面添加水印效果

## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-watermark": "^2.0.0"
    }
}
```

## 配置

### 编译时配置

```js
export default {
    watermark: {
        disabled: false
    },
}
```

#### disabled

是否禁用水印，默认是`false`。

可以在开发环境关闭水印：

```js
export default {
    watermark: {
        disabled: true
    },
}
```

## API

### createWatermark

创建水印功能，通过 `@fesjs/fes` 导入 API：
```js
import { createWatermark } from '@fesjs/fes'

createWatermark({ content: '我是水印' });
```


默认参数是：
```js
{
    container = document.body,
    width = '300px',
    height = '300px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '16px Microsoft Yahei',
    fillStyle = 'rgba(184, 184, 184, 0.2)',
    content = '请勿外传',
    rotate = '45',
    zIndex = 99999,
    timestamp = 'YYYY-MM-DD hh:mm'
}
```

如果不需要时间戳，则可以设置`timestamp`为`false`。