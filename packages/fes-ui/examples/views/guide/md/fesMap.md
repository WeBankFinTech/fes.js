# 数据字典 FesMap
数据字典管理对象。当FesApp启动时，从`common/map.js`中读取原始数据，先把原始数据转换成{value: value, text: text}对象，再存入FesMap。

## 函数
* getNameByValue(name, value)  
  从FesMap[name]中找出值是value的那一条数据
 
