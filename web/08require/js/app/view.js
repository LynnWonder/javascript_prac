define(["jquery"],function($){
  // 获取视图
  /*
    set和get
    set：设置
    get：获取
  */
  function getView(){
    return $(".root");
  }

  function setView(data){
    getView().html(data);
  }

  return {
    setView:setView
  }
})
