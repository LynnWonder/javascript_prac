// setTimeout(function(){
//     console.log('1')
// });
//
// new Promise(function(resolve){
//     console.log('2');
//     resolve();
// }).then(function(){
//     console.log('3')
// });
//
// console.log('4');// 2 4 3 1
// node环境下的事件监听依赖libuv与前端环境不完全相同，输出顺序可能会有误差
console.log('1');

setTimeout(function () {
    console.log('2');
    process.nextTick(function () {
        console.log('3');
    });
    new Promise(function (resolve) {
        console.log('4');
        resolve();
    }).then(function () {
        console.log('5')
    })
});
process.nextTick(function () {
    console.log('6');
});
new Promise(function (resolve) {
    console.log('7');
    resolve();
}).then(function () {
    console.log('8')
});

setTimeout(function () {
    console.log('9');
    process.nextTick(function () {
        console.log('10');
    });
    new Promise(function (resolve) {
        console.log('11');
        resolve();
    }).then(function () {
        console.log('12')
    })
});