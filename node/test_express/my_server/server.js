const http=require('http');
const fs=require('fs');
const express=require('express');
const app=express();
// let server=http.createServer((req,res)=>{
//     if(req.url==='/'){
//         fs.readFile('./dist/index.html',(err,data)=>{
//             res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
//             res.end(data);
//         });
//     }
// });
let server=http.createServer(app);
server.listen(8080,()=>{
    console.info('server is on 8080');
});
app.use(express.static('./dist'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});