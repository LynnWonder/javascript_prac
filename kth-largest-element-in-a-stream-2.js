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
 * 利用quickSelect方法
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
    const swap=(arr,i,j)=>{
        let temp=arr[i];
        arr[i]=arr[j];
        arr[j]=temp;
    };
    const partition=(arr,left,right)=>{
        let lessThan = left;
        if(left===right) return left;
        for(let i=left+1;i<=right;i++){
            if(arr[i]<arr[left]){
                lessThan++;
                swap(arr,i,lessThan);
            }
        }
        swap(arr,left,lessThan);
        // console.info(lessThan);
        return lessThan;
    };
    const quickSelect=(arr,k,left,right)=>{
        let idx=partition(arr,left,right);
        if(right-idx+1>k){
            // tgt is in right
            return quickSelect(arr,k,idx+1,right);
        }else if(right-idx+1===k){
            return arr[idx];
        }else{
            return quickSelect(arr,k-(right-idx+1),left,idx-1);
        }
    };
    this.arr.push(val);
    // console.info(bSearch(this.arr,this.lim));
    console.info(quickSelect(this.arr,this.lim,0,this.arr.length-1));
    return quickSelect(this.arr,this.lim,0,this.arr.length-1);
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
let kthLargest = new KthLargest(3, [4,5,8,2]);
// let kthLargest = new KthLargest(1,[]);
// let kthLargest = new KthLargest(2,[0]);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8
// kthLargest.add(-1); 
// kthLargest.add(-2); 
// kthLargest.add(-4); 
// kthLargest.add(0); 
// kthLargest.add(4); 
// kthLargest.add(-1);
// kthLargest.add(1);
// kthLargest.add(-2);
// kthLargest.add(-4);
// kthLargest.add(3);

const swap=(arr,i,j)=>{
    let temp=arr[i];
    arr[i]=arr[j];
    arr[j]=temp;
};
const partition=(arr,left,right)=>{
    let lessThan = left;
    if(left===right) return left;
    for(let i=left+1;i<=right;i++){
        if(arr[i]<arr[left]){
            lessThan++;
            swap(arr,i,lessThan);
        }
    }
    swap(arr,left,lessThan);
    console.info(lessThan);
    return lessThan;
};
const quickSelect=(arr,k,left,right)=>{
    let idx=partition(arr,left,right);
    if(right-idx+1>k){
        // tgt is in right
        return quickSelect(arr,k,idx+1,right);
    }else if(right-idx+1===k){
        return arr[idx];
    }else{
        return quickSelect(arr,k-(right-idx+1),left,idx-1);
    }
};
let arr1=[4,5,8,2,3,7];
// console.info(quickSelect(arr1,3,0,arr1.length-1));
