# 布局
整个界面分为三部分：左、右上、右下。左边是菜单区域，右上是公共状态区域，右下是内容区域。


## 显示
FesLeft控制左是否显示，FesHdaer控制右上是否显示。
```javascript
//默认
export default {
    FesLeft: true,
    FesHdaer: false
}
```

## 自定义模版
编写项目中 `components/fesHeader.fes` 文件，自定义你需要的由上部分内容。    
编写项目中 `components/fesLeft.fes` 文件，自定义你需要的左部分内容。左边跟右上有些不同，当`fesLeft.fes`的内容不为空时，用户角色退出部分隐藏，显示`fesLeft.fes`的内容。