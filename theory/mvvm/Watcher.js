//观察者
class Watcher{
    constructor(vm,expr,callback){
        this.vm=vm;
        this.expr=expr;
        this.cb=callback;
        this.value=get();
    }
    // 会在自身实例化的时候给Dep.target这个静态属性赋值
    // 对外暴露update实例方法，目的是调用回调函数更新视图
    get(){
        // todo 获取更新前的值的一个方法
    }
    update(){
        // todo 暴露出来的更新方法
        /**
         * 会对比新旧值有改动才会调用callback进行视图更新
         */
    }
}