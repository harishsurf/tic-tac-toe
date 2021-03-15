import React from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./components/Layout";
import "./App.css";

const ENDPOINT = "localhost:5000";

export class App extends React.Component {
  state = {
    startGame: false,
    playerName: "",
    playerID: "",
    socket: "",
    playerMark: "",
    isPlayerOne: false,
    boardState: [],
  };

  componentDidMount() {
    const socketInstance = io(ENDPOINT);
    this.setState({ socket: socketInstance });

    socketInstance.on("player-connected", (playerID, isPlayerOne) => {
      console.log(playerID);
      this.setState({ playerID: playerID });
      this.setState({ isPlayerOne: isPlayerOne });
    });

    socketInstance.on("room-full", (msg) => alert(msg));

    socketInstance.on("error", (msg) => alert(msg));

    socketInstance.on("board-state", (board) => {
      this.setState({ boardState: board });
    });
  }

  initializeGame = () => {
    this.setState({ startGame: !this.state.startGame });

    this.state.socket.on("player-mark", (playerMark) => {
      this.setState({ playerMark: playerMark });
    });

    this.state.socket.emit("start-game", this.state.playerName);
  };

  setPlayerName = (e) => {
    this.setState({ playerName: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div className="container col-md-4 text-center center">
          {!this.state.startGame && (
            <>
              <h1> Tic Tac Toe Game!</h1>

              <input
                type="text"
                className="form-control input-width"
                placeholder="Enter player name"
                onChange={(e) => this.setPlayerName(e)}
              />
              <button
                className="btn btn-success"
                onClick={() => this.initializeGame()}
                disabled={this.state.playerName === ""}
              >
                Start Game
              </button>
            </>
          )}

          {this.state.startGame && (
            <Layout
              socket={this.state.socket}
              player={this.state.playerID}
              playerMark={this.state.playerMark}
              isPlayerOne={this.state.isPlayerOne}
              playerName={this.state.playerName}
              boardState={this.state.boardState}
            ></Layout>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
