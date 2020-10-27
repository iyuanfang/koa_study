import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./controller/UserController";
import { createConnection } from "typeorm";
import cors from "@koa/cors";

createConnection();

useContainer(Container);

const app = createKoaServer({
    controllers: [UserController]
});

app.use(cors());

// 在3000端口运行koa应用
app.listen(3000)
console.log("start server 3000");
