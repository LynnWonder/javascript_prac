// koa
const Koa=require('koa');
const session = require('koa-session');
const Router=require('koa-router');
const bodyParser = require('koa-bodyparser');
const render = require('koa-art-template');
const path=require('path');
const static=require('koa-static');
// Sugar for connecting socket.io to a koa instance
const IO = require( 'koa-socket' );


const app=new Koa();
const router=new Router();
const io = new IO();
const msgs=[
    {username:'jason',content:'hhh'},
];
// 设置全局变量
global.mySessionStore={}; // id:{socketid:xxx,username:xxx}
/**
 * 根据socketid遍历查找对应的对象
 * @param socketid
 * @returns {*}
 */
function findBySocketId (socketid) {
    for(var tempStamp in global.mySessionStore ) {
        let obj = global.mySessionStore[tempStamp];
        if(obj.socketid === socketid) {
            return obj;
        }
    }
}

io.attach( app );
// The raw socket.io instance is attached as app._io if you need it
io.on( 'connection', sock => {
    console.log('链接上了一个' );
    io.broadcast('msg1','我是服务器来的');
});


// 接收用户信息
io.on('sendMsg',(ctx,data)=>{
    // 但是这边显然是没有ctx.session的因此我们需要自己做一个session机制
    console.info('new message==>',data.newContent);
    // 查找对象的用户
    let obj=findBySocketId(ctx.socket.socket.id);
    io.broadcast('allmessage',obj.username +'对所有人说:' + ctx.data.newContent);
});
// 处理登录同步信息

// websocket中的登录，和后端响应login页面区分
io.on('login',ctx=>{
    let id=ctx.data.id;
    // console.log(ctx.socket.socket.id);
    // console.log(id);
    if(!global.mySessionStore[id]){
        global.mySessionStore[id]={};
    }
    global.mySessionStore[id].socketid=ctx.socket.socket.id;
});

app.keys = ['some secret hurr'];
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
    // 1. 生成时间戳将其响应给客户端
    let id=Date.now();
    ctx.session.user.id=id;

    // 2.保存到自己的sessionStore中
    global.mySessionStore[id]={
        username,
    };

    // 重定向到聊天室
    ctx.redirect('/list');
})
    .get('/list',async ctx=>{
        // 3. 接着可以使用了
        ctx.render('list',{
            username:ctx.session.user.username,
            id:ctx.session.user.id,
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
    // 处理html文件里面的静态资源
    .use(static(path.resolve('./public')))
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