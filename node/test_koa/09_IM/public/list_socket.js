 
  // 代表服务器那边emit('msg1',data)
  socket.on('msg1', function(data){
    console.log(data);
  });
  socket.on('disconnect', function(){
    console.log('断开连接了');
  });

  // 获取实时的在线列表信息
  socket.on('online',function(data) {
    // data 是一个sessionStore  {121221:{username:'xxx',socketid:xxx} ,121221:{username:'xxx',socketid:xxx}  }
    //id:{sessionID:xx,userName:xx}
    // 该该对象转换成数组
    var users = Object.values(data.online); 
    // 展示在线人数
    document.querySelector('.online').innerText = users.length;

    // select显示在线列表
    var select = document.querySelector('.towho');
    // 临时字符串 innerHTML
    var html='';
    for (var i = 0; i <users.length; i++) {
        
        var u = users[i];
        html += `
          <option value="${u.socketid}">
            ${u.username}
          </option>
        `;
    }
    // 解决不触发onchange事件的时候privateTo指向谁的问题
    privateTo=users.length&&users[0].socketid;
    // console.info(users[users.length-1]);
    // 插入
    select.innerHTML = html;
  });
  socket.on('allmessage',function(data) {
      var ul = document.querySelector('.list');
      ul.innerHTML += `<li>${data}</li>`;
  });