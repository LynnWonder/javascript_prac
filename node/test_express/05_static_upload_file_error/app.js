// fromidable: 一个用来解析数据和处理上传文件的node模块
// 静态资源处理 文件上传 error处理
let express=require('express');
let fs=require('fs');
let app=express();
let router=express.Router();
// 注册一个模版引擎
app.engine('.html',require('express-art-template'));
app.set('view options',{
    debug:process.env.NODE_ENV!=='production',
});
// 配置默认渲染引擎
app.set('view engine','html');
// 默认情况下即去views文件夹下寻找
router.get('/',(req,res,next)=>{
   // res.render('index');
    let errorPath='./a/b/c.txt';
    try{
        fs.readFileSync(errorPath);
        res.render('index');
    }catch (e) {
        // throw(e); // 给用户暴露异常不合理
        next(e); // 会触发一个具备4个参数的中间件函数
    }
    console.info('请求进来了',req.url);
})
    .all('*',(req,res)=>{
        res.end('bad request');
    })
// 要把js下的文件暴露出来，此时index.html中就不需要写相对路径了，因为express.static会将参数和req.url相结合确定服务文件
app.use(express.static('./js'));
app.use(router);
// 处理错误，通常将错误处理置底（在app.use(router)下面）
// 错误优先 Error-handling middleware
app.use((err,req,res,next)=>{
    console.info(err.stack);
    res.send('<h1>Something broke!<h1>');
});
app.listen(8888,()=>{
    console.info('server is on 8888');
});