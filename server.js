const express = require("express");
const path = require("path");

//  const port = process.env.PORT || 5000


const app = require("express")();
 const server = require("http").createServer(app);

 const io = require("socket.io")(server);



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



server.listen(3000);

// app.listen(3000);
console.log(`Server running on port: http://localhost:3000`);

// const io = require('socket.io')(5000);

module.exports = io;
