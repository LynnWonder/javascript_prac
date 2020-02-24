// 背包问题总结，包含0-1背包问题和部分背包问题

//0-1背包问题
/**
 * 问题描述：背包重量最大是16，现有n个物品 重量分别为10，8，5，价值分别为5，4，1
 * 求此背包在不超重的情况下，最多能装多少价值的物品
 */
/**
 * 问题的本身其实也可以用回溯法来做，因为本身满足回溯问题的三个条件
 * 1。问题的解用向量表示
 * 2。问题的解是一组解或者一组解中找一个
 * 3。满足约束条件的最优解
 * @param w
 * @param v
 * @param capacity
 * @returns {number}
 */
const knapsack0=(w,v,capacity)=>{
    let curW=0,curVal=0,maxVal=0,compose=new Array(w.length).fill(0);
    const recur=k=>{
        if(k>=w.length&&curW<=capacity){
            console.info('===>',compose,curVal);
            if(maxVal<curVal){
                maxVal=curVal;
            }
        }else{
            // 分为放入背包和不放入背包两种情况
            for(let i=0;i<=1;i++){
                if(i===0){
                    recur(k+1);
                }else{
                    if(curW+w[k]<=capacity){
                        curW+=w[k];
                        curVal+=v[k];
                        compose[k]=w[k];
                        recur(k+1);
                        curW-=w[k];
                        curVal-=v[k];
                        compose[k]=0;
                    }
                }
            }
        }
    };
    recur(0);
    return maxVal;
};
/**
 * @param w 物品的重量数组
 * @param v 物品的价值数组
 * @param idx 当前待选择的物品索引
 * @param capacity 当前背包有效容量
 * @returns {number}
 */
// 为什么要写状态转移方程呢，存在状态吗，首先如果最优答案中没有物品x,那么此时的组合可能就是c-w[x]的最大价值量
// 因此我们发现当前状态可能会跟前一个状态发生关联，
// 首先确定状态转移方程：F(i,n)=max(F(i-1,n),v(i)+F(i-1,n-w[i]))
const knapsack=(w,v,idx,capacity)=>{
    if(idx<0||capacity<=0) return 0;
    // 不放第idx个物品的总价值
    let res=knapsack(w,v,idx-1,capacity);
    if(w[idx]<=capacity){
        res=Math.max(res,v[idx]+knapsack(w,v,idx-1,capacity-w[idx]));
    }
    return res;
};
/**
 * 0-1背包问题优化之存储已经获取的结果
 * @param w
 * @param v
 * @param C
 * @returns {number}
 */
const knapsack1=(w,v,C)=>{
    let memo=new Array(w.length);
    for(let i=0;i<memo.length;i++){
        memo[i]=new Array(C+1);
    }
    const solveKS=(w,v,idx,C)=>{
        if(idx<0||C<=0)return 0;
        if(memo[idx][C]) return memo[idx][C];
        let res=solveKS(w,v,idx-1,C);
        if(w[idx]<C){
            res=Math.max(res,v[idx]+solveKS(w,v,idx-1,C-w[idx]));
        }
        memo[idx][C]=res;
        return res;
    };
    return solveKS(w,v,w.length-1,C);
};
/**
 * 解决0-1背包问题的动态规划算法
 * @param w
 * @param v
 * @param C
 */
const knapsack2=(w,v,C)=>{
    let size=w.length;
    if(size===0) return 0;
    //  此矩阵的意思就是dp[i][j]表示前i+1个物品放入到容量为j的背包中的最大价值
    let dp=new Array(size);
    for(let i=0;i<size;i++){
        dp[i]=new Array(C+1);
    }
    // 为何要初始化第一行，因为只有一个物品放入到容量为j的背包中的时候的价值量
    // 是边界值
    //初始化第一行，仅考虑容量为C的背包放第0个物品的情况
    for(let i=0;i<C+1;i++){
        dp[0][i]=w[0]<=i?v[0]:0;
    }
    // 填充其它行
    for(let i=1;i<size;i++){
        for(let j=0;j<C+1;j++){
            // 首先设定值就是前i个物品放入时的价值量
            dp[i][j]=dp[i-1][j];
            if(w[i]<=j){
                // key:这一步保证了不会让总重量超过背包的容量，且此时背包的容量是j
                dp[i][j]=Math.max(dp[i][j],v[i]+dp[i-1][j-w[i]]);
            }
        }
    }
    console.info(dp);
    return dp[size-1][C];
};
// console.info(knapsack0([10,8,5],[5,4,1],16));
console.info(knapsack2([10,8,5],[5,4,1],16));
// console.info(knapsack([10,8,5],[5,4,1],2,16));
// console.info(knapsack1([10,8,5],[5,4,1],16));