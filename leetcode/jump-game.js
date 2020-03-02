// 跳跃游戏-leetcode-55
// 给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 判断你是否能够到达最后一个位置。
// 输入: [2,3,1,1,4]
// 输出: true
// 解释: 我们可以先跳 1 步，从位置 0 到达 位置 1, 然后再从位置 1 跳 3 步到达最后一个位置。

/**
 * 通过仔细阅读这个题可以发现非常像机器人前进的问题，因此可以用动态规划来完成
 * 状态转移方程F(n)=(F(n-1)&&arr[n-1]>=1)||(F(n-1)&&arr[n-2]>=2)
 * 最优子结构 arr[x]
 * 边界条件  F(1)=true
 * 时间复杂度：O(n^2) 空间复杂度：O(n)
 * @param {number[]} nums
 * @return {boolean}
 */
const canJump = (nums)=>{
    let temp=new Array(nums.length).fill(false);
    temp[0]=true;
    for(let i=1;i<nums.length;i++){
        let flag=false;
        for(let j=0;j<i;j++){
            flag=flag||(temp[j]&&nums[j]>=(i-j));
            // opt1:既然是取或操作，若为真命题只需要检查一次就可以
            if(flag===true) break;
        }
        temp[i]=flag;
    }
    // console.info(temp);
    return temp[nums.length-1];
};
/**
 * 改进后的贪心算法
 * 可以从最后一个元素开始遍历，而且只需要遍历一遍即可
 * 不停的向前缩进确定最早一个能到达重点的坐标
 * @param nums
 * @returns {boolean}
 */
const canJump1=nums=>{
    let lastPos=nums.length-1;
    for(let i=nums.length-1;i>=0;i--){
        if(i+nums[i]>=lastPos){
            lastPos=i;
        }
    }
    return lastPos===0;
};
console.info(canJump([2,3,1,1,4]));
console.info(canJump1([2,3,1,1,4]));
console.info(canJump([3,2,1,0,4]));
console.info(canJump1([3,2,1,0,4]));