// 给定两个数组，编写一个函数来计算它们的交集。
//  两个数组的交集  leetcode-349
/**
 * 幼稚一回
 * 两个数组分别去重后拼接排序
 * 因为重复的不会超过两个，用排序去重的方法找到重复的
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
const intersection = (nums1, nums2) =>{
    let res=[];
    nums1=[...new Set(nums1)];
    nums2=[...new Set(nums2)];
    nums1=nums1.concat(nums2).sort((a,b)=>a-b);
    for(let i=1;i<nums1.length;i++){
        if(nums1[i]===nums1[i-1]){
            res.push(nums1[i]);
        }
    }
    return res;
};
const intersection1 = (nums1, nums2) =>{
    let res=[];
    nums1=[...new Set(nums1)];
    nums2=[...new Set(nums2)];
    for(let i=0;i<nums1.length;i++){
        if(nums2.includes(nums1[i])){
            res.push(nums1[i]);
        }
    }
    return res;
};
const intersection2 = (nums1, nums2) =>[...new Set(nums1.filter(item=>nums2.includes(item)))];
console.info(intersection2([1,2,2,1],[2,2]));
console.info(intersection2([4,9,5], [9,4,9,8,4]));