// 快速排序
// 选择一个基准，遍历当前数组，比他大的放右边，小的放左边
// 之后递归

function quickSort0(ll){
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
    return quickSort0(left).concat([pivot]).concat(quickSort0(right))
}

// 你以为的排序算法就是上面这样简单了吗
// 排序算法还有一个精髓就是就地排序
// 就地排序的精髓就是不停的右移一个指针，一直到找到当前数组中没有比基准更小的值了

function quickSort (arr, low, high){
    if(low>=high){
        return arr
    }
    function partition(arr, low, high){
        const pivot = arr[high]
        let j = low-1
        for(let i=low;i<high;i++){
            if (arr[i]<=pivot){
                j++
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
        [arr[j+1], arr[high]] = [arr[high], arr[j+1]]
        return j+1
    }
    pivot = partition(arr, low, high)
    quickSort(arr,low, pivot-1)
    quickSort(arr,pivot+1, high)
    return arr
}


function quickSort1(arr, low, high) {
    if (low >= high) {
        return arr
    }

    function partition(arr, low, high) {
        let pivot_idx = Math.floor((high + low) / 2)
        let pivot = arr[pivot_idx]
        let j = low - 1
        for (let i = low; i < high; i++) {
            if (arr[i] <= pivot && i !== pivot_idx) {
                j++
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
        // console.info('======>arr', arr)
        [arr[j + 1], arr[pivot_idx]] = [arr[pivot_idx], arr[j + 1]]
        return j + 1
    }

    let pivotx = partition(arr, low, high)
    console.info(arr, pivotx)
    quickSort1(arr, low, pivotx - 1)
    quickSort1(arr, pivotx + 1, high)
    return arr
}

// console.info(quickSort([7,4,6,5,1,3,6], 0, 6))
console.info(quickSort([7,4,6,3,1,5,6], 0, 6))
console.info(quickSort([7,6,5,4,3,2,1], 0, 6))