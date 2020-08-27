# 更新日志
---
## 1.0.27  
2017年5月8日  
* fes dev时，监听`src/components`、`src/pages`目录，新增删除文件时重新编译

## 1.0.25  
2017年5月5日  
优化项目结构  

* 项目文件`src/common`文件夹改名为`compnents`，原`top.fes`改名为 `header.fes`
* Page配置中`FesTop` 改为 `FesHeader`
* 根目录 `fes.json` 改名为 `fes.config.js`，json文件不支持注释，故改为js格式
* 移除`src/common/map.js`、`src/common/rolesConfig.js`，相关map、rolesConfig配置放入项目根目录`fes.config.js`
* FesMenu的配置也移入`fes.config.js`中