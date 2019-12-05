let express=require('express');
let path=require('path');
let formidable=require('formidable');
let app=express();
let router=express.Router();

let heros=[];

app.engine('.html',require('express-art-template'));
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
router.get('/',(req,res,next)=>{
    // es6简写
    res.render('index',{heros});
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
            heros.push({
                name:nickname,
                img
            });
            // 同步提交，浏览器等待页面显示
            res.redirect('/');
        });
    })
    //最后一条路由中
.all('*',(req,res)=>{
    res.send('bad request');
});
// 处理静态资源：图片
app.use(express.static('./public'));
app.use(router);
app.listen(8880,()=>{
    console.info('server is on 8880');
});