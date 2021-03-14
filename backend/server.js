const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const serverSocket = require("./socket.jsx");

// App setup
const PORT = 4000;

// io.on('connection', serverSocket);

io.on('connection', (socket) => {

  console.log("Made socket connection");


  socket.emit('message', 'TICTACTOE!');

  socket.on('disconnect', () => {
    console.log("User disconnected");
  })
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});