// leetcode-282-给表达式添加运算符
/**
 * 给定一个仅包含数字 0-9 的字符串和一个目标值，
 * 在数字之间添加二元运算符（不是一元）+、- 或 * ，
 * 返回所有能够得到目标值的表达式。
 */
/**
 * 输入: num = "123", target = 6
 * 输出: ["1+2+3", "1*2*3"]
 * 输入: num = "105", target = 5
 * 输出: ["1*0+5","10-5"]
 * 输入: num = "3456237490", target = 9191
 * 输出: []
 */
/*
 * 问题的解是一组，即解用向量表示,因此用回溯法来解决，并且观察其特征应该是排列树(确定n个元素是满足某种性质的排列
 * 以下是第一版代码。无法通过所有测试用例，原因实则是暴力遍历了所有可能结果，复杂度过高.
 * 主要思路是通过最初用eval判断结果是否为target，但是每次eval运算耗费时间较长，优势是代码极其简单清晰，且不用单独处理乘法。
 * @param {string} num
 * @param {number} target
 * @return {string[]}
 */
const addOperators = (num, target)=>{
    let res=[],ans=[];
    const findRes=(num0,k)=>{
        if(num0.length<1) return;
        let flag=(num0.length>1&&num0[0]!=='0')||(num0.length===1);
        if(flag&&eval(`${res.slice(0,k).join('')}${num0}`)===target){
            res[k]=num0;
            ans.push(res.slice(0,k+1).join(''));
        }else{
            for(let i=0;i<num0.length;i++){
                res[k]=num0.slice(0, i + 1);
                res[k+1]='+';
                findRes(num0.slice(i + 1), k+2);
                res[k+1]='-';
                findRes(num0.slice(i + 1), k+2);
                res[k+1]='*';
                findRes(num0.slice(i + 1),k+2);
                if(num0[0]==='0') break;
            }
        }
    };
    findRes(num,0);
    return ans;
};
/**
 * 在第一版代码中囊括了所有可能的情况，通过思考是否可以在未定符号之前事先进行判断，最后证明不可行
 * 是否可以通过优化eval函数降低复杂度呢？
 * @param num
 * @param target
 * @returns {[]}
 */
const addOperators1=(num,target)=>{
    let res=[];
  const recurse=(idx,preOperand,curOperand,val,ops)=>{
      if(idx===num.length){
          if(val===target&&curOperand===0){
              res.push(ops.slice(1).join(''));
          }
          return;
      }
      curOperand=curOperand*10+Number(num.charAt(idx));
      let cur_val=curOperand.toString();
      if(curOperand>0){
          recurse(idx+1,preOperand,curOperand,val,ops);
      }
      ops.push('+');
      ops.push(cur_val);
      recurse(idx+1,curOperand,0,val+curOperand,ops);
      ops.pop();
      ops.pop();

      // 言下之意是不能第一位是减号
      if(ops.length>0){
          ops.push('-');
          ops.push(cur_val);
          recurse(idx+1,-curOperand,0,val-curOperand,ops);
          ops.pop();
          ops.pop();

          ops.push('*');
          ops.push(cur_val);
          recurse(idx+1,curOperand*preOperand,0,
              val-preOperand+(curOperand*preOperand),ops);
          ops.pop();
          ops.pop();
      }
  };
  recurse(0,0,0,0,[]);
  return res;
};
/**
 * 合理降低暴力遍历的复杂度，暂存每次计算的val
 * 优化方案中关键一步是如何处理像1-2*3*4*5这种情况，其若从1-2*3*4过渡需要：
 * 1-2*3*4-(-2*3*4)+(-2*3*4*5)
 * 但在暴力求解的方法中通过校验最后一位加上后是否满足target的方式不容易取得pre即2*3*4的值
 * 因此转而改变思路：通过判断最终结果是否符合条件，而像上面例子中暂存的结果如何判断呢，此时会非常容易
 * 私以为相对于官方思路更加清晰
 * @param num
 * @param target
 * @returns {number}
 */
const addOperators2 = (num, target)=>{
    let res=[],ans=[];
    const backTrack=(num0,val,pre,k)=>{
        if(num0.length<1){
            if(val===target){
                ans.push(res.slice(0,k).join(''));
            }
            return;
        }
        for(let i=0;i<num0.length;i++){
            if(k===0){
                res[k]=(num0.slice(0,i+1));
                backTrack(num0.slice(i+1),Number(res[k]),Number(res[k]),k+1);
            }else{
                res[k]=('+');
                res[k+1]=num0.slice(0,i+1);
                backTrack(num0.slice(i+1),val+Number(res[k+1]),Number(res[k+1]),k+2);
                res[k]=('-');
                res[k+1]=num0.slice(0,i+1);
                backTrack(num0.slice(i+1),val-Number(res[k+1]),-Number(res[k+1]),k+2);
                res[k]=('*');
                res[k+1]=num0.slice(0,i+1);
                backTrack(num0.slice(i+1),val-pre+pre*Number(res[k+1]),pre*Number(res[k+1]),k+2);
            }
            if(num0[0]==='0') break;
        }
    };
    backTrack(num,0,0,0);
    return ans;
};
// console.info(addOperators2('123',6));
// console.info(addOperators1('105',5));
// console.info(addOperators2('232',8));
// console.info(addOperators1('0000',0));
// console.info(addOperators1('3456237490',9191));
// console.info(addOperators("123456789",45));
console.info(addOperators("123456789",45));
// let arr1=
// for(let i=0;i<arr2.length;i++){
//     for(let j=0;j<arr1.length;j++){
//         if (arr1[j]===arr2[i]){
//             arr1.splice(j,1);
//             break;
//         }
//     }
// }
// console.info(arr1);