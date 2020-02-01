// 整理版：堆排序代码
// key 1: how to build maxHeap
// 这里还应该区别于在堆中我们的删除元素的操作直接用while循环处理即可
const buildMaxHeap=(arr,i)=>{
    let len=arr.length,
    left=i*2+1,
    right=i*2+2;
    if(i>=len||left>=len||right>=len) return;
    let select=(arr[left]>arr[right])?left:right;
    if(arr[select]>arr[i]){
        let temp=arr[i];
        arr[i]=arr[select];
        arr[select]=temp;
        // 只需要对发生改变的进行重建即可
        buildMaxHeap(arr,select);
    }
    return arr;
};

// console.info(buildMaxHeap([3,7,5,4,2,4,3],0));
/**
 * 时间复杂度：O(nlogn)
 * @param arr
 * @returns {[]}
 */
const heapSort=arr=>{
    let res=[];
    // 为了避免7，4，6，5，1，3，9这种情况产生必须从根部向上遍历
    for(let i=Math.floor(arr.length/2)-1;i>=0;i--){
        buildMaxHeap(arr,i);
    }
    console.info('arr===>',arr);
    while(arr.length>0){
        if(arr.length===1){
            res.unshift(arr.pop());
            continue;
        }
        res.unshift(arr[0]);
        arr[0]=arr.pop();
        // 但是这里为什么不需要从根部遍历了呢，因为此时是能保证不发生改变的一侧肯定是大根堆
        buildMaxHeap(arr,0);
    }
    return res;
};
// console.info(heapSort([3,7,5,4,2,4,3]));
// console.info(heapSort([7,4,6,5,1,3,9]));
export default heapSort;