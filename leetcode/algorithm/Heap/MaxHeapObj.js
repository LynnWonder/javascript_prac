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
function build(arr,key){
    for(var i=0;i<arr.length;i++) {
        this.insert(arr[i],key);
    }
}

/**
 * 向堆数据结构中加入一个元素，并且保持这个数据结构不变
 * 时间复杂度:O(logn)
 * @param val
 */
function insert(val,key){
    this.data.push(val);
    var idx=this.data.length-1;
    var fatherIdx=Math.floor((idx-1)/2);
    // 构建大根堆的过程：寻找父节点，如果比父节点大就交换，一直到根节点为止
    while(fatherIdx>=0){
        if(this.data[idx][key]>this.data[fatherIdx][key]){
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
function deleting(key){
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
            select=(this.data[left][key]<this.data[right][key])?right:left;
        }
        // console.info('===<',this.data[idx],this.data[select]);
        if(select<this.data.length&&this.data[idx][key]<this.data[select][key]){
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

export default MaxHeap;