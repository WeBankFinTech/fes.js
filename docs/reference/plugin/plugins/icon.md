# @fesjs/plugin-icon

## 介绍

提供以 `component` 的方式，直接使用 svg icon 的能力。

## 启用方式

在 `package.json` 中引入依赖：

```json
{
    "dependencies": {
        "@fesjs/fes": "^3.0.0",
        "@fesjs/plugin-icon": "^3.0.0"
    }
}
```

## 使用

新建 `src/icons` 目录，将 svg 文件放入其中，在 `component` 中引用：

```jsx
<fes-icon type="iconName" />
```

### 属性

| 属性   | 说明         | 类型      |
| :----- | :----------- | :-------- |
| type   | svg 文件名   | `string`  |
| spin   | 是否无限旋转 | `boolean` |
| rotate | 旋转角度     | `number`  |
