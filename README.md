# koa_study

## 1.js代码运行koa

从头创建koa项目，做CRUD。先创建一个文件夹，我的是koa_study

### 项目根目录命令行运行安装依赖
```
npm init //生成package.json文件

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


## 2.改成TypeScript方式运行koa
### 拷贝index.js文件并改名为index.ts
TypeScript是JavaScript的超集，通过配置可以做到代码兼容。
我们这里不改一行代码，可以直接运行ts

### 项目根路径新增tsconfig.json:
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
### nodemon运行
```
nodemon index.ts 

```
这里nodemon会检测文件变化，然后自己调用ts-node启动服务

## 3.重构项目目录
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

## 4.引入model与service做DI注入
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

## 5.使用mongodb
我们使用typeorm来做数据操作
typeorm很强大，类似java世界的hibernate，地址：https://github.com/typeorm/typeorm
### 安装依赖
```
npm i mongodb typeorm
```

### 改为entity
typeorm 使用entiy注解来表示实体类
我们将原来的model文件夹改成entity，User.ts代码改成：
```
import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id:number;

  @Column()
  name: string;

  @Column()
  pwd: string;
}

```
- 这里要重点说下mongodb实体类写法与mysql有区别：
- 因为mongodb自己会生成带下划线的ObjectID，所以要增加一个字段_id，注解为@ObjectIdColumn()
- typeorm注解很强大，可以定义类型，还可以做验证，可以自行看typeorm文档

### 修改app.ts
```
import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./controller/UserController";
import { createConnection } from "typeorm";

createConnection();

useContainer(Container);

const app = createKoaServer({
    controllers: [UserController]
});

// 在3000端口运行koa应用
app.listen(3000)
console.log("start server 3000");

```
- 这里调用typeorm的createConnection方法。typeorm的connection是一个pool，只需要每次调用时get就行，不用close。
- 同时这个pool也是全局的，只需要启动时创建，其它代码直接获取connection
- 会自动读取根目录下的ormconfig.json配置文件，获取数据库参数

### ormconfig.json
```
{
    "type": "mongodb",
    "host": "localhost",
    "database": "test",
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/*.ts"
    ],
    "subscribers": [
        "src/subscriber/*.js"
    ],
    "migrations": [
        "src/migration/*.js"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
}
```
我本地mongodb是直接安装的，没有用户名密码，生产环境要设置

### service调用connection做CRUD
UserService.ts
```
import { User } from "../entity/User";
import { getManager } from "typeorm";

export class UserService {
  async getAll() {
    return await getManager().find(User);
  }

  async getOne(id: number) {
    const user: User = await getManager().findOne(User, { id: id });

    console.log("find user:", user);

    return user ? user : {};
  }

  async save(user: User) {
    await getManager().save(user);
    console.log("Save user ", user);
  }

  async update(id: number, user: User) {
    await getManager().update(User, { id: id }, user);
    console.log("Update user ", user);
  }

  async delete(id: number) {
    await getManager().delete(User, { id: id });
    console.log("Remove user id:", id);
  }
}

```

### controller调用service
UserController.ts
```
import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { User } from "../entity/User";
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
        const userr:User=new User();
        userr.id=user.id;
        userr.name=user.name;
        userr.pwd=user.pwd;
        
        this.userService.save(userr);
        return "Saving user："+JSON.stringify(userr);
    }

    @Put("/user/:id")
    put(@Param("id") id: number, @Body() user: any) {
        const userr:User=new User();
        userr.id=id;
        userr.name=user.name;
        userr.pwd=user.pwd;
        this.userService.update(id,userr);
        return "Updating a user #"+id+":"+JSON.stringify(userr);
    }

    @Delete("/user/:id")
    delete(@Param("id") id: number) {
        this.userService.delete(id);
        return "Deleted user #"+id;
    }
}
```

### 运行
```
nodemon src/app.ts
```

## 6.支持cors跨域
我用vue做前端，axios调用这个koa后端时，会报跨域错误。所以改动koa支持cors跨域。
```
npm i @types/koa__cors -S
```
然后修改src/app.ts，增加2行：
```
import cors from "@koa/cors";

app.use(cors());
```
### 运行就支持跨域了
```
nodemon src/app.ts
```

### 查看数据
mongodb我用的客户端是NoSQLBooster,下载：

https://nosqlbooster.com/downloads




