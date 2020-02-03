// 查找和最小的K对数字 leetcode-373
// 给定两个以升序排列的整形数组 nums1 和 nums2, 以及一个整数 k。
// 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2。
// 找到和最小的 k 对数字 (u1,v1), (u2,v2) ... (uk,vk)。
// 输入: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
// 输出: [1,2],[1,4],[1,6]
// 解释: 返回序列中的前 3 对数：
//      [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]


import Heap from './algorithm/Heap/MinHeapObj';
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */
const kSmallestPairs = (nums1, nums2, k)=>{
    let h=new Heap(),res=[];
    for(let i=0;i<nums1.length;i++){
        for(let j=0;j<nums2.length;j++){
            h.insert({'arr':[nums1[i],nums2[j]],'sum':nums1[i]+nums2[j]},'sum');
        }
    }
    while(res.length<k&&h.data.length){
        res.push(h.deleting('sum').arr);
    }
    return res;
};
// console.info(kSmallestPairs([1,7,11],[2,4,6],3));
// console.info(kSmallestPairs([1,1,2],[1,2,3],2));
console.info(kSmallestPairs([1,2],[3],3));