const Koa=require('koa');
const Router=require('koa-router');
const bodyParser = require('koa-bodyparser');
const render = require('koa-art-template');
const path=require('path');
const static=require('koa-static');
const app=new Koa();
const router=new Router();

render(app, {
    // 页面查找的根目录
    root: path.join(__dirname, 'view'),
    // 文件后缀名
    extname: '.html',
    // debug为false的时候，每次压缩页面及js，包括混淆，静态数据不会实时更新（不是每次都会读文件）
    debug: process.env.NODE_ENV !== 'production'
});

router.get('/', async ctx=>{
    // ctx.body='<h1>index</h1>';
    await ctx.render('index');
});

// 在静态资源的处理之前，重写url,改变用户url的请求
app.use(async (ctx,next) => {
    if(ctx.url.startsWith('/public') ) {
        // /public/js/index.js
        // 改写请求url
        ctx.url = ctx.url.replace('/public','');
    }
    // 放行，交给static来处理（不管如何都放行）
    await next();
});


// 添加静态服务中间件
app
    // .use(static(path.resolve('./')))
    // 下面实现对URL的改写
    .use(static(path.resolve('./public')))
    .use(bodyParser())
    .use(router.routes())
    //Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods,
    // as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate.
    .use(router.allowedMethods());
app.listen(3000,()=>{
    console.info('server is on 3000');
});