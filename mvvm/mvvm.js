// 创建一个自己的mvvm模式
// mvvm是数据绑定的入口
class mvvm{
    constructor(option){
        this.el=option.el;
        this.data=option.data;
        if (this.el){
            new Observer(this.data);
            new Compiler(this.el,this);
        }
    }
}