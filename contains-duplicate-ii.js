// 存在重复元素 II leetcode-219
/**
 * 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的绝对值最大为 k。
 */
/**
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
const containsNearbyDuplicate = (nums, k)=>{
    let obj={};
    for(let i=0;i<nums.length;i++){
        if(obj[nums[i]]){
            let temp=obj[nums[i]];
            if(Math.abs(i-temp[temp.length-1])<=k){
                return true;
            }else{
                obj[nums[i]].push(i);
            }
        }else{
            obj[nums[i]]=[i];
        }
    }
    return false;
};
// console.info(containsNearbyDuplicate([1,2,3,1],3));
// console.info(containsNearbyDuplicate([1,2,3,1],2));
console.info(containsNearbyDuplicate([1,0,1,1],1));