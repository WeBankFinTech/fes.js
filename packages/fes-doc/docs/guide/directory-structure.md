# 目录结构

在[快速入门](#/guide/play)中，大家对框架应该有初步的印象，接下来我们了解下目录结构。  

## 目录规范
Fes.js遵循 **“约定优于配置”** 的原则，推荐的目录结构如下:
```
fes-project
├── .eslintrc.js
├── fes.config.js
├── mock.js(可选)
├── webpack.config.js(可选)
├── package.json
└── src
    ├── app.js
    ├── assets
    │   ├── images
    │   │   ├── bg.png
    │   │   └── logo.png
    │   ├── styles
    │   │   ├── main.scss
    │   │   └── variables.scss
    │   └── utils.js
    ├── components
    │   ├── fesHeader.vue
    │   ├── fesLeft.vue
    │   └── wbDate.vue
    ├── pages
    │   ├── home
    │   │   └── index.vue
    │   └── list
    │       ├── edit
    │       │   └── index.vue
    │       └── index.vue
    └── static
        └── favicon.ico
```


## fes.config.js
配置文件
```javascript
module.exports = {
    // 是否采用行内 sso 登录
    sso: false, 
    // 可选有vertical、horizontal，默认vertical
    mode: 'vertical', 
    // 可选有blue、dark，默认blue
    theme: 'blue', 
    // 项目名称
    fesName: 'xx 运营平台', 
    // 图标，可以将 favicon.ico 文件放入 src/static
    favicon: 'static/favicon.ico', 
    // 是否显示左侧区域，默认true
    FesLeft: true, 
    // 是否显示头部区域，默认为false
    FesHeader: false,
    // 环境变量配置, 默认使用local环境
    env: {
        // 本地开发环境
        local: {
            api: ''
        },
        // 开发环境 fes [dev/build] --env=develop
        develop: {
            api: 'http://h.adm-test.webank.io'
        },
        // 生产环境 fes [dev/build] --env=prod 
        prod: {
            api: 'http://adm.webank.io'
        }
    },
    // 配置角色，控制显示的菜单内容和路由权限，使用FesApp.setRole('unLogin')来修改当前用户的角色
    roles: {
        unLogin: ['/home'],
        service: ['/list'],
        admin: ['/list', '/api/fes']
    },
    // 数据字典
    map: {
        status: [['1', '成功'], ['2', '失败']]
    },
    // 左侧菜单配置，仅支持二级菜单
    menu: [
        {   
            // 一级菜单支持配置icon
            icon: 'static/bell.png',
            // 菜单名称
            title: '接口',
            // 菜单对应的路由
            path: '/api',
            // 子菜单
            subMenu: [
                {
                    title: 'Fes',
                    path: '/api/fes'
                },
                {
                    title: 'FesApp',
                    path: '/api/fesApp'
                }
            ]
        }
    ],
    // 国际化 默认为zh-cn
    i18n: {
        locale: 'en', 
        messages: {
            'zh-cn': {
                menu: {
                    interface: '接口'
                },
                overview: '概述',
                i18n: {
                    internationalization: '国际化，基于',
                    achieve: '实现。',
                    ui: 'UI组件'
                },
                title: '标题'
            },
            en: {
                menu: {
                    interface: 'interface'
                },
                overview: 'Overview',
                i18n: {
                    internationalization: 'internationalization，base on',
                    achieve: 'to achieve.',
                    ui: 'UI components'
                },
                title: 'title'
            }
        }
    }
};
```

## mock.js
当运行环境`--env=local`时fes.js启动mock模拟后台服务，配置如下：
```javascript
module.exports = function(cgiMock, Mock, faker) {

    var Random = Mock.Random;

    //前缀，全局（可选）
    cgiMock.prefix = '';

    // 返回一个数字
    cgiMock('/number', 123);

    // 返回一个json
    cgiMock({
        url: '/json',
        result: {
            "code": "400101",
            "msg": "不合法的请求:Missing cookie 'wb_app_id' for method parameter of type String",
            "transactionTime": "20170309171146",
            "success": false
        }
    });

    //利用mock.js 产生随机文本
    cgiMock('/text', Random.cparagraph());

    // 返回一个字符串 利用mock.js 产生随机字符
    cgiMock('/string', Mock.mock({
        "string|1-10": "★"
    }));

    // 正则匹配url, 返回一个字符串
    cgiMock(/\/abc|\/xyz/, 'regexp test!');

    // option.result 参数如果是一个函数, 可以实现自定义返回内容, 接收的参数是是经过 express 封装的 req 和 res 对象.
    cgiMock(/\/function$/, function (req, res) {
        res.send('function test');
    });

    // 返回文本 fs.readFileSync
    cgiMock('/file', cgiMock.file('./test.json'));

    // 更复杂的规则配置
    cgiMock({
        url: /\/who/,
        method: 'GET',
        result: function (req, res) {
            if (req.query.name === 'kwan') {
                res.json({'kwan': '孤独患者'});
            }
            else {
                res.send('Nooooooooooo');
            }
        },
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': '123',
            'ETag': '12345'
        },
        cookies: [
            {name: 'myname', value: 'kwan', maxAge: 900000, httpOnly: true}
        ],
        //接口随机延迟
        timeout: Mock.mock({
            "number|1000-5000": 1000
        }).number
    });

    // 转发所有请求到指定URL，可以解决跨域
    cgiMock.proxy('http://test-adm.weoa.com/xxx')

}
```
如果希望部分接口使用Mock，其他接口使用请求转发：
```js
module.exports = function(cgiMock, Mock, faker) {

    //新的接口 走数据模拟
    cgiMock('new', function(req, res){
    )}

    //老的接口直接调后台接口
    cgiMock.proxy('http://test-adm.weoa.com/xxx')
}
```

## app.js
在 `fes-core` 初始化内部逻辑后执行导出的函数，建议在`app.js`中编写全局设置，如引入其他第三方插件、注册全局事件、设置应用权限等。
```js
import Vue from 'vue';
import somePlugin from 'somePlugin'
import './assets/styles/main.scss';

Vue.use(somePlugin)

export default function () {

    setTimeout(() => {
        this.FesApp.setRole('admin', false);
    }, 1000);

    // 设置路由钩子
    this.FesApp.setBeforeRouter((from, to, next) => {
        next();
    });
    this.FesApp.setAfterRouter((route) => {
        console.log(`您浏览到了${route.path}`);
    });

    // 设置AJAX配置
    this.FesApi.option({
    });

    // 设置响应结构
    this.FesApi.setResponse({
        successCode: '0',
        codePath: 'code',
        messagePath: 'msg',
        resultPath: 'result'
    });
}
```


## src/assets
存放公共静态资源，例如样式文件、图片资源等。

## src/components
在这个目录下的*.vue组件在编译后会自动注册为全局组件，可以直接在vue单文件的`<template></template>`中使用。 

### 规则
读取文件名称作为组件名称进行注册，例如`src/components/message.vue`注册的全局组件名称为`message`，

### 特殊组件
`fesHeader.vue`      
用于自定义页面头部。参数`FesHeader`控制`fesHeader.vue` 是否显示。在`fes.config.js`中配置`FesHeader`定义全局的，也可以在页面组件中单独配置`FesHeader`。     
`fesLeft.vue`       
用于自定义菜单栏。配置参数`FesLeft`控制`fesLeft.vue` 是否显示。在`fes.config.js`中配置`FesLeft`定义全局的，也可以在页面组件中单独配置`FesLeft`。   

## src/pages
在`pages`目录下编写页面，`Fes.js`会根据`pages`目录以及文件结构自动生成[Vue-router](https://router.vuejs.org/zh-cn/)路由配置。

### 规则
```dir
pages
├── index.vue         # 根路由页面 路径 index.html#/
├── a.vue             # 路径 /a
├── b                 # 文件夹b
│   ├── index.vue     # 路径 /b
│   ├── @id.vue       # 动态路由 /b/:id
│   └── c.vue         # 路径 /b/c
└── layout.vue        # 根路由下所有page共用的外层
```
1. 如果目录下有`layout.vue`，则子目录对应的路径是当前目录对应路径的子路由。如果没有则子目录对应的路径和当前目录对应路径是平级的。
2. 带参数的路径使用`@id.vue`的形式

### 编译
编译后在`.cache`目录下生成`routeConfig.js`，内容如下：
```js
import layout from 'D:\\git\\fes-template\\src\\pages\\layout.vue';
import index from 'D:\\git\\fes-template\\src\\pages\\index.vue';
import a from 'D:\\git\\fes-template\\src\\pages\\a.vue';
import b_index from 'D:\\git\\fes-template\\src\\pages\\b\\index.vue';
import b__id from 'D:\\git\\fes-template\\src\\pages\\b\\@id.vue';
export default { 
    '/': { 
        component: layout,
        subRoutes: {
            '/' : {
                name: 'index', component: index
            },
            '/a' : {
                name: 'a', component: a
            },
            '/b' : {
                name: 'b_index', component: b_index
            },
            '/b/:id' : {
                name: 'b__id', component:  b__id
            }
        }
    }
};
```

## src/static
不需要经过webpack编译处理的静态资源，可以在页面中通过 URL(static/xxx) 直接引用。   
例如有文件`src/static/1.txt`，在页面中使用如下：
```html
<a target="_blank" href="static/1.txt">
    点击下载 1.txt
</a>
```

## webpack.config.js
自定义`webpack`配置      
`mode`是编译命令，`configs`则是编译中的默认配置
```js
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
module.exports = function (mode, configs, webpack) {
    if (mode === 'build') {
        return {
            plugins: [new CspHtmlWebpackPlugin({
                'base-uri': "'self'",
                'object-src': "'none'",
                'script-src': [
                    "'self'"
                ],
                'style-src': [
                    "'self'"
                ],
                'connect-src': [
                    "'self'",
                    'http://adm.webank.io'
                ],
                'img-src': [
                    'data:',
                    "'self'"
                ]
            })]
        };
    }
    return {};
};
```

## 自定义目录结构
除了上述目录结构，也可以根据自己的需要增加其他目录，但不能更改现有的目录结构。
