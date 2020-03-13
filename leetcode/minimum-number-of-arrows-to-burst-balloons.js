// 用最少数量的箭引爆气球 leetcode-452
// 在二维空间中有许多球形的气球。
// 对于每个气球，提供的输入是水平方向上，气球直径的开始和结束坐标。由于它是水平的，所以y坐标并不重要，因此只要知道开始和结束的x坐标就足够了。
// 开始坐标总是小于结束坐标。平面内最多存在104个气球。
// 一支弓箭可以沿着x轴从不同点完全垂直地射出。
// 在坐标x处射出一支箭，若有一个气球的直径的开始和结束坐标为 xstart，xend， 且满足  xstart ≤ x ≤ xend，则该气球会被引爆。可以射出的弓箭的数量没有限制。
// 弓箭一旦被射出之后，可以无限地前进。我们想找到使得所有气球全部被引爆，所需的弓箭的最小数量。

/**
 * 通过阅读题意我可以这样理解这道题
 * 就是通过排查出最后可以合并为多少个区间的问题
 * 首先遍历得到重叠区间后继续执行检测重叠
 * @param {number[][]} points
 * @return {number}
 */
const findMinArrowShots = points=> {
    points.sort((a,b)=>a[0]-b[0]);
    console.info(points);
    for(let i=0;i<points.length-1;i++){
        // 按照题意打到边也算射中
        if (points[i][1]>=points[i+1][0]){
            points[i][0]=Math.max(points[i][0],points[i+1][0]);
            points[i][1]=Math.min(points[i][1],points[i+1][1]);
            points.splice(i+1,1);
            i--;
        }
    }
    console.info(points);
    return points.length;
};
console.info(findMinArrowShots([[10,16], [2,8], [1,6], [7,12]]));