const Koa=require('koa');
const app=new Koa();
// body 解析
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
app.use(async (ctx)=>{
    ctx.body = ctx.request.body;
    // console.info(ctx.request.rawBody);
});
app.listen(3000,()=>{
    console.info('server is on 3000');
});