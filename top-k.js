// 利用堆这种数据结构解决top-k问题
import Heap from './algorithm/Heap/MinHeap';
const topK=(arr,k)=>{
    let h=new Heap();
    for(let i=0;i<k;i++){
        h.insert(arr[i]);
    }
    for(let i=k;i<arr.length;i++){
        if (arr[i]>h.data[0]){
            h.deleting();
            h.insert(arr[i]);
        }
    }
    return h.data[0];
};
const swap=(arr,a,b)=>{
    let temp=arr[a];
    arr[a]=arr[b];
    arr[b]=temp;
};
/**
 * 将数组切分（partition）为两个子数组，
 * 比pivot大的扔左子数组，比pivot小的扔右子数组，
 * @param arr
 * @param left
 * @param right
 * @returns {*}
 */
const partition=(arr,left,right)=>{
    // set pivot
    let pivot=left,lessThan=left;
    for(let i=left;i<=right;i++){
        if(arr[i]<arr[pivot]){
            lessThan++;
            swap(arr,i,lessThan);
        }
    }
    swap(arr,lessThan,pivot);
    // console.info('change',arr.join(', '));
    return lessThan;
};
/**
 * Quick Select与Quick Sort一样，
 * 是一个不稳定的算法；
 * pivot选取直接影响了算法的好坏，
 * worst case下的时间复杂度达到了𝑂(𝑛2)
 * 若切分后的左子数组的长度 > k，则第k大元素必出现在左子数组中；
 * 若切分后的左子数组的长度 = k，则第k大元素为pivot；
 * 若上述两个条件均不满足，则第k大元素必出现在右子数组中。
 * @param arr
 * @param k
 * @param left
 * @param right
 * @returns {*}
 */
const topK1=(arr,k,left,right)=>{

    if (left === right) return arr[right];
    let index = partition(arr, left, right);
    // console.info('idx===>',index,arr.join(','),'=>',k);
    if (right - index + 1 > k)
        return topK1(arr, k, index+1, right);
    else if (right - index + 1 === k)
        return arr[index];
    else
        return topK1(arr, k - right + index - 1, left, index-1);
};
const count=(arr,start)=>{
    let count=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]>=start){
            count++;
        }
    }
    return count;
};
const topK2=(arr,k)=>{
    let low=Number.MAX_SAFE_INTEGER,high=-Number.MAX_SAFE_INTEGER;
    for(let i=0;i<arr.length;i++){
        if(arr[i]<low){
            low=arr[i];
        }
        if(arr[i]>high){
            high=arr[i];
        }
    }
    // count用来计算从大于mid小于high的数字的个数
    let cn;
    while(low<=high){
        let mid=Math.floor((low+high)/2);
        cn=count(arr,mid);
        // console.info('===>',{low,high},cn,mid);
        if(cn>=k){
            // mid is too small
            low=mid+1;
        }else{
            // mid is too big
            high=mid-1;
        }
    }
    return high;
};
/**
 * 如何改造成求最小的第k个值呢
 * @param arr
 * @param k
 * @returns {number}
 */
const topK3=(arr,k)=>{
    const count1=(arr,target)=>{
        let count=0;
        for(let i=0;i<arr.length;i++){
            if(arr[i]<=target){
                count++;
            }
        }
        return count;
    };
    let low=Number.MAX_SAFE_INTEGER,high=-Number.MAX_SAFE_INTEGER;
    for(let i=0;i<arr.length;i++){
        if(arr[i]<low){
            low=arr[i];
        }
        if(arr[i]>high){
            high=arr[i];
        }
    }
    // count用来计算从大于mid小于high的数字的个数
    let cn;
    while(low<=high){
        let mid=Math.floor((low+high)/2);
        cn=count1(arr,mid);
        // console.info('===>',{low,high},cn,mid);
        if(cn>=k){
            // mid is too big
            high=mid-1;
        }else{
            // mid is too small
            low=mid+1;
        }
    }
    return low;
};
let arr=[7,4,6,5,1,3,6,9,10,7];
let arr1=[3,90,56,20,20,20,20,46,72];
// console.info(topK1(arr,5,0,arr.length-1));
// console.info(topK2(arr,5));
// console.info(topK1(arr1,8,0,arr1.length-1));
console.info(topK3(arr,3));
console.info(topK3(arr1,8));
console.info(arr1.sort((a,b)=>b-a));
console.info(arr.sort((a,b)=>b-a));