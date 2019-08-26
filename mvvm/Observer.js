// 给所有的模版绑定数据添加get 和set 方法
// 当编译模版指令实例化Watcher的时候会获取更新前的值，此时会触发get方法那么
// 就自动添加到Dep中，值改变的时候会自动调用set，就会遍历执行Dep中的Watcher更新视图。
class Observer{
    constructor(){

    }
}