# 常见问题


#### 为什么代码提示不生效？

1. 需要先运行一次`fes dev`
2. 检查tsconfig.json，`include`包含当前编辑文件，`compilerOptions.path`包含
```
"@/*": ["./src/*"],
"@@/*": ["./src/.fes/*"]
```