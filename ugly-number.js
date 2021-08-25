// 丑数 leetcode-263

/**
 * 编写一个程序判断给定的数是否为丑数。
 * 丑数就是只包含质因数 2, 3, 5 的正整数。
 * @param num
 */
const isUgly = (num)=>{
    if(num<=0) return false;
    if(num===1) return true;
    let obj={2:true,3:true,5:true};
    const helper=num0=>{
        if(obj[num0]) return true;
        if (num0%2===0){
            return helper(num0/2);
        }else if(num0%3===0){
            return helper(num0/3);
        }else if(num0%5===0){
            return helper(num0/5);
        }else{
            return false;
        }
    };
    return helper(num);
};
console.info(isUgly(10));
console.info(isUgly(6));
console.info(isUgly(8));
console.info(isUgly(14));