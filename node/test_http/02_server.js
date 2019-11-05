/**
 * 对客户端的两个请求进行响应，
 * 请求地址为/时响应一个html网页
 * 请求地址为/test时响应 具体的内容
 * @type {module:http}
 */
const http=require('http');
const fs=require('fs');
// 设计两个接口， / 返回index.html
//  /test 只用write 不用end  =>  默认来讲 页面会一直转
http.createServer((req,res)=>{
    if (req.url==='/'){
        // 这是开发中非常常见的：同步请求，响应页面。
        fs.readFile('./index.html',(err,data)=>{
            res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
            res.end(data);
        })
    }else if(req.url === '/test' && req.method === 'GET'){
        // // 告知客户端，可以一点一点的显示
        res.writeHead(200,{'content-type':'application/octet-stream'});
        setInterval(function() {
            res.write(''+Date.now() +'^_^\n');
        },100);
        res.write('hello world');
    }
}).listen(8888,()=>{
    console.info('server is starting in 8888...')
});