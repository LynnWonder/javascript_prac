// 设计推特 leetcode-355
//设计一个简化版的推特(Twitter)，可以让用户实现发送推文，关注/取消关注其他用户，能够看见关注人（包括自己）的最近十条推文。你的设计需要支持以下的几个功能：
// postTweet(userId, tweetId): 创建一条新的推文
// getNewsFeed(userId): 检索最近的十条推文。每个推文都必须是由此用户关注的人或者是用户自己发出的。推文必须按照时间顺序由最近的开始排序。
// follow(followerId, followeeId): 关注一个用户
// unfollow(followerId, followeeId): 取消关注一个用户
/**
 * Initialize your data structure here.
 */
var timeStamp=0;
/**
 * Tweet类应该是一个节点
 * @param tweetId
 * @param timeStamp
 * @constructor
 */
var Tweet=function (tweetId,timeStamp){
    this.tweetId=tweetId;
    this.time=timeStamp;
    this.next=null;
};
var User=function (userId){
    this.id=userId;
    this.followed=new Set();
    // 发送推文链表
    this.head=null;
    // follow himself
    this.follow(userId);
};
User.prototype.follow=function(userId){
    // 注意followed装进去的都是userID
    this.followed.add(userId);
};
User.prototype.unfollow=function(userId){
    if(userId!==this.id){
        this.followed.delete(userId);
    }
};
User.prototype.post=function(tweetId){
    var tweet=new Tweet(tweetId,timeStamp);
    timeStamp++;
    // 最新的推文永远在最前面
    tweet.next=this.head;
    this.head=tweet;
};
var Twitter = function() {
    this.userMap=new Map();
};

/**
 * Compose a new tweet.
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    if(!this.userMap.has(userId)){
        this.userMap.set(userId,new User(userId));
    }
    var u=this.userMap.get(userId);
    u.post(tweetId);
};

/**
 * Retrieve the 10 most recent tweet ids in the user's news feed.
 * Each item in the news feed must be posted by users who the user followed or by the user herself.
 * Tweets must be ordered from most recent to least recent.
 * 有序：最近到最晚
 * follow的人或者自己，已经将自己列入follow的人之中
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    // 合并k个有序链表
    function mergeTwoLists(l1,l2){
        var res=new Tweet(),temp=res;
        l1=JSON.parse(JSON.stringify(l1));
        l2=JSON.parse(JSON.stringify(l2));
        while(l1&&l2){
            if(l1.time>l2.time){
                temp.next=l1;
                l1=l1.next;
            }else{
                temp.next=l2;
                l2=l2.next;
            }
            temp=temp.next;
        }
        temp.next=l1||l2;
        return res.next;
    }
    function mergeKLists(arr){
        if(arr.length<1) return null;
        if(arr.length===1) return arr[0];
        if(arr.length===2) return mergeTwoLists(arr[0],arr[1]);
        let mid=Math.floor(arr.length/2);
        let left=mergeKLists(arr.slice(0,mid));
        let right=mergeKLists(arr.slice(mid));
        return mergeTwoLists(left,right);
    }
    var res=[],candidates=[];
    if(!this.userMap.has(userId)){
        return res;
    }
    for(let ids of this.userMap.get(userId).followed){
        candidates.push(this.userMap.get(ids).head);
    }
    // console.info('candi===>',candidates);
    let newCandidates=mergeKLists(candidates);
    while(res.length<10&&newCandidates){
        res.push(newCandidates.tweetId);
        newCandidates=newCandidates.next;
    }
    return res;
};

/**
 * Follower follows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    if(!this.userMap.has(followerId)){
        this.userMap.set(followerId,new User(followerId));
    }
    if(!this.userMap.has(followeeId)){
        this.userMap.set(followeeId,new User(followeeId));
    }
    this.userMap.get(followerId).follow(followeeId);
};

/**
 * Follower unfollows a followee. If the operation is invalid, it should be a no-op.
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    if(this.userMap.has(followerId)){
        this.userMap.get(followerId).unfollow(followeeId);
    }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
var twitter = new Twitter();
// ["Twitter","postTweet","follow","follow","getNewsFeed","postTweet","getNewsFeed","getNewsFeed","unfollow","getNewsFeed","getNewsFeed","unfollow","getNewsFeed","getNewsFeed"]
// [[],[1,5],[1,2],[2,1],[2],[2,6],[1],[2],[2,1],[1],[2],[1,2],[1],[2]]
// 用户1发送了一条新推文 (用户id = 1, 推文id = 5).
twitter.postTweet(1, 5);
// console.info(twitter.userMap);

// 用户1关注了用户2.
twitter.follow(1, 2);
twitter.follow(2, 1);
console.info(twitter.getNewsFeed(2));
// console.info(twitter.userMap);
// 用户2发送了一个新推文 (推文id = 6).
twitter.postTweet(2, 6);
// console.info(twitter.userMap);
// 用户1的获取推文应当返回一个列表，其中包含两个推文，id分别为 -> [6, 5].
// 推文id6应当在推文id5之前，因为它是在5之后发送的.
console.info(twitter.getNewsFeed(1));
// console.info('map==>',twitter.userMap);
console.info(twitter.getNewsFeed(2));

// // 用户1取消关注了用户2.
twitter.unfollow(2, 1);
// // console.info(twitter.userMap);
// // 用户1的获取推文应当返回一个列表，其中包含一个id为5的推文.
// // 因为用户1已经不再关注用户2.
console.info(twitter.getNewsFeed(1));
console.info(twitter.getNewsFeed(2));
twitter.unfollow(1, 2);
console.info(twitter.getNewsFeed(1));
console.info(twitter.getNewsFeed(2));