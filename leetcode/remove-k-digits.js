// 移掉K位数字 leetcode-402
// 给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。
// 输入: num = "1432219", k = 3
// 输出: "1219"
// 解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。
/**
 * 通过观察规律 首先删高位上的大数字，私以为和k的大小相关
 * 而且每次删除的都是0~len-k-1的数
 * 但同时发现一个问题就是对于递增的数，一般删除尾部的几位才可以
 * 迷惑是从此处开始的，所以开始参考官方题解
 */


/**
 * 利用栈+贪心算法来解决这个问题
 * 我们需要明确一个问题就是对于两个相同长度的数字序列，最左边不同的数字决定了两个数字的大小
 * 因此删除数字的时候应高是从左向右的
 * 贪心规则如下：
 * 将元素按从左向右入栈，如果当前元素小于栈顶元素那么就将栈顶弹出直到弹出个数符合k的大小
 * 同时对于递增的序列进行特殊处理（对于递增的序列的处理需要仔细观察）
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
const removeKdigits = (num, k)=>{
    if(num.length<=k) return '0';
    let numStack=[];
    for(let i=0;i<num.length;i++){
        while(k&&numStack.length&&numStack[numStack.length-1]>Number(num[i])){
            numStack.pop();
            k--;
        }
        numStack.push(num[i]);
    }
    // handle 头部含0的cases+num=10 k=1的cases
    while(numStack[0]==='0'&&numStack.length>=2){
        numStack.shift();
    }
    // console.info('k===>',k);
    // 同时我们要对于单调递增数列进行处理
    return k>0?numStack.slice(0,numStack.length-k).join(''):numStack.join('');
};
// console.info(removeKdigits('1432219',3));
// console.info(removeKdigits('10200',1));
// console.info(removeKdigits('10',2));
// console.info(removeKdigits('10',1));
console.info(removeKdigits('112',1));

