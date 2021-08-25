// H指数 II leetcode-275
/**
 * 给定一位研究者论文被引用次数的数组（被引用次数是非负整数），数组已经按照升序排列。编写一个方法，计算出研究者的 h 指数。
 * h 指数的定义: “h 代表“高引用次数”（high citations），
 * 一名科研人员的 h 指数是指他（她）的 （N 篇论文中）至多有 h 篇论文分别被引用了至少 h 次。（
 * 其余的 N - h 篇论文每篇被引用次数不多于 h 次。）"
 */

/**
 * 反而比leetcode-274 更加简单了
 * 时间复杂度:O(n)
 * 空间复杂度:O(1)
 * @param {number[]} citations
 * @return {number}
 */
const hIndex = citations=>{
    let res=0;
    for(let i=0;i<citations.length;i++){
        if(citations[i]>=citations.length-i){
            res++;
        }
    }
    return res;
};
/**
 * 计数排序
 * 时间复杂度:O(n)
 * 空间复杂度:O(n)
 * @param citations
 */
const hIndex1=citations=>{
    let temp=new Array(citations.length+1).fill(0);
    for(let i=0;i<citations.length;i++){
        if(citations[i]>citations.length-1){
            temp[citations.length]++;
        }else{
            temp[citations[i]]++;
        }
    }
    let sum=0;
    for(let i=citations.length;i>=0;i--){
        sum+=temp[i];
        if(sum>=i){
            return i;
        }
    }
};
/**
 * 下面将时间复杂度优化到logN
 * 首先这个题给出的参数是排好序的数组，显然可以用二分查找来做
 * 而我们寻找h指数的两个关键是：
 * 1.citations[i]
 * 2.len-i
 * 如果1>2 显然不满足条件需要继续向左排查
 * 如果1<2，显然需要向右排查
 * 1=2,那么大概率凑巧了citations[i]就是要求的值
 * 返回值应该是区间长度，因此是citations.length-i
 * @param citations
 */
const hIndex2=citations=>{
    let  left=0,right=citations.length-1;
    while(left<=right){
        let mid=Math.floor((left+right)/2);
        if(citations[mid]<citations.length-mid){
            left=mid+1;
        }else if(citations[mid]>citations.length-mid){
            right=mid-1;
        }else{
            return citations[mid];
        }
    }
    // console.info('===>',left,right);
    return citations.length-left;
};
console.info(hIndex2([3,0,6,1,5].sort((a,b)=>a-b)));
// console.info(hIndex([100]));
// console.info(hIndex([1,2]));
// console.info(hIndex([11,22]));
// console.info(hIndex2([4,4,0,0].sort()));
// console.info(hIndex2([4,4,1,1].sort((a,b)=>a-b)));
// console.info(hIndex2([2,2,2]));
console.info(hIndex2([6,6,4,8,4,3,3,10].sort((a,b)=>a-b)));
// console.info([6,6,4,8,4,3,3,10].sort((a,b)=>a-b));
// console.info(hIndex2([0]));