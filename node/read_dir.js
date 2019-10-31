/**
 * 一个命令行输入参数 遍历该文件夹下所有文件的demo
 * @type {module:path}
 */
const path=require('path');
const fs=require('fs');
// process.argv[2]是node xx.js [2]  命令行的第一个参数
// path.resolve解析为绝对路径
let inputPath=path.resolve(process.argv[2]);
const testFiles=inputPath=>{
    try {
        fs.accessSync(inputPath, fs.constants.F_OK);
        let state=fs.statSync(inputPath);
        if(state.isFile()){
            console.info('is a file',inputPath);
        }else if(state.isDirectory()){
            console.info('is a directory');
            let files=fs.readdirSync(inputPath);
            files.forEach(item=>{
                // testFiles(path.join(inputPath,item));
                // path.resolve方法将路径或路径片段的序列解析为绝对路径。因此直接用join拼接即可，不必重复该过程
                testFiles(path.resolve(inputPath,item));
            })
        }
        console.log('可以读写');

    } catch (err) {
        console.error('该文件夹不存在');
    }
};
testFiles(inputPath);
