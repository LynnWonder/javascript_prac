// x 的平方根 leetcode-69
/**
 * 实现 int sqrt(int x) 函数。
 计算并返回 x 的平方根，其中 x 是非负整数。
 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
 */
/**
 * 首先利用二分法来寻找问题的答案,
 * 结合以前几道做过的题目进行过的总结可以知道：
 * 如果存在target则返回正好合适的mid值，如果不存在
 * left就是待插入位置的索引，right比left小1
 * 当然：以上mid的选取都是取的floor，在极少数的情况下我也用过ceil，无论哪一种都要仔细分析一下边界以免发生错误
 * 应用到这个题中就是返回right值即可
 * 时间复杂度：O(logN)
 * 空间复杂度：O(1)
 * @param x
 */
const mySqrt = (x)=>{
    if(x===1||x===0) return x;
    let left=0,right=Math.floor(x/2);
    while(left<=right){
        let mid=Math.floor((left+right)/2);
        if(mid*mid===x){
            return mid;
        }else if(mid*mid>x){
            // mid is too big
            right=mid-1;
        }else if(mid*mid<x){
            left=mid+1;
        }
    }
    // console.info('left===>',left,right);
    return right;
};
/**
 * 牛顿迭代法：Newton's method
 * https://baike.baidu.com/item/%E7%89%9B%E9%A1%BF%E8%BF%AD%E4%BB%A3%E6%B3%95/10887580?fr=aladdin
 * 牛顿迭代法是求方程根的重要方法之一，其最大优点是在方程 的单根附近具有平方收敛，
 * 而且该法还可以用来求方程的重根、复根，此时线性收敛，但是可通过一些方法变成超线性收敛。
 * 首先知道一阶泰勒展开公式f(x)=f(x0)+f'(x0)(x-x0)
 * 将f(x)=x^2-a代入即可得到x=(x0+a/x0)/2 即得到了迭代关系式即：x1=(x0+a/x0)/2,x2=(x1+a/x1)/2
 * 迭代变量即为x
 * 迭代跳出为是否x*x为a
 * @param x
 * @returns {number}
 */
const mySqrt0=x=>{
    let a=x;
    while(x*x-a>1-Number.EPSILON){
        // x=Math.floor((x+a/x)/2);
        // 以下如果while判断为x*x>a会陷入死循环，比如取值5，那么x总是无限逼近√5且一直比a大而不跳出循环
        // 因此为了避免进入死循环，将判断条件改为x*x-a>1-Number.EPSILON
        // Number.EPSILON 属性表示 1 与Number可表示的大于 1 的最小的浮点数之间的差值。2^(-52)
        x=(x+a/x)/2;
        // console.info(x);
    }
    // console.info(x);
    return (Math.floor(x));
};
// console.info(mySqrt(0));
// console.info(mySqrt(1));
// console.info(mySqrt(2));
// console.info(mySqrt(4));
// console.info(mySqrt(5));
// console.info(mySqrt(6));
// console.info(mySqrt(15));
console.info(mySqrt0(0));
console.info(mySqrt0(1));
console.info(mySqrt0(2));
console.info(mySqrt0(3));
console.info(mySqrt0(4));
console.info(mySqrt0(5));