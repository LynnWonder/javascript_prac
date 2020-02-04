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
let arr=[7,4,6,5,1,3,6,9,10,7];
console.info(topK(arr,5));
console.info(arr.sort((a,b)=>b-a));