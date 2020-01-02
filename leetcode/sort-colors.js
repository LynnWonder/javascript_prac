// 颜色分类 leetcode-75
/**
 * 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 输入: [2,0,2,1,1,0]
 输出: [0,0,1,1,2,2]
 */
/**
 * bubbleSort
 * 是一种稳定排序，两个相同大小的元素不会交换位置
 * 特点：总是跟相邻的元素进行比较，一趟过后最后一个元素肯定是当前最大的元素，因此时间复杂度为
 * O(n2)
 * 空间复杂度：因为是就地移动，所以为O(1)
 * @param nums
 * @returns {*}
 */
const sortColors = (nums)=>{
    for(let i=nums.length-1;i>0;i--){
        // console.info('===>',i,nums);
        for(let j=0;j<i;j++){
            if (nums[j]>nums[j+1]){
                let temp=nums[j];
                nums[j]=nums[j+1];
                nums[j+1]=temp;
            }
        }
    }
    return nums;
};
/**
 * 选择排序，每次下来都能找到最小的元素，顺序往后排
 * 是一种不稳定排序，两个相同大小的元素可能会交换位置，比如测试用例中的两个2会交换位置[2,0,2,1,1,0]
 * 时间复杂度：O(n2)
 * 空间复杂度：因为是就地移动，所以为O(1)
 * @param nums
 * @returns {*}
 */
const sortColors0=nums=>{
    for(let i=0;i<nums.length-1;i++){
        let min=i;
        for(let j=i+1;j<nums.length;j++){
            if(nums[j]<nums[min]){
                min=j;
            }
        }
        let temp=nums[i];
        nums[i]=nums[min];
        nums[min]=temp;
    }
    return nums;
};
/**
 * 插入排序：
 * 稳定排序，不会交换两个相同大小的元素的位置
 * 时间复杂度：O(n2)
 * 空间复杂度：因为是就地移动，所以为O(1)
 * @param nums
 * @returns {*}
 */
const sortColors1=nums=>{
    for(let i=1;i<nums.length;i++){
        let j=i,temp=nums[i];
        // 关键点1：j一定是从i开始的，才能实现相对移动
        // 关键点2：一定不断和前一位进行比较，而不是temp<nums[j]
        while(j>0&&temp<nums[j-1]){
            nums[j]=nums[j-1];
            j--;
        }
        nums[j]=temp;
    }
    return nums;
};
/**
 * 荷兰三色国旗问题
 * 时间复杂度为:O(N)
 * 空间复杂度:O(1)
 * @param nums
 */
const sortColors2=nums=>{
    // 对于所有idx<p0 nums[idx]=0,0的右边界p0
    // 对于所有的idx>p2 nums[idx]=2，2的左边界p2
    let p0=0,curr=0,p2=nums.length-1;
    while(curr<=p2){
        if(nums[curr]===0){
            // 交换p0 curr 然后分别右移指针
            let temp=nums[p0];
            nums[p0]=0;
            nums[curr]=temp;
            p0++;
            curr++;
        }else if(nums[curr]===2){
            // 交换p2 curr 然后p2指针左移
            nums[curr]=nums[p2];
            nums[p2]=2;
            p2--;
        }else{
            // 如果是1，不移动即可
            curr++;
        }
    }
    return nums;
};
console.info(sortColors2([2,0,2,1,1,0]));