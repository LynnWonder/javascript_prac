// 搜索二维矩阵 leetcode-74
/**
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 每行中的整数从左到右按升序排列。
 每行的第一个整数大于前一行的最后一个整数。
 输入:
 matrix = [
 [1,   3,  5,  7],
 [10, 11, 16, 20],
 [23, 30, 34, 50]
 ]
 target = 3
 输出: true
 */
/**
 * 初步考虑如下，首先搜索出在哪一行，然后用二分查找寻找该行中是否有
 * 时间复杂度 O(m+logn);
 * @param matrix
 * @param target
 */
const searchMatrix = (matrix, target)=>{
    if(matrix.length===0) return false;
    let m=matrix.length,n=matrix[0].length,temp=0;
    for(let i=0;i<m;i++){
        if(matrix[i][n-1]>=target){
            temp=i;
            break;
        }
    }
    if(matrix[temp][n-1]<target) return false;
    // console.info(temp);
    const search=(arr,tgt)=>{
        let left=0,right=arr.length-1;
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            if(arr[mid]===tgt){
                return true;
            }else if(arr[mid]>tgt){
                right=mid-1;
            }else{
                left=mid+1;
            }
        }
        return false;
    };
    return search(matrix[temp],target);
};
/**
 * opt1：如果查找区间也用二分法查找
 * 此时时间复杂度变成：O(logM+logN)=O(logMN);
 * 空间复杂度为：O(1)
 * @param matrix
 * @param target
 * @returns {boolean}
 */
const searchMatrix1 = (matrix, target)=>{
    if(matrix.length===0) return false;
    let m=matrix.length,n=matrix[0].length,temp=0;
    if(n===0) return false;
    let min=0,max=m-1;
    while(min<=max){
        let mid=Math.floor((min+max)/2);
        if(matrix[mid][n-1]>=target){
            // 用到了一点二分查找法查找左边界的思想
            max=mid-1;
        }else if(matrix[mid][n-1]<target){
            min=mid+1;
        }
    }
    // 处理边界：target比matrix中的每个值都大，min>m-1的情况要另外处理
    if(min>m-1) min=m-1;
    temp=min;
    // 处理边界：target比matrix中的每隔值都小
    if(matrix[temp][n-1]<target) return false;
    // console.info('temp==>',temp);
    const search=(arr,tgt)=>{
        let left=0,right=arr.length-1;
        while(left<=right){
            let mid=Math.floor((left+right)/2);
            if(arr[mid]===tgt){
                return true;
            }else if(arr[mid]>tgt){
                right=mid-1;
            }else{
                left=mid+1;
            }
        }
        return false;
    };
    return search(matrix[temp],target);
};
// console.info(searchMatrix1([
//     [1,   3,  5,  7],
//     [10, 11, 16, 20],
//     [23, 30, 34, 50]
// ],23));
console.info(searchMatrix1([
    [1]
],2));