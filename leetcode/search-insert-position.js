// 搜索插入位置 leetcode-35
/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * @param nums
 * @param target
 */
const searchInsert = (nums, target)=>{
    let left=0,right=nums.length;
    while(left<=right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        }else if(mid===nums.length-1&&nums[mid]<target){
            return nums.length;
        } else if (nums[mid] < target && mid + 1 < nums.length && nums[mid + 1] > target) {
            return mid + 1;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }
    return 0;
};
const searchInsert1=(nums,target)=>{
    let left=0,right=nums.length-1;
    if(nums[right]<target) return right+1;
    while(left<=right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;
        }else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        }
    }
    // console.info(left,right);
    return left;
};
// console.info(searchInsert([1,3,5,6], 5));
// console.info(searchInsert1([1,3,5,6], 5));
console.info(searchInsert([1,3,5,6], 2));
console.info(searchInsert1([1,3,5,6], 2));
// console.info(searchInsert([1,3,5,6], 7));
// console.info(searchInsert([1,3,5,6], 0));
// console.info(searchInsert([1], 0));