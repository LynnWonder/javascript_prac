let express=require('express');
let path=require('path');
// A Node.js module for parsing form data, especially file uploads
// 解析表单数据的node模块
let formidable=require('formidable');
// prepare for data persistence
const db=require('./dbTools');
let https=require('https');
let fs=require('fs');
let app=express();
let router=express.Router();
// let heros=[];
// 以下是配置https
// const options = {
//     key: fs.readFileSync('1530632509237.key'),
//     cert: fs.readFileSync('1530632509237.pem')
// };
// let server=https.createServer(options,app);
app.engine('.html',require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
router.get('/',(req,res,next)=>{
    // // es6简写
    // res.render('index',{heros});
    // 从数据库读取数据
    db.find('heros',{},function(err,result){
        if(err) next(err);
        res.render('index',{heros:result});
    })
})
    .post('/add',(req,res,next)=>{
        let form = new formidable.IncomingForm();
        // change upload dir
        form.uploadDir = path.join(__dirname,'public','imgs');
        // keep extensions
        form.keepExtensions=true;
        console.info(form);
        form.parse(req, function(err, fields, files) {
            // res.writeHead(200, {'content-type': 'text/plain'});
            // res.write('received upload:\n\n');
            // res.end(util.inspect({fields: fields, files: files}));
            // console.info(fields);
            // console.info(files);
            // fields.nickname
            // files.avatar.path
            // get dir's filename ==>path.basename(dir)
            // then we change the object:hero;
            let nickname=fields.nickname;
            // console.info(path.basename(files.avatar.path,'.jpg'));
            let filename=path.parse(files.avatar.path).base;
            let img='imgs/'+filename;
            // heros.push({
            //     name:nickname,
            //     img
            // });
            // data ==>database
            db.insert('heros',{name:nickname,img},function(err,result){
                if(err){
                    next(err);
                }
                console.info(result);
                // 同步提交，浏览器等待页面显示
                res.redirect('/');
            });
        });
    })
    //最后一条路由中
.all('*',(req,res)=>{
    res.send('bad request');
});
// 处理静态资源：图片
app.use(express.static('./public'));
app.use(router);
// 改成https之后，使用server而不是app
app.listen(8880,()=>{
    console.info('server is on 8880');
});