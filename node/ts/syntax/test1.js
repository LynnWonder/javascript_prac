// 泛型的概念：
// 不同于使用 any，它不会丢失信息，传入数值类型并返回数值类型。
function identity(arg) {
    return arg;
}
// 我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：
var output0 = identity("myString");
// 第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型
var output1 = identity("myString"); // type of output will be 'string'
console.info('output===>', output0, output1);
// 使用泛型变量的泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组
function loggingIdentity(arg) {
    console.info('len==>', arg.length); // Array has a .length, so no more error
    return arg;
}
loggingIdentity([1, 2, 3]);
// 泛型类
// 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面
// 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。
// 我们在类那节说过，类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
var GenericNumber = /** @class */ (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.add = function (x, y) {
    console.info('add==>', x + y);
    return x + y;
};
myGenericNumber.add(1, 2);
function loggingIdentity1(arg) {
    console.log('genericity len==>', arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
loggingIdentity1({ length: 10 });
