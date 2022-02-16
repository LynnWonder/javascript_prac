Function.prototype.before  = function(newFn) {
    const self = this;
    return function() {
        newFn.apply(this, arguments);
        return self.apply(this, arguments);
    };
};


function test(params) {
    console.info('origin function', params);
}

// test.before(function() {
//     console.info('=====before',2);
// })();
const decoratorTestBefore = test.before(function() {
    console.info('=====before',2);
});

decoratorTestBefore(1);

Function.prototype.after = function(newFn) {
    const self = this;
    return function() {
        console.info('===self', self);
        console.info('===this', this === global);
        // 执行原函数
        self.apply(this, arguments);
        // 执行新函数
        newFn.apply(this, arguments);
    };
};

// test.after(function() {
//     console.info('=====after',2);
// })(1);

const decoratorTestAfter = test.after(function(){
    console.info('=====after',2);
});

decoratorTestAfter(1);