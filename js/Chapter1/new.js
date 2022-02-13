function Person(name) {
	this.name = name;
}

Person.prototype.getName = function(){
	return this.name;
};

/**
 * tips: 展示了一个 new 运算的过程
 * @returns {*}
 */
const objectFactory = function() {
	// tips:Constructor 即为 objectFactory 传入的第一个参数
	let obj = new Object(),
		Constructor = [].shift.call(arguments);
	obj.__proto__ = Constructor.prototype;
	let ret = Constructor.apply(obj, arguments);
	return typeof ret==='object' ? ret : obj;
};

const a = objectFactory(Person, 'sven');
console.info(a.name);
console.info(a.getName());
console.info(Object.getPrototypeOf(a) === Person.prototype);