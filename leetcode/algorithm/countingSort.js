// 计数排序

const countingSort=(arr)=>{
    let min=max=arr[0];
    for(let i=0;i<arr.length;i++){
        if(arr[i]<min){
            min=arr[i];
        }else if(arr[i]>max){
            max=arr[i];
        }
    }
    let temp=new Array(max+1).fill(0);
    while(arr.length>0){
        let val=arr.shift();
        temp[val]++;
    }
    // console.info(temp);
    for(let i=0;i<temp.length;i++){
        while(temp[i]>0){
            arr.push(i);
            temp[i]--;
        }
    }
    return arr;
};
console.info(countingSort([7,4,6,5,1,3,6]));