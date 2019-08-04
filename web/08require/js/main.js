requirejs.config({
  baseUrl:"js/",
  paths:{
    "jquery":"lib/jquery-3.2.1",
    "data":"app/data",
    "index":"app/index",
    "view":"app/view"
  }
})

requirejs(["jquery","data","index","view"],function($,data,index,view){

})
