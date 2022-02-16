function decorator(fn, beforeFn){
    return function () {
        beforeFn.apply(this, arguments);
        return fn.apply(this, arguments);
    };
}

function test(params) {
    console.info('origin function', params);
}

const _test = decorator(test, function(){
    console.info('before===',2);
});

_test(1);


/**
 * 一个实际应用：想要使用 function func 的时候同时传递一个 token，但又不想污染原 test 函数
 */
Function.prototype.beforeDecorator = function(newFn){
    const self = this;
    return function(){
        // 可以发现这一步和下一步使用相同的 params
        newFn.apply(this, arguments);
        return self.apply(this, arguments);
    };
};

function getToken() {
    return 'token';
}
function func(param1, param2, param3) {
    return {
        param1,
        param2,
        param3,
    };
}
const testWizToken = func.beforeDecorator(function(param1, param2, param3){
    console.info('====getToken', getToken());
    param3.token = getToken();
});

const res = testWizToken('param1', 'param2', {foo:'bar'});

console.info('=====res', res);