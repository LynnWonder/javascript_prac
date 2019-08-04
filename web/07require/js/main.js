// 配置文件
requirejs.config({
  // 基础路径
  baseUrl: 'js/',
  // 映射
  // .js可以省略
  paths:{
    "index":"apps/index",
    "getname":"apps/getname",
    "jquery":"libs/jquery-3.2.1"
  }
})

requirejs(["index","getname","jquery"],function(index,getname,$){
  // 主入口文件
  // 调用
  index.init();
})
