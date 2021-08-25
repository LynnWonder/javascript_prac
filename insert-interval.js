// 插入区间-leetcode-57
/**
 * 给出一个无重叠的 ，按照区间起始端点排序的区间列表。
 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）
 输入: intervals = [[1,3],[6,9]], newInterval = [2,5]
 输出: [[1,5],[6,9]]
 */
/**
 * 和leetcode-56有点类似，可以采用插入后倒退一位进行merge:
 * 其中index不必须
 * @param intervals
 * @param newInterval
 */
const insert = (intervals, newInterval)=>{
    if(intervals.length===0) return [newInterval];
    let index=0,len=intervals.length;
    for(let i=0;i<intervals.length;i++){
        if(intervals[i][0]>=newInterval[0]){
            intervals.splice(i,0,newInterval);
            index=i;
            break;
        }
    }
    if(intervals.length===len){
        intervals.push(newInterval);
        index=intervals.length-1;
    }
    // console.info(index,intervals);
    for(let i=index-1<=0?0:index-1;i<intervals.length-1;i++){
        if(intervals[i+1][0]<=intervals[i][1]){
            intervals[i][1]=Math.max(intervals[i][1],intervals[i+1][1]);
            intervals.splice(i+1,1);
            i--;
        }
    }
    return intervals;
};
// console.info(insert([[1,3],[6,9]],[2,5]));
// console.info(insert([[1,2],[3,5],[6,7],[8,10],[12,16]],[4,8]));
console.info(insert([[1,5]],[2,7]));