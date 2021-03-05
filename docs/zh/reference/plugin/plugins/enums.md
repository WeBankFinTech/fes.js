# @webank/fes-plugin-enums
## 介绍
日常业务开发中，有很多场景会使用到枚举值，比如select-options、table-column。

该插件提供统一的枚举存取及丰富的函数来处理枚举。
## 启用方式
在 `package.json` 中引入依赖：
```json
{
    "dependencies": {
        "@webank/fes": "^2.0.0",
        "@webank/fes-plugin-enums": "^2.0.0"
    }
}
```

## 配置

### 静态配置
在 `.fes.js` 中配置：
```js
// 配置格式：[[key, value], ...]
export default {
    enums: {
        status: [['0', '无效的'], ['1', '有效的']]
    }
}
```

### 动态配置
在业务代码中
```js
import { enums } from '@webank/fes';
// 动态添加
enums.push('status', [['0', '无效的'], ['1', '有效的']]
enums.get('status', '1') // 有效的
```

## 场景使用
- 动态添加的枚举项支持数组和对象

- 枚举项为对象时，可以指定keyName和valueName属性名

- 导出枚举值，可指定取值的路径

- 导出枚举可扩展属性
```vue
<template>
    <div>
        <!-- 遍历枚举status -->
        <div v-for="item in enumsGet('status')" :key="item.key">
            {{item.value}}：{{item.key}}
        </div>
        <!-- 遍历枚举扩展后的roles -->
        <div v-for="item in roles" :key="item.key">
            {{item.name}}：{{item.disabled}}
        </div>
        <!-- 获取枚举roles为2的英文名 -->
        <div>{{enumsGet('roles', '2', { dir: 'eName' })}}</div>
    </div>
</template>
<script>
import { enums } from '@webank/fes';

export default {
    setup() {
        // 动态添加枚举，枚举项是对象，并指定key的属性名为id
        enums.push('roles', [
            {
                id: '1',
                cName: '系统管理员',
                eName: 'System',
                perm: ['1', '2', '3']
            },
            {
                id: '2',
                cName: '业务管理员',
                eName: 'Business',
                perm: ['1', '2']
            },
            {
                id: '3',
                cName: '普通用户',
                eName: 'User',
                perm: ['1']
            }
        ], { keyName: 'id' });
        // 导出定制格式的roles，扩展枚举项新的属性name、disabled
        const roles = enums.get('roles', {
            extend: [
                {
                    key: 'name',
                    dir: 'cName' // 指定取值路径，取属性cName的值
                },
                {
                    key: 'disabled',
                    // 传入函数，获取结果值
                    transfer: item => item.value.perm.some(i => i >= 2)
                }
            ]
        });
        console.log(roles);
        // [{key: '1', name: '系统管理员', disabled: true, value: {...}}, ....]
        return {
            enumsGet: enums.get,
            roles
        };
    }
};
</script>

```
## API
### get
* `get(name: string)` 获取指定名字的枚举

* `get(name: string, key: string)` 获取指定名字及键枚举默认值

* `get(name: string, opt: {extend: Array<Object>})` 获取指定名字的自定义格式枚举，[查看extend配置](#extend配置)

* `get(name: string, key: string, opt: {dir: string})` 获取指定名字及键枚举[dir规则](#dir规则)的值

```js
get('status')
get('status', '1')
get('status', {
    extend: [
        {
            key: 'name',
            dir: 'value',
        },
        {
            key: 'disabled',
            transfer: item => item === '0'
        }
    ]
})
get('status', '1', {dir: 'value'})
```

### push
动态添加枚举，重复添加会覆盖
* `push(name: string, _enum: Array<Array>)`
* `push(name: string, _enum: Array<Object>, opt?: Object)`
    * opt.keyName 指定key的取值属性，默认是key
    * opt.valueName 指定value的取值属性

枚举项为数组，枚举项的[0]解析为key，枚举项的[1]解析为value

枚举项为对象时，根据opt配置keyName、valueName取枚举项属性值分别作为key和value，`如果valueName未设置则value就是枚举项`

### remove
* remove(name: string)

移除指定的枚举
### concat
基于现有的枚举，连接上新的枚举后返回新的枚举
* `concat(name: string, _enum: Array<Array|Object>, opt?: Object))`
    * opt.keyName 指定key的取值属性，默认是key
    * opt.valueName 指定value的取值属性
    * opt.before 是否添加在现有的之前，默认是false
    * opt.extend：返回的枚举[extend配置](#extend配置)

### convert
将传入的枚举格式转换为{key, value}的形式
* `convert(name: string, _enum: Array<Array|Object>, opt?: Object))`
    * opt.keyName 指定key的取值属性，默认是key
    * opt.valueName 指定value的取值属性

### extend配置
扩展枚举项属性的配置
* `extend: Array<Object>`
    * `key` 指定扩展的属性名
    * `dir` 指定该属性的取值路径
    * `transfer(item: {key: any, value: any})` 转换函数，参数未枚举项，返回就是该属性的值
::: tip
同时设置[dir](#dir规则)和transfer，transfer优先
:::

```js
get('status', {
    extend: [
        {
            key: 'name',
            dir: 'value',
        },
        {
            key: 'disabled',
            transfer: item => item.key === '0'
        }
    ]
})
```


### dir规则
dir是指定枚举项value的取值方式，规则如下：
* 对象属性 `A`、`A.B`
* 数组 `[0]`、`[0][1]`
* 混合 `A[0]`、`[0].A`、`A[0].B`

```js
// 假如枚举项value的结构如下
const user = {
    age: 18,
    name: 'aring',
    role: [
        {
            id: 1,
            name: '管理员'
        },
                    {
            id: 2,
            name: '业务操作员'
        }
    ]
}
// 那么规则解析是：
dir              value
'age'        =>  18
'role[0]'    =>  {id: 1, name: '管理员'}
'role[1].id' =>  2
```
::: tip
枚举项value如果是基本类型，则规则不生效，value就是当前值
:::