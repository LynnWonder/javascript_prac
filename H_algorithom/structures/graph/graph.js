/**
 * 精装版图类以及DFS BFS
 */
function Graph(points){
    this.vertices=points;
    // 存储某个顶点与他连通的点的数组
    this.adj=new Array(points);
    // 初始化
    for(let i=0;i<points;i++){
        this.adj[i]=[];
    }
    this.addEdge=addEdge;
}
function addEdge(v,w){
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.vertices++;
}

/**
 * 深度优先遍历
 * @param graph
 * @param start
 */
function DFSearch(graph,start){
    let map=new Map();
    let res=[];
    function dfs(start){
        if(!graph.adj[start]) return;
        map.set(start,true);
        res.push(start);
        graph.adj[start].forEach(item=>{
            if(!map.has(item)){
                dfs(item);
            }
        });
    }
    dfs(0);
    return res;
}

/**
 * 广度优先遍历，借助队列来完成
 * @param graph
 * @param start
 */
function BFSearch(graph,start){
    let res=[],temp=[],map=new Map();
    temp.push(start);
    while(temp.length>0){
        let tempPoint=temp.shift();
        res.push(tempPoint);
        map.set(tempPoint,true);
        graph.adj[tempPoint].forEach(item=>{
            if(!map.has(item)){
                map.set(item,true);
                temp.push(item);
            }
        })
    }
    return res;
}
/**
 * 求从起始点向终点的
 * @param graph
 * @param st
 * @param ed
 */
function findMinPath(graph,st,ed){
    let temp=[],map=new Map(),res=[];
    temp.push(st);
    while(temp.length>0){
        let tempPoint=temp.shift();
        graph.adj[tempPoint].forEach(item=>{
            if(!map.has(item)){
                map.set(item,tempPoint);
                temp.push(item);
            }
        })
    }
    console.info(map);
    let i=ed;
    while(i!==st){
        res.unshift(i);
        i=map.get(i);
    }
    res.unshift(st);
    return res;
}

/**
 * 检查有向图中是否有环检查是DAG(directed acyclic graph) VS DCG(directed cyclic graph)
 * dfs与标记「正在访问」检查法
 */
const checkDAG=(arr,num)=>{
    let adj=new Array(num),visited=new Array(num).fill(false),
        being_visited=new Array(num).fill(false);
    // initialize
    for(let i=0;i<num;i++){
        adj[i]=[];
    }
    for(let i=0;i<arr.length;i++){
        adj[arr[i][0]].push(arr[i][1]);
    }
    const dfs=(v,being_visited,visited)=>{
        // 如果dfs时当前顶点正在被访问，那么必定有环
        if(being_visited[v]){
            console.info('cycle==>',v);
            return false;
        }
        // 顶点并没有正在被访问，但是访问过了，那么略过
        if(visited[v]) return true;
        being_visited[v]=true;
        visited[v]=true;
        for(let i=0;i<adj[v].length;i++){
            if(!dfs(adj[v][i],being_visited,visited)) return false;
        }
        // 正常退场
        being_visited[v]=false;
        return true;
    };
    // 检查每一个顶点的下个顶点是否有环
    for(let i=0;i<num;i++){
        if(visited[i]) continue;
        if(!dfs(i,being_visited,visited)) return false;
    }
    return true;
};
/**
 * 拓扑排序
 * @param arr
 * @param num
 */
const topoSort=(arr,num)=>{
    let res=[],adj=new Array(num),inDegree=new Array(num).fill(0),temp=[];
    let count=0;
    // initialize
    for(let i=0;i<num;i++){
        adj[i]=[];
    }
    for(let i=0;i<arr.length;i++){
        adj[arr[i][0]].push(arr[i][1]);
        inDegree[arr[i][1]]+=1;
    }
    // collect which inDegree's 0
    for(let i=0;i<num;i++){
        if(inDegree[i]===0){
            temp.push(i);
        }
    }
    while(temp.length>0){
        let top=temp.pop();
        count++;
        res.push(top);
        for(let i=0;i<adj[top].length;i++){
            inDegree[adj[top][i]]-=1;
            if(inDegree[adj[top][i]]===0){
                temp.push(adj[top][i]);
            }
        }
    }
    console.info(res);
    return count===num;
};

const Hierholzer=arr=>{
    let obj={},ans=[];
    for(let i=0;i<arr.length;i++){
        if(!obj[arr[i][0]]){
            obj[arr[i][0]]=[arr[i][1]];
        }else{
            obj[arr[i][0]].push(arr[i][1]);
        }
    }
    const dfs=(start,obj)=>{
        while(obj[start].length>0){
            dfs(obj[start].shift(),obj);
        }
        ans.unshift(start);
    };
    dfs(0,obj);
    // console.info(ans);
    return ans;
};

let g=new Graph(6);
g.addEdge(0,1);
g.addEdge(0,4);
g.addEdge(1,2);
g.addEdge(2,3);
g.addEdge(4,5);
g.addEdge(5,3);
let arr0=[
    [0,1],
    [1,2],
    [2,3],
    [2,1]
];
// // console.info(g.adj);
// console.info(DFSearch(g,0));
// console.info(BFSearch(g,0));
// console.info(checkDAG(arr0,4));
let arr=[[0,1],[1,2],[2,3],[3,0],[0,3]];
console.info(Hierholzer(arr));
console.info(topoSort(arr0,4));
export default {
    Graph,
    DFSearch,
    BFSearch,
    findMinPath,
    checkDAG,
    Hierholzer
};