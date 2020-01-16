// Hanoi汉诺塔问题
/**
 * T(n)=2T(n-1)+O(1)
 * 时间复杂度:O(2^n)
 */
const move=(n,x,y)=>{
    console.info(`take ${n} move from ${x} to ${y}`);
};

const hanoi=(n,A,B,C)=>{
    if(n===1){
        move(n,A,C);
    }else{
        hanoi(n-1,A,C,B);
        move(n,A,C);
        hanoi(n-1,B,A,C);
    }
};
// hanoi(3,'A','B','C');
hanoi(4,'A','B','C');