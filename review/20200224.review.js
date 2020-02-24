// 解决0-1背包问题：所谓0-1背包问题就是物品只有1个
// w为物品的重量数组，v是对应的物品价值数组,c是背包的总容量
// 为什么要写状态转移方程呢，存在状态吗，首先如果最优答案中没有物品x,那么此时的组合可能就是c-w[x]的最大价值量
// 因此我们发现当前状态可能会跟前一个状态发生关联，
// 首先确定状态转移方程：F(i,n)=max(F(i-1,n),v(i)+F(i-1,n-w[i]))
const knapsack=(w,v,c)=>{
    let len=w.length;
    const solve=(w,v,idx,cap)=>{
        if(idx===0){
            if(w[0]<=cap){
                return v[0]
            }else{
                return 0;
            }
        }
        let temp=solve(w,v,idx-1,cap);
        return Math.max(temp,v[idx]+solve(w,v,idx-1,cap-w[idx]));
    };
    return solve(w,v,len-1,c);
};
const knapsack1=(w,v,c)=>{
  let len=w.length;
  let dp=new Array(len);
  for(let i=0;i<len;i++){
      dp[i]=new Array(c+1);
  }
  for(let i=0;i<c+1;i++){
      dp[0][i]=w[0]<=i?v[0]:0;
  }
  for(let i=1;i<len;i++){
      for(let j=0;j<c+1;j++){
          dp[i][j]=dp[i-1][j];
          if(w[i]<=j){
              dp[i][j]=Math.max(dp[i][j],v[i]+dp[i-1][j-w[i]]);
          }
      }
  }
  console.info(dp);
  return dp[len-1][c];
};
// console.info(knapsack0([10,8,5],[5,4,1],16));
console.info(knapsack([10,8,5],[5,4,1],16));
console.info(knapsack1([10,8,5],[5,4,1],16));