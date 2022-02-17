var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * https://es6.ruanyifeng.com/#docs/decorator
 * 一个 Controller 装饰器可以装饰一个类的方法，返回 http 请求的内容
 * @param handleName 装饰
 * @returns {function(...[*]=)}
 */
function controller() {
    /**
     * target: 类的原型对象
     * name: 索要装饰的属性名
     * descriptor: 该属性的描述对象
     */
    return function (target, name, descriptor) {
        const fn = descriptor.value;
        // descriptor对象原来的值如下
        // {
        //   value: specifiedFunction,
        //   enumerable: false,
        //   configurable: true,
        //   writable: true
        // };
        descriptor.value = async function (req, res, next) {
            try {
                // 执行被装饰的函数的逻辑，并将其作为响应内容返回回去
                const result = await fn.apply(this, arguments);
                // 此处略过一些处理结果的逻辑
                res.send(result);
            }
            catch (e) {
                // 捕获错误将错误传递下去
                next(e);
            }
        };
        return descriptor;
    };
}
// 实现一个简单的装饰器，
class Person {
    constructor(mingzi, age) {
        this.mingzi = mingzi;
        this.age = age;
    }
    getInfo() {
        return {
            name: this.mingzi,
            age: this.age,
        };
    }
}
__decorate([
    des('getInfo')
], Person.prototype, "getInfo", null);
function des(handlerName) {
    return function (target, key, descriptor) {
        const fn = descriptor.value;
        descriptor.value = function () {
            const res = fn.apply(this, arguments);
            return {
                res,
                handlerName,
            };
        };
        return descriptor;
    };
}
const lynn = new Person('lynn', 20);
const info = lynn.getInfo();
console.info('=====info', info);
//# sourceMappingURL=controller.js.map