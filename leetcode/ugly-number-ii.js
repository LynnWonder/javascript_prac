// 丑数 II leetcode-264

/**
 * 利用dp
 * 状态转移方程：F(n)=min(arr[1]*arr[i],arr[2]*arr[j],arr[4]*arr[k]);
 * 最优子结构：min(arr[1]*arr[i],arr[2]*arr[j],arr[4]*arr[k]), i,j,k递增
 * 易错点：判断arr[t]是哪一个值时不要用if else，如果比如遇到2*6===3*4的情况时可以让i,j一块跳
 * @param {number} n
 * @return {number}
 */
const nthUglyNumber = n=> {
    let arr=[1,2,3,4,5],t=5,i=2,j=2,k=4;
    if(n<=5){
        return arr[n-1];
    }
    while(t<=n-1){
        arr[t]=Math.min(arr[1]*arr[i],arr[2]*arr[j],arr[4]*arr[k]);
        if(arr[t]===arr[1]*arr[i]){
            i++;
        }
        if(arr[t]===arr[2]*arr[j]){
            j++;
        }
        if(arr[t]===arr[4]*arr[k]){
            k++;
        }
        t++;
    }
    console.info('arr==>',arr);
    return arr[n-1];
};
// console.info(nthUglyNumber(10));
// console.info(nthUglyNumber(16));
// console.info(nthUglyNumber(17));
// console.info(nthUglyNumber(18));
console.info(nthUglyNumber(37));

