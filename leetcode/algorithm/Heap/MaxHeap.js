// 创建堆类

// 首先看一下如何创建一棵二叉树
function Node(val){
    this.val=val;
    this.left=null;
    this.right=null;
}
function buildTree(idx,arr){
    if(idx>arr.length-1){
        return null;
    }
    let node=new Node(arr[idx]);
    let left=idx*2+1;
    let right=idx*2+2;
    node.left=buildTree(left,arr);
    node.right=buildTree(right,arr);
    return node;
}

// console.info(buildTree(0,[1,2,3,4]));
/**
 * 大根堆构建
 * @constructor
 */
function MaxHeap() {
    this.data = [];
    this.print = print;
    this.build =build;
    this.insert = insert;
    this.deleting = deleting;
    this.heapSort=heapSort;
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
function insert(val){
    this.data.push(val);
    var idx=this.data.length-1;
    var fatherIdx=Math.floor((idx-1)/2);
    // 构建大根堆的过程：寻找父节点，如果比父节点大就交换，一直到根节点为止
    while(fatherIdx>=0){
        if(this.data[idx]>this.data[fatherIdx]){
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
            select=(this.data[left]<this.data[right])?right:left;
        }
        // console.info('===<',this.data[idx],this.data[select]);
        if(select<this.data.length&&this.data[idx]<this.data[select]){
            var temp=this.data[idx];
            this.data[idx]=this.data[select];
            this.data[select]=temp;
        }
        idx=select;
    }
    return val;
}

/**
 * 堆排序
 */
function heapSort(){
    let res=[];
    // 我们首先应该已经建立好大根堆
    while(this.data.length>0){
        res.unshift(this.deleting());
    }
    return res;
}
function print(){
    console.info(this.data);
}
export  default  MaxHeap;
// var h=new MaxHeap();
// // h.build([7,3,5,4,2,4,3]);
// // h.insert(6);
// // h.deleting();
// // h.print();
// h.build([1,2,1]);
// h.print();
// // console.info(h.deleting());
// h.print();
// // console.info(h.heapSort());