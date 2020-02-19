// 买卖股票的最佳时机 II leetcode-122
// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。
// 你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = (prices)=>{
    let res=0;
    for(let i=0;i<prices.length;i++){
        if(prices[i]>prices[i-1]){
            res+=prices[i]-prices[i-1];
        }
    }
    return res;
};
console.info(maxProfit([7,1,5,3,6,4]));
console.info(maxProfit([1,2,3,4,5]));
console.info(maxProfit([7,6,4,3,1]));
