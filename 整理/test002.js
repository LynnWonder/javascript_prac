// var readline = require('readline');
// const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
// });
// var countLine = 1;
// var tokens = [];
// rl.on('line', function(line){
//     tokens.push(line);
//     if(countLine == 10){ 
//    }else{  countLine++; }
// });
//输入必须为这种格式
 var sum=`6 2
B 10 3
S 50 2
S 40 1
S 50 6
B 20 4
B 25 10`;
  var sum=sum.split("\n");
  var n =sum[0].split(" ")[0];
  var m =sum[0].split(" ")[1];
  var S=[];
  var B=[];
  console.log(n);
  for(var i=0;i<parseInt(n)+1;i++){
    if(sum[i].split(" ")[0]=="S")
    {
      var ss={
        type:"S",
        p:sum[i].split(" ")[1],
        q:sum[i].split(" ")[2]
      };
    S.push(ss);
    }
    else if(sum[i].split(" ")[0]=="B"){
       var bb={
        type:"B",
        p:sum[i].split(" ")[1],
        q:sum[i].split(" ")[2]
      };
    B.push(bb);
    
    }
}
 // S.sort(compare("p"));
 //  B.sort(compare("p"));
 // console.log(S);
 // console.log(B);
  S=uniqx(S);
  B=uniqx(B);
    for(var i=0;i<(S.length>m?m:S.length);i++)
    {
      console.log(S[i].type+" "+S[ i].p+" "+S[ i].q);
    }
      for(var i=0;i<(B.length>m?m:B.length);i++)
    {
      console.log(B[i].type+" "+B[ i].p+" "+B[ i].q);
    }
function getConcat(array){
   var result=[];
  for(var i=0;i<array.length;i=i+3){
         if(array[i]=="")break;
      var A=array[i+1].split(" ");
      var B=array[i+2].split(" ");
      var C=A.concat(B);
      result.push(uniq(C).join(" "));
    }
  return result;
}
//去重
function uniq(arr){
 arr.sort(function(a,b){
 return a-b;
});
  var temp=[arr[0]];
  for(var i=1;i<arr.length;i++){
    if(arr[i]!==temp[temp.length-1])
      temp.push(arr[i]);
  
  }
  return temp;
}
//去重相同的累加
function uniqx(arr){
  var res=arr;
  arr.sort(compare("p"));
  for (var i = 0; i < arr.length-1; i++) {
    for (var j = i+1; j < arr.length; j++) {
      if (res[i].p==res[j].p) {
       res[i].q= parseInt(res[i].q)+ parseInt(res[j].q); 
       res.splice(j,1);
      }
    }
  }
  return res;
}
function getMax(arr){
   var max=arr[0];
   var index=0;
      for(var j=1;j<arr.length;j++){
          if(arr[j]>max) {
              max=arr[j];
              index=j;
            }
        }
  var max0=[max,index];
  return max0;
}
//京东赛码网获取输入值模板
// var input = read_line();
// while(input){
//   var n =+ input.split(" ")[0];
//   var m = +input.split(" ")[1];
//   var a = [], b = [];
//   var str1 = "", str2 = "";
//   while(a.length !== n){
//     str1 += read_line();
//     a = str1.split(" ");
//   }
//   while(b.length !== m){
//     str2 += read_line();
//     b = str2.split(" ");
//   }
//   //逻辑、、输出
//   input = read_line();
// }
function compare(prop){
  return function(a,b){
    var val1=a[prop];
    var val2=b[prop];
    return val2-val1
  }
  
}



var input = read_line();
while(input){
  var sum=[];
    var n = +input.split(" ")[0];
  var m =+input.split(" ")[1];
  var S=[];
  var B=[];
  while(sum.length !== n){
    var a=read_line();
     sum.push(a);
   }
  for(var i=0;i<n;i++){
    if(sum[i].split(" ")[0]=="S")
    {
      
      var ss={
        type:"S",
        p:sum[i].split(" ")[1],
        q:sum[i].split(" ")[2]
      };
    S.push(ss);
    }
    else if(sum[i].split(" ")[0]=="B"){
       var bb={
        type:"B",
        p:sum[i].split(" ")[1],
        q:sum[i].split(" ")[2]
      };
    B.push(bb);
    
    }
}
 S=uniqx(S);
  B=uniqx(B);
    for(var i=0;i<(S.length>m?m:S.length);i++)
    {
      console.log(S[i].type+" "+S[ i].p+" "+S[ i].q);
    }
      for(var i=0;i<(B.length>m?m:B.length);i++)
    {
      console.log(B[i].type+" "+B[ i].p+" "+B[ i].q);
    }
  input = read_line();
}
function compare(prop){
  return function(a,b){
    var val1=a[prop];
    var val2=b[prop];
    return val2-val1
  }
  
}
//去重相同的累加
function uniqx(arr){
  var res=arr;
  arr.sort(compare("p"));
  for (var i = 0; i < arr.length-1; i++) {
    for (var j = i+1; j < arr.length; j++) {
      if (res[i].p==res[j].p) {
       res[i].q= parseInt(res[i].q)+ parseInt(res[j].q); 
       res.splice(j,1);
      }
    }
  }
  return res;
}
