/**
1:引入express第三方对象
2:构建一个服务器对象
3:开启服务器监听端口
4:处理响应
在express中，保留了原生http的相关属性和函数
 */
// 1:引入express第三方对象
const express=require('express');
// package.json .main || express文件夹下的index.js
// 2:构建一个服务器对象
// 原生 let server=http.createServer((req,res)=>{})
// express框架
let server=express();
// 3:开启服务器监听端口
// 原生 server.listen(port,()=>{})
server.listen(8888);
// 4:处理响应
// 原生 在回调函数中写
server.use((req,res)=>{
    res.end('hello world');
});