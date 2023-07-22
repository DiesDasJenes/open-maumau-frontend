const express = require("express");
const port = 1337;
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:4200"
}});
const lobbies = {}; // temporary fake database
httpServer.listen(port, ()=> console.log(`Listening on port ${port}`));

io.on("connection", socket => {
    let previousId;

    // change channel of socket
    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };
    
    socket.on("addLobby", lobby => {
        lobbies[lobby.id] = lobby; // add room to fake database
        safeJoin(lobby.id); // change socket channel to room Id
        socket.emit("lobby", lobby); // emit new room created
        console.log('AddLobby: ', lobby)
    });
  
  });