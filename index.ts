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