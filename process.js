process.on('SIGINT', function() {
    console.log('Naughty SIGINT-handler');
});
process.on('exit', function () {
    console.log('exit');
});
console.log('PID: ', process.pid);

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');

const handler = () => {
    console.log('Nice SIGINT-handler');
    // process.exit();
}
process.on('SIGINT', handler);
// var listeners = process.listeners('SIGINT');
// for (var i = 0; i < listeners.length; i++) {
//     console.log(listeners[i].toString());
// }
// 查看 SIGINT 的监听回调，看看哪一个没有 exit
console.info(process.listeners('SIGINT').map(String));