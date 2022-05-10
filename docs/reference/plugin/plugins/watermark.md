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

## 编译时配置

```js
export default {
    watermark: {
        disabled: false
    },
}
```

### disabled

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
import { createWatermark, destroyWatermark } from '@fesjs/fes';

createWatermark({ content: '我是水印' }); // 生成水印
destroyWatermark(); // 销毁水印
```

默认参数是：
```js
{
    container = document.body,
    width = 300,
    height = 300,
    textAlign = 'center',
    textBaseline = 'middle',
    fontSize = '14px',
    fontFamily = 'Microsoft Yahei',
    fillStyle = 'rgba(184, 184, 184, 0.3)',
    content = '请勿外传',
    rotate = 25,
    zIndex = 99999,
    timestamp = 'YYYY-MM-DD HH:mm'
}
```

如果不需要时间戳，则可以设置`timestamp`为`false`。