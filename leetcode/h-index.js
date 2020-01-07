// H指数 leetcode-274
/**
 * 给定一位研究者论文被引用次数的数组（被引用次数是非负整数）。编写一个方法，计算出研究者的 h 指数。
 * h 指数的定义: “h 代表“高引用次数”（high citations），
 * 一名科研人员的 h 指数是指他（她）的 （N 篇论文中）至多有 h 篇论文分别被引用了至少 h 次。
 * （其余的 N - h 篇论文每篇被引用次数不多于 h 次。）”
 */


/**
 * 想法不周全，无法通过所有测试用例,
 * 或者说思路就是错误的，既然是跟索引相关，那么就应该是用统计计数的方法
 * 修改后：
 * 时间复杂度：取决于排序算法
 * 空间复杂度：取决于排序算法
 * @param {number[]} citations
 * @return {number}
 */
const hIndex = citations=> {
    citations=citations.sort((a,b)=>b-a);
    let a=0;
    // for(let i=0;i<citations.length;i++)
    while(i<citations.length&&i+1<=citations[i]){
        if(citations[i]>0){
            a++;
        }
        i++;
    }
    return a;
};
/**
 * 使用桶排序的思想也可以解决此题
 * 根据题目要求，h值肯定不会大于n，因此我们安排n+1个桶(为了把0囊括进来)
 * 分别是0，1，2，3。。。n
 * 如果不把0囊括进来会怎样呢？===>会写代码非常不方便
 * 是每个桶只有1个元素的桶排序
 * 其实就是计数排序，
 * 时间复杂度:O(n)
 * 空间复杂度:O(n)
 * @param citations
 */
const hIndex1 = citations=> {
    let len=citations.length;
    let temp=new Array(len+1).fill(0);
    for(let i=0;i<len;i++){
        if(citations[i]>=len){
            temp[len]++;
        }else{
            temp[citations[i]]++;
        }
    }
    // console.info('temp===>',temp);
    let cur=0;
    for(let i=len;i>=0;i--){
        cur=cur+temp[i];
        if (cur>=i){
            return i;
        }
    }
};
// console.info(hIndex([3,0,6,1,5]));
console.info(hIndex1([3,0,6,1,5]));
console.info(hIndex1([100]));
// console.info(hIndex([1,2]));
// console.info(hIndex([11,22]));
// console.info(hIndex([4,4,0,0]));
// console.info(hIndex([4,4,1,1]));
// console.info(hIndex([2,2,2]));
console.info(hIndex1([6,6,4,8,4,3,3,10]));