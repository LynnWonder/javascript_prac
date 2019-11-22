class Solution {
     public ListNode insertionSortList(ListNode head) {
        ListNode res = null;
        ListNode p = head;
        while(p != null) {
            ListNode next = p.next;
            res = insert(res, p);
            p = next;
        }

        return res;
     }

     private ListNode insert(ListNode head, ListNode node) {
        if(head == null || head.val > node.val) {
            node.next = head;
            return node;
        }

        head.next = insert(head.next, node);
        return head;
     }
}