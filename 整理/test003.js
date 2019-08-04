// 核对隐性丢失
// var foo=11;
// function show(){
// 	console.log(this.foo);
// }
// var obj={
// 	foo:2,
// 	show:show
// }
// setTimeout(obj.show,1000);
// var my=obj.show;
// my()
//实现大整数相加
function sumStrings(a,b){
    var res='', c=0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || c){
    	// console.log(a.pop());
    	// console.log(b.pop());
    	var x=0,y=0;
        // c += Number(a.pop()) + Number(b.pop());
        c+=(typeof(x=a.pop())==='undefined'?0:parseInt(x))+(typeof(y=b.pop())==='undefined'?0:parseInt(y))
        res = c % 10 + res;
        c = c>9;
    }
    return res.replace(/^0+/,'');
}
// sumStrings('454','5');
console.log(sumStrings('45486646468484544661134868968','544545867466464646'));
let bigNumberAdd = (bigNumberA, bigNumberB) => {
    let A  = (bigNumberA + '').split('');
    let B = (bigNumberB + '').split('');
    let aLen = A.length, bLen = B.length, cLen = Math.max(aLen, bLen) + 1;
    let result = [], prefix = 0;
    for (let i = 0; i< cLen -1; i++ ) {
        let a = aLen - i - 1 >= 0 ? parseInt(A[aLen - i - 1]) : 0, b = bLen - i - 1 >= 0 ? parseInt(B[bLen - i - 1]) : 0;
    result[i] = (a + b + prefix) % 10;
        prefix = Math.floor((a + b + prefix) / 10);
    }
    return result.reverse().join('');
};
console.log(bigNumberAdd('45486646468484544661134868968','544545867466464646'));