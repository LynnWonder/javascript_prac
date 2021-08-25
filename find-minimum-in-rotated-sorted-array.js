// 寻找旋转排序数组中的最小值  leetcode-153
/**
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 请找出其中最小的元素。
 你可以假设数组中不存在重复元素。)
 */
const findMin = (nums)=>{
    if(nums.length===1) return nums[0];
    let left=0,right=nums.length-1,temp=0;
    if(nums[right]>nums[left]){
        return nums[0];
    }
    const search=nums=>{
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            if(nums[mid]>nums[mid+1]){
                return mid;
            }else{
                if(nums[mid]>=nums[left]){
                    left=mid+1;
                }else{
                    right=mid-1;
                }
            }
        }
        // console.info(left,right);
        return left;
    };
    temp=search(nums);
    // console.info(temp);
    return nums[temp+1];
};
console.info(findMin([3,4,5,1,2]));
console.info(findMin([4,5,1,2,3]));
console.info(findMin([4,5,6,7,0,1,2]));
console.info(findMin([0,1,2,4,5,6,7]));
console.info(findMin([1,7]));