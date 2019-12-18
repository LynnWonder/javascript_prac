const EventEmitter=require('events');
class MyEmitter extends EventEmitter{}

const myEmitter=new MyEmitter();
myEmitter.on('event',()=>{
    console.info('test');
});
myEmitter.emit('event');

// EventEmitter简单实现

function EventEmitter() {
    this.events = {};  //所有事件监听函数放在这个对象里保存
    this._maxListeners = 10; //监听函数最多10个
}
//给制定函数绑定事件处理函数
EventEmitter.prototype.on = EventEmitter.prototype.addEventListener = function (type,listener) {
    if(this.events[type]){
        this.events[type].push(listener);
        if(this._maxListeners != 0 && this.events[type].length > this._maxListeners){
            console.error('MaxListenersExceededWarning: Possible EventEmitter memory leak detected.\n');
        }
    }else {
        this.events[type] = [listener];
    }
};
EventEmitter.prototype.emit = function (type, ...rest) {
    if(this.events[type]){
        //遍历触发函数数组   apply把this指向当前对象  解构rest
        this.events[type].forEach((listener)=>listener.apply(this,rest));
    }
};
EventEmitter.prototype.removeListener =  function(type,listener) {
    if (this.events[type]){
        this.events[type] = this.events[type].filter(l=>l!==listener);
        //使用filter过滤数组
    }
};
