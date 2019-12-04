let express=require('express');
let path=require('path');
let app=express();
let router=express.Router();


let heros=[
    {
        name:'purple hair',
        img:'imgs/1.jpg'
    },
    {
        name:'black hair',
        img:'imgs/2.jpg'
    }
]

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
.all('*',(req,res)=>{
    res.send('bad request');
});
// 处理静态资源：图片
app.use(express.static('./public'));
app.use(router);
app.listen(8880,()=>{
    console.info('server is on 8880');
});