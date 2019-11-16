/**
 * 以下就是服务端渲染的一个简单demo
 * @type {createApplication}
 */
const express=require('express');
let app=express();
let router=express.Router();
router.get('/hero',(req,res)=>{
    res.render('list.html',{
        heros:[
            {name:'1'},
            {name:'2'},
            {name:'3'},
        ]
    })
});
app.use(router);
app.listen(8080,()=>{
    console.info('server on 8080');
});
// - app.js中配置
// - 注册一个模板引擎
app.engine('.html',require('express-art-template'));
// - 设置默认渲染引擎
app.set('view engine','.html');
// - res.render(文件名,数据对象);
// - express这套使用，默认在当前app.js同级的views目录查找


app.set('view options', {
    // debug模式下不压缩 不混淆代码 实时保存最新数据
    // 非debug模式下 压缩/合并 list.html中的静态数据不会实时更新，只有服务器重启才会更新
    debug: process.env.NODE_ENV !== 'production',
    // 过滤器：参考开发文档https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E8%BF%87%E6%BB%A4%E5%99%A8
    imports:{
        num:1,
        reverse:function(str){
            return '^^'+str+'^^';
        }
    }
});
