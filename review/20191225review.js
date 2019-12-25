// Merry Christmas 🎄🎄🎄🎁🎁🎁
/**
 * 利用二分查找法求两个有序数组的中位数
 * A[0]...A[i-1]|A[i]...A[m-1]
 * B[0]...B[j-1]|B[j]...B[n-1]
 * 可以总结出规律： 在m+n为偶数情况下i-1-0+1+j-1-0+1=m-1-i+1+n-1-j+1===>i+j=m+n-i-j i+j=(m+n)/2
 * 如果m+n为奇数呢？在m+n为奇数情况下：如果我们取左边最大值为中位数则i+j=(m+n+1)/2
 *                在m+n为奇数情况下：如果我们取右边最小值为中位数则i+j=(m+n-1)/2
 *                因此为了统一两种情况，可以都归纳为i+j=Math.floor((m+n-1)/2)  i+j=Math.ceil((m+n-1)/2)
 * 并且满足 A[i-1]<=B[j]&&B[j-1]<=A[i]
 * @param A
 * @param B
 */
const findMedianSortedArrays=(A,B)=>{
    // 确定长短数组是否有必要？==> 有必要，我们必须从小数组开始折半以便算j的时候不会造成大数组越界
    if(A.length>B.length){
        let temp=A;
        A=B;
        B=temp;
    }
    let m=A.length,n=B.length;
    let temp=Math.ceil((m+n-1)/2);
    let st=0,ed=m;
    // start binary search
    while(st<=ed){
        let i=Math.floor((st+ed)/2);
        let j=temp-i;
        if(i>st&&A[i-1]>B[j]){
            // i is too big
            // 此时我们折半查找：i=(ed-(st+ed)/2+st)/2=(st+ed)/4
            ed=i-1;
        }else if(i<ed&&B[j-1]>A[i]){
            // i is too small
            st=i+1;
        }else{
            let maxLeft=0;
            if(i===0){
                maxLeft=B[j-1];
            }else if(j===0){
                maxLeft=A[i-1];
            }else{
                maxLeft=Math.max(A[i-1],B[j-1]);
            }

            let minRight=0;
            if(i===m){
                minRight=B[j];
            }else if(j===n){
                minRight=A[i];
            }else{
                minRight=Math.min(A[i],B[j]);
            }
            // console.info('i,j==>',i,j);
            return (m+n)%2===0?(maxLeft+minRight)/2:minRight;
        }
    }
};
console.info(findMedianSortedArrays([1,2,3],[4,5]));
console.info(findMedianSortedArrays([1,2],[1,2]));
console.info(findMedianSortedArrays([100000],[100001]));
console.info(findMedianSortedArrays([3,4],[1,2]));
console.info(findMedianSortedArrays([2],[]));
console.info(findMedianSortedArrays([2,3,4,5],[1]));
console.info(findMedianSortedArrays([2,3,4,5],[1]));