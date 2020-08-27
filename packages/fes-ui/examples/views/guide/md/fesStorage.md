# FesStorage

操作Storage，包含cookie、sessionStorage、localStorage。 category值SESSION对应sessionStorage，LOCAL对应localStorage，COOKIE对应cookie


## 函数
* set(key, value, category = SESSION, expired)  
  往Storage中存入一个值
* get(key, category = SESSION)  
  从Storage中取key对应的值
* clear(category = SESSION)  
  清除所有值
* remove(key, category = SESSION)  
  删除key对应的值