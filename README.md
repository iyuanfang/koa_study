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

## 重构项目目录
我们使用typestack的routing-controllers 包来做DI

### 安装依赖
```
npm i routing-controllers reflect-metadata class-transformer class-validator typedi
```

### 修改tsconfig.json,增加
```
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
```

### 创建目录
创建src目录，下级目录为controller,model,service

### controller下创建UserController.ts
```
import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@Controller()
export class UserController {

    @Get("/user")
    getAll() {
        return "This action returns all users";
    }

    @Get("/user/:id")
    getOne(@Param("id") id: number) {
        return "This action returns user #" + id;
    }

    @Post("/user")
    post(@Body() user: any) {
        return "Saving user "+JSON.stringify(user);
    }

    @Put("/user/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user #"+id+":"+JSON.stringify(user);
    }

    @Delete("/user/:id")
    remove(@Param("id") id: number) {
        return "Removing user #"+id;
    }
}
```
这里CRUD都适用注解方式

### src下新增app.ts
```
import "reflect-metadata"; 
import { createKoaServer } from "routing-controllers";
import { UserController } from "./controller/UserController";

const app = createKoaServer({
    controllers: [UserController] 
});

// 在3000端口运行koa应用
app.listen(3000)
console.log("start server 3000");
```

### 运行
```
nodemon src/app.ts
```

## 引入model与service做DI注入
### model里增加User.ts
```
export interface User{
    id:number,
    name:string,
    pwd:string
}
```
直接采用了interface，和mongodb可以直接搭配

### service里增加UserService.ts
```
import {User} from '../model/User';

export class UserService{
    getAll():User[]{
        return [{id:1,name:"yuanfang",pwd:"123456"},{id:2,name:"yuanfang2",pwd:"123456"}];
    }

    getOne(id:number):User{
        return {id:1,name:"yuanfang",pwd:"123456"};
    }

    save(user:User){
        console.log("Save user ",user);
    }

    remove(id:number){
        console.log("Remove user id:",id);
    }
}
```
### 修改UserController.ts
```
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import {UserService} from "../service/UserService"

@JsonController()
export class UserController {
    constructor(private userService:UserService){
    }

    @Get("/user")
    getAll() {
        return this.userService.getAll();
    }

    @Get("/user/:id")
    getOne(@Param("id") id: number) {
        return this.userService.getOne(id);
    }

    @Post("/user")
    post(@Body() user: any) {
        this.userService.save(user);
        return "Saving user "+JSON.stringify(user);
    }

    @Put("/user/:id")
    put(@Param("id") id: number, @Body() user: any) {
        user.id=id;
        this.userService.save(user);
        return "Updating a user #"+id+":"+JSON.stringify(user);
    }

    @Delete("/user/:id")
    remove(@Param("id") id: number) {
        this.userService.remove(id);
        return "Removing user #"+id;
    }
}
```
这里我改成了JsonController，后续准备用Vue做前后端分离，所以直接输出json
通过constructor 注入 userService
通过this.userService调用方法

### 修改app.ts
```
import "reflect-metadata"; 
import { createKoaServer ,useContainer} from "routing-controllers";
import {Container} from "typedi";
import { UserController } from "./controller/UserController";

useContainer(Container);

const app = createKoaServer({
    controllers: [UserController] 
});

// 在3000端口运行koa应用
app.listen(3000)
console.log("start server 3000");
```
这里使用typedi来DI注入

### 再运行
```
nodemon src/app.ts
```

### 用postman测试
下载 https://www.postman.com/downloads/
postman可以模拟rest请求

## 使用mongodb




