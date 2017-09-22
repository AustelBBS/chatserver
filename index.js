var exp = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var seed;

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.use(exp.static(__dirname + '/public'));

io.on('connection', function(socket){
	console.log('Un usuario se ha conectado');
	socket.on('disconnect', function(){
		console.log('Un usuario se ha desconectado');
	});
  
  socket.on('seed', function(s){
    seed = s;
    console.log('seed: ' +  seed);
  });
	
  socket.on('chat message', function(key){
		var msg = encrypt(key, -seed);
		console.log('key: ' + key);
		console.log('msg: ' + msg);
		io.emit('chat message', msg);
	});

});


http.listen(3000, function(){
	console.log('Escuchando en *:3000');
});

function encrypt (inputString, shiftedpositions){
  var salida = "";
  var oldASCII; //donde se guarda el codigo ascii de una letra
  var newASCII;//codigo ascii resultante luego de sumarle shiftedpositions
  //por cada letra de la entrada
  for(var c = 0; c < inputString.length; c++){
    oldASCII = inputString[c].charCodeAt();//obtenemos su codigo
    newASCII = oldASCII + shiftedpositions;//desplazamos de lugar la letra al sumarle shiftedpositions
    salida = salida.concat(String.fromCharCode(newASCII));//convertimos el nuevo codigo a string y concatenamos
  }
  return salida;
}
