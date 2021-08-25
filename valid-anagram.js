// 有效的字母异位词 leetcode-242
// 时间复杂度取决于sort函数
// 空间复杂度为:O(1)
const isAnagram = (s, t)=>{
    s=s.split('').sort().join('');
    t=t.split('').sort().join('');
    // console.info(s,t);
    return s===t;
};
console.info(isAnagram("anagram","nagaram"));
console.info(isAnagram("rat","car"));