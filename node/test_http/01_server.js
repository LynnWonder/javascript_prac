const http=require('http');
let server=http.createServer();
// node 是基于事件的
server.on('request',(req,res)=>{
    // req is read-only object
    // res 是只写对象，调函数
    // console.info(req.headers);
    // console.info(req.url);
    // console.info(req.method);
    req.on('data',(data)=>{
        // 查看请求的数据
        console.info(data.toString());
    });
    // 写头
    res.setHeader('a','a');
    res.setHeader('b','b');
    res.setHeader('c','c');
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    // 写体
    res.write('this is a test0');
    res.write('this is a test1');
    res.end('hello world');
});
// ip找计算机 端口找程序
server.listen(8888,()=>{
    console.info('服务器启动在8888端口上');
});