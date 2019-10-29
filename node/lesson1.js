//console.info('this is a test');
// console.info(process.env);
// console.info(process.argv);
/**
 * 下面做一个命令行加法计算器
 */

// let num1=parseInt(process.argv[2]);
// let num2=parseInt(process.argv[3]);
// console.info('calculating...');
// setTimeout(()=>{
//     console.info(`计算结果为:${num1+num2}`);
// },1000);

// console.info(__dirname);
// console.info(__filename);
const path=require('path');
// 文件路径拼接
const myPath=path.join(__dirname,'/one','/two');
console.info(myPath);
// 根据相对路径返回绝对路径
const str='./abc/efg.js';
let temp=path.resolve(str);
console.info(temp);
console.info(path.parse(__filename));
console.info(path.format(path.parse(__filename)));
