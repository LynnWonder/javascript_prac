//  数组中的第K个最大元素-leetcode-215
import Heap from './algorithm/Heap/MinHeap';
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest=(nums,k)=>{
    if(k>nums.length) return null;
    let h=new Heap();
    for(let i=0;i<k;i++){
        h.insert(nums[i]);
    }
    for(let i=k;i<nums.length;i++){
        if(nums[i]>h.data[0]){
            h.deleting();
            h.insert(nums[i]);
        }
    }
    return h.data[0];
};
// const findKthLargest = (nums, k)=>{
//   nums.sort((a,b)=>b-a);
//   console.info(nums);
//   return nums[k-1];
// };
const findKthLargest1=(nums,k)=>{
    // 性能优化，利用冒泡排序
    for (let i=nums.length;i>nums.length-k;i--){
        for (let j=0;j<i;j++){
            if (nums[j]>nums[j+1]){
                let temp=nums[j];
                nums[j]=nums[j+1];
                nums[j+1]=temp;
            }
        }
    }
    return nums[nums.length-k];
};
const nums=[3,2,3,1,2,4,5,5,6];
console.info(findKthLargest1(nums,4));
// console.info(findKthLargest([3,2,1,5,6,4],2));
// console.info(findKthLargest([3,2,3,1,2,4,5,5,6],4));
console.info(findKthLargest1([1],1));