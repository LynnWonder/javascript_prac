// 堆的应用。合并k个有序数组
import Heap from './algorithm/Heap/MinHeapObj';
const mergeK=arr=>{
    let h=new Heap(),res=[],count=0;
    for(let i=0;i<arr.length;i++){
        h.insert({'row':i,'col':0,'val':arr[i][0]},'val');
        count+=arr[i].length;
    }
    while(res.length<count){
        let temp=h.deleting('val');
        res.push(temp.val);
        if(arr[temp.row][temp.col+1]){
            h.insert({'row':temp.row,'col':temp.col+1,'val':arr[temp.row][temp.col+1]});
        }
    }
    return res;
};
console.info(mergeK([
    [1, 3, 5, 7],
    [2, 4, 6],
    [0, 8, 9, 10, 11]]));