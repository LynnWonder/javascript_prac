// leetcode-327-区间和的个数
/***
 * 典型的 dp 问题
 * 状态转移方程： F(n，[min,max])=F(n-1,[min,max])+min<=x<=max?1:0+F(n-1,[min-x,max-x])
 * 边界条件F(1)=min<=x<=max?1:0
 * @param nums
 * @param lower
 * @param upper
 */
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {number}
 */
const countRangeSum = (nums, lower, upper)=>{
    const match=(x,min,max)=>{
        return x >= min && x <= max;
    };
    if(nums.length===1){
        if(match(nums[0],lower,upper)){
            return 1
        }
        return 0;
    }
    const dp=(nums,ll,uu)=>{
        if(nums.length===0) return 0;
        if(nums.length===1){
            return match(nums[0],ll,uu)?1:0;
        }
        if(nums.length===2){
            let temp=0;
            if(match(nums[0]+nums[1],ll,uu)){
                temp=1;
            }
            return temp+nums.filter(item=>
                match(item,ll,uu)).length;
        }
        let last=nums.pop();
        if(match(last,ll,uu)){
            return Math.max(1+dp(nums,ll,uu),2+dp(nums,ll-last,uu-last))
        }
        return Math.max(dp(nums,ll,uu),1+dp(nums,ll-last,uu-last));
    };
    return dp(nums,lower,upper);
};
// console.info(countRangeSum([-2,5,-1],-2,2));
// console.info(countRangeSum([-2,5],-2,2));
// console.info(countRangeSum([-2],-2,2));
console.info(countRangeSum([2147483647,-2147483648,-1,0],-1,0));
console.info(countRangeSum([2147483647,-2147483648,-1],-1,0));
console.info(countRangeSum([2147483647,-2147483648],-1,0));
console.info(countRangeSum([2147483647,-2147483648],-1,0));