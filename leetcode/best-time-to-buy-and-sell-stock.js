// 买卖股票的最佳时机-leetcode-121
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 如果你最多只允许完成一笔交易（即买入和卖出一支股票），
// 设计一个算法来计算你所能获取的最大利润。
// 注意你不能在买入股票前卖出股票。


/**
 * @param {number[]} prices
 * @return {number}
 * 只允许完成一笔交易,因此遍历一遍找出最大差值和最小值
 */
const maxProfit=arr=>{
    let max=0,min=arr[0];
    for(let i=1;i<arr.length;i++){
        if(arr[i]>arr[i-1]){
            max=Math.max(max,arr[i]-min);
        }else{
            min=Math.min(min,arr[i])
        }
    }
    return max;
};
console.info(maxProfit([7,1,5,3,6,4]));
console.info(maxProfit([7,6,4,3,1]));