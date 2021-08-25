// 桶排序
const insertSort=arr=>{
    for(let i=1;i<arr.length;i++){
        let j=i,temp=arr[i];
        while(j>0&&temp<arr[j-1]){
            arr[j]=arr[j-1];
            j=j-1;
        }
        arr[j]=temp;
    }
    return arr;
};
const bucketSort=(arr,bucketSize)=>{
    if(arr.length===0) return;
    let minValue=arr[0],maxValue=arr[0],DEFAULT_BUCKET_SIZE=5;
    for(let i=0;i<arr.length;i++){
        if(arr[i]<minValue){
            minValue=arr[i];
        }else if(arr[i]>maxValue){
            maxValue=arr[i];
        }
    }
    // 设置桶的默认容量为5
    bucketSize=bucketSize||DEFAULT_BUCKET_SIZE;
    // 确定桶的数量
    let bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    let buckets=new Array(bucketCount);
    for(let i=0;i<bucketCount;i++){
        buckets[i]=[];
    }
    while(arr.length>0){
        let temp=arr.shift();
        buckets[Math.floor((temp- minValue) / bucketSize)].push(temp);
    }
    for(let i=0;i<buckets.length;i++){
        insertSort(buckets[i]);
        for(let j=0;j<buckets[i].length;j++){
            arr.push(buckets[i][j]);
        }
    }
    console.info(buckets);
    return arr;
};
// console.info(bucketSort([7,4,6,5,1,3,6]));
console.info(bucketSort([5,6,9,6,3,4,7,3,0,1,2,5,9,6,3,0,5,9,9,7]));