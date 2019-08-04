// 对数组或者对象进行深拷贝
function deepCopy(a){
	var res=[]||{};//结果是数组或者对象类型
	for (var i in a) {//typeof返回类型只有：number string boolean object function undefined均为小写
		if (typeof(a[i])==='object') {
			res[i]=(a[i]instanceof Array)?[]:{};
			res[i]=deepCopy(a[i]);
		}else{
			res[i]=a[i];
		}
	}
	return res;
}
var arr=[7,4,6,5];
var Aarr=[];
var after0=deepCopy(arr);
after0.push(10);
var obj0={
	name:'jack',
	age:20,
	friends:['tom','mary']
};
console.log(after0);
console.log(arr);
console.log("拷贝数组改变前");
console.log(obj0);
var Aobj=deepCopy(obj0)
Aobj.friends.push('mymy');
console.log(Aobj);
console.log("拷贝数组改变后");
console.log(obj0);
console.log(typeof(undefined));
console.log(typeof(null));
console.log(null==undefined)
console.log(Object.keys(obj0));