/**
 * bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，
 * 而其余参数将作为新函数的参数，供调用时使用。
 */

let obj = {
    name: 'lynn',
};
function rename (name) {
    if(name){
        return `${this.name}-${name}`;
    }
    return this.name;
}
console.info(rename()); // 返回 undefined
/**
 * 实现一个 bind 函数
 * 1. 返回一个函数 ===> 闭包
 * 2. 使用 bind 的函数 this 指向第一个参数
 */
Function.prototype.bindMe = function (context) {
    // 作为对象的方法调用，指向该对象
    const self = this;
    return function() {
	    // 因为这属于 this 的使用方法中的作为函数调用，因此指向 window
        // 因此需要将 self
        return self.apply(context, arguments);
    };
};


console.info(rename.bindMe(obj)()); // 返回 lynn
console.info(rename.bind(obj)()); // 返回 lynn

console.info(rename.bindMe(obj,'aa')('test')); // 返回 lynn-test
console.info(rename.bind(obj, 'aa')('test')); // 返回 lynn-aa

/**
 * 可以发现在上面的例子里我们写的 bindMe 已经无法满足我们的需求，因此我们对其稍作改造
 * bind 可以传入内置的参数，同时调用时传入的参数会一起整合传入原函数
 */

Function.prototype.bindMeAd = function () {
    // 作为对象的方法调用，指向该对象
    const self = this;
    const context = [].shift.apply(arguments);
    const restArgs = [].slice.apply(arguments);
    return function() {
        // 因为这属于 this 的使用方法中的作为函数调用，因此指向 window
        // 因此需要将 self
        // 组合两次传入的 params
        return self.apply(context, [].concat.apply(restArgs,[].slice.apply(arguments)));
    };
};

console.info(rename.bindMeAd(obj,'aa')('test')); // 返回 lynn-aaq
console.info(rename.bind(obj, 'aa')('test')); // 返回 lynn-aa