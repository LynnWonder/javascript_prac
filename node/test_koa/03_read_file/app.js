// 需求： 读取一个html文件并且返回给前端页面显示
const fs=require('fs');
const Koa=require('koa');
const app=new Koa();
const readFile=()=>{
    return new Promise((resolve,reject)=>{
        fs.readFile('./index.html',(err,data)=>{
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        })
    })
};
app.use(async (ctx,next)=>{
    if(ctx.url==='/'){
        // // toString()的原因是二进制数据会作为下载处理
        // ctx.body=(await readFile()).toString();
        // 或者使用如下的方式实现展示html页面
        let data=await readFile();
        ctx.body=data;
        ctx.set('content-type','text/html;charset=utf-8');
    }else{
        ctx.body='ok';
    }
});
app.listen(3000,()=>{
    console.info('server is on 3000');
});