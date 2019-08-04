//深拷贝代码
function deepCopy(param){
	var res=(param instanceof Array)?[]:{};
	for (var i in param) {
		if (typeof param[i]==='object') {
			res[i]=(param[i] instanceof Array)?[]:{};
			res[i]=deepCopy(param[i]);
		}else{
			res[i]=param[i];
		}
	}
	return res;
}
var xx={
	name:'jack',
	age:5,
	friends:['mary','may']
};
var res0=deepCopy(xx);
console.log(res0);
res0.friends.push('tom');
console.log(res0);
console.log(xx);
//超大整数相加
function sumBigNumber(a, b) {
  var res = '',
    temp = 0;
  a = a.split('');
  b = b.split('');
  while (a.length || b.length || temp) {
    temp += ~~a.pop() + ~~b.pop();
    res = (temp % 10) + res;
    temp = temp > 9;
  }
  return res.replace(/^0+/, '');
}