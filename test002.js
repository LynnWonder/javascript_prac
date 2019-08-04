var sum=`18 1
aabaabaaaabaabaabb`;
var sum=sum.split("\n");
  var n =sum[0].split(" ")[0];
  var m =sum[0].split(" ")[1];
  var str=sum[1];
  // console.log(str);
  var stiArr=str.split("");
  var reg=/ab/g;
  var index=[];
  var ab=["a","b"];
  var max=0;
  var maxs=[];
  var xx=new Object();
  while(xx=reg.exec(str)){
  	index.push(xx.index);
  }
 for (var i = 0; i < m; i++) {
 	for (var j = 0; j < index.length; j++) {
 		{
 			 {
 				stiArr.splice(index[j],1,ab[1]);
 				maxs.push(getLength(stiArr));
 				stiArr.splice(index[j],1,ab[0]);//还原

 			}
 			{
 				// console.log(stiArr.join());
 				stiArr.splice(index[j]+1,1,ab[0]);
 				// console.log("001"+stiArr.join());
 				maxs.push(getLength(stiArr));
 				stiArr.splice(index[j]+1,1,ab[1]);//还原

 			}
 			
 			
 		}
 		

 	}
 }
 console.log(getMax(maxs));
 function getLength(str){
     str = str.join(''); //
 	 var value = '';
     var index = 0;
 	 var re = /(\w)\1+/g; //匹配字符，且重复这个字符，重复次数至少一次。
            str.replace(re, function ($0, $1) {
                //alert($0); 代表每次匹配成功的结果 : aa dd jj kk l sssssssssssssssss
                //alert($1); 代表每次匹配成功的第一个子项，也就是\w: a d j k l S 

                if (index < $0.length) { //如果index保存的值小于$0的长度就进行下面的操作
                    index = $0.length; // 这样index一直保存的就在最大的长度
                    value = $1; //value保存的是出现最多的这个字符
                }
            });
            return index;
 }
 function getMax(arr){
 	var max=arr[0];
 	for (var i = 1; i < arr.length; i++) {
 		if (arr[i]>max) {max=arr[i]}
 	}
 return max;
 }
 	  	


