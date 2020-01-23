//最大子序和 leetcode-53

/**
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 */

/**
 * 暴力法：
 * 时间复杂度：O(n2)
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = nums=>{
    let res=nums[0];
    for(let i=0;i<nums.length;i++){
        let j=i+1;
        while(j<nums.length+1){
            if(nums.slice(i,j).reduce((res0,item)=>res0+item,0)>res){
                res=nums.slice(i,j).reduce((res0,item)=>res0+item,0);
            }
            j++;
        }
    }
    return res;
};

/**
 * 这就是用于求最大子序列和的Kadane algorithm
 * 也是一种dp算法
 * 时间复杂度:O(n)
 * 空间复杂度:O(1)
 * @param nums
 * @returns {*}
 */
const maxSubArray1=nums=>{
    if(nums.length===1){
        return nums[0];
    }
    let max_sum=nums[0],len=nums.length;
    for(let i=1;i<len;i++){
        if(nums[i-1]>0){
            nums[i]+=nums[i-1];
        }
        console.info('===>',JSON.parse(JSON.stringify(nums)));
        max_sum=Math.max(nums[i],max_sum);
    }
    return max_sum;
};
/**
 * 分治算法，基本思路如下：分成左右两部分，关键在于组合combine部分
 * 时间复杂度: O(NlogN)
 * 空间复杂度: O(logN)  递归时栈所用的空间
 * 注：combine 部分的函数crossSum 乍一看像是有重复计算，实则不然，每个元素都有自己的交叉和。
 * @param nums
 * @returns {*|number}
 */
const maxSubArray2=nums=>{
    const crossSum=(arr,left,right,p)=>{
        if(left===right) return arr[left];
        let leftSubSum=-Number.MAX_SAFE_INTEGER;
        let curSum=0;
        for(let i=p;i>left-1;i--){
            curSum+=arr[i];
            leftSubSum=Math.max(leftSubSum,curSum);
        }

        let rightSubSum=-Number.MAX_SAFE_INTEGER;
        curSum=0;
        for(let i=p+1;i<right+1;i++){
            curSum+=arr[i];
            rightSubSum=Math.max(rightSubSum,curSum);
        }
        return leftSubSum+rightSubSum;
    };
    const helper=(arr,left,right)=>{
        if(left===right){
            return arr[left];
        }
        // 分解
        let p=Math.floor((left+right)/2);
        // 解决
        let leftSum=helper(arr,left,p);
        let rightSum=helper(arr,p+1,right);
        // 合并
        let crossSum0=crossSum(arr,left,right,p);
        console.info('===>',leftSum,rightSum,crossSum0);
        return Math.max(leftSum,rightSum,crossSum0);
    };
    return helper(nums,0,nums.length-1);
};


// console.info(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));
console.info(maxSubArray2([-2,1,-3,4,-1,2,1,-5,4]));
// console.info(maxSubArray([1]));
// console.info(maxSubArray([-1]));