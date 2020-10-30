# 单元测试

## 准备工作

升级`@webank/fes-cli`到0.4.1以上
```shell
npm i -g @webank/fes-cli
```
或者在项目目录执行
```shell
npm i @webank/fes-cli --save-dev
```

## 配置
通过项目根目录`karma.config.js`配置单元测试，如果不存在此文件则默认使用如下配置
```js
module.exports = {
    test: ['test/**/*.spec.js'],
    coverage: ['src/components/**/*', 'src/helpers/**/*']
};
```
- test 需要测试的脚本
- coverage 需要覆盖测试的文件

## 单元测试
配置项目的`package.json`
```json
{
    "scripts": {
        "test": "fes test:unit --single-run",
    },
}
```
在项目目录执行
```shell
npm run test
```


## 覆盖测试
配置项目的`package.json`
```json
{
    "scripts": {
        "cover": "fes test:unit --single-run --coverage",
    },
}
```
在项目目录执行
```shell
npm run cover
```