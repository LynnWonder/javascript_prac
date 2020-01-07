// koa
const Koa=require('koa');
const session = require('koa-session');
const Router=require('koa-router');
const bodyParser = require('koa-bodyparser');
const render = require('koa-art-template');
const path=require('path');
const static=require('koa-static');
const app=new Koa();
const router=new Router();

const msgs=[
    {username:'jason',content:'hhh'},
];

app.keys = ['some secret hurr'];

// const CONFIG = {
//     key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
//     /** (number || 'session') maxAge in ms (default is 1 days) */
//     /** 'session' will result in a cookie that expires when session/browser is closed */
//     /** Warning: If a session cookie is stolen, this cookie will never expire */
//     maxAge: 86400000,
//     autoCommit: true, /** (boolean) automatically commit headers (default true) */
//     overwrite: true, /** (boolean) can overwrite or not (default true) */
//     httpOnly: true, /** (boolean) httpOnly or not (default true) */
//     signed: true, /** (boolean) signed or not (default true) */
//     rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
//     renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// };

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
    let {username,password}=ctx.request.body;
    ctx.session.user={
        username
    };
    // 重定向到聊天室
    ctx.redirect('/list');
})
    .get('/list',async ctx=>{
        ctx.render('list',{
            username:ctx.session.user.username,
            msgs
        })

    })
    .post('/send',async ctx=>{
        let username=ctx.session.user.username;
        let content=ctx.request.body.msg;
        msgs.push({
            username,content
        });
        ctx.body=msgs;
    });

// 在服务器内存中存储 {session_id:用户数据}
// 使用session机制，key即为session_id，增强了安全性，客户端不会带有key-value，只是一个key
// 详情看文档
let store = {
    myStore:{},
    get:function(key) {
        return this.myStore[key];
    },
    set:function(key,session) {
        this.myStore[key] = session;
    },
    // 过期操作
    destroy:function() {
        delete this.myStore[key];
    }
};
app
    // .use(session(CONFIG, app))
    .use(session({store:store},app))
    // 一定要放在路由之前原因是：需要用它向ctx.request.body上面挂载属性
    .use(bodyParser())
    // koa中优雅的处理错误页面
    .use(async (ctx,next)=>{
        try{
            // 先去执行下面的router路由
            await next();
        }catch(error){
            // 如果上面执行router路由的时候抛出错误则会在这里捕捉到
            console.info('error!!!');
            ctx.body='<div>oops! Something is wrong!</div>'
        }
    })
    // handle router
    .use(router.routes())
    //Returns separate middleware for responding to OPTIONS requests with an Allow header containing the allowed methods,
    // as well as responding with 405 Method Not Allowed and 501 Not Implemented as appropriate.
    .use(router.allowedMethods());


app.on('error',(err,ctx)=>{
    // 注意，这仅仅是服务器端的一个错误日志打印
    console.info(err);
});
app.listen(3000,()=>{
    console.info('server is on 3000');
});