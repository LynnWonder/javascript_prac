//   1. 引入Koa构造函数对象 ```const Koa = require('koa')```
const express=require('express');
//   2. 创建服务器示例对象 ```const app = new Koa();```
const app=express();
//   3. 配置中间件 ```app.use(做什么?)```
app.use((req,res,next)=>{
    res.send('express is ok!');
});
//   4. 监听端口启动服务器 ```app.listen(8888);``
app.listen(8888,()=>{
    console.info('server is on 8888');
});

const Koa = require('koa');
const app1 = new Koa();

app1.use(async ctx => {
    ctx.body = 'Hello World';
});

app1.listen(3000,()=>{
    console.info('server is on 3000');
});