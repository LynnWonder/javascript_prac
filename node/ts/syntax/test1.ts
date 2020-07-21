// 泛型的概念：
// 不同于使用 any，它不会丢失信息，传入数值类型并返回数值类型。
function identity<T>(arg: T): T {
    return arg;
}
// 我们定义了泛型函数后，可以用两种方法使用。 第一种是，传入所有的参数，包含类型参数：
let output0 = identity<string>("myString");
// 第二种方法更普遍。利用了类型推论 -- 即编译器会根据传入的参数自动地帮助我们确定T的类型
let output1 = identity("myString");  // type of output will be 'string'
console.info('output===>',output0,output1);
// 使用泛型变量的泛型函数loggingIdentity，接收类型参数T和参数arg，它是个元素类型是T的数组，并返回元素类型是T的数组
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.info('len==>',arg.length);  // Array has a .length, so no more error
    return arg;
}

loggingIdentity([1,2,3]);

// 泛型类
// 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面
// 与接口一样，直接把泛型类型放在类后面，可以帮助我们确认类的所有属性都在使用相同的类型。
// 我们在类那节说过，类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。
class GenericNumber<T>{
    zeroValue: T;
    add: (x:T,y:T)=>T;
}
let myGenericNumber=new GenericNumber<number>();
myGenericNumber.add=(x,y)=>{
    console.info('add==>',x+y);
    return x+y;
};
myGenericNumber.add(1,2);

// 泛型约束
// 相比于操作any所有类型，我们想要限制函数去处理任意带有.length属性的所有类型。
// 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。 为此，我们需要列出对于T的约束要求。
// 为此，我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字来实现约束：
// interface
interface Lengthwise {
    length: number;
}

function loggingIdentity1<T extends Lengthwise>(arg: T): T {
    console.log('genericity len==>',arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

loggingIdentity1({length:10});