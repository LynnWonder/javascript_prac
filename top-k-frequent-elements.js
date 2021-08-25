// 前 K 个高频元素-leetcode-347
/**
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 * 输入: nums = [1], k = 1
 * 输出: [1]
 * 你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
 * 你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
 * 其实就是对象的排序，可以先不看题目的要求,时间复杂度为O(n2)
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = (nums, k)=>{
    let map=new Map(),nMap=new Map(),res=[];
    for(let i=0;i<nums.length;i++){
        if(map.has(nums[i])){
            map.set(nums[i],map.get(nums[i])+1);
        }else{
            map.set(nums[i],1);
        }
    }
    let temp=[...new Set(map.values())].sort((a,b)=>b-a);
    // console.info(map,temp);
    for(let i=0;i<temp.length;i++){
        for(let [key,val] of map.entries()){
            if(val===temp[i]){
                if(nMap.has(val)){
                    nMap.get(val).push(key);
                    nMap.set(val,nMap.get(val));
                }else{
                    nMap.set(val,[key]);
                }
                // map.delete(key);
            }
        }
    }
    let j=0;
    while(res.length<k&&j<k){
        res=res.concat(nMap.get(temp[j]));
        j++;
    }
    // console.info(temp,nMap);
    return res;
};

function Heap() {
    this.data = [];
    this.build =build;
    this.insert = insert;
    this.deleting = deleting;
}
function build(arr){
    for(var i=0;i<arr.length;i++) {
        this.insert(arr[i]);
    }
}

/**
 * 向堆数据结构中加入一个元素，并且保持这个数据结构不变
 * 时间复杂度:O(logn)
 * @param val
 */
function insert(item){
    this.data.push(item);
    var idx=this.data.length-1;
    var fatherIdx=Math.floor((idx-1)/2);
    // 构建大根堆的过程：寻找父节点，如果比父节点大就交换，一直到根节点为止
    while(fatherIdx>=0){
        if(this.data[idx].val>this.data[fatherIdx].val){
            var temp=this.data[idx];
            this.data[idx]=this.data[fatherIdx];
            this.data[fatherIdx]=temp;
        }
        idx=fatherIdx;
        fatherIdx=Math.floor((idx-1)/2);
    }
}

/**
 * 删除根节点，并且保持堆数据结构不变（维持大根堆）
 * 时间复杂度:O(logn)
 * @returns {*}
 */
function deleting(){
    if(this.data.length===1){
        return this.data.pop();
    }
    var idx=0;
    var val=this.data[idx];
    // 把最后一个元素翻到根节点上，然后开始从根节点向下遍历保证父节点的值总是大于子节点
    this.data[idx]=this.data.pop();
    while(idx<this.data.length){
        var left=2*idx+1;
        var right=2*idx+2;
        var select=left;
        // 首先要查找出左右哪个更大
        if(right<this.data.length){
            select=(this.data[left].val<this.data[right].val)?right:left;
        }
        // console.info('===<',this.data[idx],this.data[select]);
        if(select<this.data.length&&this.data[idx].val<this.data[select].val){
            var temp=this.data[idx];
            this.data[idx]=this.data[select];
            this.data[select]=temp;
        }
        idx=select;
    }
    return val;
}
const topKFrequent1=(nums,k)=>{
    let map=new Map(),res=[];
    for(let i=0;i<nums.length;i++){
        if(map.has(nums[i])){
            map.set(nums[i],map.get(nums[i])+1);
        }else{
            map.set(nums[i],1);
        }
    }
    let h=new Heap();
    for(let [key,val] of map.entries()){
        h.insert({key,val});
    }
    console.info(h.data);
    while(res.length<k){
        res.push(h.deleting().key);
    }
    return res;
};
// console.info(topKFrequent1([1,1,1,2,2,3],2));
// console.info(topKFrequent([1,1,2,2,3,3],1));
// console.info(topKFrequent1([1,2],2));
console.info(topKFrequent1([3,0,1,0],1));