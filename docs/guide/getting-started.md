# 快速上手

## 依赖环境
首先得有 [Node.js](https://nodejs.org/)，并确保 node 版本是 `10.13` 或以上。
```bash
# 打印 node 版本
node -v
v10.13.0
```
推荐使用 yarn 管理 npm 依赖
```bash
# 全局安装 yarn
npm i yarn -g
```

## 创建项目

这一章节会帮助你从头搭建一个简单的 Fes.js 前端应用。

##### 步骤1 创建工作空间     
如果工作空间不存在，则先创建：
```bash
# 创建目录 workspace
mkdir workspace
# 进入目录 workspace
cd workspace
```
如果工作空间已存在，则直接进入
```bash
# 进入目录 workspace
cd workspace
```

##### 步骤2 在工作空间创建项目
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# 创建模板
yarn create @fesjs/fes-app myapp
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# 创建模板
npx @fesjs/create-fes-app myapp
```

  </CodeGroupItem>
</CodeGroup>


如果项目文件夹 `workspace/myapp` 已经存在，会提示目录已存在：

<img :src="$withBase('pickTemplateTip.png')" alt="目录已存在提示">

你可以选择：
- `Overwrite` 删除项目文件夹，重新创建项目。
- `Merge` 保留原项目文件夹，存在相同文件则用模板文件覆盖当前目录文件。      

当选择 `Overwrite` 或者 `Merge` 或者项目目录 `workspace/myapp` 不存在，会提示选取一个 `template`：
<img :src="$withBase('pickTemplate.png')" alt="选择模板类型">

你可以选默认适用于中后台前端应用的 `PC` 类型，也可以选适用于移动端的 `H5` 类型。      


##### 步骤3 安装依赖
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# 进入项目目录
cd myapp
# 安装依赖
yarn 
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# 进入项目目录
cd myapp
# 安装依赖
npm i 
```

  </CodeGroupItem>
</CodeGroup>

##  启动项目
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# 开发调试
yarn dev

yarn run v1.22.4
$ fes dev
Starting the development server http://localhost:8080 ...

✔ Webpack
  Compiled successfully in 15.91s

 DONE  Compiled successfully in 15917ms                               11:17:08 AM
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# 开发调试
npm run dev

> fes dev
Starting the development server http://localhost:8080 ...

✔ Webpack
  Compiled successfully in 3.66s

 DONE  Compiled successfully in 3662ms                                11:17:46 AM
```

  </CodeGroupItem>
</CodeGroup>


Fes.js 会在 [http://localhost:8080](http://localhost:8080) 启动一个热重载的开发服务器。当你修改你的 .vue 文件时，浏览器中的内容也会自动更新。


<img :src="$withBase('home.png')" alt="home">

## 部署发布

### 构建
<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# 构建
yarn build

yarn run v1.22.4
$ fes build

✔ Webpack
  Compiled successfully in 45.37s

✨  Done in 48.87s.
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
# 构建
npm run build

> fes build

✔ Webpack
  Compiled successfully in 45.37s
```

  </CodeGroupItem>
</CodeGroup>

构建产物默认生成到 ./dist 下，然后通过 tree 命令查看。
```base
tree ./dist

dist
├── chunk-vendors.27cd4686.js
├── chunk-vendors.a5f5de67.css
├── index.11411d43.css
├── index.d72f1ba2.js
├── index.html
├── logo.png
└── static
    └── logo.0f85bba0.png
```

### 本地验证
发布之前，可以通过 [serve](https://github.com/vercel/serve) 做本地验证，验证结果应该跟执行 `fes dev` 的结果一样。


### 部署
本地验证完，就可以部署了。你需要把 dist 目录部署到服务器上。