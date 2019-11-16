import { guessNumbers } from '../../src/leetcode/guessNumbers'

test('test guess = [1,2,3], answer = [1,2,3]', () => {
  expect(guessNumbers([1, 2, 3], [1, 2, 3])).toBe(3)
})
test('test guess = [1,2,3], answer = [3,2,3]', () => {
  expect(guessNumbers([1, 2, 3], [3, 2, 3])).toBe(2)
})
