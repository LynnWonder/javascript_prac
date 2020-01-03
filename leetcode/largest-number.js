// 最大数 -leetcode-179
/**
 * 本题主要考察字符串比较大小：以第一位ascii码进行比较
 * 字符串concat
 * @param nums
 * @returns {string|*}
 */
const largestNumber = (nums)=>{
    nums=nums.map(item=>item.toString());
    console.info(nums);
    // nums.sort((a,b)=>b.concat(a)-a.concat(b));
    nums.sort((a,b)=>b+a-a+b);
    console.info(nums);
    if(nums[0]==='0') return '0';
    // console.info(nums.join(''));
    return nums.join('');
};
// console.info('9'>'34');
console.info('30'>'34');
console.info('9'>'34');
// console.info(largestNumber([10,2]));
// console.info(largestNumber([3,30,34,5,9]));
// console.info(largestNumber([41,23,87,55,50,53,18,9]));
// console.info('10'<'2');