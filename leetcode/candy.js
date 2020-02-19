// 分发糖果-leetcode-135
// 老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。
// 你需要按照以下要求，帮助老师给这些孩子分发糖果：
// 每个孩子至少分配到 1 个糖果。
// 相邻的孩子中，评分高的孩子必须获得更多的糖果。
// 输入: [1,0,2]
// 输出: 5
// 解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
/**
 * @param {number[]} ratings
 * @return {number}
 * 最初的思路想通过一次遍历的方式获取到结果
 * 但事实上通过去测试会发现对于递增的情况可以处理，但是递减案例就不好处理
 * 而事实上在自行解答测试用例的时候就发现了一种贪心攻略
 */
const candy = (ratings)=>{
    let arr=new Array(ratings.length).fill(1),idx=1,flag=true;
    for(let i=1;i<ratings.length;i++){
        // 防止混淆试听
        if (ratings[i]<ratings[i-1]&&arr[i]>=arr[i-1]){
            arr[i-1]=arr[i]+1;
            if(!flag){
                for(j=1;j<=i;j++){
                    if(ratings[j]<ratings[j-1]&&arr[j]>=arr[j-1]){
                        arr[j-1]=arr[j]+1;
                    }
                }
            }
            flag=false;
        }else if(ratings[i]>ratings[i-1]){
            arr[i]=arr[i-1]+1;
        }
    }
    console.info(arr);
    return arr.reduce((sum,item)=>sum+item,0);
};
const candy1=ratings=>{
    let arr=new Array(ratings.length).fill(1);
    for(let i=1;i<ratings.length;i++){
        if(ratings[i]>ratings[i-1]&&arr[i]<=arr[i-1]){
            arr[i]=arr[i-1]+1;
        }
    }
    for(let i=ratings.length-2;i>=0;i--){
        if(ratings[i+1]<ratings[i]&&arr[i]<=arr[i+1]){
            arr[i]=arr[i+1]+1;
        }
    }
    console.info(arr);
    return  arr.reduce((sum,item)=>sum+item,0);
};
// console.info(candy1([1,0,2]));
// console.info(candy1([1,2,2]));
// console.info(candy1([1,3,2,2,1]));
// console.info(candy1([1,2,87,87,87,2,1]));
// console.info(candy1([1,6,10,8,7,3,2]));
console.info(candy1([1,3,4,5,2]));