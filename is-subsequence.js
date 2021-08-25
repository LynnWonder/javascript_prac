// 判断子序列  leetcode-392
// 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
// 你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），
// 而 s 是个短字符串（长度 <=100）。
// 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。


/**
 * 想法1：既然可以不是连续序列，那么可以通过判断第一个字母的位置
 * 以此类推进行判断
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * 判断s是否为t的子序列
 */
const  isSubsequence = (s, t)=>{
    const helper=(s,t)=>{
        if(s.length<1) return true;
        if(t.length<1) return false;
        let first=t.indexOf(s[0]);
        if(first===-1){
            return false;
        }else{
            return helper(s.slice(1),t.slice(first+1));
        }
    };
    return helper(s,t);
};
console.info(isSubsequence('abc','ahbgdc'));
console.info(isSubsequence('axc','ahbgdc'));