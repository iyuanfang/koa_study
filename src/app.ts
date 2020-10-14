import "reflect-metadata"; 
import { createKoaServer ,useContainer} from "routing-controllers";
import {Container} from "typedi";
import { UserController } from "./controller/UserController";
import {createConnection,Connection} from "typeorm";

createConnection().then(async connection => {
    console.log("connection created");
    
}).catch(error => console.log("TypeORM connection error: ", error));

useContainer(Container);

const app = createKoaServer({
    controllers: [UserController] 
});

// 在3000端口运行koa应用
app.listen(3000)
console.log("start server 3000");
