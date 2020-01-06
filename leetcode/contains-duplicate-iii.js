// 存在重复元素 III leetcode-220
/**
 * 给定一个整数数组，判断数组中是否有两个不同的索引 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值最大为 t，并且 i 和 j 之间的差的绝对值最大为 ķ。
 * 输入: nums = [1,2,3,1], k = 3, t = 0
 * 输出: true
 */
/**
 * 暴力法：
 * 时间复杂度：O(nmin(k,n))
 * 空间复杂度：O(1)
 * @param nums
 * @param k
 * @param t
 * @returns {boolean}
 */
const containsNearbyAlmostDuplicate = (nums, k, t)=>{
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<=Math.min(i+k,nums.length);j++ ){
            if(Math.abs(nums[i]-nums[j])<=t){
                return true;
            }
        }
    }
    return false;
};

const getId=(x,w)=>{
    return Math.floor(x/w);
};
/**
 * 和桶排序的不同之处在于每次我们的桶里只需要包含最多一个元素就可以了，
 * 因为如果任意一个桶中包含了两个元素，那么这也就是意味着这两个元素是 足够接近的 了，这时候我们就直接得到答案了。
 * 因此，我们只需使用一个标签为桶序号的散列表就可以了。
 * 时间复杂度：O(n)
 * 对于这 n 个元素中的任意一个元素来说，我们最多只需要在散列表中做三次 搜索，一次 插入 和一次 删除。这些操作是常量时间复杂度的。因此，整个算法的时间复杂度为 O(n)。
 * 空间复杂度：O(min(n,k))
 * 需要开辟的额外空间取决了散列表的大小，其大小跟它所包含的元素数量成线性关系。散列表的大小的上限同时由 n 和 k决定。因此，空间复杂度为 O(min(n,k))。
 * @param nums
 * @param k
 * @param t
 * @returns {boolean}
 */
const containsNearbyAlmostDuplicate1=(nums,k,t)=>{
    if(t<0) return false;
    let d=new Map();
    // 包含了对t===0的情况的处理
    let w=t+1;
    for(let i=0;i<nums.length;i++){
        let m=getId(nums[i],w);
        if(d.has(m)) return true;
        if(d.has(m-1)&&Math.abs(nums[i]-d.get(m-1))<w){
            return true;
        }
        if(d.has(m+1)&&Math.abs(nums[i]-d.get(m+1))<w){
            return true;
        }
        d.set(m,nums[i]);
        if(i>=k) d.delete(getId(nums[i-k],w));
    }
    return false;
};
console.info(containsNearbyAlmostDuplicate1([1,2,3,1],3,0));
// console.info(Math.floor(-3/5));
// console.info(containsNearbyAlmostDuplicate([1,5,9,1,5,9],2,3));
// console.info(containsNearbyAlmostDuplicate1([-1,2147483647],1,2147483647));
// console.info(containsNearbyAlmostDuplicate([2,2],3,0));