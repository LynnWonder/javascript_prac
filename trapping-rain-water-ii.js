// 接雨水 II  leetcode-407
// 给定一个 m x n 的矩阵，其中的值均为正整数，
// 代表二维高度图每个单元的高度，请计算图中形状最多能接多少体积的雨水。
// 给出如下 3x6 的高度图:
// [
//   [1,4,3,1,3,2],
//   [3,2,1,3,2,4],
//   [2,3,3,2,3,1]
// ]
// 返回 4。
// 从三维图中可以看出来能够存水的分别是
//   [x,4,3,x,3,x],
//   [3,2,1,3,2,4],
//   [x,3,3,x,3,x]
// 3-2+3-1+3-2=1+2+1=4

/**
 * findVacant查找所有空缺 应该向右扩展向下扩展，扩展到最大的空间
 * getSum 来计算空缺处能存多少雨水
 * 过于复杂，因为考虑到扩充起来很复杂，需要考虑上下左右边界，所以直接看了解析
 */
/**
 * 此时变成了一个二维的接雨水问题，边界不再是42题中线段的两个端点而是矩形的一周
 * 优先队列维护所有上下左右四个方向，维护一个visit数组记录哪些坐标已经被访问过
 */
import Heap from './algorithm/Heap/MinHeapObj';
const trapRainWater = heightMap=>{
    let i=1,j=1,res=0;
    while(i<heightMap.length-1){
        while(j<heightMap[0].length-1){
            let flag=Math.min(heightMap[i-1][j],heightMap[i][j+1],heightMap[i+1][j],heightMap[i][j-1])>=heightMap[i][j];
            if(!flag){
                j++;
            }else{

            }
        }
        i++;
    }
};
const trapRainWater1=heightMap=>{
    if(heightMap.length<=2||heightMap[0].length<=2){
        return 0;
    }
    // initialize
    let h=new Heap();
    let m=heightMap.length,n=heightMap[0].length,visited=new Array(heightMap.length);
    for(let i=0;i<m;i++){
        visited[i]=new Array(n);
    }
    // 把左边界和右边界都加入到最小堆中，同时将其设置为已经访问
    for(let i=0;i<m;i++){
        visited[i][0]=true;
        visited[i][n-1]=true;
        h.insert({'i':i,'j':0,'val':heightMap[i][0]},'val');
        h.insert({'i':i,'j':n-1,'val':heightMap[i][n-1]},'val');
    }
    // 把上边界和下边界加入到最小堆中，同时将其设置为已经访问
    for(let i=1;i<n-1;i++){
        visited[0][i]=true;
        visited[m-1][i]=true;
        h.insert({'i':0,'j':i,'val':heightMap[0][i]},'val');
        h.insert({'i':m-1,'j':i,'val':heightMap[m-1][i]},'val');
    }
    let result=0,bounds=[[-1,0],[0,1],[1,0],[0,-1]];
    while(h.data.length){
        let temp=h.deleting('val');
        console.info(temp,result);
        for(let b in bounds){
            let row=temp.i+bounds[b][0];
            let col=temp.j+bounds[b][1];
            if (row >= 0 && row < m && col >= 0 && col < n && !visited[row][col]) {
                result += Math.max(0, temp.val - heightMap[row][col]);
                visited[row][col] = true;
                h.insert({'i':row,'j':col,'val':Math.max(temp.val, heightMap[row][col])},'val');
            }
        }
    }
    return result;
};
console.info(trapRainWater1([
    [1,4,3,1,3,2],
    [3,2,1,3,2,4],
    [2,3,3,2,3,1]
]));