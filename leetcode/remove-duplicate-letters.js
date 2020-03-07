// 去除重复字母-leetcode-316
// 给你一个仅包含小写字母的字符串，
// 请你去除字符串中重复的字母，
// 使得每个字母只出现一次。
// 需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
// 输入: "bcabc"
// 输出: "abc"
/**
 * 我的一种处理方法如下：
 * 1。要找到字典序靠前的且能囊括所有出现的字母的那个索引位置，
 * 2。进行递归实现对剩下的字母进行检查出最靠前的那个字母
 * 3。重复过程2
 * @param {string} s
 * @return {string}
 */
const removeDuplicateLetters = (s)=>{
    const helper=s=>{
        if(s.length===1) return [s];
        if(s.length===0) return [];
        let s0=s.split('');
        s=s.split('');
        s0=[...new Set(s0.sort())];
        let min=0,flag=true;
        for(let i=0;i<s0.length-1;i++){
            flag=true;
            let idx=s.indexOf(s0[i]);
            // console.info('===>',idx,s0[i],s.slice(idx));
            for(let j=0;j<s0.length;j++){
                if(s.slice(idx).indexOf(s0[j])===-1){
                    flag=false;
                    break;
                }
            }
            if(flag){
                min=idx;
                break;
            }
        }
        // console.info(min,flag);
        if(!flag) min=s.indexOf(s0[s0.length-1]);
        let temp=s[min];
        s=s.slice(min+1);
        for(let i=0;i<s.length;i++){
            if(s[i]===temp){
                s.splice(i,1);
                i--;
            }
        }
        // console.info(temp,s,s0);
        return [temp].concat(helper(s.join('')));
    };
    return helper(s).join('');

};
/**
 * 参考[https://leetcode-cn.com/problems/remove-duplicate-letters/solution/c-0ms-ji-bai-100jian-ming-dai-ma-chao-xiang-xi-jie/]
 * 利用栈以及判断栈顶元素和当前元素进行对比（对比大小并且对比当前元素之后是否还有栈顶元素）
 * @param s
 * @returns {string}
 */
const removeDuplicateLetters1=s=>{
    let stk=[];
    for(let i=0;i<s.length;i++){
        if(stk.findIndex(item=>item===s[i])!==-1) continue;
        // 栈顶元素比当前元素大且s从当前位置往后还有这个元素
        while(stk.length>0&&stk[stk.length-1]>s[i]&&s.slice(i).indexOf(stk[stk.length-1])!==-1){
            stk.pop();
        }
        stk.push(s[i]);
    }
    return stk.join('');
};
let arr=[1,2,3];
// console.info(arr.findIndex(item=>item===1));
console.info(removeDuplicateLetters("bcabc"));
console.info(removeDuplicateLetters1("bcabc"));
console.info(removeDuplicateLetters("cbacdcbc"));
console.info(removeDuplicateLetters1("cbacdcbc"));
// console.info(removeDuplicateLetters("cbbbcaa"));
// console.info(removeDuplicateLetters("bbcaac"));