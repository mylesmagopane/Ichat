const express = require("express");
const path = require("path");

const hostname = 'localhost';
const port = 3000;

const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server,{
    cors:{
        origin:['https://ichat-myles-projects-1e7607f0.vercel.app/']
    }
});

 app.use(express.static(path.join(__dirname+"/public")));

    io.on("connection",function(socket){
    socket.on("newuser",function(username){
        socket.broadcast.emit("update",username + " has joined the chat")
        console.log(username + " has joined the chat")
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update",username + " has left the chat")
    });
    socket.on("chat",function(message){
        socket.broadcast.emit("chat", message)
    });
}); 

server.listen(port, hostname, function (err) {
    if (err) {
      throw err;
    }
    console.log('server listening on: ', 'http://'+hostname+':'+ port);
  });
