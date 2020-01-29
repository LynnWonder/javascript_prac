// 漂亮数组
// 对于某些固定的 N，如果数组 A 是整数 1, 2, ..., N 组成的排列，使得：
//
// 对于每个 i < j，都不存在 k 满足 i < k < j 使得 A[k] * 2 = A[i] + A[j]。
// 那么数组 A 是漂亮数组。
// 给定 N，返回任意漂亮数组 A（保证存在一个）。

/**
 * 易错点1： 对于N个数，奇数有多少个，偶数有多少个，奇数floor((N+1)/2) 偶数floor(N/2)
 * 易错点2： 映射关系是否可以定为2*x+1呢，可以，但是会不符合题意，超出N的范围
 * 总结：该题不易做，很难想到利用奇偶两侧满足的
 * @param {number} N
 * @return {number[]}
 */
const beautifulArray = N=> {
    let map=new Map();
    const helper=num=>{
        if(num===1){
            map.set(1,[1]);
            return [1];
        }
        if(map.has(num)){
            return map.get(num);
        }
        let t=0,res=[];
        for(let i of helper(Math.floor((num+1)/2))){
            //
            res[t++]=2*i-1;
        }
        for(let i of helper(Math.floor(num/2))){
            res[t++]=2*i;
        }
        map.set(num,res);
        return res;
    };
    return helper(N);
};

console.info(beautifulArray(2));