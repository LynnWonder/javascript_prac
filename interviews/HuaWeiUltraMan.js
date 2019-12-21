/**
 * 在一个N*N的正方形区域，每个小格可能有三种状态
 值为0，正常可通过
 值为1，奥特曼可通过，同时还可以消灭怪兽，消灭后值变为0，消灭怪兽数量+1
 值为-1，有大石头，奥特曼无法通过

 奥特曼需要先从上往下走，这个过程只能向下或者向右，到达右下角后，再从下往上走，这个过程只能向左或向上。需要找到奥特曼可以消灭怪兽的最大数量

 输入：
 第一行一个N，表示N的正方形区域的大小，N不超过50
 第二行到N+1行，每一行N个数，表示正方形区域的情况

 输出：
 奥特曼可以消灭怪兽的最大数量
 * @param arr
 * @param num
 * @returns {number}
 */
const findMax=(arr,num)=>{
    let val=0,val0=0,temp=[],temp0=[];
    let dir0=[[1,0],[0,1]],dir1=[[-1,0],[0,-1]];
    const check=(m,n,num)=>{
        return m<num&&m>=0&&n<num&&n>=0;
    };
    const dfs=(st,ed,dir,arr)=>{
        if(st[0]===ed[0]&&st[1]===ed[1]){
            if(val>val0){
                val0=val;
                temp0=JSON.parse(JSON.stringify(temp));
            }
            return;
        }
        for(let i=0;i<dir0.length;i++){
            let x=st[0]+dir[i][0],y=st[1]+dir[i][1];
            if (check(x,y,num)&&arr[x][y]!==-1){
                if (arr[x][y]===0){
                    dfs([x,y],ed,dir,arr);
                }else if(arr[x][y]===1){
                    val+=1;
                    temp.push([x,y]);
                    dfs([x,y],ed,dir,arr);
                    val-=1;
                    temp.pop();
                }
            }
        }
    };
    dfs([0,0],[num-1,num-1],dir0,arr);
    // change arr
    for(let i=0;i<temp0.length;i++){
        arr[temp0[i][0]][temp0[i][1]]=0;
    }
    temp=[];
    let ans=val0;
    val0=0;
    dfs([num-1,num-1],[0,0],dir1,arr);
    ans+=val0;
    return ans;
};
console.info(findMax([
    [0,1,-1],
    [1,0,-1],
    [1,1,1]
],3));