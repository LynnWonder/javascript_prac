/* 在一个「平衡字符串」中，'L' 和 'R' 字符的数量是相同的。

给出一个平衡字符串s，请你将它分割成尽可能多的平衡字符串。

返回可以通过分割得到的平衡字符串的最大数量。

示例 1：

输入：s = "RLRRLLRLRL"
输出：4
解释：s 可以分割为 "RL", "RRLL", "RL", "RL", 每个子字符串中都包含相同数量的 'L' 和 'R'。
示例 2：

输入：s = "RLLLLRRRLR"
输出：3
解释：s 可以分割为 "RL", "LLLRRR", "LR", 每个子字符串中都包含相同数量的 'L' 和 'R'。
示例 3：

输入：s = "LLLLRRRR"
输出：1
解释：s 只能保持原样 "LLLLRRRR".

提示：

1 <= s.length <= 1000
s[i] = 'L' 或 'R'

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/split-a-string-in-balanced-strings
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。 */

export const balancedStringSplit = (str) => {
  let count = 0

  const loop = (s) => {
    if (s.length < 2) {
      return
    }

    for (let i = 0; i < s.length - 1; i++) {
      for (let j = s.length; j > i; j--) {
        const currentCutString = s.slice(i, j)
        if (isBalancedString(currentCutString)) {
          count += 1
          const sliceIndex = s.indexOf(currentCutString)
          // console.log(currentCutString)
          return loop(s.slice(currentCutString.length + sliceIndex, s.length))
        }
      }
    }
  }

  loop(str)

  return count
}

function isBalancedString (str) {
  if (str.length % 2 !== 0) {
    return false
  }

  const mid = str.length / 2
  const left = str.slice(0, mid)
  const right = str.slice(mid, str.length)

  for (let i = 0; i < left.length; i++) {
    if (right.includes(left[i])) {
      return false
    }
  }

  return true
}

// balancedStringSplit('RLLLLRRRLR') // 3
// balancedStringSplit('RLRRLLRLRL') // 4
// balancedStringSplit('LLLLRRRR') // 1
// balancedStringSplit('RLRRRLLRLL') // 3
