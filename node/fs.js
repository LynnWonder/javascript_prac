const fs=require('fs');
// 读操作
// fs.readFile('./lesson1.js','utf8',(err,data)=>{
//     if (err) throw err;// 抛到控制台打印异常信息
//     console.info(data);
//     // console.info(data.toString('utf8'));
// });
// 写操作
fs.writeFile('./a.txt','this is a test using fs.writeFile append',{flag:'a'},err=>{
    if (err) throw err;
    console.info('writing file is finished');
});
// 追加方式1
 fs.appendFile('./a.txt','\n u r right',err=>{
     if (err) throw err;
     console.info('appending to the file is finished');
 });