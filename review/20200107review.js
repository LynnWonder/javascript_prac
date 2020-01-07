// 20200107review
const insertSort=arr=>{
    for(let i=1;i<arr.length;i++){
        let j=i,temp=arr[i];
        while(j>0&&temp<arr[j-1]){
            arr[j]=arr[j-1];
            j--;
        }
        arr[j]=temp;
    }
    return arr;
};
// console.info(insertSort([7,4,6,5,1,3,6]));
const bucketSort=(arr,size)=>{
    let min=0,max=0;
    // find min max
    for(let i=0;i<arr.length;i++){
        if(arr[i]<min){
            min=arr[i];
        }else if(arr[i]>max){
            max=arr[i];
        }
    }
    // set bucketSize bucketCount
    let bucketSize=size||5;
    let bucketCount=Math.floor((max-min)/bucketSize)+1;
    //
    let buckets=new Array(bucketCount);
    for(let i=0;i<bucketCount;i++){
        buckets[i]=[];
    }
    while(arr.length>0){
        let temp=arr.shift();
        buckets[Math.floor(temp/bucketSize)].push(temp);
    }
    // console.info(buckets);
    for(let i=0;i<bucketCount;i++){
        buckets[i]=insertSort(buckets[i]);
        for(let j=0;j<buckets[i].length;j++){
            arr.push(buckets[i][j]);
        }
    }
    return arr;
};
console.info(bucketSort([7,4,6,5,1,3,6]));