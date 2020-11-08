import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { UserController } from "./controller/UserController";
import { MemoryController } from "./controller/MemoryController";
import { createConnection } from "typeorm";
import KoaStatic from "koa-static";

createConnection();

useContainer(Container);

const app = createKoaServer({
  controllers: [UserController, MemoryController],cors:true
});

app.use(KoaStatic("./static"));

// 在3000端口运行koa应用
app.listen(80);
console.log("start server 80");
