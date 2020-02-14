// 贪心算法练习之找零钱问题

// 对于人民币的面值有1元 5元 10元 20元 50元 100元，
// 下面要求设计一个程序，输入找零的钱，输出找钱方案中最少张数的方案，
// 比如123元，最少是1张100的，1张20的，3张1元的，一共5张！

const giveChange=(money,count,k)=>{
    let map=new Map(),sum=0,i=0,res=0;
    for(let i=0;i<money.length;i++){
        map.set(money[i],count[i]);
        sum+=money[i]*count[i];
    }
    // 如果售货员拥有的零钱数目根本达不到找零需要的钱
    if(sum<k) return null;
    money.sort((a,b)=>b-a);
    while(i<money.length){
        if(k>=money[i]){
            let n=Math.floor(k/money[i]);
            // 如果只用最大面额
            if(n>=map.get(money[i])){
                n=map.get(money[i]);
            }
            k-=n*money[i];
            res+=n;
            console.info(`use ${n} ${money[i]}`);
        }
        i++;
    }
    return res;
};
console.info(giveChange([10,20,50,100,1],[2,0,1,1,5],123));