// 买卖股票的最佳时机含手续费  leetcode-714
// 给定一个整数数组 prices，其中第 i 个元素代表了第 i 天的股票价格 ；非负整数 fee 代表了交易股票的手续费用。
// 你可以无限次地完成交易，但是你每次交易都需要付手续费。
// 如果你已经购买了一个股票，在卖出它之前你就不能再继续购买股票了。
// 返回获得利润的最大值。
// 输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
// 输出: 8
/** 翻译一下这个题就是买入后必须卖出，且交易几次都需要交上手续费
 * 参考官方题解可以看到：
 * cash表示当我们不持有股票时的最大利润
 * hold表示我们持有股票时的最大利润
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
const maxProfit =(prices, fee)=>{
    let cash=0,hold=-prices[0];
    for(let i=1;i<prices.length;i++){
        cash = Math.max(cash, hold + prices[i] - fee);
        hold = Math.max(hold, cash - prices[i]);
    }
    return cash;
};