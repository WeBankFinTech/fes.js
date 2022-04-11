# 插件 API

## 属性

### api.paths

一些关键的路径：
- cwd，执行命令的绝对路径
- absNodeModulesPath，nodeModule的绝对路径
- absOutputPath，输出 `build` 产物的绝对路径
- absSrcPath，`src` 目录的绝对路径
- absPagesPath，`pages`目录的绝对路径
- absTmpPath，`.fes`临时文件目录的绝对路径

### api.cwd
执行命令的绝对路径

### api.pkg
`package.json`的内容

### api.configInstance
`config`实例

### userConfig
用户配置
                        
### config
插件配置可被修改，此为最终的配置

### env
process.env

### args
环境变量

## 核心方法

### describe
注册阶段执行，用于描述插件或插件集的 id、key、配置信息、启用方式等。

用法：**describe({ id?: string, key?: string, config?: { default, schema, onChange } }, enableBy?)**

例如：
```js
 api.describe({
    key: 'esbuild',
    config: {
        schema(joi) {
            return joi.object();
        },
        default: {}
    },
    enableBy: api.EnableBy.config,
});
```
注：

- `config.default` 为配置的默认值，用户没有配置时取这个
- `config.schema` 用于声明配置的类型，基于 [joi](https://hapi.dev/module/joi)，如果你希望用户进行配置，这个是必须的，否则用户的配置无效
- `config.onChange` 是 `dev` 阶段配置被修改后的处理机制，默认会重启 dev 进程，也可以修改为 api.ConfigChangeType.regenerateTmpFiles 只重新生成临时文件，还可以通过函数的格式自定义
- `enableBy` 为启用方式，默认是注册启用，可更改为 `api.EnableBy.config`，还可以用自定义函数的方式决定其启用时机（动态生效）


### register
为 api.applyPlugins 注册可供其使用的 hook。

用法：**register({ key: string, fn: Function, pluginId?: string, before?: string, stage?: number })**

参数：
- key：唯一id
- fn：hook函数，当执行`api.applyPlugins`时，此函数被执行。
- pluginId：插件id，如果配置了插件id，则只有此插件未被禁用时，才会执行。

```js
// 可同步
api.register({
  key: 'foo',
  fn() {
    return 'a';
  },
});

// 可异步
api.register({
  key: 'foo',
  async fn() {
    await delay(100);
    return 'b';
  },
});
```

注意：
- fn 支持同步和异步，异步通过 Promise，返回值为 Promise 即为异步
- fn 里的内容需结合 `api.appyPlugins` 的 `type` 参数来看,如果是 `api.ApplyPluginsType.add`，需有返回值，这些返回值最终会被合成一个数组。如果是 `api.ApplyPluginsType.modify`，需对第一个参数做修改，并返回它，它会作为下个hook的参数。 如果是 `api.ApplyPluginsType.event`，无需返回值
- stage 和 before 都是用于调整执行顺序的，参考 tapable
- stage 默认是 0，设为 -1 或更少会提前执行，设为 1 或更多会后置执行

### applyPlugins

取得 register 注册的 hooks 执行后的数据。

用法：**applyPlugins({ key: string, type: api.ApplyPluginsType, initialValue?: any, args?: any })**

参数：
- key：唯一id
- type：hook的类型。
- initialValue：初始值。
- args：参数，hook函数执行时，args会作为参数传入。

例如：
```js
const foo = await api.applyPlugins({
  key: 'foo',
  type: api.ApplyPluginsType.add,
  initialValue: [],
});
console.log(foo); // ['a', 'b']
```

#### api.ApplyPluginsType

编译时插件hook执行类型，enum 类型，包含三个属性：

- compose，用于合并执行多个函数，函数可决定前序函数的执行时机
- modify，用于修改值
- event，用于执行事件，前面没有依赖关系

### registerMethod

往 `api` 上注册方法。如果有提供 `fn`，则执行 `fn` 定义的函数。

用法：**registerMethod({ name: string, fn?: Function, exitsError?: boolean })**

例如：
```js
 api.registerMethod({
    name: 'writeTmpFile',
    fn({
        path,
        content
    }) {
        assert(
            api.stage >= api.ServiceStage.pluginReady,
            'api.writeTmpFile() should not execute in register stage.'
        );
        const absPath = join(api.paths.absTmpPath, path);
        api.utils.mkdirp.sync(dirname(absPath));
        if (!existsSync(absPath) || readFileSync(absPath, 'utf-8') !== content) {
            writeFileSync(absPath, content, 'utf-8');
        }
    }
});
```
然后在插件中可以使用：
```js
api.writeTmpFile()
```


### registerCommand

注册命令，基于 [commander](https://github.com/tj/commander.js/) 实现的机制。

用法：**registerCommand({ command: string, description: string, fn: Function, options?: Object })**

参数：
- command
- description，描述文字，输入 `--help` 会打印
- fn，命令执行的函数，参数有：
  - rawArgv，原始参数
  - args，参数
  - options，执行命令时附带的的参数配置
  - program，commander对象
- options，参数配置，基于 [commander](https://github.com/tj/commander.js/) 。

例如：
```js
api.registerCommand({
    command: 'webpack',
    description: 'inspect webpack configurations',
    options: [{
        name: '--rule <ruleName>',
        description: 'inspect a specific module rule'
    }, {
        name: '--plugin <pluginName>',
        description: 'inspect a specific plugin'
    }, {
        name: '--rules',
        description: 'list all module rule names'
    }, {
        name: '--plugins',
        description: 'list all plugin names'
    }, {
        name: '--verbose',
        description: 'show full function definitions in output'
    }],
    async fn({ rawArgv, args, options, program}) {
    }
})
```
当项目引入此插件后，使用：
```bash
fes webpack
```

### registerPresets

注册插件集，参数为路径数组。

用法：**registerPresets(presets: string[])**

例如：
```js
api.registerPresets([
    { id: 'preset_2', key: 'preset2', apply: () => () => {} },
    require.resolve('./preset_3'),
]);
```

### registerPlugins

注册插件，参数为路径数组。

用法：**registerPlugins(plugins: string[])**

例如：
```js
api.registerPlugins([
    { id: 'preset_2', key: 'preset2', apply: () => () => {} },
    require.resolve('./preset_3'),
]);
```

### hasPlugins
判断是否有注册某个插件，插件的 id 规则：
- id 默认为包名
- 内置插件以 `@@` 为前缀，比如 `@@/registerMethod`

用法：**hasPlugins(pluginIds: string[])**

例如
```js
// 判断是否有注册 @fesjs/plugin-locale
api.hasPlugins(['@fesjs/plugin-locale']);
```

::: tip
如果在注册阶段使用，只能判断在他之前是否有注册某个插件。
:::

### hasPresets
判断是否有注册某个插件集。

用法：**hasPresets(presetIds: string[])**

例如
```js
// 判断是否有注册
api.hasPlugins(['@fesjs/preset-xxx']);
```

::: tip
如果在注册阶段使用，只能判断在他之前是否有注册某个插件集。
:::

### skipPlugins
声明哪些插件需要被禁用，参数为插件 id 的数组。

用法：**hasPresets(presetIds: string[])**

例如：
```js
// 禁用 plugin-model 插件
api.skipPlugins(['@fesjs/plugin-model']);
```

## 扩展方法

通过 api.registerMethod() 扩展的方法。



### addPluginExports
把插件需要导出的运行时 API 写入`@fesjs/fes`。
```js
api.addPluginExports(() => [
    {
        specifiers: ['access', 'useAccess'],
        source: absoluteFilePath
    }
]);
```
这样用户使用时：
```js
import { access, useAccess } from '@fesjs/fes';
```

### addCoreExports
提供给其他插件运行时需要的 API。
```js
api.addCoreExports(() => [
    {
        specifiers: ['getRoutes', 'getRouter', 'getHistory', 'destroyRouter'],
        source: absCoreFilePath
    }
]);
```
使用：
```js
import { getHistory, destroyRouter } from '@@/core/coreExports';
```

### addRuntimePlugin
添加运行时插件，返回值格式为表示文件路径的字符串。

例如：
```js
api.addRuntimePlugin(() => join(__dirname, './runtime'));
```

### addRuntimePluginKey
添加插件提供的运行时配置的 key，返回值格式为字符串。

例如：
```js
api.addRuntimePluginKey(() => 'some');
```
则用户可以：
```js
// app.js
const some = function(){
    return {

    }
}

```

### addEntryImportsAhead
在入口文件现有 import 的前面添加 import。

例如：
```js
api.addEntryImportsAhead(() => [{ source: 'anypackage' }]);
```

### addEntryImports
在入口文件现有 import 的后面添加 import。

例如：
```js
api.addEntryImport(() => {
  return [
    {
      source: '/modulePath/xxx.js',
      specifier: 'moduleName',
    }
  ]
});
```

### addEntryCodeAhead
在入口文件最前面（import 之后）添加代码。

例如：
```js
api.addEntryCodeAhead(
    () => `${globalCSSFile
        .map(file => `require('${winPath(relative(absTmpPath, file))}');`)
        .join('')}`

```
    
### addEntryCode
在入口文件最后添加代码。

例如：
```js
api.addEntryCode(() => {
  return `console.log('works!')`
})
```

### addHTMLHeadScripts
在 HTML 头部添加脚本。

例如：
```js
api.addHTMLHeadScripts(() => {
  return [
    {
      content: '',
      src: '',
      // ...attrs
    },
  ];
});
```

### addBeforeMiddlewares
添加在 `webpack compiler` 中间件之前的中间件，返回值格式为 `express` 中间件。

例如：
```js
api.addBeforeMiddlewares(() => {
  return (req, res, next) => {
    if (false) {
      res.end('end');
    } else {
      next();
    }
  };
});
```

### addMiddlewares
添加在 `webpack compiler` 中间件之后的中间件，返回值格式为 `express` 中间件。



### addTmpGenerateWatcherPaths
添加重新生成临时文件的监听路径。

例如：
```js
api.addTmpGenerateWatcherPaths(() => [
    './app.js',
]);
```

### chainWebpack
通过 [webpack-chain] 的方式修改 webpack 配置。

例如：
```js
api.chainWebpack((memo) => {
    memo.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.esm-bundler.js');
});
```

### copyTmpFiles
批量写临时文件。

例如：
```js
 api.copyTmpFiles({
    namespace,
    path: join(__dirname, 'runtime'),
    ignore: ['.tpl']
});
```

参数：

- namespace：复制到临时文件夹下的目标目录
- path：需要复制的文件目录
- ignore：需要排除的文件

::: tip
不能在注册阶段使用，通常放在 api.onGenerateFiles() 里，这样能在需要时重新生成临时文件
临时文件的写入做了缓存处理，如果内容一致，不会做写的操作，以减少触发 `webpack` 的重新编译
:::


### getPort
获取端口号，dev 时有效。

### getHostname
获取 hostname，dev 时有效。

### getServer
获取 devServer，dev 时有效。

### getRoutes
获取 `api.modifyRoutes` 修改过后的路由信息。

### getRoutesJSON
获取格式化后的路由信息

### modifyRoutes

修改路由。

例如：
```js
// 把BaseLayout插入到路由配置中，作为根路由
api.modifyRoutes(routes => [
    {
        path: '/',
        component: winPath(
            join(api.paths.absTmpPath || '', absFilePath)
        ),
        children: routes
    }
]);
```

### modifyBundleConfigOpts
修改获取 bundleConfig 的函数参数。

例如：
```js
api.modifyBundleConfigOpts(memo => {
    memo.miniCSSExtractPluginPath = require.resolve('mini-css-extract-plugin');
    memo.miniCSSExtractPluginLoaderPath = require.resolve(
    'mini-css-extract-plugin/dist/loader',
    );
    return memo;
});

```

### modifyBundleConfig
修改 bundle 配置。

```js
api.modifyBundleConfig((bundleConfig) => {
    // do something
    return bundleConfig;
});
```

### modifyBabelOpts
修改 babel 配置项。

例如：
```js
api.modifyBabelOpts((babelOpts) => {
    if (api.config.babelPluginImport) {
        api.config.babelPluginImport.forEach((config) => {
            babelOpts.plugins.push(['import', config]);
        });
    }
    return babelOpts;
});
```    

### modifyBabelPresetOpts
修改 babel 插件的配置。

例如：
```js
api.modifyBabelPresetOpts(opts => {
    return {
      ...opts,
      import: (opts.import || []).concat([
        { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true },
      ]),
    };
});
```

### modifyPaths
修改 paths 对象。


### modifyDefaultConfig
修改默认配置。
例如：
```js
api.modifyDefaultConfig((memo) => {
  return {
    ...memo,
    ...defaultOptions,
  };
});
```

### modifyConfig
修改最终配置。

例如：
```js
api.modifyConfig((memo) => {
  return {
    ...memo,
    ...defaultOptions,
  };
});

```

### modifyPublicPathStr
修改 publicPath 字符串。

例如：
```js
api.modifyPublicPathStr(() => {
  return api.config.publicPath || '/';
});
```

### onPluginReady
在插件初始化完成触发。在 onStart 之前，此时还没有 config 和 paths，他们尚未解析好。

### onStart
在命令注册函数执行前触发。可以使用 config 和 paths。

### onExit
dev 退出时触发。

### onGenerateFiles
生成临时文件，触发时机在 webpack 编译之前。

### restartServer
重启 devServer，dev 时有效。

### writeTmpFile
写临时文件。

例如：
```js
api.writeTmpFile({
    path: absoluteFilePath,
    content: Mustache.render(
        readFileSync(join(__dirname, 'runtime/core.tpl'), 'utf-8'),
        {
            REPLACE_ROLES: JSON.stringify(roles)
        }
    )
});
```

参数：

- path：相对于临时文件夹的路径
- content：文件内容

::: tip
不能在注册阶段使用，通常放在 api.onGenerateFiles() 里，这样能在需要时重新生成临时文件
临时文件的写入做了缓存处理，如果内容一致，不会做写的操作，以减少触发 webpack 的重新编译
:::

