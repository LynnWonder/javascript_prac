//编译模版指令
class Compile{
    constructor(el,vm){
        this.el=this.isElementNode(el)?el:document.querySelector(el);
        this.vm=vm;
        if (this.el){
            // 将dom元素添加到文档碎片中
            let frag=this.node2fragment(this.el);
            // 编译模版指令
            this.compile(frag);
            // 文档碎片塞回页面
            this.el.appendChild(frag);
        }
    }
    isElementNode(){
        //todo 检测el是否为元素节点
    }
    compile(frag){
        // todo 编译模版指令，分为v-指令和直接mustache语法文本
        let childNodes=frag.childNodes;
        Array.from(childNodes).forEach(node=>{
            if (isElementNode(node)){
                this.compileElement(node);
                this.compile(node);
            }else{
                this.compileText(node);
            }
        })
    }
    compileElement(node){
        //todo 编译模版指令
        // 获取属性值，对应不同的指令建立不同的指令方法
        CompileUtil[type](node,this.vm,expr)
    }
}
CompileUtil={
    model(node,vm,expr){
        //todo 编译v-model指令
        //todo 实例化观察者Watcher，值发生变化时调用回调函数
    }
};
