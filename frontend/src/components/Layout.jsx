import React from "react";
import { Grid } from "./Grid";
import { Restart } from "./RestartComponent";

export class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid
          board={this.props.boardState}
          socket={this.props.socket}
          playerMark={this.props.playerMark}
          isPlayerOne={this.props.isPlayerOne}
          playerName={this.props.playerName}
        />
        <Restart socket={this.props.socket} />
      </React.Fragment>
    );
  }
}
