// 两个数组的交集 II leetcode-350
/**
 * 时间复杂度:O(nm)
 * @param nums1
 * @param nums2
 * @returns {[]}
 */
const intersect=(nums1,nums2)=>{
    let res=[];
    if(nums1.length>nums2.length){
        [nums1,nums2]=[nums2,nums1];
    }
    for(let i=0;i<nums1.length;i++){
        for(let j=0;j<nums2.length;j++){
            if(nums2[j]===nums1[i]){
                res.push(nums1[i]);
                nums2.splice(j,1);
                break;
            }
        }
    }
    return res;
};
/**
 * 时间复杂度:O(m+n);
 * 空间复杂度:O(min(m,n));
 */
const intersect1=(nums1,nums2)=>{
    let res=[],obj={};
    if(nums1.length>nums2.length){
        [nums1,nums2]=[nums2,nums1];
    }
    while(nums1.length>0){
        let temp=nums1.shift();
        if(obj[temp]){
            obj[temp]++;
        }else{
            obj[temp]=1;
        }
    }
    for(let i=0;i<nums2.length;i++){
        if(obj[nums2[i]]&&(obj[nums2[i]]>0)){
            nums1.push(nums2[i]);
            obj[nums2[i]]--;
        }
    }
    return nums1;
};
/**
 * 排序加双指针法
 * @param nums1
 * @param nums2
 * @returns {[]}
 */
const intersect2=(nums1,nums2)=>{
    let res=[];
    nums1.sort((a,b)=>a-b);
    nums2.sort((a,b)=>a-b);
    if(nums1.length>nums2.length){
        [nums1,nums2]=[nums2,nums1];
    }
    let j=0;
    for(let i=0;i<nums1.length;i++){
        while(j<nums2.length&&nums2[j]<=nums1[i]){
            if(nums2[j]===nums1[i]){
                res.push(nums2[j]);
                j++;
                break;
            }
            j++;
        }
    }
    return res;
};
console.info(intersect2([1,2,2,1],[2]));
console.info(intersect2([4,9,5], [9,4,9,8,4]));
console.info(intersect2([3,1,2],[1,1]));
console.info(intersect2([2,1],[1,1]));