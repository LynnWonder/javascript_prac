class Animal {
    constructor(name){
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    speak(){
        return 'woof';
    }
}
let dog = new Dog('dd');
console.info(dog.__proto__);