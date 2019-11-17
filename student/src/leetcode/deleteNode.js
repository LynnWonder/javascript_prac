/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */

// @TODO： 设计一个基于对象的链表
export class ListNode {
  constructor (val) {
    this.val = val
    this.next = null
  }
}

export const deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}
