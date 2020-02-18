// 私聊给谁
var privateTo;
// 向什么组发
var groupTo;
  // 发起私聊
  document.querySelector('.sendPrivateMsg').onclick = function () {
    socket.emit('sendPrivateMsg',{
      msg:document.querySelector('.privateMsg').value,
      //向谁发
      to:privateTo, // socketid
    });
  };

  // 对大家说
  document.querySelector('.btn').onclick = function () {
      var newContent = document.querySelector('.newContent').value;
      socket.emit('sendMsg',{
        newContent:newContent
      });
  };

  // 加入男生组
  document.querySelector('.male').onclick = function () {
    socket.emit('jounGroup','male');
    groupTo = 'male';
  };
 // 加入女生组
   document.querySelector('.female').onclick = function () {
    socket.emit('jounGroup','female');
    groupTo = 'female';
  };

// 发起组聊
 document.querySelector('.sendGroupMsg').onclick = function() {
    // 获取发起的消息
    var msg = document.querySelector('.groupMsg').value;
    socket.emit('sendGroupMsg',{
      groupTo,msg
    })
 };