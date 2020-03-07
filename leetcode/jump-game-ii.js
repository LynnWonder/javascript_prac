// 跳跃游戏ii-leetcode-45
// 给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
// 输入: [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。


/**
 * 其实是一道确定最小跳数的题，相对于jump-game-leetcode-55而言需要过滤出最短的那个跳跃路径
 * 同样我们应用dp的方法F(n)=(F(n-1)&&num(n-1)>=1)||(F(n-2)&&num(n-2)>=2)
 * 用了和leetcode-55中一样的解法，只是中间数组变成了数组对象
 * 但是最终通过了90个测试用例，剩下两个因为超时而通过不了
 * @param {number[]} nums
 * @return {number}
 */
const jump = nums=>{
    let temp=new Array(nums.length);
    temp[0]={len:0,f:true};
    for(let i=1;i<nums.length;i++){
        let flag=false,min=nums.length-1;
        for(let j=0;j<i;j++){
            flag=flag||(temp[j].f&&(i-j)<=nums[j]);
            if(flag){
                min=Math.min(min,1+temp[j].len);
                break;
            }
        }
        temp[i]={len:min,f:flag};
    }
    // console.info(temp);
    // console.info(temp);
    return temp[nums.length-1].len;
};
/**
 * 因为题目要求最终总是能到达最后一个位置。
 * 因此我们可以用贪心算法来解决，总是往能跳的远的地方跳
 * @param nums
 * @returns {number}
 */
const jump1=nums=>{
    let end=0,maxPosition=0,steps=0;
    for(let i=0;i<nums.length-1;i++){
        // 总是能够找到最大的位置,因此不用去限定到达没到达最后的位置，只需要改变maxPos
        maxPosition=Math.max(maxPosition,nums[i]+i);
        console.info('maxP==>',maxPosition);
        if(i===end){
            end=maxPosition;
            steps++;
        }
    }
    return steps;
};
// console.info(jump([2,3,1,1,4]));
console.info(jump2([2,3,1,1,4]));
// console.info(jump([1,1,2,1,1]));
console.info(jump2([1,1,2,1,1]));
// console.info(jump([3,2,1,0,4]));