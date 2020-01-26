// 多数元素 leetcode-169
// 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
// 输入: [3,2,3]
// 输出: 3
/**
 * 首先考虑一种最普遍的解决方法来解决这个题目
 * @param {number[]} nums
 * @return {number}
 */
const majorityElement = nums=>{
    let obj={};
    for(let i=0;i<nums.length;i++){
        if(obj[nums[i]]){
            obj[nums[i]]+=1;
            if(obj[nums[i]]>Math.floor(nums.length/2)){
                return nums[i];
            }
        }else{
            obj[nums[i]]=1;
        }
    }
    return nums[0];
};
/**
 * 也可以使用分治法来解决
 * 原本以为找到分开后的子序列的结果即为总的结果，但通过验证是错误的
 * 以下为错误答案
 * @param nums
 */
const majorityElement1=nums=>{
    const conquer=(arr)=>{
        let res=[];
        if (arr.length===1) return arr[0];
        if(arr.length===2){
            if(arr[0]===arr[1]){
                return arr[0];
            }else {
                return null;
            }
        }
        let mid=Math.floor((arr.length-1)/2);
        let left=conquer(arr.slice(0,mid+1));
        let right=conquer(arr.slice(mid+1));
        // console.info(left,right);
        if(left===null||right===null){
            return left||right;
        }else if(left===right){
            return left;
        }else if(left!==right){
            if(Array.isArray(left)){
                res=res.concat(left);
            }else{
                res.push(left);
            }
            if(Array.isArray(right)){
                res=res.concat(right);
            }else{
                res.push(right);
            }
            return res;
        }
    };
    let res=conquer(nums);
    while(Array.isArray(res)){
        res=conquer(res);
    }
    return res;
};
/**
 * 正统的分治法解题，其实思路很简单，就是combine的时候需要格外注意一下，
 * 当然也暴露了我的一个易错点就是总是力求更简单而无法保证最稳妥的方法
 * 时间复杂度: T(n)=2T(n/2)+2n
 * 根据master theorem
 * a=2 b=2 f(n)=2n 符合第二种情况，O(n)=nlogn;
 * 尽管分治算法没有直接分配额外的数组空间，但因为递归的过程，
 * 在栈中使用了一些非常数的额外空间。
 * 因为算法每次将数组从每一层的中间断开，所以数组长度变为 1 之前只有 O(lgn)次切断。
 * 由于递归树是平衡的，所以从根到每个叶子节点的长度都是 O(lgn)。
 * 由于递归树是深度优先的，空间复杂度等于最长的一条路径，也就是 O(lgn)。
 * @param nums
 * @returns {*}
 */
const majorityElement2=nums=>{
    const count=(arr,num,left,right)=>{
        let count=0;
        for(let i=left;i<=right;i++){
            if(arr[i]===num){
                count++;
            }
        }
        return count;
    };
    const conquer=(arr,left,right)=>{
        if(left===right){
            return arr[left];
        }
        let mid=Math.floor((left+right)/2);
        let leftRes=conquer(arr,left,mid);
        let rightRes=conquer(arr,mid+1,right);
        console.info(leftRes,rightRes);
        if(leftRes===rightRes){
            return leftRes;
        }

        return (count(arr,leftRes,left,right)>count(arr,rightRes,left,right)?leftRes:rightRes);
    };
    return conquer(nums,0,nums.length-1);
};
// console.info(majorityElement1([2,2,1,1,1,2,2]));
console.info(majorityElement2([8,8,7,7,7]));
// console.info(majorityElement1([3,2,3]));