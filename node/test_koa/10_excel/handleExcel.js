// handle the node-excel
// import xlsx from 'node-xlsx'
const fs=require('fs');
const xlsx = require('node-xlsx').default;
// __dirname总是指向绝对路径
// // Parse a buffer
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/1.xls`));
// // Parse a file
// const workSheetsFromFile = xlsx.parse(`${__dirname}/2.xlsx`);
// console.info(workSheetsFromBuffer);
// console.info(workSheetsFromBuffer[0].data);
// console.info(workSheetsFromFile);
// console.info(workSheetsFromFile[0].data);

// generate xlsx
// const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
// const buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
// // 将其写入到文件里面去
// fs.writeFile('./3.xlsx',buffer,()=>{
//
// });
// spanning
const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
const range = {s: {c: 0, r:0 }, e: {c:0, r:3}}; // A1:A4
const options = {'!merges': [ range ]};

var buffer = xlsx.build([{name: "mySheetName", data: data}], options); // Returns a buffer
fs.writeFile('./spanning.xlsx',buffer,()=>{});