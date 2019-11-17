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

// 设计一个基于对象的链表
class Node {
  constructor (val) {
    this.val = val
    this.next = null
  }
}

export class LikedList {
  constructor () {
    this.head = new Node('head')
  }

  find (item) {
    let currnetNode = this.head
    while (currnetNode.element !== item) {
      currnetNode = currnetNode.next
    }
    return currnetNode
  }

  insert (newElement, item) {
    const newNode = new Node(newElement)
    const current = this.find(item)
    newNode.next = current.next
    current.next = newNode
  }

  display () {
    let currnetNode = this.head
    while (!(currnetNode.next !== null)) {
      currnetNode = currnetNode.next
    }
  }

  findPrevious (item) {
    let currentNode = this.head
    while (!(currentNode.next === null) && currentNode.next.element !== item) {
      currentNode = currentNode.next
    }
    return currentNode
  }

  remove (item) {
    const prevNode = this.findPrevious(item)
    if (prevNode.next !== null) {
      prevNode.next = prevNode.next.next
    }
  }
}

export const deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
}
