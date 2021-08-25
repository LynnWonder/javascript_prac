// 漂亮数组 leetcode-932
/**
 * 对于某些固定的 N，如果数组 A 是整数 1, 2, ..., N 组成的排列，使得：
 * 对于每个 i < j，都不存在 k 满足 i < k < j 使得 A[k] * 2 = A[i] + A[j]。
 * 那么数组 A 是漂亮数组。
 */
/**
 * 首先我是这样思考这个问题的，对于F(N)=F(N-1)insert N
 * 但是事实证明并不能解决问题的，因此决定看答案了
 * @param {number} N
 * @return {number[]}
 */
const beautifulArray = N=> {
    // 暂存数值
    let map=new Map();
    const helper=num=>{
        if(map.has(num)){
            return map.get(num);
        }
        let ans=[];
        if(num===1){
            ans[0]=1;
        }else{
            let t=0;
            // odd 从(num+1)/2中映射
            for(let i of helper(Math.floor((num+1)/2))){
                ans[t++]=2*i-1;
            }
            // even 从num/2中映射
            for(let i of helper(Math.floor((num)/2))){
                ans[t++]=2*i;
            }
        }
        map.set(num,ans);
        return ans;
    };
    return helper(N);
};
console.info(beautifulArray(2));
console.info(beautifulArray(3));
console.info(beautifulArray(4));
console.info(beautifulArray(5));