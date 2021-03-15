// Represent GameState
const GameState = {
  DRAW: "DRAW",
  RUNNING: "RUNNING",
  WIN: "WIN",
};

// Represent symbol to be used as player's mark
const MARK = {
  X: "X",
  O: "O",
};

// This class represents the game - Tic tac toe played between 2 players. It provides methods to
// represent the board state, to add a player to the game, to make a move, and check the game
// state.
// TODO: If there is additional information for a player that needs to be stored, we could maintain
// Player as a separate class and pass in the id to TicTacToe's constructor
class TicTacToe {
  // Initializes a player state
  constructor() {
    this.playersToMark = new Map();
    this.currentPlayer = "";
  }

  initializeBoard = () => {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    // count of number of moves made
    this.totalMoves = 0;
  };

  // Helper method to get player, given the player' mark
  getPlayerGivenMark = (sign) => {
    let playerID = "";
    for (let [pid, mark] of this.playersToMark) {
      if (mark === sign) {
        playerID = pid;
      }
    }
    return playerID;
  };

  // Adds a new player to the game. The 1st player is assigned 'X' and the second player is assigned 'O'
  // TODO: Error handling when adding more than 2 players
  addPlayer = (newPlayer) => {
    let length = this.playersToMark.size;

    // assign 'X' to player 1
    if (length === 0) {
      this.playersToMark.set(newPlayer.id, MARK.X);
      this.currentPlayer = newPlayer.id;
      return;
    }

    // assign 'O' to player 2
    if (length == 1) {
      this.playersToMark.set(newPlayer.id, MARK.O);
    }
  };

  // Helper method to get mark for a given player
  getMarkGivenPlayer = (player) => {
    return this.playersToMark.get(player.id);
  };

  // This method checks if 2 players exist and then initializes the board
  startGame = (socket) => {
    if (
      this.playersToMark &&
      this.playersToMark.size !== 2 &&
      this.currentPlayer
    ) {
      socket.emit("error", "There needs to be 2 players");
      return;
    } else {
      this.initializeBoard();
    }
  };

  // Returns the state of the board
  getBoardState = () => {
    return this.board;
  };

  // The method checks the board to verify if any player has won. The winning criteria for the game
  // is any player who has their marks either on the same row or same column or diagonal or anti-diagonal
  getGameState = () => {
    // check winning criteria row-wise
    for (let i = 0; i < 3; i++) {
      let count = 0;
      let currentPossibleWin = this.board[i][0];
      for (let j = 0; j < 3; j++) {
        if (
          this.board[i][j] !== "" &&
          this.board[i][j] === currentPossibleWin
        ) {
          count++;
        }
      }
      if (count === 3) {
        return this.getPlayerGivenMark(currentPossibleWin);
      }
    }

    // check winning criteria column-wise
    for (let i = 0; i < 3; i++) {
      let count = 0;
      let currentPossibleWin = this.board[0][i];
      for (let j = 0; j < 3; j++) {
        if (
          this.board[j][i] !== "" &&
          this.board[j][i] === currentPossibleWin
        ) {
          count++;
        }
      }
      if (count === 3) {
        return this.getPlayerGivenMark(currentPossibleWin);
      }
    }

    // check winning criteria diagonally
    let currentPossibleWin = this.board[0][0];
    if (
      currentPossibleWin !== "" &&
      this.board[0][0] === currentPossibleWin &&
      this.board[1][1] === currentPossibleWin &&
      this.board[2][2] === currentPossibleWin
    ) {
      return this.getPlayerGivenMark(currentPossibleWin);
    }

    // check winning criteria anti-diagonally
    currentPossibleWin = this.board[0][2];
    if (
      currentPossibleWin !== "" &&
      this.board[0][2] === currentPossibleWin &&
      this.board[1][1] === currentPossibleWin &&
      this.board[2][0] === currentPossibleWin
    ) {
      return this.getPlayerGivenMark(currentPossibleWin);
    }

    if (this.totalMoves === 9) {
      return GameState.DRAW;
    }

    return GameState.RUNNING;
  };

  // This method takes in the position (row,col) as an index into the board and
  // marks the position if the player is legally allowed to make a move. The method
  // also checks if the winning condition is met after the move
  makeMove = (row, col, player, socket, io) => {
    if (this.playersToMark.size !== 2) {
      socket.emit(
        "not-enough-players",
        "You need one more player to play this game"
      );
      return;
    }
    if (this.board[row][col] !== "") {
      socket.emit("spot-taken", "The spot is already taken");
      return;
    }

    if (this.currentPlayer !== player.id) {
      socket.emit("not-players-turn", "It is not your turn");
      return;
    }

    this.board[row][col] = this.playersToMark.get(player.id);

    // Switch current player to another player after making the move
    this.playersToMark.forEach((val, playerID) => {
      if (playerID !== player.id) {
        this.currentPlayer = playerID;
      }
    });

    this.totalMoves++;

    // Verify game state
    const stateofTheGame = this.getGameState();
    if (stateofTheGame === GameState.DRAW) {
      io.emit("game-state", "Drawn - no player won");
    } else if (stateofTheGame === GameState.RUNNING) {
      return;
    } else {
      // emit winning player name
      io.emit("player-won", player.name);
    }
  };
}

module.exports = TicTacToe;
