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

/**
 * 解决 0-1 背包问题的动态规划算法，这种方法更容易理解
 * 一般来讲我们都是先从容量入手来写状态转移方程 F(c, arr)=max(F(c-wi, arr[:i])+pi, F(c, arr[:i]))  arr[:i] 表示获取到
 * arr 从 0 到 i(不包含 i)
 * 备注：可能会疑问为什么不把数组中的所有重量元素都按这个规则遍历一次，为什么只取最后一个元素来做比较呢，实际上只取最后一个元素就能涵盖其他所有
 * 情况，因此这个状态转移方程是没问题的
 * 边界条件：F(0,arr) = F(c, []) =0 同时数组长度为 1 的情况也满足状态转移方程，所以无需特别做边界条件
 * 暂存结果方案：可以直接用状态转移方程来做 dp[i][j] i 标识容量从 0 到 c，长度为 c+1，j 标识数组的长度从 0 到 n，长度为 n+1
 * @param w
 * @param v
 * @param C
 */
const knapsack3=(w,v,C)=>{
    let n = w.length, res= new Array(C+1)
    for (let i=0;i<C+1;i++){
        res[i] = new Array(n+1);
    }
    // 容量为 0 的时候所有值均为 0
    for (let i=0;i<n+1;i++){
        res[0][i] = 0
    }
    for (let i=1;i<C+1;i++){
        res[i][0] = 0;
        for(let j=1;j<n+1;j++){
            res[i][j] = res[i][j-1];
            if (i>=w[j-1]){
                res[i][j] = Math.max(res[i][j], res[i-w[j-1]][j-1]+v[j-1]);
            }
        }
    }
    console.info('=====>',res);
    return res[C][n]
}
// console.info(knapsack0([10,8,5],[5,4,1],16));
// console.info(knapsack2([10,8,5],[5,4,1],16));
// console.info(knapsack([10,8,5],[5,4,1],2,16));
// console.info(knapsack1([10,8,5],[5,4,1],16));
// console.info(knapsack3([1, 2, 3], [4, 5, 2], 2));
console.info(knapsack2([1, 2, 3], [4, 5, 2], 2));
console.info(knapsack2([1, 2, 3], [4, 5, 2], 3));
console.info(knapsack2([1, 2, 3], [4, 5, 2], 5));


// 以 [10,8,5],[5,4,1],16 为🌰进行测试：
// 针对 dp[i][j] i 指的是数组最后一个元素的索引即数组长度为 i+1, j 指的是容量大小
// [
//   [  数组只有一个元素的时候容量从 0 到 16 的变化
//     0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 5, 5, 5, 5,
//     5, 5, 5
//   ],
//   [ 数组有两个元素的时候容量从 0 到 16 的变化
//     0, 0, 0, 0, 0, 0, 0,
//     0, 4, 4, 5, 5, 5, 5,
//     5, 5, 5
//   ],
//   [ 数组有三个元素的时候容量从 0 到 16 的变化
//     0, 0, 0, 0, 0, 1, 1,
//     1, 4, 4, 5, 5, 5, 5,
//     5, 6, 6
//   ]
// ]


// 针对 dp[i][j] i 指的是容量大小，j 指的是当前数组长度时
// [[0, 0, 0, 0],
//  [0, 0, 0, 0],
//  [0, 0, 0, 0],
//  [0, 0, 0, 0],
//  [0, 0, 0, 0],
//  [0, 0, 0, 1],
//  [0, 0, 0, 1],
//  [0, 0, 0, 1],
//  [0, 0, 4, 4],
//  [0, 0, 4, 4],
//  [0, 5, 5, 5],
//  [0, 5, 5, 5],
//  [0, 5, 5, 5],
//  [0, 5, 5, 5],
//  [0, 5, 5, 5],
//  [0, 5, 5, 6],
//  [0, 5, 5, 6]]