requirejs.config({
  baseUrl:"js/",
  paths:{
    "jquery":"lib/jquery-3.2.1",
    "swiper":"lib/swiper.min",
    "index":"app/index"
  },
  // 为那些没有使用define()来声明依赖关系、设置
  // 模块的"浏览器全局变量注入"型脚本做依赖和导出配置
  shim:{
    "swiper":{
      deps:["jquery"],
      exports:"swiper"
    }
  }
})

requirejs(["jquery","swiper","index"],function($,swiper,index){

})
