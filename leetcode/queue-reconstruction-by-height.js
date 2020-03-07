// 根据身高重建队列 leetcode-406
// 假设有打乱顺序的一群人站成一个队列。
// 每个人由一个整数对(h, k)表示，
// 其中h是这个人的身高，k是排在这个人前面且身高大于或等于h的人数。 编写一个算法来重建这个队列。
// 输入:
// [[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]
// 输出:
// [[5,0], [7,0], [5,2], [6,1], [4,4], [7,1]]
/**
 * 参考了题解后发现真的是十分巧妙的一个题啊
 * 总是先安排身高高的人，同身高的人将其安排到和k值一样的索引处即可。
 * 时间复杂度取决于排序算法
 * 空间复杂度:O(N)
 * @param {number[][]} people
 * @return {number[][]}
 */
const reconstructQueue = (people)=>{
    people.sort((a,b)=>{
        // 首先按照身高h降序排列，同时如果身高相同那么按照k增序
        return a[0]===b[0]?a[1]-b[1]:b[0]-a[0];
    });
    // console.info(people);
    let res=[];
    for(let i=0;i<people.length;i++){
        res.splice(people[i][1],0,people[i]);
    }
    // console.info(res);
    return res;
};
console.info(reconstructQueue([[7,0], [4,4], [7,1], [5,0], [6,1], [5,2]]));