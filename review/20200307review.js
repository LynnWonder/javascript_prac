// 20200307review
// leetcode-45. 跳跃游戏 II
// 给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
// 假设你总是可以到达数组的最后一个位置。
// 输入: [2,3,1,1,4]
// 输出: 2
// 解释: 跳到最后一个位置的最小跳跃数是 2。
//      从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
/**
 * 贪心算法的应用，总是向能跳的远的地方跳,
 * 并且我自己在解决这个问题中犯了错误就是总是往远的地方跳但
 * @param nums
 */
const jump=nums=>{
    let maxPos=0,steps=0,end=0;
    for(let i=0;i<nums.length-1;i++){
        // if(maxPos>=nums.length-1) break;
        maxPos=Math.max(maxPos,nums[i]+i);
        if(i===end){
            steps++;
            end=maxPos;
        }
    }
    return steps;
};

// leetcode-435
// 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
//  注意:
//  可以认为区间的终点总是大于它的起点。
//  区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
// 输入: [ [1,2], [2,3], [3,4], [1,3] ]
// 输出: 1
// 解释: 移除 [1,3] 后，剩下的区间没有重叠。
/**
 * base on终点的一次排查方法
 * @param intervals
 */
const eraseOverlapIntervals = (intervals)=>{
    if(intervals.length<=1) return 0;
    intervals.sort((a,b)=>a[1]-b[1]);
    let count=1,temp=0;
    console.info(intervals);
    for(let i=1;i<intervals.length;i++){
        if(intervals[i][0]>=intervals[temp][1]){
            count++;
            temp=i;
        }
    }
    return intervals.length-count;
};
/**
 * base on start and choose the shorter one
 * @param intervals
 * @returns {number}
 */
const eraseOverlapIntervals1=intervals=> {
    if(intervals.length<=1) return 0;
    intervals.sort((a,b)=>a[0]===b[0]?a[1]-b[1]:a[0]-b[0]);
    console.info(intervals);
    let count =0,end=intervals[0][1];
    for(let i=1;i<intervals.length;i++){
        // 比如是[1,4] [2,3]这样的情况一定要去选那个最小的右边边界的情况，
        // 因为我们区间越短，能够衔接的区间数目越大
        if(intervals[i][0]<end){
            // count++;
            // temp=i;
            count++;
            end=Math.min(intervals[i][1],end);
        }else{
            end=intervals[i][1];
        }
    }
    return count;
};
// console.info(jump([2,3,1,1,4]));
// console.info(jump([1,2,1,1,1]));
// console.info(jump([7,0,9,6,9,6,1,7,9,0,1,2,9,0,3]));
console.info(eraseOverlapIntervals1([ [1,2], [2,3], [3,4], [1,3] ]));
console.info(eraseOverlapIntervals1([ [1,2], [1,2], [1,2] ]));
// console.info(eraseOverlapIntervals([ [1,2], [2,3] ]));
console.info(eraseOverlapIntervals1([[1,100],[11,22],[1,11],[2,12]]));