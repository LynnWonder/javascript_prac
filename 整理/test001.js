//向数组中添加对象
var arr=[];
var obj0={
	name:"jack",
	age:20
}
var obj1={
	name:"tom",
	age:18
}
var obj2={
	name:"marry",
	age:23
}
//push unshift可以多个参数pop shift一般没有参数；
//replace是字符串方法；splice可以用于数组添加，删除，替换
arr.push(obj0,obj1,obj2);
console.log(arr);
//sort比较对象中属性的大小并排序
console.log(arr.sort(compare("age")));
function compare(prop){
	return function(a,b){
		var val1=a[prop];
		var val2=b[prop];
		return val1-val2;//增序
	}

}
var arr1=[7,4,5,5,7,8,2,7];
console.log("bubble:"+bubbleSort(arr1));
console.log("quick:"+quickSort(arr1));
console.log(getUniq(arr1));
console.log("max:"+getMax(getUniq(arr1))[0]+"index:"+getMax(getUniq(arr1))[1]);
//数组排序方法去重
function getUniq(arr){
	//pop,push,shift,unshift,sort,splice改变原数组
	arr.sort(function(a,b){
		return a-b;
	})
	var temp=[arr[0]];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i]!==temp[temp.length-1]) {
			temp.push(arr[i]);
		}
	}
	return temp;
}
//返回数组中最大值
function getMax(arr){
	var max=arr[0];
	var index=0;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]>max) {
			max=arr[i];
			index=i;
		}
	}
	return [max,index];
}
//冒泡法排序
function bubbleSort(arr){
	for (var i = 0; i < arr.length-1; i++) {
		for (var j = i+1; j < arr.length; j++) {
			if(arr[i]>arr[j]){
				var temp=arr[i];
				arr[i]=arr[j];
				arr[j]=temp;
			}
		}
	}
	return arr;
}
//快速排序法排序
function quickSort(arr){
	if (arr.length<=1) {return arr}
	var pivotIndex=Math.floor(arr.length/2);
	var pivot=arr[pivotIndex];//基准
	arr.splice(pivotIndex,1);//删除基准，它返回的是被删除的元素组成的数组
	var left=[];
	var right=[];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i]<=pivot) {
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat([pivot],quickSort(right));
}
//返回字符串中重复字符最多的一个子串并指明索引起始
var str0="aaddjjkklsssssssssssssssss"
console.log(getMaxStr(str0));
 function getMaxStr(str){
 	 var value = '';
     var index = 0;
 	 var re = /(\w)\1+/g; //匹配字符，且重复这个字符，重复次数至少一次。
            str.replace(re,  function ($0, $1,$2,$3) {
                //alert($0); 代表每次匹配成功的结果 : aa dd jj kk l sssssssssssssssss
                //alert($1); 代表每次匹配成功的第一个子项，也就是\w: a d j k l S 
                console.log($0);
                console.log($1);
                console.log($2);
                console.log($3);
                if (index < $0.length) { //如果index保存的值小于$0的长度就进行下面的操作
                    index = $0.length; // 这样index一直保存的就在最大的长度
                    value = $1; //value保存的是出现最多的这个字符
                }
            });
            return [index,value];
 }