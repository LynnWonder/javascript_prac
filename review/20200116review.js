// 基数排序
// 时间复杂度:O(n*k) 其中 k是最高位数
// 空间复杂度:O(n+k)
// LSD 从低位开始比较
const radixSort_LSD=(arr,maxDigit)=>{
    let fir=10,sec=1;
    for(let i=0;i<maxDigit;i++,fir*=10,sec*=10){
        let res=[];
        while(arr.length){
            let val=arr.shift();
            let temp=Math.floor(val%fir/sec);
            if(res[temp]){
                res[temp].push(val);
            }else{
                res[temp]=[val];
            }
        }
        for(let j=0;j<res.length;j++){
            if(res[j]){
                while(res[j].length){
                    arr.push(res[j].shift());
                }
            }
        }
    }
    return arr;
};

// 从高位开始比较
const radixSort_MSD=(arr,r)=>{
    if(r<1) return arr;
    let fir=Math.pow(10,r),sec=Math.pow(10,r-1),res=[];
    while(arr.length){
        let val=arr.shift();
        let temp=Math.floor(val%fir/sec);
        if(res[temp]){
            res[temp].push(val);
        }else{
            res[temp]=[val];
        }
    }
    for(let i=0;i<res.length;i++){
        if(res[i]&&res[i].length>1){
            res[i]=radixSort_MSD(res[i],r-1);
        }
    }
    // console.info(res);
    for(let i=0;i<res.length;i++){
        if(res[i]){
            while(res[i].length){
                arr.push(res[i].shift());
            }
        }
    }
    return arr;
};
console.info(radixSort_LSD([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48],2));
console.info(radixSort_MSD([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48],2));