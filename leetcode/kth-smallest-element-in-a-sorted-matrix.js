// 有序矩阵中第K小的元素 leetcode-378
// 给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第k小的元素。
// 请注意，它是排序后的第k小元素，而不是第k个元素。
// matrix = [
//    [ 1,  5,  9],
//    [10, 11, 13],
//    [12, 13, 15]
// ],
// k = 8,
// 返回 13。
/**
 * 以下是最朴素的做法，
 * 时间复杂度:O(NlogN)
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
import Heap from './algorithm/Heap/MinHeapObj';
const kthSmallest = (matrix, k)=>{
    let temp=[];
    for(let i=0;i<matrix.length;i++){
        temp=temp.concat(matrix[i]);
    }
    temp.sort((a,b)=>a-b);
    return temp[k-1];
};
/**
 * 利用堆数据结构进行insert和delete
 * 同样是解决top-k问题,只不过是最小的k，因此需要使用大根堆,
 * 同时这个题看起来像是合并x个有序数组，但是实则又是top-k问题
 * @param matrix
 * @param k
 */
const kthSmallest1 = (matrix, k)=>{
    let h=new Heap(),res=[];
    for(let i=0;i<matrix.length;i++){
        h.insert({'i':i,'j':0,'val':matrix[i][0]},'val');
    }
    while(res.length<k&&h.data.length){
        // todo 添加元素
        let temp=h.deleting('val');
        res.push(temp.val);
        if(temp.j+1<matrix[temp.i].length){
            h.insert({'i':temp.i,'j':temp.j+1,'val':matrix[temp.i][temp.j+1]},'val');
        }
    }
    return res[k-1];
};
// console.info(kthSmallest1([
//     [ 1,  5,  9],
//     [10, 11, 13],
//     [12, 13, 15]
// ],8));
console.info(kthSmallest([[1,2],[3,3]],2));