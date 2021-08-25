// 搜索旋转排序数组 II leetcode-81
/**
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。

 ( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。

 编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。
 */
const search = (nums, target)=>{
    if(nums.length===0) return false;
    if(nums.length===1) return nums[0]===target;
    const find=arr=>{
        let left=0,right=arr.length-1;
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            // 因为mid取的是floor
            if(arr[mid]===arr[left]&&mid!==left){
                // key1: 不能让mid和left一样的时候移动left，不然此时会发生像[3,1]这种无法通过的情况。究其原因是mid取floor的缘故
                left+=1;
                continue;
            }
            if(arr[mid]===arr[right]){
                right-=1;
                continue;
            }
            if(arr[mid]>arr[mid+1]){
                return mid;
            }else {
                if (arr[mid] >= arr[left]) {
                    // key2: arr[mid]=arr[left]的情况要移动left而不是移动right。究其原因是mid取floor的缘故
                    left=mid+1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return {left,right};
    };
    const search0=(left,right)=>{
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            if(nums[mid]===target){
                return true;
            }else if(nums[mid]>target){
                right=mid-1;
            }else{
                left=mid+1;
            }
        }
        return false;
    };
    let idx=find(nums);
    console.info('idx',idx);
    return (search0(0,idx)||search0(idx+1,nums.length-1));
};
// console.info(search([2,5,6,0,0,1,2],0));
// console.info(search([2,5,6,0,0,1,2],3));
// console.info(search([3,1],1));
// console.info(search([3,4,5,6,7,0,1,2],1));
// console.info(search([1,1],1));
// 两种需要特殊处理的情况
// console.info(search([2,2,2,3,1],1));
// console.info(search([4,5,6,7,0,1,2],1));
// console.info(search([1,3,1,1,1],3));
// console.info(search([1,1],1));
console.info(search([1,2,0,1,1,1],0));