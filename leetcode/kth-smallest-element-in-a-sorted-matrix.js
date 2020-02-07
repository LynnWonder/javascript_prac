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
const kthSmallest2 = (matrix, k)=>{
    const search=(matrix,tgt)=>{
        let len=matrix.length;
        let i=len-1,j=0,res=0;
        while(i>=0&&j<len){
            //从最后一行开始检索,检索出小于等于target的数目，这段逻辑其实挺复杂的，不容易想出来
            if(matrix[i][j]<=tgt){
                res+=i+1;
                j++;
            }else{
                i--;
            }
        }
        return res;
    };
    let left=matrix[0][0],right=matrix[matrix.length-1][matrix[0].length-1];
    while(left<right){
        let mid=left+Math.floor((right-left)/2);
        let cnt=search(matrix,mid);
        console.info('cnt===>',cnt);
        if(cnt<k){
            left=mid+1;
        }else{
            right=mid;
        }
    }
    return left;
};
/**
 * 尝试用二分查找法查找出有序矩阵中的第k小的元素
 * @param matrix
 * @param k
 */
const kthSmallest_b = (matrix, k)=>{
    const count=(arr,tgt)=>{
        // let res=0;
        // for(let i=0;i<arr.length;i++){
        //     for(let j=0;j<arr[i].length;j++){
        //         if (arr[i][j]>tgt){
        //             break;
        //         }else{
        //             res++;
        //         }
        //     }
        // }
        // return res;
        // opt===>
        let res=0,right=arr[0].length;
        for(let i=0;i<arr.length;i++){
            for(let j=0;j<right;j++){
                if (arr[i][j]>tgt){
                    right=j;
                    break;
                }else{
                    res++;
                }
            }
        }
        return res;
    };
    let min=matrix[0][0],max=matrix[matrix.length-1][matrix[0].length-1];
    while(min<=max){
        let mid=Math.floor((min+max)/2);
        let cn=count(matrix,mid);
        if(cn>=k){
            // mid is too big
            max=mid-1;
        }else{
            min=mid+1;
        }
    }
    return min;
};
console.info(kthSmallest_b([
    [ 1,  5,  9],
    [10, 11, 13],
    [12, 13, 15]
],8));
// console.info(kthSmallest([[1,2],[3,3]],2));
// console.info(kthSmallest2([[1,2],[3,3]],2));