# @fesjs/plugin-locale

## 介绍
国际化插件，基于 [Vue I18n](https://github.com/intlify/vue-i18n-next)，用于解决 i18n 问题。
## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-locale": "^2.0.0"
    },
}
```


## 配置

### 约定式配置
Fes.js 约定如下目录，项目就拥有了 `zh-CN` 与 `en-US` 国际化语言切换：
```
src
  ├── locales
  │    ├── zh-CN.js
  │    └── en-US.js
  └── pages
  │    └── index.vue
  └── app.js
```
多语言文件的命名规范：`<lang>-<COUNTRY>.js`

多语言文件的内容规范：键值组成的字面量，如下：
```js
// src/locales/zh-CN.js
export default {
    menu: {
        interface: '接口'
    },
    overview: '概述',
    i18n: {
        internationalization: '国际化，基于',
        achieve: '实现。',
        ui: 'UI组件'
    }
};
```
```js
// src/locales/en-US.js
export default {
    menu: {
        interface: 'interface'
    },
    overview: 'Overview',
    i18n: {
        internationalization: 'internationalization，base on',
        achieve: 'to achieve.',
        ui: 'UI components'
    }
};
```
想了解更多语言信息配置、匹配规则，请参考 [Vue I18n](https://vue-i18n.intlify.dev/guide/essentials/syntax.html) 文档。


### 编译时配置
在执行 `fes dev` 或者 `fes build` 时，通过此配置生成运行时的代码，在配置文件`.fes.js` 中配置：
```js
export default {
    locale: {
    }
}
```
默认配置为：
```js
export default {
    locale: {
        locale: 'zh-CN', // default locale
        fallbackLocale: 'zh-CN', // set fallback locale
        baseNavigator: true, // 开启浏览器语言检测
        legacy: true, // 用户是否需要 Legacy API 模式
    }
} 
```
所有配置项如下：

#### locale
- **类型**：`String`
  
- **默认值**：`zh-CN`

- **详情**：当前的语言。

#### fallbackLocale
- **类型**：`String`
  
- **默认值**：`zh-CN`

- **详情**：兜底的语言，如果当前语言找不到配置，则使用默认语言，需要保证默认语言配置文件存在。

#### baseNavigator
- **类型**：`Boolean`
  
- **默认值**：`true`

- **详情**：开启浏览器语言检测。

默认情况下，当前语言环境的识别按照：`localStorage` 中 `fes_locale` 值 > 浏览器检测 > `default` 设置的默认语言 > `zh-CN` 中文。

#### legacy
- **类型**：`Boolean`
  
- **默认值**：`true`

- **详情**：用户是否需要 Legacy API 模式


### 运行时配置
暂无。

## API

### locale
插件 API 通过 `@fesjs/fes` 导出：
```js
import { locale } from '@fesjs/fes'
```

#### locale.messages
- **类型**：`Object`
  
- **详情**：当前的配置的语言信息。

#### locale.setLocale
- **类型**：`Function`
  
- **详情**：设置当前的语言。
- **参数**：
  - locale，语言的名称，应该是符合 `<lang>-<COUNTRY>` 规范的名称。
- **返回值**：`null`
```js
import { locale } from '@fesjs/fes';
locale.setLocale({ locale: 'en-US' });
```

#### locale.addLocale
- **类型**：`Function`
  
- **详情**：手动添加语言配置。
- **参数**：
  - locale，语言的名称，符合 `<lang>-<COUNTRY>` 规范的名称。
  - messages, 语言信息。
- **返回值**：`null`
```js
import { locale } from '@fesjs/fes'
locale.addLocale({ locale: 'ja-JP', messages: { test: 'テスト' } });
```


#### locale.getAllLocales
- **类型**：`Function`
  
- **详情**：获取当前获得所有国际化文件的列表，默认会在 locales 文件夹下寻找类似 `en-US.js` 文件。
- **参数**：null
- **返回值**：`Array`
```js
import { locale } from '@fesjs/fes';
console.log(locale.getAllLocales());
// ["en-US", "id-ID", "ja-JP", "pt-BR", "zh-CN", "zh-TW"]
```


### useI18n
Composition API, 只能在 `setup` 函数中使用，更多细节参考 [Vue I18n](https://vue-i18n.intlify.dev/api/composition.html#usei18n)。
举个 🌰：
```vue
<template>
  <form>
    <label>{{ t('language') }}</label>
  </form>
  <p>message: {{ t('hello') }}</p>
</template>

<script>
import { useI18n } from '@fesjs/fes'

export default {
 setup() {
   const { t } = useI18n()
   // Something to do ...

   return { ..., t }
 }
}
</script>
```

`useI18n()`返回结果是 [Composer](https://vue-i18n.intlify.dev/api/composition.html#composer)，提供类似 `t`、`n`、`d` 等转换函数，在模板中使用。
