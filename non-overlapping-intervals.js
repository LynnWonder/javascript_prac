// 无重叠区间-leetcode-435
// 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
// 注意:
// 可以认为区间的终点总是大于它的起点。
// 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
// 输入: [ [1,2], [2,3], [3,4], [1,3] ]
// 输出: 1
// 解释: 移除 [1,3] 后，剩下的区间没有重叠。
/**
 * 初步考虑的做法是通过判断有哪些重叠的区间，然后进行删除
 * 利用贪心攻略：总是扩充得到最大的区间，然后将在这个区间的子区间进行删除
 * @param {number[][]} intervals
 * @return {number}
 */
/**
 * 🌟🌟🌟值得记住的做法
 * 贪心算法，总是计入可以扩充为新区间的元素
 * 也是一种跟从终止点的动态规划
 * @param intervals
 * @returns {number}
 */
const eraseOverlapIntervals = (intervals)=>{
    if(intervals.length<=1) return 0;
    // 可以发现但凡是像[[1,100],[11,22],[1,11],[2,12]]这样的数组，排序后会变成
    // [ [ 1, 100 ], [ 1, 11 ], [ 2, 12 ], [ 11, 22 ] ] 并不方便接下来的操作，因此
    // 应该是按照大位进行排序
    intervals.sort((a,b)=>a[1]-b[1]);
    let len=intervals.length;
    console.info(intervals);
    let count = 1;
    let prevIndex = 0;
    for (let i = 1; i < len; i++) {
        if (intervals[i][0] >= intervals[prevIndex][1]) {
            count++;
            prevIndex = i;
        }
    }
    return len - count;
};
/**
 * 利用动态规划
 * 数组dp存储着将当前索引的interval加入时最大的子区间数目，注意这些个子区间是互相不重叠的
 * 这是从起始点的动态规划
 * @param intervals
 * @returns {number}
 */
const eraseOverlapIntervals1=intervals=>{
    if(intervals.length<=1) return 0;
    intervals.sort((a,b)=>a[0]-b[0]);
    console.info(intervals);
    let dp=new Array(intervals.length).fill(1);
    for(let i=1;i<intervals.length;i++){
        for(let j=0;j<i;j++){
            if(intervals[i][0]>=intervals[j][1]){
                dp[i]=Math.max(dp[i],dp[j]+1);
            }
        }
    }
    console.info(dp);
    return intervals.length-dp.pop();
};
/** 🌟🌟🌟值得记住的做法
 * base on start and choose the shorter one
 * @param intervals
 * @returns {number}
 */
const eraseOverlapIntervals2=intervals=> {
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
console.info(eraseOverlapIntervals([ [1,2], [2,3], [3,4], [1,3] ]));
// console.info(eraseOverlapIntervals1([ [1,2], [2,3], [3,4], [1,3] ]));
console.info(eraseOverlapIntervals([[1,100],[11,22],[1,11],[2,12]]));
// console.info(eraseOverlapIntervals1([[1,100],[11,22],[1,11],[2,12]]));