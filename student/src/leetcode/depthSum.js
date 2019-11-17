/* 给定一个嵌套的整数列表，请返回该列表按深度加权后所有整数的总和。

每个元素要么是整数，要么是列表。同时，列表中元素同样也可以是整数或者是另一个列表。

示例 1:

输入: [[1,1],2,[1,1]]
输出: 10
解释: 因为列表中有四个深度为 2 的 1 ，和一个深度为 1 的 2。
示例 2:

输入: [1,[4,[6]]]
输出: 27
解释: 一个深度为 1 的 1，一个深度为 2 的 4，一个深度为 3 的 6。所以，1 + 4*2 + 6*3 = 27。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/nested-list-weight-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

export const depthSum = (nestedList) => {
  let sum = 0

  const loop = (arr, count) => {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        loop(item, count + 1)
      } else {
        sum += item * count
      }
    })
  }

  loop(nestedList, 1)

  return sum
}
