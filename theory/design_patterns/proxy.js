/**
 * 代理模式：比如实现图片的预加载，在图片请求回来之前显示一张loading图，请求完成后显示真正的图
 */
let loadingImg=(function (){
    let imgNode=document.createElement('img');
    document.body.appendChild(img);
    return function(src){
        imgNode.src=src;
    }
})();
let proxyImage=(function(){
    let img=new Image();
    img.onload=function(){
        img.src=this.src;
    };
    return function(url){
        loadingImg('onLoading.gif');
        img.src=url;
    }
})();
proxyImage('http://www.test.com/837283.jpg');
/**
 * 整理一下操作的全流程：
 * 执行proxyImage后首先新创建了一个img对象并且开始加载它，与此同时调用loadingImg
 * 它的作用是创建dom节点并且展现我们的loading图片，当img加载完图片后执行onload回调显示网图（给其设置了图片地址）
 * 代理起到了一个转接装饰的作用，最终的请求还是转接给了本体。
 */