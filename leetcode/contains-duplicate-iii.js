// 存在重复元素 III leetcode-220
/**
 * 给定一个整数数组，判断数组中是否有两个不同的索引 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值最大为 t，并且 i 和 j 之间的差的绝对值最大为 ķ。
 * 输入: nums = [1,2,3,1], k = 3, t = 0
 * 输出: true
 */
/**
 * 暴力法：
 * 时间复杂度：O(nmin(k,n))
 * 空间复杂度：O(1)
 * @param nums
 * @param k
 * @param t
 * @returns {boolean}
 */
const containsNearbyAlmostDuplicate = (nums, k, t)=>{
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<=Math.min(i+k,nums.length);j++ ){
            if(Math.abs(nums[i]-nums[j])<=t){
                return true;
            }
        }
    }
    return false;
};

console.info(containsNearbyAlmostDuplicate([1,2,3,1],3,0));
console.info(containsNearbyAlmostDuplicate([1,5,9,1,5,9],2,3));
console.info(containsNearbyAlmostDuplicate([2,2],3,0));