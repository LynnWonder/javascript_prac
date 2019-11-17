import { depthSum } from '../../src/leetcode/depthSum'

test('test depthSum1', () => {
  expect(depthSum([[1, 1], 2, [1, 1]])).toBe(10)
})

test('test depthSum2', () => {
  expect(depthSum([1, [4, [6]]])).toBe(27)
})
