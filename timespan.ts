// import timeSpan from 'time-span';
import timeSpan = require('time-span');

function test() {
    // @ts-ignore
    const end = timeSpan();
    console.info('test');
    console.log(end());
}


test();