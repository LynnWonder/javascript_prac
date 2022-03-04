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

function quickSort1 (arr, low, high){
    if(low>=high){
        return arr
    }
    function partition(arr, low, high){
        // tip 如果我们将 low 作为基准那么一般从右向左进行遍历，为什么不从左向右遍历呢？
        //   因为此时会主动移动基准造成混乱
        const pivot = arr[low]
        let j = high+1
        for(let i=high;i>low;i--){
            if (arr[i]>=pivot){
                j--
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
        [arr[j-1], arr[low]] = [arr[low], arr[j-1]]
        return j-1
    }
    pivot = partition(arr, low, high)
    quickSort1(arr,low, pivot-1)
    quickSort1(arr,pivot+1, high)
    return arr
}

console.info(quickSort0([19, 1, 9, 6, 9, 7, 6, 5, 18, 15, 19, 14, 4, 0, 18, 8, 7, 12, 6, 12]
    , 0, 19))
console.info(quickSort([19, 1, 9, 6, 9, 7, 6, 5, 18, 15, 19, 14, 4, 0, 18, 8, 7, 12, 6, 12]
    , 0, 19))
console.info(quickSort1([19, 1, 9, 6, 9, 7, 6, 5, 18, 15, 19, 14, 4, 0, 18, 8, 7, 12, 6, 12]
    , 0, 19))