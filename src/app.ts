import "reflect-metadata"; 
import { createKoaServer } from "routing-controllers";
import { UserController } from "./controller/UserController";

const app = createKoaServer({
    controllers: [UserController] 
});

// 在3000端口运行koa应用
app.listen(3000)
console.log("start server 3000");
