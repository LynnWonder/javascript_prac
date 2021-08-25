//  接雨水 leetcode-42
// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，
// 计算按此排列的柱子，下雨之后能接多少雨水。
// 输入: [0,1,0,2,1,0,1,3,2,1,2,1]
// 输出: 6
/**
 * 遍历所有元素（除了首尾）查找空缺
 * findVacancy 查找空缺
 * getSum 获取空缺处的降雨量总和
 * 时间复杂度：O(n)
 */
import Heap from './algorithm/Heap/MinHeapObj';

const findVacancy=(arr,i)=>{
    let l=i,r=i,min=i;
    // find max
    for(let m=i-1;m>=0;m--){
        if(arr[m]>=arr[l]){
            l=m;
        }else break;
    }
    // 关键点在于向后查找
    // 确定最小元素的位置
    for(let n=i+1;n<arr.length;n++){
        if(arr[n]<=arr[min]){
            min=n;
        }else{
            break;
        }
    }
    r=min;
    // 向后查找是一件很困难的事情，有其对于[5,4,1,2],[5,2,1,2,1,5]这种情况
    // 因此如果有了比左侧最大值大的情况就应该退出
    for(let p=min+1;p<arr.length;p++){
        if(arr[p]>=arr[r]){
            r=p;
        }
        if(arr[p]>=arr[l]) break;
    }
    // console.info(min,r);
    if(min!==i&&min===r) return{l,'r':null};
    return {l,r};
};
const getSum=(arr,obj)=>{
    let {l,r}=obj,res=0;
    let min=Math.min(arr[l],arr[r]);
    // console.info('min==>',min,l,r);
    for(let i=l;i<=r;i++){
        if(min-arr[i]>0){
            res+=min-arr[i];
        }
    }
    return res;
};
const trap=height=>{
    let i=1,res=0;
    while(i<height.length-1)
    {
        // 这里我们判定中间凸出或者递增型的一定不适合去盛雨水
        let flag=(height[i-1]<height[i]&&height[i+1]<height[i])||(height[i-1]<=height[i]&&height[i+1]>height[i]);
        if(flag){
            i++;
        }else{
            let temp=findVacancy(height,i);
            // console.info('temp==>',temp);
            if(temp.r){
                res+=getSum(height,temp);
                i=temp.r;
            }else{
                break;
            }
        }
    }
    return res;
};
/**
 * 从左右两边的边界向中间不断进行收缩，收缩的过程中对每个坐标能接的雨水进行求解
 * 这种就是找短板的方式确定以哪个为基准进行接雨水
 * @param height
 */
const trap1=height=>{
    let left=0,right=height.length-1;
    let leftMax=0,rightMax=0,res=0;
    while(left<right){
        if(height[left]<=height[right]){
            if(height[left]>leftMax){
                leftMax=height[left];
            }else{
                res+=leftMax-height[left];
            }
            left++;
        }else{
            if(height[right]>rightMax){
                rightMax=height[right];
            }else{
                res+=rightMax-height[right];
            }
            right--;
        }
    }
    return res;
};
// 在学习了407接雨水2中的官方解题方法：优先队列法之后决定堆42题进行复盘
const trap2=height=>{
    let res=0,h=new Heap(),dir=[-1,1],visited=new Map();
    h.insert({'pos':0,'val':height[0]},'val');
    h.insert({'pos':height.length-1,'val':height[height.length-1]},'val');
    visited.set(0,true);
    visited.set(height.length-1,true);
    while(h.data.length){
        let temp=h.deleting('val');
        for(let i=0;i<dir.length;i++){
            let newOne=temp.pos+dir[i];
            if(newOne>=0&&newOne<height.length&&!visited.has(newOne)){
                res+=Math.max(0,temp.val-height[newOne]);
                h.insert({'pos':newOne,'val':Math.max(height[newOne],temp.val)},'val');
                visited.set(newOne,true);
            }
        }
    }
    return res;
};
let arr=[0,1,0,2,1,0,1,3,2,1,2,1];
let arr1=[5,4,1,2];
let arr2=[5,2,1,2,1,5];
let arr3=[0,5,6,4,6,1,0,0,2,7];
let arr4=[4,3,3,9,3,0,9,2,8,3];
// console.info(trap(arr));
// console.info(trap(arr1));
// console.info(trap(arr2));
// console.info(trap(arr3));
// console.info(trap(arr4));
console.info(trap2(arr));
console.info(trap2(arr1));
console.info(trap2(arr2));
console.info(trap2(arr3));
console.info(trap2(arr4));
// console.info(findVacancy(arr4,1));
// console.info(getSum(arr,{l:3,r:7}));