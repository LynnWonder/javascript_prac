import Heap from './algorithm/Heap/MinHeap';
import HeapSort from './algorithm/Heap/HeapSort'
// 超级丑数 leetcode-313
/**
 * 编写一段程序来查找第 n 个超级丑数。
 * 超级丑数是指其所有质因数都是长度为 k 的质数列表 primes 中的正整数。
 * 输入: n = 12, primes = [2,7,13,19]
 * 输出: 32
 * 解释: 给定长度为 4 的质数列表 primes = [2,7,13,19]，前 12 个超级丑数序列为：[1,2,4,7,8,13,14,16,19,26,28,32] 。
 * 初步思路是首先求出来最大值低于primes最大值的数组
 * 排序 以这个数组为基准进行扩充，显然这种思路是基于丑数那个题的思路来的
 * 带来一个问题，如果primes数组的长度过大，该怎么处理呢？====>因此应该转变思维去求值
 * 参考方法1：利用动态规划方法规划每一个丑数的大小，无疑每个丑数取决于质因数的幂乘积
 * 即2(^mul[0])7(^mul[1])13(^mul[2])19(^mul[3])
 * @param n
 * @param primes
 */
const nthSuperUglyNumber=(n,primes)=>{
    let mul=(new Array(primes.length)).fill(0);
    let uglies=[1],t=1;
    while(t<n){
        uglies[t]=Number.MAX_SAFE_INTEGER;
        for(let i=0;i<primes.length;i++){
            if(uglies[t]>primes[i]*uglies[mul[i]]){
                uglies[t]=primes[i]*uglies[mul[i]];
            }
        }
        for(let i=0;i<primes.length;i++){
            if(uglies[t]>=primes[i]*uglies[mul[i]]){
                mul[i]++;
            }
        }
        t++;
    }
    // console.info(uglies);
    return uglies[n-1];
};

/**
 * 用最小堆计算的方式非常独特，每次加入一批基于primes的根节点的倍数，每次取根节点
 * @param n
 * @param primes
 * @returns {*}
 */
const nthSuperUglyNumber1=(n,primes)=>{
    let h=new Heap(),uglies=[];
    h.build([1]);
    n-=1;
    while(n){
        let temp=h.deleting();
        // 避免重复元素的出现
        while(h.data.length>0&&temp===h.data[0]){
            temp=h.deleting();
        }
        // uglies.push(temp);
        for(let p of primes){
            let t=p*temp;
            h.insert(t);
        }
        n-=1;
    }
    // console.info(uglies,h.data);
    return h.deleting();
};
// console.info(nthSuperUglyNumber(12,[2,7,13,19]));
// console.info(nthSuperUglyNumber1(12,[2,7,13,19]));
console.info(nthSuperUglyNumber1(3,[2,3,5]));