//  三角形的最大周长 leetcode-976
// 给定由一些正数（代表长度）组成的数组 A，返回由其中三个长度组成的、面积不为零的三角形的最大周长。
// 如果不能形成任何面积不为零的三角形，返回 0。

/**
 * 基本思路是首先排序，检查哪些可以组成三角形，然后遍历查找寻找出最大周长
 * 时间复杂度主要取决于sort函数的时间复杂度
 * 空间复杂度:O(1)
 * @param {number[]} A
 * @return {number}
 */
const largestPerimeter = A=>{
    A.sort((a,b)=>a-b);
    let res=0;
    for(let i=0;i<A.length-2;i++){
        if (A[i]+A[i+1]>A[i+2]){
            if(A[i]+A[i+1]+A[i+2]>res){
                res=A[i]+A[i+1]+A[i+2];
            }
        }
    }
    return res;
};
console.info(largestPerimeter([2,1,2]));
console.info(largestPerimeter([1,2,1]));
console.info(largestPerimeter([3,2,3,4]));
console.info(largestPerimeter([3,6,2,3]));