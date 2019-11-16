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
router.get('/',(req,res)=>{
   // res.render('index');
    let errorPath='./a/b/c.txt';
    try{
        fs.readFileSync(errorPath);
        res.render('index');
    }catch (e) {
        next(e);
    }
    console.info('请求进来了',req.url);
});

app.use(router);
app.listen(8888,()=>{
    console.info('server is on 8888');
});