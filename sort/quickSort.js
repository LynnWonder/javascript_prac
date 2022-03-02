// 快速排序
// 选择一个基准，遍历当前数组，比他大的放右边，小的放左边
// 之后递归

function quickSort(ll){
    if(ll.length<=1){
        return ll
    }
    let pivotIdx = Math.floor(ll.length/2)
    let pivot = ll[pivotIdx]
    ll.splice(pivotIdx,1)
    let left=[], right=[]
    for(let i=0;i<ll.length;i++){
        if(ll[i]<pivot){
            left.push(ll[i])
        } else {
            right.push(ll[i])
        }
    }
    return quickSort(left).concat([pivot]).concat(quickSort(right))
}

console.info(quickSort([7,4,6,5,1,3,6]))