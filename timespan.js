"use strict";
exports.__esModule = true;
// import timeSpan from 'time-span';
var timeSpan = require("time-span");
function test() {
    // @ts-ignore
    var end = timeSpan();
    console.info('test');
    console.log(end());
}
test();
