// test req, res in koa
const koa=require('koa');
let app=new koa();
// 请求和响应中间的一件事：中间件
app.use((ctx,next)=>{
    console.info(ctx.request.url);
    console.info(ctx.request.method);
    console.info(ctx.request.headers);
    next();
});
app.use((ctx)=>{
    ctx.response.set('mytest','12345');
    ctx.response.status=200;
    ctx.response.body='<h1>hello world</h1>'
});
app.listen(3000,()=>{
    console.info('server is on 3000');
});