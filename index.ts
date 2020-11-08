const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const app = new Koa();
const router = new Router();

app.use(koaBody());

app.use(koaBody({
    // 支持文件格式
    multipart: true,
    formidable: {
        // 上传目录
        uploadDir: './static/img/',
        // 保留文件扩展名
        keepExtensions: true,
    }
}));

// const upload = multer({ dest: './static/img/' });

// app.use(router.post('/avatar', upload.single('file')));

router.post('/upload', ctx => {
    const file = ctx.request.files.file
    console.log("upload file:",file);
    
    ctx.body = { path: file.path }
})

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