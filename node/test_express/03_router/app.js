const express=require('express');
let app=express();
app.listen(8888);
/**
 - 1:获取路由中间件对象
 - 2:配置路由规则 `router.请求方式(URL,fn事)`
 - fn中参数有req,res,next
 - 3:将router加入到应用`app.use(router)`
 */
/**
 * router.get是router.METHOD()的一种表现形式
 * 且返回的还是一个router对象，因而可以使用链式调用
 * @type {Router}
 */
let router = express.Router();
let test=router.get('/register',(req,res)=>{
    res.end('register');
});
console.info(test);
    router.get('/login',(req,res)=>{
    res.end('login');
});
    router.get('/json',(req,res)=>{
        // res.end()数据类型只能是string或者buffer
        res.json({'name':'json'});
    }).get('/redirect',(req,res)=>{
        res.redirect('https://www.baidu.com.cn');
    }).get('/jsonp',(req,res)=>{
        res.jsonp('test');
    }).get('/down',(req,res)=>{
        res.download('./app.js');
    });
app.use(router);