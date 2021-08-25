// Pow(x, n)  leetcode-50
// 实现 pow(x, n) ，即计算 x 的 n 次幂函数。
/**
 * 二分思想，时间复杂度为O(logN)
 * 使用辅助空间单元个数只是常数级别，所以空间复杂度为O(1)
 * 和leetcode-29的解题思路极其相似。
 * 用二分法解决此类数学问题非常方便
 * @param x
 * @param n
 * @returns {number|*}
 */
const myPow = (x, n)=>{
    let res=x,count=1;
    // handle edge cases
    if(x===1) return 1;
    if(Math.abs(n)===1){
        if(n===-1) return 1/res;
        return res;
    }
    if(n===0) return 1;

    while(count+count<=Math.abs(n)){
        count+=count;
        res*=res;
    }
    if(res===0) return 0;
    // console.info('inside==>',res);
    res*=myPow(x,Math.abs(n)-count);
    if(n<0){
        return 1/res;
    }else{
        return res;
    }
};

console.info(myPow(2.00000, 10));
console.info(myPow(2.10000, 3));
console.info(myPow(10, -1));