// 数据流中的第K大元素- leetcode-703
// 设计一个找到数据流中第K大元素的类（class）。
// 注意是排序后的第K大元素，不是第K个不同的元素。
// 你的 KthLargest 类需要一个同时接收整数 k 和整数数组nums 的构造器，
// 它包含数据流中的初始元素。每次调用 KthLargest.add，
// 返回当前数据流中第K大的元素。
// int k = 3;
// int[] arr = [4,5,8,2];
// KthLargest kthLargest = new KthLargest(3, arr);
// kthLargest.add(3);   // returns 4
// kthLargest.add(5);   // returns 5
// kthLargest.add(10);  // returns 5
// kthLargest.add(9);   // returns 8
// kthLargest.add(4);   // returns 8
/**
 * 利用二分查找法
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    this.arr=nums;
    this.lim=k;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    const find=(arr,tgt)=>{
        let res=0;
        for(let i=0;i<arr.length;i++){
            if(arr[i]>=tgt){
                res++;
            }
        }
        return res;
    };
    const bSearch=(arr,k)=>{
        let min=Math.min.apply(null,arr);
        let max=Math.max.apply(null,arr);
        while(min<=max){
            let mid=Math.floor((min+max)/2);
            let cn=find(arr,mid);
            if(cn<k){
                // mid is too big
                max=mid-1;
            }else{
                // mid is too small or cn===k
                min=mid+1;
            }
        }
        return max;
    };
    this.arr.push(val);
    console.info(bSearch(this.arr,this.lim));
    return bSearch(this.arr,this.lim);
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// ["KthLargest","add","add","add","add","add"]
// [[1,[]],[-3],[-2],[-4],[0],[4]]
// ["KthLargest","add","add","add","add","add"]
// [[2,[0]],[-1],[1],[-2],[-4],[3]]
// let kthLargest = new KthLargest(3, [4,5,8,2]);
// let kthLargest = new KthLargest(1,[]);
let kthLargest = new KthLargest(2,[0]);
// kthLargest.add(3);   // returns 4
// kthLargest.add(5);   // returns 5
// kthLargest.add(10);  // returns 5
// kthLargest.add(9);   // returns 8
// kthLargest.add(4);   // returns 8
// kthLargest.add(-1); 
// kthLargest.add(-2); 
// kthLargest.add(-4); 
// kthLargest.add(0); 
// kthLargest.add(4); 
kthLargest.add(-1);
kthLargest.add(1);
kthLargest.add(-2);
kthLargest.add(-4);
// kthLargest.add(3);
const find=(arr,tgt)=>{
    let res=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]>=tgt){
            res++;
        }
    }
    return res;
};
const bSearch=(arr,k)=>{
    let min=Math.min.apply(null,arr);
    let max=Math.max.apply(null,arr);
    while(min<=max){
        let mid=Math.floor((min+max)/2);
        let cn=find(arr,mid);
        if(cn<k){
            // mid is too big
            max=mid-1;
        }else{
            // mid is too small or cn===k
            min=mid+1;
        }
    }
    return max;
};