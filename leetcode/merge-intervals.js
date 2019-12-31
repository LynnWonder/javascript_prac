// 合并区间-leetcode-56
/**
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 输出: [[1,6],[8,10],[15,18]]
 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 */
/**
 * 方法1：以数组的第二个元素为基准对数组进行排序，
 * 如果后一位的index=0<当前位的index=1，必定能进行merge
 * 缺点：总是向后遍历，会出现一次遍历后仍有待遍历的情况，
 * 如：[[2,3],[4,5],[6,7],[8,9],[1,10]]
 * 因此不得不递归再重新遍历
 * 时间复杂度：主要取决于sort函数
 * 空间复杂度：O(1) 就地merge
 * @param intervals
 */
const merge = intervals=> {
    let len=intervals.length;
    if(len===1) return intervals;
    // 涉及了排序操作
    intervals.sort((a,b)=>a[1]-b[1]);
    // console.info('intervals==>',intervals);
    for(let i=0;i<intervals.length-1;i++){
        // check
        if (intervals[i+1][0]<=intervals[i][1]){
            intervals[i]=[Math.min(intervals[i][0],intervals[i+1][0]),intervals[i+1][1]];
            intervals.splice(i+1,1);
            i--;
        }
    }
    // console.info(intervals);
    // 涉及了递归操作
    if(intervals.length===len){
        return intervals;
    }else{
        return merge(intervals);
    }
};
/**
 * 方法2：以数组的第一个元素为基准对数组进行排序
 * 此后以与方法1相同的套路进行核查是否需要merge
 * 优点是一次遍历之后所有能合并的都已经进行了合并，此方法最佳
 * @param intervals
 * @returns {*}
 */
const merge1 = intervals=> {
    let len=intervals.length;
    if(len===1) return intervals;
    // 涉及了排序操作
    intervals.sort((a,b)=>a[0]-b[0]);
    // console.info('intervals==>',intervals);
    for(let i=0;i<intervals.length-1;i++){
        // check
        if (intervals[i+1][0]<=intervals[i][1]){
            // intervals[i]=[Math.min(intervals[i][0],intervals[i+1][0]),intervals[i+1][1]];
            intervals[i]=[intervals[i][0],Math.max(intervals[i][1],intervals[i+1][1])];
            intervals.splice(i+1,1);
            i--;
        }
    }
    return intervals;
};
console.info(merge([[1,3],[2,6],[8,10],[15,18]]));
console.info(merge([[1,4],[4,5]]));
console.info(merge([[1,4],[0,4]]));
console.info(merge([[1,4],[0,1]]));
console.info(merge([[2,3],[4,5],[6,7],[8,9],[1,10]]));
console.info(merge([[2,3],[5,5],[2,2],[3,4],[3,4]]));