/**
 * 消息订阅类
 */
class Dep{
    constructor(){
        this.subscriber=[];
    }

    /**
     * add watcher
     * @param watcher
     */
    addSub(watcher){
        this.subscriber.push(watcher);
    }

    /**
     * do update
     */
    notify(){
        this.subscriber.forEach(watcher=>watcher.update());
    }
}