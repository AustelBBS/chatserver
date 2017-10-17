var exp = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var nsp = io.of('/name');
var users = {};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(exp.static(__dirname + '/public'));

io.on('connection', function(socket){
  //agregar usuarios
  socket.on('adduser', function(name){
    //agrega el nombre de usuario al arreglo
    socket.nickname = name;
    console.log(name +' se ha conectado');
    users[socket.nickname] = socket;
    updateUsers();    
    socket.once('disconnect', function(){
      if(!socket.nickname) return;
      delete users[socket.nickname];
      updateUsers();
    });
  });

  socket.on('chat message', function(user, msg){
    msg = msg.trim();
    if(msg.substr(0, 3) === '/w ') {
      msg = msg.substr(3);
      var ind = msg.indexOf(' ');
      if(ind !== -1) {
        var nick = msg.substr(0, ind);
        msg = msg.substr(ind+1);
        if(nick in users) {
          users[nick].emit('whisper', user, msg);
          console.log('User is being sneaky');
        } else {
          console.log('Error, nickname not in array');
        }
      } else {
        console.log('Error');
      }
    } else {
      io.emit('chat message', user, msg);  
    }
    console.log('msg: ' + msg);
  });

});

function updateUsers() {
  io.emit('updateUsers', Object.keys(users));
}

http.listen(3000, function(){
  console.log('Escuchando en *:3000');
});
