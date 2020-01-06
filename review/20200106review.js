// 20200106review
/**
 * 荷兰三色国旗问题，在线性时间复杂度内排好序，使用左右指针
 * 0,1,2 three colors 0's right 2's left
 * @param arr
 */
const sortColor=arr=>{
    let right=0,left=arr.length-1,i=0;
    // three cases
    while(i<=left){
        if(arr[i]===0){
            arr[i]=arr[right];
            arr[right]=0;
            right++;
            // 如果不往后移位，则会造成第一位是0的情况时陷入死循环，因此要移位
            i++;
        }else if(arr[i]===1){
            i++;
        }else if(arr[i]===2){
            arr[i]=arr[left];
            arr[left]=2;
            left--;
        }
    }
    return arr;
};
console.info(sortColor([0,1,0,0,2,1]));
console.info(sortColor([1,0,0,0,2,1]));