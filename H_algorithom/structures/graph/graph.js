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
let g=new Graph(6);
g.addEdge(0,1);
g.addEdge(0,4);
g.addEdge(1,2);
g.addEdge(2,3);
g.addEdge(4,5);
g.addEdge(5,3);
console.info(g.adj);
console.info(DFSearch(g,0));
console.info(BFSearch(g,0));
export default {
    Graph,
    DFSearch,
    BFSearch,
    findMinPath
};