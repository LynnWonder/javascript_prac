// topK
const swap=(arr,a,b)=>{
    let temp=arr[a];
    arr[a]=arr[b];
    arr[b]=temp;
};
const partition=(arr,k,left,right)=>{
    let pivot=left,lessThan=left;
    if(left===right) return left;
    for(let i=left;i<=right;i++){
        if(arr[i]<arr[pivot]){
            lessThan++;
            swap(arr,lessThan,i);
        }
    }
    swap(arr,lessThan,pivot);
    return lessThan;
};
const quickSelect=(arr,k,left,right)=>{
    let idx=partition(arr,k,left,right);
    if(idx-left+1>k){
        return quickSelect(arr,k,left,idx-1);
    }else if(idx-left+1===k){
        return arr[idx];
    }else{
        return quickSelect(arr,k-(idx-left+1),idx+1,right);
    }
};
const topK=(arr,k)=>{
    return quickSelect(arr,k,0,arr.length-1);
};

console.info(topK([7,4,6,5,1,3,6,9,10,7],5));
console.info(topK([3,90,56,20,20,20,20,46,72],8));