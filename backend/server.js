const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const socketSession = require("./socketSession");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// Listen to incoming client connections
io.on("connection", (socket) => {
  socketSession(socket, io);
});

server.listen(PORT, () => console.log(`Server has started on port:  ${PORT}`));
