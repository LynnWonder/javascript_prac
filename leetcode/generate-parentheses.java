class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        num = n;
        str.clear();
        for(int i = 0; i < n*2; ++i)
        {
            str.push_back('0');
        }
        l = 0;
        r = 0;
        bt(result, 0);

        return result;
    }
    //全局状态控制变量，l和r分别表示已用左右括号的数量;
    int num;
    int l;
    int r;
	//解（全局变量）;
    string str;

	//迭代回溯函数;
	//第一个参数其实是为了保存每一个解，如果只需要打印出来那就不需要这个参数了;
	//k表示当前计算的解的前进进度;
	void bt(vector<string> &result, int k)
	{
		//迭代终点，也就是得到了一个新解;
		if(k == num*2)
		{
			result.push_back(str);
		}
		//解的计算未到终点，继续进度;
		else
		{
			//先进行尝试性填充左括号来求解;
			if(l < num)
			{
				str[k] = '(';
				l++;
				bt(result, k+1);
				//////!!!这一步是必须的，恢复到上一节点，选择其他，这样子才能达到回溯的目的！;
				--l;
			}
			//填充右括号;
			if(r < num && l > r)
			{
				str[k] = ')';
				r++;
				bt(result, k+1);
				--r;
			}//到这里有隐含的排除信息，也就是不符合if内要求的解空间都被排除掉了;
		}
	}
};