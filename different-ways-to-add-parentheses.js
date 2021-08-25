// 为运算表达式设计优先级 leetcode-241

/**
 * 给定一个含有数字和运算符的字符串，为表达式添加括号，改变其运算优先级以求出不同的结果。
 * 你需要给出所有可能的组合的结果。有效的运算符号包含 +, - 以及 * 。
 * 首先一开始解这道题的思路是通过遍历整个字符串，每三个数字两个运算符为一组，最后实现拼接，
 * 但出现一个bug就是当出现四个数字三个运算符的时候没办法囊括所有的情况，然后尝试以其为分组，其实仍然是同样的问题
 * @param {string} input
 * @return {number[]}
 */
const handle=arr=>{
    // handle 5 arr
    let res=[];
    res.push(eval(`(${arr.slice(0,3).join('')})${arr.slice(3).join('')}`));
    res.push(eval(`${arr.slice(0,2).join('')}(${arr.slice(2).join('')})`));
    // console.info('===>',arr,res);
    return res;
};
const handle1=arr=>{
    // console.info('arr===>',arr);
    let res=[];
    for(let i=0;i<arr.length-4;i=i+2) {
        for(let j=0;j<2;j++){
            let str0=`${arr.slice(0,i).join('')}${handle(arr.slice(i,i+5))[j]}${arr.slice(i+5).join('')}`;
            str0=str0.replace('--','+');
            // console.info(str0);
            res.push(eval(str0));
        }
    }
    // console.info(eval(`(${arr.slice(0,3).join('')})${arr[3]}(${arr.slice(4).join('')})`));
    res.push(eval(`(${arr.slice(0,3).join('')})${arr[3]}(${arr.slice(4).join('')})`));
    // console.info('===>',arr,res);
    return res;
};
const diffWaysToCompute = input=>{
    let obj={'+':true,'-':true,'*':true,'/':true},temp=-1,inputArr=[];
    for(let i=0;i<input.length;i++){
        if(obj[input[i]]){
            inputArr.push(input.slice(temp+1,i));
            inputArr.push(input[i]);
            temp=i;
        }
    }
    inputArr.push(input.slice(temp+1));
    console.info(inputArr);
    let res=[];
    if(inputArr.length<5){
        return [eval(input)];
    }else if(inputArr.length===5){
        return handle(inputArr);
    }else if(inputArr.length===7){
        return handle1(inputArr);
    }else{
        for(let i=0;i<inputArr.length-6;i=i+2){
            let tempArr=handle1(inputArr.slice(i,i+7));
            for(let j=0;j<tempArr.length;j++){
                let str0=`${inputArr.slice(0,i).join('')}${tempArr[j]}${inputArr.slice(i+7).join('')}`;
                str0=str0.replace('--','+');
                res.push(eval(str0));
            }
        }
    }
    return res;
};


/**
 * 原问题满足可以将其分解成多个子问题，最后合并的特征，并且各个子问题绝对独立
 * 尝试采用分治法来解决问题：
 * 如何分解？
 * 如何解决？
 * 如何合并？
 * @param input
 */
const diffWaysToCompute1=input=>{
    // 转变数组
    let obj={'+':true,'-':true,'*':true,'/':true},temp=-1,inputArr=[];
    for(let i=0;i<input.length;i++){
        if(obj[input[i]]){
            inputArr.push(input.slice(temp+1,i));
            inputArr.push(input[i]);
            temp=i;
        }
    }
    inputArr.push(input.slice(temp+1));
    const getRes=arr=>{
        let res=[];
        // console.info('arr===>',arr);
        if(arr.length===1&&!obj[arr[0]]){
            return [arr[0]];
        }else{
            for(let i=0;i<arr.length;i++){
                // 1. divide when the item is +-*
                if(obj[arr[i]]){
                    // 2. resolve the question
                    let left=getRes(arr.slice(0,i));
                    let right=getRes(arr.slice(i+1));
                    // 3. combine the results
                    for(let ll of left){
                        for(let rr of right){
                            ll=Number(ll),rr=Number(rr);
                            if(arr[i]==='+'){
                                res.push(ll+rr);
                            }else if(arr[i]==='-'){
                                res.push(ll-rr);
                            }else if(arr[i]==='*'){
                                res.push(ll*rr);
                            }
                        }
                    }
                }
            }
        }
        return res;
    };
    return getRes(inputArr);
};

/**
 * optimize: 暂存每次遍历获得的数值
 * @param input
 * @returns {[*]|[]}
 */
const diffWaysToCompute2=input=>{
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
// console.info(diffWaysToCompute1('2-1-1'));
// console.info(diffWaysToCompute1("2*3-4*5"));
// console.info(diffWaysToCompute("15-7*6+24"));
console.info(diffWaysToCompute1("2-1-1-1-1"));