const TicTacToe = require("./model/TicTacToe.js");

// Store players created in an array
const players = [];
const MAX_PLAYERS = 2;

let tictactoeObj = new TicTacToe();

const socketSession = (socket, io) => {
  if (players.length <= MAX_PLAYERS) {
    console.log("A client is now connected", socket.id);

    // create a new player and assign the socket id as the player id
    const newPlayer = {
      id: socket.id,
      name: "",
    };

    // add player to the array
    players.push(newPlayer);
    socket.emit(
      "player-connected",
      socket.id,
      players.length == 1 ? true : false
    );

    // socket listening for a client that wants to start a game
    socket.on("start-game", (playerName) => {
      const index = findIndexForPlayer(socket.id);
      players[index].name = playerName;

      console.log("players.length", players.length);

      // check if 2 players are available before starting the game
      if (players.length == MAX_PLAYERS) {
        tictactoeObj = new TicTacToe();
        players.forEach((player) => tictactoeObj.addPlayer(player));

        // start the game
        tictactoeObj.startGame(socket);

        players.forEach((player) =>
          socket.emit("player-mark", tictactoeObj.getMarkGivenPlayer(player))
        );

        io.emit("board-state", tictactoeObj.getBoardState());
      }
    });

    // socket listening for a client that wants to make a move
    socket.on("make-move", (i, j, playerID) => {
      tictactoeObj.makeMove(
        i,
        j,
        players[findIndexForPlayer(playerID)],
        socket,
        io
      );
      io.emit("board-state", tictactoeObj.getBoardState());
    });

    // socket listening for a client that wants to restart the game
    socket.on("restart-game", () => {
      tictactoeObj.initializeBoard();
      io.emit("board-state", tictactoeObj.getBoardState());
    });

    // socket listening for a client that disconnects
    socket.on("disconnect", () => {
      console.log("User has disconnected");
      players.splice(findIndexForPlayer(socket.id), 1);
      socket.removeAllListeners("game-state");
      socket.removeAllListeners("player-won");
    });
  } else {
    // socket for emiting if the game already has 2 players
    socket.emit("room-full", "Game already has 2 Players");
  }
};

// helper method that finds the index of the player using the player id
const findIndexForPlayer = (playerID) => {
  return players.findIndex((player) => player.id === playerID);
};

module.exports = socketSession;
