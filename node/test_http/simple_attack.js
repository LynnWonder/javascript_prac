// attack.js
// 在1秒内发出约50000个请求
var client = require('./simple_client');

var d = 5000,
    t = Date.now();
while(Date.now() - t < d) {
    client.send();
}
console.log('end.');