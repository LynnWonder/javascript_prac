// 在排序数组中查找元素的第一个和最后一个位置 leetcode-34
/**
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 * 你的算法时间复杂度必须是 O(log n) 级别。
 * 如果数组中不存在目标值，返回 [-1, -1]。
 * 输入: nums = [5,7,7,8,8,10], target = 8
 * 输出: [3,4]
 * 从题意来看其实就是二分寻找左右边界值，时间复杂度为T(2logN)==>O(logN)
 * 空间复杂度为O(1)
 * @param nums
 * @param target
 */
const searchRange = (nums, target)=>{
    let left=0,right=nums.length-1,ll=0,rr=0;
    const findLeft=(left,right)=>{
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            if(nums[mid]===target){
                right=mid-1;
            }else if(nums[mid]>target){
                right=mid-1;
            }else if(nums[mid]<target){
                left=mid+1;
            }
        }
        ll=left;
    };
    const findRight=(left,right)=>{
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            if(nums[mid]===target){
                left=mid+1;
            }else if(nums[mid]>target){
                right=mid-1;
            }else if(nums[mid]<target){
                left=mid+1;
            }
        }
        rr=right;
    };
    findLeft(left,right);
    findRight(left,right);
    console.info(ll,rr);
    // if(rr>=ll){
    //     return [ll,rr];
    // }else{
    //     return [-1,-1];
    // }
};
console.info(searchRange([5,7,7,8,8,10],10));