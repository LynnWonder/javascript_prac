// 20200109review
// H指数
/**
 * 给定一位研究者论文被引用次数的数组（被引用次数是非负整数）。编写一个方法，计算出研究者的 h 指数。
 * h 指数的定义: “h 代表“高引用次数”（high citations），
 * 一名科研人员的 h 指数是指他（她）的 （N 篇论文中）至多有 h 篇论文分别被引用了至少 h 次。
 * （其余的 N - h 篇论文每篇被引用次数不多于 h 次。）”
 * 既然都提到了计数法，那么今天就用计数排序来做一下这个题：
 * 首先h指数不会大于citations.length,因此分成len+1个部分来计数每个成员
 */
const hIndex = citations=> {
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

// console.info(hIndex([3,0,6,1,5]));
// console.info(hIndex([100]));
console.info(hIndex([1,2]));
console.info(hIndex([11,22]));
// console.info(hIndex([4,4,0,0]));
// console.info(hIndex([4,4,1,1]));
// console.info(hIndex([2,2,2]));
// console.info(hIndex([6,6,4,8,4,3,3,10]));