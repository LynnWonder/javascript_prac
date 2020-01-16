/**
 * 快排，典型的应用了分治算法的一个case
 *
 * @param arr
 * @returns {Buffer | Array | Buffer | any[] | string | *}
 */
const quickSort=arr=>{
    if(arr.length<=1) return arr;
    let pivot=Math.floor(arr.length/2),left=[],right=[];
    let temp=arr[pivot];
    arr.splice(pivot,1);
    for(let i=0;i<arr.length;i++){
        if(arr[i]<temp){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([temp],quickSort(right));
};
console.info(quickSort([7,4,6,5,1,3,6]));