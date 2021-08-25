// 归并排序

/**
 * 合并函数，也是归并排序的关键
 * @param left
 * @param right
 * @returns {[]}
 */
const merge=(left,right)=>{
    let res=[];
    while(left.length&&right.length){
        if(left[0]<=right[0]){
            res.push(left.shift());
        }else{
            res.push(right.shift());
        }
    }
    while(left.length){
        res.push(left.shift());
    }
    while(right.length){
        res.push(right.shift());
    }
    return res;
};
/**
 * 把长度为n的输入序列分成两个长度为n/2的子序列；
 * 对这两个子序列分别采用归并排序；
 * 将两个排序好的子序列合并成一个最终的排序序列；
 * 时间复杂度:O(nlogn)
 * 空间复杂度:O(n)
 * 经检测是稳定排序
 * @param arr
 * @returns {*[]|*}
 */
const mergeSort=arr=>{
    if(arr.length<2) return arr;
    let mid=Math.floor(arr.length/2);
    let left=arr.slice(0,mid),right=arr.slice(mid);
    return merge(mergeSort(left),mergeSort(right));
};
console.info(mergeSort([7,4,6,5,1,3,6]));
console.info(mergeSort([7,6,6,5,1,3,6,9,0,1]));