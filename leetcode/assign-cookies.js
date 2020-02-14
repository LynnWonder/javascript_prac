// 分发饼干-leetcode-455
// 假设你是一位很棒的家长，想要给你的孩子们一些小饼干。
// 但是，每个孩子最多只能给一块饼干。
// 对每个孩子 i ，都有一个胃口值 gi ，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j ，
// 都有一个尺寸 sj 。如果 sj >= gi ，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。
// 你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。
// 不知道为什么觉得这个题很sick
// 你可以假设胃口值为正。
// 一个小朋友最多只能拥有一块饼干。
// 输入: [1,2,3], [1,1]
// 输出: 1
// 这个题需要用贪心算法吗？
// 显然就是解题思路：
// 给一个孩子的饼干应当尽量小又能满足该孩子，
// 这样大饼干就能拿来给满足度比较大的孩子。
// 因为最小的孩子最容易得到满足，所以先满足最小的孩子。
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
const findContentChildren = (g, s)=>{
    g.sort((a,b)=>a-b);
    s.sort((a,b)=>a-b);
    let i=0,j=0;
    while(i<g.length&&j<s.length){
        if(g[i]<=s[j]){
            i++;
        }
        j++;
    }
    return i;
};
console.info(findContentChildren([1,2,3], [1,1]));
console.info(findContentChildren([1,2], [1,2,3]));