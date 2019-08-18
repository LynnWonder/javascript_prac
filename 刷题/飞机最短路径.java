/*
 * Cheapest Flights Within K Stops
 * K 站中转内最便宜的航班
*/

//执行用时 : 16 ms, 在Cheapest Flights Within K Stops的Java提交中击败了52.29% 的用户
//内存消耗 : 39.1 MB, 在Cheapest Flights Within K Stops的Java提交中击败了84.38% 的用户
class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int K) {
        //dp[i][j]表示从src到i城市经j次中转的费用
        int[][] dp = new int[n][K+1];
        int[][] graph = new int[n][n];
        int m = flights.length;
        for (int i=0;i<n;i++) {
            for (int j=0;j<n;j++) {
                if (i==j) graph[i][j] = 0;  
                else graph[i][j] = 99999999;
            }
        }
        for (int i=0;i<m;i++) {
            graph[flights[i][0]][flights[i][1]] = flights[i][2];
        }
        for (int i=0;i<n;i++) {
            dp[i][0] = graph[src][i];
        }
        for (int j=1;j<=K;j++){
            for (int i=0;i<n;i++){

                    for (int k=0;k<n;k++) {
                        if (dp[i][j] ==0) dp[i][j] = dp[k][j-1]+graph[k][i];
                        else dp[i][j] = Math.min(dp[i][j],dp[k][j-1]+graph[k][i]);
                    }


            }
        }
        int min = 99999999;
        for (int i=0;i<=K;i++) {
            min = Math.min(dp[dst][i],min);
        }
        return min==99999999?-1:min;
    }
    
}