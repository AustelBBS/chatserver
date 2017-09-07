var exp = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.use(exp.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('Un usuario se ha conectado');
	socket.on('disconnect', function(){
		console.log('Un usuario se ha desconectado');
	});
	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});

});


http.listen(3000, function(){
	console.log('Escuchando en *:3000');
});