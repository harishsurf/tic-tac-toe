import React from "react";
import { Cell } from "./Cell";
import "./style.css";

export class Grid extends React.Component {
  state = {
    myboard: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };

  componentDidMount() {
    this.props.socket.on("not-enough-players", (msg) => alert(msg));
    this.props.socket.on("spot-taken", (msg) => alert(msg));
    this.props.socket.on("not-players-turn", (msg) => alert(msg));
    this.props.socket.on("game-state", (msg) => alert(msg));
    this.props.socket.on("player-won", (msg) => alert(`player ${msg} won`));
  }

  handleClick = (i, j, playerID) => {
    console.log("playerID", playerID);
    this.props.socket.emit("make-move", i, j, playerID);
  };

  renderCell = (i, j) => {
    return (
      <Cell
        value={this.props.board[i][j]}
        onClick={() => this.handleClick(i, j, this.props.socket.id)}
        socket={this.props.socket}
        playerMark={this.props.playerMark}
      />
    );
  };

  render() {
    return (
      <div className="col">
        <h4> Player: {this.props.playerName} </h4>
        {!this.props.board && <h2> Waiting for one more player to join </h2>}
        {this.props.board.map((row, idx) => (
          <div key={idx} className="row">
            {this.renderCell(idx, 0)}
            {this.renderCell(idx, 1)}
            {this.renderCell(idx, 2)}
          </div>
        ))}
      </div>
    );
  }
}
