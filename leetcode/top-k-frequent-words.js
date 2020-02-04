// 前K个高频单词-leetcode-692
// 给一非空的单词列表，返回前 k 个出现次数最多的单词。
// 返回的答案应该按单词出现频率由高到低排序。
// 如果不同的单词有相同出现频率，按字母顺序排序。
// 注意小根堆，根节点应该是字典序中靠后的且值偏小的
function Heap(){
    this.data=[];
    this.insert=insert;
    this.deleting=deleting;
}
function insert(val,key){
    this.data.push(val);
    let idx=this.data.length-1;
    let fatherIdx=Math.floor((idx-1)/2);
    while(fatherIdx>=0){
        if(this.data[fatherIdx][key]>this.data[idx][key]||((this.data[fatherIdx][key]===this.data[idx][key])&&(this.data[fatherIdx].key<this.data[idx].key))){
            let temp=this.data[idx];
            this.data[idx]=this.data[fatherIdx];
            this.data[fatherIdx]=temp;
        }
        idx=fatherIdx;
        fatherIdx=Math.floor((idx-1)/2);
    }
}
function deleting(key){
    let val=this.data[0];
    if(this.data.length===1){
        this.data.pop();
        return val;
    }
    this.data[0]=this.data.pop();
    let idx=0;
    while(idx<this.data.length){
        let left=idx*2+1;
        let right=idx*2+2;
        let select=left;
        if (right<this.data.length){
            // 寻找最小的
            if(this.data[left][key]>this.data[right][key]){
                select=right;
            }else if(this.data[left][key]===this.data[right][key]){
                select=this.data[left].key<this.data[right].key?right:left;
            }
        }
        if(select<this.data.length){
            if(this.data[select][key]<this.data[idx][key]||((this.data[select][key]===this.data[idx][key])&&(this.data[select].key>this.data[idx].key))) {
                let temp = this.data[idx];
                this.data[idx] = this.data[select];
                this.data[select] = temp;
            }
        }
        idx=select;
    }
    return val;
}
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
const topKFrequent = (words, k)=>{
    let obj={},temp=[],res=[];
    for(let i=0;i<words.length;i++){
        if(obj[words[i]]){
            obj[words[i]]+=1;
        }else{
            obj[words[i]]=1;
        }
    }
    // console.info('obj==>',obj);
    for(let key of Object.keys(obj)){
        temp.push({key,'val':obj[key]});
    }
    // console.info('temp==>',temp);
    let h=new Heap();
    for(let i=0;i<k;i++){
        h.insert(temp[i],'val');
    }
    // console.info('before==>',h.data);
    for(let i=k;i<temp.length;i++){
        if(temp[i].val>h.data[0].val||((temp[i].val===h.data[0].val)&&temp[i].key<h.data[0].key)){
            h.deleting('val');
            h.insert(temp[i],'val');
        }
    }
    console.info('after==>',h.data);
    while(res.length<k){
        res.unshift(h.deleting('val').key);
    }
    return res;
};
const topKFrequent1=(words, k)=>{
    let obj={},temp=[],res=[];
    for(let i=0;i<words.length;i++){
        if(obj[words[i]]){
            obj[words[i]]+=1;
        }else{
            obj[words[i]]=1;
        }
    }
    // console.info('obj==>',obj);
    for(let key of Object.keys(obj)){
        temp.push({key,'val':obj[key]});
    }
    temp.sort((a,b)=>{
        if(a.val===b.val){
            if(a.key===b.key){
                return 0;
            }else if(a.key>b.key){
                return 1;
            }else{
                return -1;
            }
        }else{
            return b.val-a.val;
        }
    });
    while(res.length<k){
        res.push(temp.shift().key);
    }
    return res;
};
// console.info(topKFrequent1(["i", "love", "leetcode", "i", "love", "coding"],2));
// console.info(topKFrequent1(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"],4));
// console.info(topKFrequent(["the", "the", "is", "is"],2));
// console.info(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"],3));
// console.info(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"],1));
console.info(topKFrequent1(["aaa","aa","a"],1));