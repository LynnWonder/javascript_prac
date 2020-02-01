// 小根堆构建
function MinHeap(){
    this.data=[];
    this.build=build;
    this.insert=insert;
    this.deleting=deleting;
    this.print=print;
    this.heapSort=heapSort;
}
function insert(val){
    this.data.push(val);
    let idx=this.data.length-1;
    let fatherIdx=Math.floor((idx+1)/2)-1;
    // 注意核查的是父节点的索引值
    while(fatherIdx>=0){
        if(this.data[fatherIdx]>this.data[idx]){
            let temp=this.data[idx];
            this.data[idx]=this.data[fatherIdx];
            this.data[fatherIdx]=temp;
        }
        idx=fatherIdx;
        fatherIdx=Math.floor((idx+1)/2)-1;
    }
}
function deleting(){
    let val=this.data[0];
    if(this.data.length===1){
        return this.data.pop();
    }
    this.data[0]=this.data.pop();
    // 重构最小堆
    let idx=0,len=this.data.length;
    while(idx<len){
        let left=idx*2+1,right=idx*2+2;
        let select=left;
        if(right<len){
            select=(this.data[left]>this.data[right])?right:left;
        }
        if (select<len&&this.data[select]<this.data[idx]){
            let temp=this.data[idx];
            this.data[idx]=this.data[select];
            this.data[select]=temp;
        }
        idx=select;
    }
    return val;
}
function build(arr){
    for(let i=0;i<arr.length;i++){
        this.insert(arr[i]);
    }
}
function heapSort(){
    let res=[];
    while(this.data.length>0){
        res.push(this.deleting());
    }
    return res;
}
function print(){
    console.info('data==>',this.data);
}
export default MinHeap;
// var h=new MinHeap();
// h.build([1,5,6,4,3,2]);
// h.deleting();
// h.print();
// console.info(h.heapSort());
