# @fesjs/plugin-monaco-editor


## 介绍
我们会遇到需要编辑代码的场景，比如编辑`json`、`javascript`、`python`等等，[Monaco Editor](https://github.com/Microsoft/monaco-editor) 是一个好用而且强大的的代码编辑器库，引入`Monaco Editor`有一定的成本，插件实现了胶水代码，提供轻松引入的能力。目前内置的 `Monaco Editor` 版本是 `1.9.1`。

## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@fesjs/fes": "^2.0.0",
        "@fesjs/plugin-monaco-editor": "^2.0.0"
    },
}
```

## 配置

### 编译时配置
在执行 `fes dev` 或者 `fes build` 时，通过此配置生成运行时的代码，在配置文件`.fes.js` 中配置：
```js
export default {
    monacoEditor: {
        languages: ['javascript', 'typescript', 'html', 'json']
    }
}
```
我们通过 `monaco-editor-webpack-plugin` 集成 `Monaco Editor` 的 `ESM`版本，所以编辑时其实就是 `monaco-editor-webpack-plugin` 的配置，具体配置项参考[文档](https://github.com/Microsoft/monaco-editor-webpack-plugin)。


#### filename
- **类型**：自定义worker脚本名称
  
- **默认值**：`'[name].worker.js'`

#### publicPath
- **类型**：自定义worker脚本的路径
  
- **默认值**：`''`

#### languages
- **类型**：需要支持的语言类型
  
- **默认值**：`['abap', 'apex', 'azcli', 'bat', 'bicep', 'cameligo', 'clojure', 'coffee', 'cpp', 'csharp', 'csp', 'css', 'dart', 'dockerfile', 'ecl', 'elixir', 'fsharp', 'go', 'graphql', 'handlebars', 'hcl', 'html', 'ini', 'java', 'javascript', 'json', 'julia', 'kotlin', 'less', 'lexon', 'liquid', 'lua', 'm3', 'markdown', 'mips', 'msdax', 'mysql', 'objective-c', 'pascal', 'pascaligo', 'perl', 'pgsql', 'php', 'postiats', 'powerquery', 'powershell', 'pug', 'python', 'qsharp', 'r', 'razor', 'redis', 'redshift', 'restructuredtext', 'ruby', 'rust', 'sb', 'scala', 'scheme', 'scss', 'shell', 'solidity', 'sophia', 'sparql', 'sql', 'st', 'swift', 'systemverilog', 'tcl', 'twig', 'typescript', 'vb', 'xml', 'yaml']`

- **详情**：默认是全部，但是编译后包体积会非常大，建议用到什么语言则配置什么语言。特别某些语言依赖其他语言，例如`javascript`依赖`typescript`，需要使用`javascript`时需要配置为：
```js
export default {
    monacoEditor: {
        languages: ['javascript', 'typescript']
    }
}
```

## API

### monaco
编辑器的全局对象，提供扩展语言，自定义主题等等API，具体用法请查看[monaco](https://microsoft.github.io/monaco-editor/)官方文档。
```js
import { monaco } from '@fesjs/fes';

monaco.editor.defineTheme('myCoolTheme', {
	base: 'vs',
	inherit: false,
	rules: [
		{ token: 'custom-info', foreground: '808080' },
		{ token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
		{ token: 'custom-notice', foreground: 'FFA500' },
		{ token: 'custom-date', foreground: '008800' },
	]
});

```

### 组件 MonacoEditor

```vue
<template>
    <MonacoEditor 
        v-model="json"
        language="json"
        height="400px"
        check>
    </MonacoEditor>
</template>
<script>
import { MonacoEditor } from '@fesjs/fes';
export default {
    components: {
        MonacoEditor
    },
    setup(){
        const json = ref('');
        return {
            json
        };
    }
}
</script>
```

#### props
| 属性 | 说明 | 类型 | 默认值  |
| ------------- | ------------- | ------------- | ------------- |
| theme  | 编辑器的主题，使用其他主题需要先使用`monaco.editor.defineTheme`定义主题 | string | `defaultTheme` |
| language | 编辑器的语言 | string | - |
| height  | 编辑器的高度 | string | `100%` |
| width  | 编辑器的宽度 | string | `100%` |
| modelValue(v-model)  | 编辑器的代码 | string | - |
| readOnly  | 是否只读 | boolean | `false` |
| options  | 编辑器的配置对象 | object | `{}` |
| check  | 是否检查代码，如果检查不通过则不更新数据，目前只支持`json` | boolean | `false` |

#### events

| 事件名称 | 说明 | 回调参数 |
| ------------- | ------------- | ------------- |
| onload  | 编辑器初始化后触发 | ({monaco, editor, editorModel}) => void |
| scrollChange  | 滚动时触发 | (e) => void |