const fs=require('fs');
let data=fs.readFileSync('./a.txt','utf8');
console.info(data);
fs.writeFileSync('./a_copy.txt',data);
console.info('文件复制成功');