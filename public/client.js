/* global createCanvas,windowWidth,windowHeight,text,mouseX,mouseY,fill,noStroke,ellipse,io,noCanvas,random */
// https://www.netlify.com/docs/
// https://socket.io/docs/
//https://expressjs.com/fr/api.html

var socket;
var msg,chat,pseudoSetter;
var ppseudo,isPseudoSet=false;

function setup() {
  noCanvas();
  socket = io();
  
  msg=document.getElementById('msg');
  chat=document.getElementById('chat');
  pseudoSetter=document.getElementById('pseudoSetter');
  
  socket.on('check',(data) => {
    chat.innerHTML+="<span class=\"join\">"+data.pseudo+" has joined</span><br/>";
    socket.emit('check',data);
  });
  
  socket.on('pseudoDispo',(data) => {
    chat.innerHTML+="<span class=\"pseudo\">"+data.resp+"</span><br/>";
    socket.emit('reponse',data);
  });
  
  socket.on('newMessage',(data) => {
    if(ppseudo==data.pseudo){
      chat.innerHTML+=data.msg+"<br/>";
    }else{
      chat.innerHTML+="<span class=\"pseudo\">"+data.pseudo+"</span> : "+data.msg+"<br/>";
    }
    ppseudo=data.pseudo;
  });
}

function change(){
  var data = {msg : msg.value};
  socket.emit('newMessage',data);
  
  msg.value="";
}

function setPseudo(){  
  document.getElementById("flou").id="";
  document.getElementById("noAction").id="";
  pseudoSetter.style.display="none";
  
  var data={pseudo:pseudoSetter.value};
  socket.emit('checkAndSetPseudo',data);
}