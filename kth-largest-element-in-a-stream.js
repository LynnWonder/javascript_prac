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
import Heap from './algorithm/Heap/MinHeap';
/**
 * 试想就是求topk问题
 * 在本题中会回顾所有的求topK的方法
 * 首先用构建堆的方法，
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
    let h= new Heap(), len;
    len=nums.length>=k?k:nums.length;
    for(let i=0;i<len;i++){
        let temp=nums.shift();
        h.insert(temp);
    }
    for(let i=0;i<nums.length;i++){
        if(nums[i]>h.data[0]){
            h.deleting();
            h.insert(nums[i]);
        }
    }
    this.data=h;
    this.arr=nums;
    this.lim=k;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
    if(this.data.data.length<this.lim){
        this.data.insert(val);
        console.info(this.data.data[0]);
        return this.data.data[0];
    }
    if(val>this.data.data[0]){
        this.data.deleting();
        this.data.insert(val);
    }
    console.info(this.data.data[0]);
    return this.data.data[0];
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
let kthLargest = new KthLargest(1,[]);
// let kthLargest = new KthLargest(2,[0]);
// kthLargest.add(3);   // returns 4
// kthLargest.add(5);   // returns 5
// kthLargest.add(10);  // returns 5
// kthLargest.add(9);   // returns 8
// kthLargest.add(4);   // returns 8
kthLargest.add(-1); 
kthLargest.add(-2); 
kthLargest.add(-4); 
kthLargest.add(0); 
kthLargest.add(4); 
// kthLargest.add(-1);
// kthLargest.add(1);
// kthLargest.add(-2);
// kthLargest.add(-4);
// kthLargest.add(3);
