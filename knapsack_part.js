// 部分背包问题的解决非常像找零钱的套路，找零钱的贪心目的是用最小的张数表达最大的面额
// 而部分背包问题则可以用最大的价值同时不超重，因此我们的贪心攻略是总是选择性价比高的，然后往后推
/**
 * 按性价比排序
 * @param w
 * @param v
 */
const sort=(w,v)=>{
    let temp=[];
    for(let i=0;i<w.length;i++){
        temp[i]=w[i]===0?0:v[i]/w[i];
    }
    for(let i=temp.length-1;i>=0;i--){
        for(let j=0;j<=i;j++){
            if(temp[j]<temp[j+1]){
                let temp0=temp[j];
                temp[j]=temp[j+1];
                temp[j+1]=temp0;


                let temp1=v[j];
                v[j]=v[j+1];
                v[j+1]=temp1;


                let temp2=w[j];
                w[j]=w[j+1];
                w[j+1]=temp2;

            }
        }
    }
};
const knapsackPart=(w,v,c)=>{
    let res=0,left=c,cn=new Map();
    sort(w,v);
    for(let i=0;i<v.length;i++){
        if (left <= 0) break;
        let temp0 = left / w[i];
        if (temp0 <= 1) {
            cn.set(w[i], temp0);
            left = left - temp0 * w[i];
            res += temp0 * v[i];
        } else {
            cn.set(w[i], 1);
            left -= w[i];
            res += v[i];
        }
    }
    console.info(cn);
    return res;
};
console.info(knapsackPart([17, 30, 25, 41, 80, 70, 64, 56, 47, 38],
    [50, 60, 70, 80, 90, 80, 70, 60, 50, 40],
    120));
console.info(knapsackPart([0, 10, 20, 30],[0, 60, 100, 120],50));
// console.info(sort([17, 30, 25, 41, 80, 70, 64, 56, 47, 38],
//     [50, 60, 70, 80, 90, 80, 70, 60, 50, 40]));