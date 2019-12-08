// 测试使用mongoDB实现增删改查
const MongoClient = require('mongodb').MongoClient;
// 暂时不用断言
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test01';

let obj={};
// curd都需要拿连接
function _connect(callback){
    MongoClient.connect(url, function(err, client) {
        if(err) throw err; // handle connect error
        callback(client);
    });
}
obj.insert=function (cname,arrData,fn){
    _connect(function(client){
        const col = client.db(dbName).collection(cname);
        // Insert a bunch of documents
        col.insert(arrData, function(err, result) {
            //将数据库的错误交给外部来处理
            fn(err,result);
            client.close();
        });
    });
};
// // 插入函数调用
// obj.insert('collection01',[{name:'jack'},{name:'rose'}],function(err,result){
//     if(err) throw err;
//     console.info(result);
// });
// 查询数据
obj.find=function (cname,filter,fn){
    _connect(function(client) {
        const col = client.db(dbName).collection(cname);
        col.find(filter).toArray(function (err, items) {
            client.close();
            fn(err,items);
        })
    })
};
// obj.find('collection01',{},function(err,items){
//     if(err) throw err;
//     console.info(items);
// });
// 更新数据
//mongoDB operators: https://docs.mongodb.com/manual/reference/operator/update/set/#up._S_set
obj.update=function (cname,filter,updated,fn){
    _connect(function(client) {
        const col = client.db(dbName).collection(cname);
        col.update(filter,{$set:updated},function (err, result) {
            client.close();
            fn(err,result);
        })
    })
};
// 删除数据
obj.remove=function (cname,filter,fn){
    _connect(function(client) {
        const col = client.db(dbName).collection(cname);
        col.remove(filter,function (err, result) {
            client.close();
            fn(err,result);
        })
    })
};


module.exports=obj;
// // 调用更新
// obj.update('collection01',{name:'jack'},{name:'mick'},function(err,result){
//     if(err) throw err;
//     console.info(result);
// });
// obj.remove('collection01',{name:'mick'},function(err,result){
//     if(err) throw err;
//     console.info(result);
// });
// // Connect using MongoClient
// MongoClient.connect(url, function(err, client) {
//     if(err) throw err; // handle connect error
//     // Create a collection we want to drop later 获取DB对象然后获取集合对象
//     const col = client.db(dbName).collection('createIndexExample1');
//     // Insert a bunch of documents
//     col.insert([
//         {a:1, b:1},
//         {a:2, b:2},
//         {a:3, b:3},
//         {a:4, b:4}], {w:1}, function(err, result) {
//         // test.equal(null, err);
//         if(err) throw err; // insert error
//         //
//         col.find({}).toArray(function(err, items) {
//             // test.equal(null, err);
//             // test.equal(4, items.length);
//             if(err) throw err; // query error
//             console.info(items);
//             // 关闭连接，放回mongoDB的连接池
//             client.close();
//         });
//         // // Show that duplicate records got dropped
//         // col.aggregation({}, {cursor: {}}).toArray(function(err, items) {
//         //     test.equal(null, err);
//         //     test.equal(4, items.length);
//         //     client.close();
//         // });
//     });
// });