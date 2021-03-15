const serverSocket = (socket) => {
  console.log("Made socket connection");

  socket.emit("message", "TICTACTOE!");
};

module.exports = serverSocket;
