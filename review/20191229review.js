// 20191229review
/**
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
 你可以假设数组中不存在重复的元素。
 你的算法时间复杂度必须是 O(log n) 级别。
 */
/**
 * 既然将时间复杂度控制在O(logN)的级别，又是搜索数的情况，那么有必要使用二分搜索法，但是查找序列不是严格有序的
 * 该怎么办呢？那么就让它在logN的时间复杂度内变的有序
 * @param nums
 * @param target
 */
const search = (nums, target)=>{
    if(nums.length===0) return -1;
    if(nums.length===1){
        return nums[0]===target?0:-1;
    }
    // 数组无重复则可以通过判断开头和结尾的大小对比，如果
    const findReverse=arr=>{
        let left=0,right=arr.length-1;
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            if(arr[mid]>arr[mid+1]){
                return mid;
            }else{
                if(arr[mid]>=arr[left]){
                    left=mid+1;
                }else{
                    right=mid-1;
                }
            }
        }
        return right;
    };
    const search0=(left,right)=>{
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            if(nums[mid]===target){
                return mid;
            }else{
                if(nums[mid]>target){
                    right=mid-1;
                }else{
                    left=mid+1;
                }
            }
        }
        return -1;
    };
    // let index=findReverse([0,1,2,4,5,6,7]);
    let index=findReverse(nums);
    console.info(index);
    let res1=search0(0,index);
    let res2=search0(index+1,nums.length-1);
    if(res1===-1&&res2===-1){
        return -1;
    }else if(res1!==-1){
        return res1;
    }else{
        return res2;
    }
};
// console.info(search([4,5,6,7,0,1,2],9));
console.info(search([8,9,2,3,4],9));
// console.info(search([2,3,4],19));