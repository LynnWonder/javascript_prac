const session = require('koa-session');
const Koa=require('koa');
const Router=require('koa-router');
const bodyParser = require('koa-bodyparser');
const render = require('koa-art-template');
const path=require('path');
const static=require('koa-static');
const app=new Koa();
const router=new Router();


app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

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
})

.post('/login',async ctx=>{
    // ctx.body = ctx.request.body;
    // 需求：如果用户名是abc 123 那么响应回一个页面
    // 同时回写cookie，保存用户数据到session中
    let username=ctx.request.body.username;
    let password=ctx.request.body.password;
    if(username!=='abc'||password!=='123'){
        ctx.throw(400,'^^oops!something is wrong!');
        return;
    }else{
        ctx.session.user={
            username:'abc',
            password:'123'
        };
        ctx.body='登录成功';
    }
})
    .get('/list',async ctx=>{
        ctx.body='当前登录用户为:'+ctx.session.user.username;
    });
app
    .use(session(CONFIG, app))
    // 一定要放在路由之前原因是：需要用它向ctx.request.body上面挂载属性
    .use(bodyParser())
    .use(router.routes())
    //Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods,
    // as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate.
    .use(router.allowedMethods());


// app.on('error',(err,ctx)=>{
//     console.info(err);
//     ctx.body=`
//     <div>
//     ^^oops!something is wrong!
// </div>
//     `
// });
app.listen(3000,()=>{
    console.info('server is on 3000');
});