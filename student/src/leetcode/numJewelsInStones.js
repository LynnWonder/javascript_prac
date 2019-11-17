/* 给定字符串J代表石头中宝石的类型，和字符串
S代表你拥有的石头。S中每个字符代表了一种你拥有的石头的类型，你想知道你拥有的石头中有多少是宝石。

J中的字母不重复J和S中的所有字符都是字母。字母区分大小写，因此"a"和"A"是不同类型的石头。

示例 1:

输入: J = "aA", S = "aAAbbbb"
输出: 3
示例 2:

输入: J = "z", S = "ZZ"
输出: 0
注意:

S和J最多含有50个字母。
J中的字符不重复。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/jewels-and-stones
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

export const numJewelsInStones = (J, S) => {
  let count = 0
  for (let i = 0; i < S.length; i++) {
    if (J.includes(S[i])) {
      count += 1
    }
  }
  return count
}
