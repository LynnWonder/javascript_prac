// 二分查找法详解
/**
 * typical binary search
 * @param num
 * @param target
 * @returns {number}
 */
const binarySearch=(num,target)=>{
    if(num.length<=0) return -1;
    let left=0,right=num.length-1;
    while(left<=right){
        let mid=Math.floor((left+right)/2);
        if(num[mid]===target){
            return mid;
        }else if(num[mid]>target){
            right=mid-1;
        }else if(num[mid]<target){
            left=mid+1;
        }
    }
    return -1;
};

const left_bound=(nums, target)=>{
    if (nums.length === 0) return -1;
    let left = 0;
    let right = nums.length-1; // 注意

    while (left <= right) { // 注意
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            // 找到 target 时不要立即返回，而是缩小「搜索区间」的上界 right，在区间 [left, mid-1] 中继续搜索，即不断向左收缩，达到锁定左侧边界的目的。
            right = mid-1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid-1; // 注意
        }
    }
    return left;
};
const right_bound=(nums, target)=>{
    if(nums.length<=0) return -1;
    let left=0,right=nums.length-1;
    while(left<=right){
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            // 找到 target 时不要立即返回，而是增大「搜索区间」的上界left，在区间 [mid+1,right] 中继续搜索，即不断向右收缩，达到锁定右侧边界的目的。
            left = mid+1;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) {
            right = mid-1; // 注意
        }
    }
    // 其实return left-1还是right没有区别
    return right;
};
console.info(binarySearch([1,2,2,2,3,4],2));
// 算法会返回 1。这个 1 的含义可以这样解读：nums 中小于 2 的元素有 1 个。
console.info(left_bound([1,2,2,2,3,4],2));
// 算法会返回 4。这个 4 的含义可以这样解读：nums 中小于 3 的元素有 4 个。
console.info(left_bound([1,2,2,2,3,3,3,3,4],3));
// 算法会返回 3。这个 3 的含义就是右侧边界索引是3。
console.info(right_bound([1,2,2,2,3,4],2));
// 算法会返回 7。这个 7 的含义就是右侧边界索引是7。
console.info(right_bound([1,2,2,2,3,3,3,3,4],3));