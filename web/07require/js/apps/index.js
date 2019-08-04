// 定义模块
// define({
//   name:"iwen",
//   age:20
// })

// 函数式定义
// define(function(){
//   var demo = 10;
//   function demo(){
//
//   }
// })

// // 存在依赖的函数式定义
// define(["jquery"],function($){
//   console.log($ );
// })

// 依赖注入
define(["getname","jquery"],function(getname,$){
  function init(){
    $("#root").html(getname.text());
  }
  return {
    init:init
  }
})
