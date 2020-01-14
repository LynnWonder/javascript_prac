// 基数排序
// LSD
const radixSort=(arr,maxDigit)=>{
    let first=10,sec=1,count=[];
    for(let i=0;i<maxDigit;i++,first*=10,sec*=10){
        while(arr.length>0){
            let tempArr=arr.shift();
            let temp=Math.floor((tempArr%first)/sec);
            if(!count[temp]){
                count[temp]=[tempArr];
            }else{
                count[temp].push(tempArr);
            }
        }
        // console.info('count===>',count);
        for(let k=0;k<count.length;k++){
            if(count[k]){
                while(count[k].length>0){
                    arr.push(count[k].shift());
                }
            }
        }
        // console.info('arr===>',arr);
    }
    return arr;
};
/**
 * MSD区别于LSD，它的目标是让分组后的每个数组元素都只有一个元素，如果多于1个就进行递归
 * 递归的过程中让当前比较位-1
 * @param arr
 * @param r
 * @returns {*}
 */
const radixSort1=(arr,r)=>{
    let radix=Math.pow(10,r-1),count=[];
    while(arr.length>0){
        let tempArr=arr.shift();
        let temp=Math.floor(tempArr%Math.pow(10,r)/radix);
        if(!count[temp]){
            count[temp]=[tempArr];
        }else{
            count[temp].push(tempArr);
        }
    }
    for(let j=0;j<count.length;j++){
        if(count[j]&&count[j].length>1){
            radixSort1(count[j],r-1);
        }
    }
    // collect items
    for(i=0;i<count.length;i++){
        while(count[i]&&count[i].length>0){
            arr.push(count[i].shift());
        }
    }
    return arr;
};
console.info(radixSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48],2));
console.info(radixSort1([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48],2));