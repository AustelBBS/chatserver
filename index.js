var exp = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var nsp = io.of('/name');
var users = [];
var ids = [];


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(exp.static(__dirname + '/public'));

io.on('connection', function(socket){
  //agregar usuarios
  socket.on('adduser', function(name, id){
    users.push(name);
    //remueve los usuarios
    console.log(name +' se ha conectado');
    socket.once('disconnect', function(){
      var pos = users.indexOf(name);
      if(pos >= 0 && ids[pos] == id)
        users.splice(pos, 1);
        ids.splice(pos, 1);
        console.log(name +' se ha desconectado');
    });
    socket.emit('updateUsers', users, ids);
  });
  
  socket.on('chat message', function(msg){
    console.log('msg: ' + msg);
    io.emit('chat message', msg);
  });

});


http.listen(3000, function(){
  console.log('Escuchando en *:3000');
});
