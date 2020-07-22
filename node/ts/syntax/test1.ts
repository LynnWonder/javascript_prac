// interface
// 作用 1：定义对象的类型
// 作用 2：一般来讲一个类智能继承自另一个类，有时候不同类之间有共有特性，因此可以提取为接口，用 implements 关键字实现
interface Alarm {
    alert(): void;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
let myCar =new Car();
myCar.alert();
// 接口和接口之间可以是继承关系

interface Alarm {
    alert(): void;
}

interface LightableAlarm extends Alarm {
    lightOn(): void;
    lightOff(): void;
}
// 实现接口的时候必需里面的内容全部实现
class Truck implements LightableAlarm{
    lightOn(){
        console.info('truck is lighting');
    }
    alert() {
        console.log('Car alert');
    }
    lightOff() {
        console.log('Car light off');
    }
}
let myTruck = new Truck();
myTruck.lightOn();

// TypeScript 会支持接口继承类了：
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

interface PointInstanceType {
    x: number;
    y: number;
}
// 实际上，当我们在声明 class Point 时，除了会创建一个名为 Point 的类之外，同时也创建了一个名为 Point 的类型（实例的类型）。
//
// 所以我们既可以将 Point 当做一个类来用（使用 new Point 创建它的实例）：
// 当我们声明 interface Point3d extends Point 时，Point3d 继承的实际上是类 Point 的实例的类型。
// 换句话说，可以理解为定义了一个接口 Point3d 继承另一个接口 PointInstanceType。
// 所以「接口继承类」和「接口继承接口」没有什么本质的区别。
// 等价于 interface Point3d extends PointInstanceType
// 值得注意的是，PointInstanceType 相比于 Point，缺少了 constructor 方法，这是因为声明 Point 类时创建的 Point 类型是不包含构造函数的。
// 另外，除了构造函数是不包含的，静态属性或静态方法也是不包含的（实例的类型当然不应该包括构造函数、静态属性或静态方法）。
// 换句话说，声明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法：
// 上例中最后的类型 Point 和类型 PointInstanceType 是等价的。
// 同样的，在接口继承类的时候，也只会继承它的实例属性和实例方法。
interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
console.info('point3d===>',point3d);





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