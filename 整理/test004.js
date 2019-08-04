function bigNumSum(a,b){
	var aa=a.split("");
	var ba=b.split("");
	var c=0;//表示进位
	var res='';
	while(aa.length || ba.length ||c){
		var x=0,y=0;
		c+=(typeof(x=aa.pop())==='undefined'?0:parseInt(x))+(typeof(y=ba.pop())==='undefined'?0:parseInt(y));
		res=c%10+res;
		c=c>9;
	}
	return res.replace(/^0+/,"");
}
console.log(bigNumSum('45486646468484544661134868968','544545867466464646'));