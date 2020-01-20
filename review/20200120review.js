// 为运算表达式设计优先级
// 私以为这个题的重点之一是能够囊括各种情况，解决方法是通过分治法
// 重点之二在于优化，考察是否有重复区间计算
/**
 * optimize: 暂存每次遍历获得的数值
 * @param input
 * @returns {[*]|[]}
 */
const diffWaysToCompute=input=>{
    let inputArr=[],symbol={'+':true,'-':true,'*':true},st=-1,map=new Map();
    for(let i=0;i<input.length;i++){
        if (symbol[input[i]]){
            inputArr.push(input.slice(st+1,i));
            inputArr.push(input[i]);
            st=i;
        }
    }
    inputArr.push(input.slice(st+1));
    // console.info(inputArr);
    const diffCompute=(arr,st,ed)=>{
        let res=[];
        if (ed-st===1&&!symbol[arr[st]]){
            return [Number(arr[st])];
        }else{
            for(let i=st;i<ed;i++){
                if (symbol[arr[i]]){
                    let left=map.get(`${st}-${i}`)||diffCompute(arr,st,i);
                    let right=map.get(`${i+1}-${ed}`)||diffCompute(arr,i+1,ed);
                    for(let j=0;j<left.length;j++){
                        for(let k=0;k<right.length;k++){
                            if(arr[i]==='+'){
                                res.push(left[j]+right[k]);
                            }else if(arr[i]==='-'){
                                res.push(left[j]-right[k]);
                            }else{
                                res.push(left[j]*right[k]);
                            }
                        }
                    }
                }
                map.set(`${st}-${ed}`,res);
            }
        }
        console.info('map===>',map);
        return res;
    };
    return diffCompute(inputArr,0,inputArr.length);
};

// console.info(diffWaysToCompute('2-1-1-1-1'));
// console.info(diffWaysToCompute('2-1-1'));
console.info(diffWaysToCompute("2*3-4*5"));
// console.info(diffWaysToCompute("15-7*6+24"));