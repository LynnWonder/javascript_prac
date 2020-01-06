// 存在重复元素 leetcode-217
/**
 * 给定一个整数数组，判断是否存在重复元素。
 * 如果任何值在数组中出现至少两次，函数返回 true。如果数组中每个元素都不相同，则返回 false。
 * @param {number[]} nums
 * @return {boolean}
 */
/**
 * 使用key-value存储的方式
 * 时间复杂度最差为O(n)
 * 空间复杂度最差为O(n)
 * @param nums
 * @returns {boolean}
 */
const containsDuplicate = (nums)=>{
    let obj={};
    for(let i=0;i<nums.length;i++){
        if(obj[nums[i]]){
            return true;
        }else{
            obj[nums[i]]=1;
        }
    }
    return false;
};
const containsDuplicate1 = nums=>!(nums.length===[...new Set(nums)].length);
console.info(containsDuplicate1([1,2,3,1]));
console.info(containsDuplicate1([1,2,3,4]));