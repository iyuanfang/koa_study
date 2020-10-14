# koa_study

## js代码运行koa

从头创建koa项目，做CRUD。先创建一个文件夹，我的是koa_study

### 项目根目录命令行运行安装依赖
```
npm i //生成package.json文件

npm i -g nodemon //全局安装nodemon

npm i koa koa-router koa-bodyparser //引入koa相关包
```

### 根路径创建index.js文件：
```
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', async(ctx) => {
    ctx.body = "Index";
})

router.get('/hello', async(ctx) => {
    let querystring = ctx.querystring;
    ctx.body = "Hello World!:" + querystring;
})

router.get('/user/:id', async(ctx) => {
    let id = ctx.params.id;
    ctx.body = "user id:" + id;
})

router.post('/user', async(ctx) => {
    let user = ctx.request.body;
    console.log("user post with json:", JSON.stringify(user));
    ctx.body = user;
})

router.delete('/user/:id', async(ctx) => {
    let id = ctx.params.id;
    console.log("delete user id:" + id);
    ctx.body = `user with id:${id} deleted`;
})

router.put('/user/:id', async(ctx) => {
    let id = ctx.params.id;
    let user = ctx.request.body;
    console.log("update user id:" + id);
    ctx.body = user;
})

app.use(router.routes());

console.log("start server at port 3000");
app.listen(3000);
```

### 运行
```
nodemon index.js
```
nodemon会监控文件变化，修改index.js会自动重新启动


## 改成TypeScript方式运行koa
### 拷贝index.js文件并改名为index.ts
我们用ts-node运行ts文件

### 首先项目根路径新增tsconfig.json:
```
{
    "compilerOptions": {
      "module": "commonjs", // 编译生成的模块系统代码
      "target": "esnext", // 指定ecmascript的目标版本
      "noImplicitAny": false, // 禁止隐式any类型
      "esModuleInterop":true, //这里可以使用js相同的import方式，需要设置为true
      "sourceMap": false,
      "allowJs": false, // 是否允许出现js
      "newLine": "LF"
    }
}
```
这里要关注的几个参数
- target可以用最新的esnext
- noImplicitAny需要指定为false，否则会报错ctx
- esModuleInterop为true，这样可以用js相同的import方式


### 安装koa的TypeScript包及ts-node
```
npm i -g ts-node //全局安装ts-node
npm i -g typescript
npm i -g @types/node //全局安装node ts支持
npm i @types/koa @types/koa-router @types/koa-bodyparser

```

### 运行
```
ts-node index.ts 

```
### nodemon运行
```
nodemon index.ts 

```
这里nodemon会检测文件变化，然后自己调用ts-node启动服务

### 重构到更符合项目目录
我们使用typestack的routing-controllers 包来做DI

### 安装依赖
```
npm i routing-controllers reflect-metadata class-transformer class-validator
```

- 修改package.json
```
    "scripts": {
        "dev": "tsc && node dist/app.js",
        "watch": "nodemon --watch src/app.ts -e ts,tsx --exec ts-node src/app.ts"
    },
```
这里增加了脚本dev和watch，dev编译成js再运行，watch直接用nodemon监控文件变化，然后用ts-node方式直接运行ts文件

- 运行项目
```
npm run dev

```
  js方式运行，或者
```
npm run watch //现在有报错，后面解决

nodemon --watch src/app.ts -e ts,tsx --exec ts-node src/app.ts

```
  ts-node 直接运行




