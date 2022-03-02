// 特点是嵌套循环，每一轮都是比较相邻的两个元素，
// 相当于每次外层循环结束后最大的那个数已经移动到了尾部
// 时间复杂度： O(n^2)
// 空间负责度： O(1)  (额外空间开销出在交换数据时那一个过渡空间)
function bubbleSort(arr){
    for (let i =arr.length;i>1;i--) {
        for(let j = 1; j<i; j++){
            if(arr[j-1]>arr[j]){
                let tmp = arr[j-1]
                arr[j-1] = arr[j]
                arr[j] = tmp
            }
        }
        console.info(`第 ${arr.length-i}次循环====>`, arr)
    }
    return arr
}

console.info(bubbleSort([7,4,6,5,1,3,6]))