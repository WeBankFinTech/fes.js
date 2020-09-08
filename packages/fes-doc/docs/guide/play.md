# 快速上手

## 创建项目

```shell
fes init [projectName]
```

## 项目初始化

```shell
cd [projectName] && npm i
```

## 启动项目
进入工程目录，执行 `fes dev` 进入开发模式

## 创建一个页面
进入 `/src/pages` 目录，新建文件夹 `list` ，然后在 `list` 下新建 `index.vue` 
```vue
// list/index.vue
<template>
    <div class="container">
       
    </div>
</template>
<script>
export default {
    FesData(){
        return {}
    },
    FesReady() {
    }
}
</script>
```
访问 `http://localhost:5000/#/list` 就是刚创建的页面。更多路由配置详见 [路由章节](/guide/route)。

## 配置菜单
打开根目录下的 `fes.config.js`
```js
export default {
    // 左侧菜单配置
    'menu': [{
        title: "列表",
        path: '/list'
    }]
}
```
此时左侧菜单栏出现名为 `列表` 的导航，更多子菜单配置详见 [目录结构-fes.config.js](/guide/directory-structure.html#fes-config-js)。

## 实现一个简单的列表
在上述的`index.vue`文件下实现一个列表，代码如下：
```vue
<template>
    <Fes-search-panel>
        <Wb-form type="query" :label-width="150">
            <Form-item label="姓名：">
                <wb-input placeholder="请输入"></wb-input>
            </Form-item>
            <Form-item label="身份证：">
                <wb-input placeholder="请输入"></wb-input>
            </Form-item>
        </Wb-form>
        <div slot="button">
            <Wb-button type="primary" icon="search" @click="search">查询</Wb-button>
        </div>
    </Fes-search-panel>
    <Fes-list-panel>
        <Wb-table :data="data">
            <Column key="date" name="日期"></Column>
            <Column key="name" name="姓名"></Column>
            <Column key="age" name="年龄"></Column>
            <Column key="adr" name="地址"></Column>
            <Column key="status" name="等级"></Column>
        </Wb-table>
        <Pagination :page-size.sync="paginationOption.pageSize" :current-page.sync="paginationOption.currentPage"
                    :total-page.sync="paginationOption.totalPage"
                    @pagination.change="changePage"></Pagination>
    </Fes-list-panel>
</template>
<script>
export default {
    FesData(){
        return {
            data: [{
                name: "张晓刚",
                age: 24,
                date: new Date(2016, 9, 10),
                adr: "北京市海淀区西二旗",
                status: 1
            }, {
                name: "李晓红",
                age: 26,
                date: new Date(2016, 9, 11),
                adr: "北京市海淀区西二旗",
                status: 2
            }
            ],
            paginationOption: {
                pageSize: 10,
                currentPage: 1,
                totalPage: 1
            },
        }
    },
    FesReady() {
        console.log(this)
    },
    methods:{
        search(){
        },
        changePage(){
        }
    }
}
</script>
```
实现的效果如下：
![列表页](../../images/list.png)
Fes使用 `fes-ui` 组件库，具体使用方法详见 [组件章节](/ui/)，关于FesData数据用法详见 [Vue增强章节](/guide/option.html#fesdata)
        
 ## 接口调用与Mock数据
打开根目录下的 `mock.js`，配置模拟接口：
```js
cgiMock('/api', function (req, res) {
    var list = [];
    for(var i=0; i<req.body.pageSize; i++){
        list.push({
            a: i
        })
    }
    res.send(JSON.stringify({
        code: "0",
        msg: "this is message",
        result: {
            list: list,
            page: {
                pageSize: req.body.pageSize,
                currentPage: req.body.currentPage,
                totalPage: 1000
            }
        }

    }))
});
```
调用接口：
```js
this.FesApi.fetch("/api", {
    pageSize: 16    
}).then(rst=>{
    console.log(rst);
});
```
更多关于接口调用与Mock数据的使用方法详见 [接口调用章节](/api/#fesapi-2) 和 [mock数据章节](/guide/directory-structure.html#mock-js)。

## 编译打包
- 进入工程目录
- 执行 `fes build [--env=sit]`  
- 命令执行完在根目录下生成 `dist` 目录，存放编译后的静态资源文件。
- 使用`fes-upload-aomp`命令将资源文件打包压缩上传到aomp，执行发布。