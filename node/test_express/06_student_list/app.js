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
    // db.find('heros',{},function(err,result){
    //     if(err) next(err);
    //     res.render('index',{heros:result});
    // })
    // 添加位置信息后，进入首页首先渲染index页面
    res.render('index');
})
    .get('/list',(req,res,next)=>{
        console.info(req.headers.cookie);

        //todo 从cookie中获取数据
        console.info('cookie==>',req.headers.cookie);
        let location = req.headers.cookie.split('location=');
        if(!location) return res.send('没有注册');
        location = location[1];
        let lon = location.split(',')[1];
        let lat = location.split(',')[0];
        let heros=[];
        console.log(lon,lat);

        db.find('heros_geo',{},function(err,result){
            if(err) next(err);
            heros=result;
        });
        // 计算附近的人的基准是存入cookie的信息
        db.nearMe('heros_geo',{lon:parseFloat(lon),lat:parseFloat(lat)},function(err,nears) {
            if(err) next(err);
            console.log(heros);
            res.render('list',{
                heros,
                nears, // ES6属性简写，key和value是同名的
            });
        });


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
            // todo 获取用户信息中的location信息
            let location=fields.location;
            let lon=location.split(',')[1];
            let lat=location.split(',')[0];
            // 将位置信息存入到数据库中
            db.insert('heros_geo',{name:nickname,img,near:{
                type:"Point",
                    coordinates:[parseFloat(lon),parseFloat(lat)]
                }},function(err,result){
                if(err){
                    next(err);
                }
                console.info(result);
                // 为什么要将信息存入cookie一份呢？
                res.setHeader('set-cookie','location='+location);
                // 同步提交，浏览器等待页面显示
                res.redirect('/list');
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