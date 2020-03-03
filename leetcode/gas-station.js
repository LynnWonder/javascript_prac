// 加油站 leetcode-134
// 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。你从其中的一个加油站出发，开始时油箱为空。
// 如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。
// 输入:
// gas  = [1,2,3,4,5]
// cost = [3,4,5,1,2]
// 输出: 3
// 这个题能想到的就是可以每一个都遍历一遍
/**
 * 时间复杂度:O(n2)
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
const canCompleteCircuit = (gas, cost)=>{
    let flag=false;
    for(let i=0;i<gas.length;i++){
        let left=gas[i];
        for(let j=i+1;j<=cost.length+i;j++){
            // console.info('left==>',left);
            let temp=j%(cost.length);
            left=left-cost[temp-1<0?cost.length-1:temp-1];
            if(left<0){
                flag=false;
                break;
            }else{
                flag=true;
            }
            left+=gas[temp];
        }
        if(flag){
            return i;
        }
    }
    return -1;
};

const canCompleteCircuit1=(gas,cost)=>{
    let n=gas.length;
    let total_tank=0,cur_tank=0;
    let starting_station=0;
    for(let i=0;i<n;i++){
        total_tank+=gas[i]-cost[i];
        cur_tank+=gas[i]-cost[i];
        if(cur_tank<0){
            starting_station=i+1;
            cur_tank=0;
        }
    }
    return total_tank>=0?starting_station:-1;

};

console.info(canCompleteCircuit([1,2,3,4,5],[3,4,5,1,2]));
console.info(canCompleteCircuit1([1,2,3,4,5],[3,4,5,1,2]));
console.info(canCompleteCircuit([3,3,4],[3,4,4]));
console.info(canCompleteCircuit1([3,3,4],[3,4,4]));