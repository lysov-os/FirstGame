var app = require('express').createServer();
var io = require('socket.io').listen(app.listen(4000));

app.get('/', function(request, response){
  response.sendfile(__dirname + "/index.html");
});

var activeClients = 0;

io.sockets.on('connection', function(socket){ClientConnect(socket)});

function ClientConnect(socket){
  activeClients +=1;
  io.sockets.emit('clientConnect', {clients:activeClients});
  socket.on('message', SendMessage);
  socket.on('disconnect', ClientDisconnect);
}

function SendMessage(msg){
  io.sockets.emit('message', {message:msg})
}

function ClientDisconnect(){
  activeClients -=1;
  io.sockets.emit('clientConnect', {clients:activeClients});
}