// 最大子序和问题
/**
 * 时间复杂度:O(n)
 * 空间复杂度:O(1)
 * @param nums
 * @returns {*}
 */
const maxSubArray=nums=>{
    let res=nums[0];
    for(let i=1;i<nums.length;i++){
        if(nums[i-1]>0){
            nums[i]+=nums[i-1]
        }
        res=Math.max(res,nums[i]);
    }
    // console.info(nums);
    return res;
};
/**
 * 采用分治法解决
 * @param nums
 */
const maxSubArray1=nums=>{
    const crossSum=(arr,st,ed)=>{
        if(st===ed) return arr[st];
      let pivot=Math.floor((st+ed)/2);
      let leftSum=-Number.MAX_SAFE_INTEGER,rightSum=-Number.MAX_SAFE_INTEGER,sum=0;
      for(let i=pivot;i>=st;i--){
          // 这种判断方式不对，会跳过[3,0,2,-2,3]这种情况，因此此处需要格外注意
          // if(arr[i]>=0){
          //     leftSum+=arr[i];
          // }else{
          //     break;
          // }
          sum+=arr[i];
          leftSum=Math.max(leftSum,sum);
      }
      sum=0;
      for(let i=pivot+1;i<=ed;i++){
          // if(arr[i]>=0){
          //     rightSum+=arr[i];
          // }else{
          //     break;
          // }
          sum+=arr[i];
          rightSum=Math.max(rightSum,sum);
      }
      return leftSum+rightSum;
    };
    const conquer=(arr,st,ed)=>{
        if(st===ed){
            return arr[st];
        }
      let pivot=Math.floor((st+ed)/2);
      let left=conquer(arr,st,pivot);
      let right=conquer(arr,pivot+1,ed);
      let sum=crossSum(arr,st,ed);
      return Math.max(left,right,sum);
    };
    return conquer(nums,0,nums.length-1);
};
// console.info(maxSubArray1([-2,1,-3,4,-1,2,1,-5,4]));
console.info(maxSubArray1([-2,3,0,2,-2,3]));