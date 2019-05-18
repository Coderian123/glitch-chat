var express = require('express');
var app = express();

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use(express.static('public'));
var sockets = require('socket.io');
var io = sockets(listener);

io.on('connection',newConnectionProcess);

function newConnectionProcess(socket){
	// console.log('new connection : '+socket.id);
	// console.log('Adresse IPv6 : '+socket.request.connection.remoteAddress);
	// console.log('num port : '+socket.request.connection.remotePort);	
  //console.log(io.engine.clientsCount);
  socket.reponses=[];
  
	socket.on('newMessage', (data) => {
		io.emit('newMessage',{msg:data.msg, pseudo:socket.pseudo});
	});
  
  socket.on('checkAndSetPseudo', (data) => {
		socket.broadcast.emit('check',{pseudo:data.pseudo, id:socket.id});
    socket.pseudo=data.pseudo;
	});
  
  socket.on('check', (data) => {
		if(socket.pseudo==data.pseudo){
      io.to(`${data.id}`).emit('pseudoDispo',{resp:"non"});
    }else{
      io.to(`${data.id}`).emit('pseudoDispo',{resp:"oui"});
    }
	});
  
  socket.on('reponse', (data) => {
    console.log(data.resp);
  });
}