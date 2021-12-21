const io = require('socket.io')(3000)

const users=[]


io.on('connection', socket => {
  //console.log("success")
  socket.on('new-user', name => {
   newuser={
     id : socket.id,
     name: name,
     socket : socket
   }
   users.push(newuser)

    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', m => {
    var s
    for(var i=0;i<users.length;i++)
    {
      if(m.receiver==users[i].name)
      {
        s=users[i].socket
        break
      }
    }
    for(var i=0;i<users.length;i++)
    {
      if(socket.id==users[i].id)
      {
        n=users[i].name
        break
      }
    }
    if(s!=null)
    s.emit('chat-message', { message: m.message, name: n })
  })
  socket.on('disconnect', () => {
    for(var i=0;i<users.length;i++)
    {
      if(socket.id==users[i].id)
      {
        n=users[i].name
        break
      }
    }
    socket.broadcast.emit('user-disconnected', n)
    for(var i=0;i<users.length;i++)
    {
      if(socket.id==users[i].id)
      {
        delete users[i]
        break
      }
    }
    
  })
})
