/**
 * 一个网站域名，如"discuss.leetcode.com"，包含了多个子域名。作为顶级域名，常用的有"com"，下一级则有"leetcode.com"，最低的一级为"discuss.leetcode.com"。当我们访问域名"discuss.leetcode.com"时，也同时访问了其父域名"leetcode.com"以及顶级域名 "com"。
 给定一个带访问次数和域名的组合，要求分别计算每个域名被访问的次数。其格式为访问次数+空格+地址，例如："9001 discuss.leetcode.com"。
 接下来会给出一组访问次数和域名组合的列表cpdomains 。要求解析出所有域名的访问次数，输出格式和输入格式相同，不限定先后顺序。
 输入:
 ["9001 discuss.leetcode.com"]
 输出:
 ["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
 时间复杂度：0(n)
 空间复杂度：0(n)
 * @param cpdomains
 */
export const subdomainVisits = cpdomains=>{
    let obj={},res=[];
    cpdomains.forEach(item=>{
        // 拆分为['9001 discuss','leetcode','com']
        let temp0=item.split('.');
        let temp1=temp0[0].split(' ');
        temp0[0]=temp1[1];
        let num=Number(temp1[0]);
        for(let i=0;i<temp0.length;i++){
            if(obj[temp0.slice(i).join('.')]){
                obj[temp0.slice(i).join('.')]+=num;
            }else{
                obj[temp0.slice(i).join('.')]=num;
            }
        }
    });
    // console.info(obj);
    Object.keys(obj).forEach(key=>{
        res.push(`${obj[key]} ${key}`);
    });
    console.info('res===>',res);
    return res;
};
subdomainVisits(["9001 discuss.leetcode.com"]);
subdomainVisits(["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]);
/**
 * 下面用map来实现，思路不变
 */
export const subdomainVisits1 = cpdomains=>{
    let map=new Map();
    cpdomains.forEach(item=>{
        // 拆分为['9001 discuss','leetcode','com']
        let temp0=item.split('.');
        let temp1=temp0[0].split(' ');
        temp0[0]=temp1[1];
        let num=Number(temp1[0]);
        for(let i=0;i<temp0.length;i++){
            if(map.has(temp0.slice(i).join('.'))){
                map.set(temp0.slice(i).join('.'),map.get(temp0.slice(i).join('.'))+num);
            }else{
                map.set(temp0.slice(i).join('.'),num);
            }
        }
    });
    console.info(map);
    return [...map].map(item=>item.reverse().join(' '));
};
console.info(subdomainVisits1(["9001 discuss.leetcode.com"]));
console.info(subdomainVisits1(["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]));