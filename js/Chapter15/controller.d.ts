/**
 * https://es6.ruanyifeng.com/#docs/decorator
 * 一个 Controller 装饰器可以装饰一个类的方法，返回 http 请求的内容
 * @param handleName 装饰
 * @returns {function(...[*]=)}
 */
declare function controller(): (target: any, name: any, descriptor: any) => any;
declare class Person {
    private mingzi;
    private age;
    constructor(mingzi: any, age: any);
    getInfo(): {
        name: string;
        age: number;
    };
}
declare function des(handlerName: any): (target: any, key: any, descriptor: any) => any;
declare const lynn: Person;
declare const info: {
    name: string;
    age: number;
};
