// 摆动序列 leetcode-376
// 如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
// 例如， [1,7,4,9,2,5] 是一个摆动序列，因为差值 (6,-3,5,-7,3) 是正负交替出现的。
// 相反, [1,4,7,2,5] 和 [1,7,4,5,5] 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
// 给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。

/**
 * 首先思考这个整体的摆动序列
 * 可以对nums进行拆分，然后利用动态规划
 * 状态转移方程：F(n)=F(n-1)+T(n-1)&&(nums[n]-nums[n-1])取决于后面是否为负若为负则为F(n-1)+1
 * T(n)相应的和nums[n]-nums[n-1]对应
 * 另外在通过leetcode的测试用例的时候注意全零的情况
 * @param {number[]} nums
 * @return {number}
 */
const wiggleMaxLength = nums=>{
    let helper=[];
    if(nums.length<2) return nums.length;
    if(nums.length===2){
        return nums[1]-nums[0]===0?1:2;
    }
    helper[0]={num:1,flag:1};
    // 主要用来解决类似于[3,3,3,2,5]的测试用例
    while(nums[1]-nums[0]===0){
        nums.splice(1,1);
    }
    helper[1]={num:nums[1]-nums[0]===0?1:2,flag:nums[1] - nums[0] > 0?1:-1};
    for(let i=2;i<nums.length;i++){
        let check=(helper[i-1].flag)*(nums[i]-nums[i-1]);
        // console.info('check==>',check);
        if(check<0){
            helper[i]={num:helper[i-1].num+1,flag:(nums[i] - nums[i-1] > 0?1:-1)};
        }else{
            helper[i]={num:helper[i-1].num,flag:helper[i-1].flag};
        }
    }
    // console.info(helper);
    return helper[nums.length-1].num;
};
// console.info(wiggleMaxLength([1,7,4,9,2,5]));
console.info(wiggleMaxLength([1,7,4,5,5]));
// console.info(wiggleMaxLength([1,17,5,10,13,15,10,5,16,8]));
// console.info(wiggleMaxLength([1,2,3,4,5,6,7,8,9]));
// console.info(wiggleMaxLength([3,3,3,2,5]));
// console.info(wiggleMaxLength([0,0,0,0]));
// console.info(wiggleMaxLength([0,0,0]));
// console.info(wiggleMaxLength([0,0]));