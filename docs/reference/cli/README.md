---
sidebar: auto
---

# 命令行工具

## create-fes-app
通过 `create-fes-app` 命令创建项目模板，输入`create-fes-app -h`则可以看到如下信息：
```
Usage: create-fes-app <name>

Options:
    -v, --version            Output the current version
    -h, --help               Display help for command   
    -f, --force              Overwrite target directory if it exists
    -m, --merge              Merge target directory if it exists
```

可以在本机安装后使用：
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# 全局安装
yarn global add @fesjs/create-fes-app

# 创建模板
create-fes-app fes-app
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# 全局安装
npm i -g @fesjs/create-fes-app

# 创建模板
create-fes-app fes-app
```

  </CodeGroupItem>
</CodeGroup>

推荐使用 `yarn create` 和 `npx` 方式创建模板，一直使用最新的模板：

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# 创建模板
yarn create @fesjs/fes-app myapp

# 安装依赖
yarn 

# 运行
yarn dev
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# 创建模板
npx @fesjs/create-fes-app myapp

# 安装依赖
npm install 

# 运行
npm run dev
```

  </CodeGroupItem>
</CodeGroup>


## fes
需要在项目根目录执行 `fes` 命令，输入`fes -h`则可以看到如下信息：

```
Usage: fes <command> [options]

一个好用的前端应用解决方案

Options:
  -v, --vers         output the current version
  -h, --help         display help for command

Commands:
  build              build application for production
  dev [options]      start a local http service for development
  help               show command helps
  info               print debugging information about your environment
  webpack [options]  inspect webpack configurations

  Run fes <command> --help for detailed usage of given command.
```

### fes dev
启动本地开发服务器进行项目的开发调试。
```
Usage: fes dev [options]

start a local http service for development

Options:
  --port      http service port, like 8080
  --https     whether to turn on the https service
  -h, --help  display help for command
```
比如：
```bash
fes dev --port=8080
```

### fes build
编译构建 web 产物。
```
Usage: fes build [options]

build application for production

Options:
  -h, --help  display help for command
```
比如：
```
fes build
```
### fes help
打印帮助文档。
比如：
```bash
fes help
```

### fes info
打印当前项目的有用的环境信息，用来帮助定位问题。
```
Usage: fes info [options]

print debugging information about your environment

Options:
  -h, --help  display help for command
```
比如：
```bash
fes info
```

### fes webpack
查看项目使用的 webpack 配置。
```
Usage: fes webpack [options]

inspect webpack configurations

Options:
  --rule <ruleName>      inspect a specific module rule
  --plugin <pluginName>  inspect a specific plugin
  --rules                list all module rule names
  --plugins              list all plugin names
  --verbose              show full function definitions in output
  -h, --help             display help for command
```

比如：
```bash
fes webpack
```